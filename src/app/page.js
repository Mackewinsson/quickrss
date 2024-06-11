import LandingPage from "@component/LadingPage";
import createUser from "../actions/users/createUser";
import MainContent from "@component/MainContent";

export default async function Home() {
  const user = await createUser();
  const serializedRssFeeds = () => {
    if (user.rssFeed) {
      return {
        rssUrl: user.rssFeed.rssUrl,
        webhookUrl: user.rssFeed.webhookUrl,
      };
    } else {
      null;
    }
  };

  return user ? (
    <MainContent rssFeed={serializedRssFeeds()} />
  ) : (
    <LandingPage />
  );
}
