import LandingPage from "@component/LadingPage";
import createUser from "../actions/users/createUser";
import MainContent from "@component/MainContent";

export default async function Home() {
  const user = await createUser();
  const serializedRssFeeds =
    {
      rssUrl: user?.rssFeeds[0]?.rssUrl,
      webhookUrl: user?.rssFeeds[0]?.webhookUrl,
    } || {};
  return user ? <MainContent rssFeeds={serializedRssFeeds} /> : <LandingPage />;
}
