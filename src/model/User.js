import mongoose from "mongoose";

const RSSFeedSchema = new mongoose.Schema(
  {
    rssUrl: { type: String, required: true },
    webhookUrl: { type: String, required: true },
    latestItemTimestamp: { type: Number, required: true, default: null },
  },
  {
    timestamps: true,
  }
);

const UserSchema = new mongoose.Schema(
  {
    name: String,
    age: Number,
    given_name: String,
    nickname: String,
    picture: String,
    locale: String,
    updated_at: Date,
    email: String,
    email_verified: Boolean,
    sub: String,
    sid: String,
    rssFeed: RSSFeedSchema, // Embedded array of RSS feeds
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
