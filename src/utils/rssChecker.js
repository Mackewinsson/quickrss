import Parser from "rss-parser";
import cron from "node-cron";
import RSSFeed from "../model/Rss";
import User from "../model/User";
import { sendToSlack } from "./slack";
import connectDB from "../app/lib/connectDB";

const parser = new Parser();
const CHECK_INTERVAL_MINUTES = 5;
let task = null;

/**
 * Encuentra o crea un feed RSS para un usuario.
 * @param {string} rssUrl - La URL del feed RSS.
 * @param {string} userId - El ID del usuario.
 * @param {string} webhookUrl - La URL del Webhook de Slack.
 * @returns {Promise<Object>} - El documento del feed RSS.
 */
const findOrCreateRSSFeed = async (rssUrl, userId, webhookUrl) => {
  await connectDB();

  let rssFeed = await RSSFeed.findOne({ rssUrl, user: userId });

  if (!rssFeed) {
    rssFeed = new RSSFeed({ rssUrl, user: userId, webhookUrl });
    await rssFeed.save();

    // Update the user's rssFeeds reference
    const user = await User.findById(userId);
    if (user) {
      user.rssFeeds.push(rssFeed._id);
      await user.save();
    }
  } else if (rssFeed.webhookUrl !== webhookUrl) {
    rssFeed.webhookUrl = webhookUrl;
    await rssFeed.save();
  }

  return rssFeed;
};

/**
 * Inicializa el timestamp del feed RSS con el ítem más reciente.
 * @param {Object} rssFeed - El documento del feed RSS.
 * @param {string} rssUrl - La URL del feed RSS.
 */
const initializeRSSFeedTimestamp = async (rssFeed, rssUrl) => {
  const feed = await parser.parseURL(rssUrl);

  if (feed && feed.items && feed.items.length > 0) {
    rssFeed.latestItemTimestamp = new Date(feed.items[0].pubDate).getTime();
    await rssFeed.save();
    console.log(
      "Initialized latestItemTimestamp to",
      rssFeed.latestItemTimestamp
    );
  } else {
    console.log("No items found in the RSS feed during initialization.");
  }
};

/**
 * Procesa el feed RSS buscando nuevos ítems y enviándolos a Slack.
 * @param {string} rssUrl - La URL del feed RSS.
 * @param {string} userId - El ID del usuario.
 */
const processRSSFeed = async (rssUrl, userId) => {
  await connectDB();
  const rssFeed = await RSSFeed.findOne({ rssUrl, user: userId });

  if (!rssFeed) {
    console.error("RSS feed not found for URL:", rssUrl);
    return;
  }

  try {
    const feed = await parser.parseURL(rssUrl);

    if (!feed || !feed.items || feed.items.length === 0) {
      console.log("No items found in the RSS feed.");
      return;
    }

    let newLatestTimestamp = rssFeed.latestItemTimestamp;

    feed.items.forEach((item) => {
      const itemTimestamp = new Date(item.pubDate).getTime();
      if (itemTimestamp > rssFeed.latestItemTimestamp) {
        newLatestTimestamp = Math.max(newLatestTimestamp, itemTimestamp);
        console.log("New item found:", item);
        sendToSlack(item, rssFeed.webhookUrl);
      }
    });

    if (newLatestTimestamp > rssFeed.latestItemTimestamp) {
      rssFeed.latestItemTimestamp = newLatestTimestamp;
      await rssFeed.save();
      console.log("Updated latestItemTimestamp to", newLatestTimestamp);
    }
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
  }
};

/**
 * Inicia la suscripción del feed RSS para un usuario.
 * @param {string} rssUrl - La URL del feed RSS.
 * @param {string} webhookUrl - La URL del Webhook de Slack.
 * @param {string} userId - El ID del usuario.
 */
export const startRssSubscription = async (rssUrl, webhookUrl, userId) => {
  try {
    await connectDB();

    // Verifica si el usuario ya tiene una suscripción
    const existingFeed = await RSSFeed.findOne({ user: userId });
    if (existingFeed) {
      console.log("Subscription already exists for this user.");
      return;
    }

    const rssFeed = await findOrCreateRSSFeed(rssUrl, userId, webhookUrl);

    if (!rssFeed.latestItemTimestamp) {
      await initializeRSSFeedTimestamp(rssFeed, rssUrl);
    }

    if (task) {
      task.stop();
    }

    task = cron.schedule(`*/${CHECK_INTERVAL_MINUTES} * * * *`, () => {
      processRSSFeed(rssUrl, userId);
    });

    console.log("RSS feed subscription started.");
  } catch (error) {
    console.error("Error starting RSS feed subscription:", error);
  }
};

/**
 * Detiene la suscripción del feed RSS.
 */
export const stopRSSFeedChecker = () => {
  if (task) {
    task.stop();
    task = null;
    console.log("RSS feed checker stopped.");
  }
};
