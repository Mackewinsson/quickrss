import { NextResponse } from "next/server";

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export async function POST(request) {
  const body = await request.json();
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          recurring: {
            interval: "month",
          },
          product_data: {
            name: body.name,
          },
          unit_amount: 500,
        },
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${process.env.AUTH0_BASE_URL}/success`,
  });
  console.log(session);
  return NextResponse.json(session);
}
