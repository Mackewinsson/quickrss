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

    // Remove the RSS feed from the array
    fetchedUser.rssFeed = undefined;
    // Save the updated user document
    await fetchedUser.save();

    return fetchedUser;
  } catch (error) {
    console.error("Error deleting rss:", error);
  }
}
