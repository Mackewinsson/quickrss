"use server";

import User from "../../model/User";
import connectDB from "../../app/lib/connectDB";
import { getSession } from "@auth0/nextjs-auth0";

export default async function getUser() {
  try {
    const { user } = await getSession();
    await connectDB(); // Connect to MongoDB
    const fetchedUser = await User.findOne({ email: user.email });
    return fetchedUser;
  } catch (error) {
    console.error("Error fetxching user:", error);
  }
}
