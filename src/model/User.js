import mongoose from "mongoose";

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
    rssFeeds: [{ type: mongoose.Schema.Types.ObjectId, ref: "RSSFeed" }], // Reference to RSSFeed
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
