"use server";

import User from "../../model/User";
import connectDB from "../../app/lib/connectDB";

const { getSession } = require("@auth0/nextjs-auth0");

export default async function createUser() {
  try {
    const { user } = await getSession();
    if (!user) {
      throw new Error("User not found");
    }

    await connectDB(); // Connect to MongoDB

    // Check if the user already exists
    let existingUser = await User.findOne({ email: user.email }).lean();
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
      subscriptionType: "free",
    });

    // Save the new user to the database
    await newUser.save();

    console.log("User created:", newUser);

    return newUser.toObject();
  } catch (error) {
    console.error("Error creating user:", error);
  }
}
