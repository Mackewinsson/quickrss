import { NextResponse } from "next/server";
import { startAllRSSFeedSubscriptions } from "../../../utils/rssChecker";

export async function GET(req) {
  //   const authorization = req.headers.get("Authorization");

  //   if (authorization !== `Bearer ${process.env.CRON_SECRET}`) {
  //     return new Response("Unauthorized", { status: 401 });
  //   }

  try {
    await startAllRSSFeedSubscriptions();
    return NextResponse.json({
      ok: true,
      message: "RSS feed check completed.",
    });
  } catch (error) {
    console.error("Error checking RSS feeds:", error);
    return NextResponse.json({ ok: false, error: error.message });
  }
}
