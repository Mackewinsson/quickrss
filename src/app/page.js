import createUser from "../actions/users/createUser";
import MainContent from "@component/MainContent";

export default async function Home() {
  const user = createUser();
  const hasRSSFeed = user?.rssFeed ? true : false;
  console.log(hasRSSFeed);
  return (
    <div>
      <MainContent />
    </div>
  );
}
