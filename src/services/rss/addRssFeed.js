import connectDB from "../../app/lib/connectDB";
import User from "../../model/User";

export default async function addRSSFeed(userId, rssUrl, webhookUrl) {
  await connectDB();

  // Find the user and update their rssFeeds array
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  if (user.rssFeeds.length === 0) {
    user.rssFeeds.push({
      rssUrl,
      webhookUrl,
      latestItemTimestamp: Date.now(), // Example timestamp
    });
    await user.save();
    return user;
  } else {
    return { error: "You can't have more than 1 rss" };
  }
}
