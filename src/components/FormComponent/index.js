  "use client";

  import createTask from "../../actions/users/rss/createTask";

  export function FormComponent({ refreshTasks }) {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      try {
        await createTask(formData); // Create the task
        await refreshTasks(); // Refresh the tasks in the parent
      } catch (error) {
        console.error("Error creating task:", error.message);
      }
    };

    return (
        <form className="form-control w-full h-40" onSubmit={handleSubmit}>
          <div className="flex flex-col w-full">
            <div className="grid h-40 card bg-base-300 rounded-box place-items-center">
              <div className="flex justify-around place-items-center w-full">
                <div className="flex flex-col w-1/3 m-4">
                  <label className="p-2">Upwork URL</label>
                  <input
                      type="text"
                      name="taskUrl"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xl"
                  />
                </div>
                <div className="flex flex-col w-1/3 m-4">
                  <label className="p-2">WebHook Slack</label>
                  <input
                      type="text"
                      name="slackWebhookUrl"
                      placeholder="Type here"
                      className="input input-bordered w-full max-w-xl"
                  />
                </div>
              </div>
            </div>
            <div className="grid h-20 card place-items-center">
              <button className="btn btn-wide btn-primary" type="submit">
                Comenzar
              </button>
            </div>
          </div>
        </form>
    );
  }
