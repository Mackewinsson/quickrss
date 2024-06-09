"use server";

import { getSession } from "@auth0/nextjs-auth0";
import connectDB from "../../../app/lib/connectDB";
import User from "../../../model/User";

export default async function createRss() {
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
    };

    // Add the new RSS feed to the user's rssFeeds array
    fetchedUser.rssFeed = newRssFeed;
    // Save the updated user document
    await fetchedUser.save();
    //create a new rssFeed
    return fetchedUser;
  } catch (error) {
    console.error("Error creating rss:", error);
  }
}
