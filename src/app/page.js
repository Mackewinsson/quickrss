import LandingPage from "@component/LadingPage";
import createUser from "../actions/users/createUser";
import MainContent from "@component/MainContent";

export default async function Home() {
  const user = await createUser();
  const serializedTasks = () => {
    if (user.tasks && user.tasks.length > 0) {
      // Map over tasks to create an array of task objects
      return user.tasks.map((task) => ({
        url: task.url,
        interval: task.interval,
        webhookUrl: task.webhookUrl,
        id: task._id,
        lastRun: task.lastRun,
      }));
    }
    return [];
  };

  return user ? (
      <MainContent initialTasks={serializedTasks()} user={user} />
  ) : (
      <LandingPage />
  );
}
