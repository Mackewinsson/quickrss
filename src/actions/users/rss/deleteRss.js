"use server";

import { getSession } from "@auth0/nextjs-auth0";
import connectDB from "../../../app/lib/connectDB";
import User from "../../../model/User";

export default async function deleteRss(rssUrl) {
  try {
    const { user } = await getSession();
    await connectDB(); // Connect to MongoDB
    const fetchedUser = await User.findOne({ email: user.email });

    if (!fetchedUser) {
      throw new Error("User not found");
    }

    // Find the index of the RSS feed to be removed
    const rssFeedIndex = fetchedUser.rssFeeds.findIndex(
      (feed) => feed.rssUrl === rssUrl
    );
    console.log(rssFeedIndex);
    if (rssFeedIndex === -1) {
      throw new Error("RSS feed not found");
    }

    // Remove the RSS feed from the array
    fetchedUser.rssFeeds.splice(rssFeedIndex, 1);

    // Save the updated user document
    await fetchedUser.save();

    return fetchedUser;
  } catch (error) {
    console.error("Error deleting rss:", error);
  }
}
