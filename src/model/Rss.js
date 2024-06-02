import mongoose from "mongoose";

const RSSFeedSchema = new mongoose.Schema(
  {
    rssUrl: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    webhookUrl: String,
    latestItemTimestamp: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.RSSFeed ||
  mongoose.model("RSSFeed", RSSFeedSchema);
