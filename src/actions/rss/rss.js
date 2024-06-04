"use server";

import connectDB from "../../app/lib/connectDB";
import User from "../../model/User";
import addRSSFeed from "../../services/rss/addRssFeed";
import { startRssSubscription } from "../../utils/rssChecker";

export default async function rssSubcription(user, action, formData) {
  await connectDB();
  const { sub } = user;
  const userM = await User.findOne({ sub });
  const userId = userM._id.toString();
  const rssUrl = formData.get("rssUrl");
  const webhookUrl = formData.get("slackWebhookUrl");
  try {
    if (!rssUrl || !webhookUrl || !userId) {
      return { message: "rssUrl, webhookUrl, and userId are required." };
    }

    const user = await User.findById(userId);
    if (!user) {
      return { message: "User not found." };
    }
    if (action === "start") {
      await addRSSFeed(userId, rssUrl, webhookUrl);
      return { message: "RSS feed checker started." };
    }
  } catch (error) {
    console.log(error);
  }
}
