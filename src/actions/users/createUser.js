"use server";

import User from "../../model/User";
import { getSession } from "@auth0/nextjs-auth0";
import connectDB from "../../app/lib/connectDB";

export default async function createUser() {
  try {
    const session = await getSession();
    const { user } = session;
    if (!user) {
      throw new Error("User not found");
    }

    await connectDB(); // Connect to MongoDB

    // Check if the user already exists
    let existingUser = await User.findOne({ email: user.email }).populate(
      "rssFeed"
    );
    if (existingUser) {
      console.log("User already exists:", existingUser);
      return existingUser; // Return the existing user
    }

    // Create a new user document
    const newUser = new User({
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
    });

    // Save the new user to the database
    await newUser.save();

    console.log("User created:", newUser);
    return newUser; // Return the new user
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
