import LandingPage from "@component/LadingPage";
import createUser from "../actions/users/createUser";
import MainContent from "@component/MainContent";

export default async function Home() {
  const user = await createUser();
  console.log(user);
  return user ? <MainContent /> : <LandingPage />;
}
