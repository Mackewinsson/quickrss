"use server";

import { getSession } from "@auth0/nextjs-auth0";
import connectDB from "../../../app/lib/connectDB";
import User from "../../../model/User";

export default async function createRss(formData) {
  const rssUrl = formData.get("rssUrl");
  const webhookUrl = formData.get("slackWebhookUrl");
  try {
    const { user } = await getSession();
    await connectDB(); // Connect to MongoDB
    const fetchedUser = await User.findOne({ email: user.email });

    if (!fetchedUser) {
      throw new Error("User not found");
    }

    const newRssFeed = {
      rssUrl,
      webhookUrl,
      latestItemTimestamp: Date.now(),
    };
    // Add the new RSS feed to the user's rssFeeds array
    fetchedUser.rssFeed = newRssFeed;
    // Save the updated user document
    console.log(fetchedUser);
    await fetchedUser.save();
    //create a new rssFeed
    console.log("rss created");
    return { ...fetchedUser };
  } catch (error) {
    console.error("Error creating rss:", error);
  }
}
