import createUser from "../actions/users/createUser";
import MainContent from "@component/MainContent";

export default async function Home() {
  const user = createUser();
  const hasRSSFeed = user?.rssFeed ? true : false;
  return (
    <div>
      <MainContent />
    </div>
  );
}
