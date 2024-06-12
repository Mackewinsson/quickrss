import Parser from "rss-parser";
import User from "../model/User";
import { sendToSlack } from "./slack";
import connectDB from "../app/lib/connectDB";

const parser = new Parser();

/**
 * Procesa el feed RSS buscando nuevos ítems y enviándolos a Slack.
 * @param {string} rssUrl - La URL del feed RSS.
 * @param {object} user - El usuario que tiene el feed RSS.
 */
const processRSSFeed = async (rssUrl, user) => {
  await connectDB();

  try {
    const feed = await parser.parseURL(rssUrl);
    console.log("FEED WAS CHECKED for URL:", rssUrl);

    if (!feed || !feed.items || feed.items.length === 0) {
      console.log("No items found in the RSS feed.");
      return;
    }

    let newLatestTimestamp = user.rssFeed.latestItemTimestamp;

    for (const item of feed.items) {
      const itemTimestamp = new Date(item.pubDate).getTime();
      if (itemTimestamp > user.rssFeed.latestItemTimestamp) {
        newLatestTimestamp = Math.max(newLatestTimestamp, itemTimestamp);
        console.log("New item found:", item.title);
        await sendToSlack(item, user.rssFeed.webhookUrl);
      }
    }

    if (newLatestTimestamp > user.rssFeed.latestItemTimestamp) {
      user.rssFeed.latestItemTimestamp = newLatestTimestamp;
      await user.save();
      console.log("Updated latestItemTimestamp to", newLatestTimestamp);
    }
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
  }
};

/**
 * Inicia las suscripciones de todos los feeds RSS almacenados en la base de datos.
 */
export const startAllRSSFeedSubscriptions = async () => {
  try {
    await connectDB();
    const users = await User.find();
    for (const user of users) {
      if (user.rssFeed && user.rssFeed.rssUrl) {
        console.log("Starting subscription for feed", user.rssFeed.rssUrl);
        await processRSSFeed(user.rssFeed.rssUrl, user);
      }
    }
    console.log("Rss feeds checked");
  } catch (error) {
    console.error("Error RSS feed subscriptions:", error);
  }
};
