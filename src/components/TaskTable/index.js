import React from "react";

const TaskTable = ({ tasks, handleModal }) => {
  const truncate = (str, n) => {
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
      <>
        <h2 className="text-3xl font-bold text-[#494949] mb-4 text-center relative">
          Your <span className="text-[#6fda44]">quick</span>
          <span className="text-[#494949]">Tasks</span>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1/2 bg-[#6fda44]"></div>
        </h2>
        <div className="overflow-x-auto w-full mt-10 bg-white shadow-md rounded-lg">
          <table className="table w-full">
            <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Task URL</th>
              <th className="py-3 px-6 text-left">Webhook URL</th>
              <th className="py-3 px-6 text-left">Last Run</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
            {tasks?.map((task) => (
                <tr
                    key={task._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {truncate(task.url, 30)}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {truncate(task.webhookUrl, 30)}
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {task.lastRun
                        ? new Date(task.lastRun).toLocaleString()
                        : "N/A"}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                        className="btn btn-error btn-sm"
                        onClick={() => handleModal(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </>
  );
};

export default TaskTable;
