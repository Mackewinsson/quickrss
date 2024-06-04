"use server";

import User from "../../model/User";
import connectDB from "../../app/lib/connectDB";

const { getSession } = require("@auth0/nextjs-auth0");

export async function createUser() {
  try {
    const session = await getSession();
    if (!session || !session.user) {
      throw new Error("User not found in session");
    }

    const { user } = session;

    await connectDB(); // Connect to MongoDB

    // Check if the user already exists
    let existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      console.log("User already exists");
      return existingUser;
    }

    // Create a new user document
    let newUser = new User({
      name: user.name,
      age: 25, // You can set the age to whatever default value you want
      given_name: user.given_name,
      nickname: user.nickname,
      picture: user.picture,
      locale: user.locale,
      updated_at: user.updated_at,
      email: user.email,
      email_verified: user.email_verified,
      sub: user.sub,
      sid: user.sid,
      rssFeeds: [], // Initialize with an empty array
    });

    // Save the new user to the database
    await newUser.save();

    console.log("User created:", newUser);

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    return { error: error.message };
  }
}
