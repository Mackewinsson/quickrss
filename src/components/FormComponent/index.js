"use client";

export function FormComponent() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit} className="form-control w-full h-40">
      <div className="flex flex-col w-full">
        <div className="grid h-40 card bg-base-300 rounded-box place-items-center">
          <div className="flex justify-around place-items-center w-full">
            <div className="flex flex-col w-1/3 m-4">
              <label className="p-2">RSS URL</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xl"
              />
            </div>

            <div className="flex flex-col w-1/3 m-4">
              <label className="p-2">WebHook Slack</label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xl"
              />
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
          <button className="btn btn-wide btn-primary" type="submit">
            Button
          </button>
        </div>
      </div>
    </form>
  );
}
