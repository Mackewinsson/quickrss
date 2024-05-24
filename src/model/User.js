import mongoose from "mongoose";

const User = mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model("User", User);
