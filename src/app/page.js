import { FormComponent } from "@component/FormComponent";
import createUser from "../actions/users/createUser";

export default async function Home() {
  createUser();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <FormComponent />
    </main>
  );
}
