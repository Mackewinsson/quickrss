import { createUser } from "../actions/users/createUser";
import MainContent from "@component/MainContent";

export default async function Home() {
  const user = await createUser();
  console.log(user.rssFeeds);

  return (
    <div>
      <MainContent rssFeeds={user.rssFeeds} />
    </div>
  );
}
