import mongoose from "mongoose";

const RSSFeedSchema = new mongoose.Schema(
  {
    rssUrl: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    latestItemTimestamp: {
      type: Number,
      default: 0,
    },
    webhookUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.RSSFeed ||
  mongoose.model("RSSFeed", RSSFeedSchema);
