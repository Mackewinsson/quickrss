"use client";
import React, {useCallback, useRef, useState} from "react";
import { FormComponent } from "@component/FormComponent";
import { deleteTask } from "../../services/tasks/tasks";
import Link from "next/link";
import TaskTable from "@component/TaskTable";
import getUser from "../../actions/users/getUser";

export function MainContent({ initialTasks, user }) {
  const [tasks, setTasks] = useState(initialTasks);

  const upgradeButtonRef = useRef(null);
  // Function to refresh tasks after creation or deletion
  const refreshTasks = async () => {
    try {
      const updatedUser = await getUser(); // Re-fetch the user to get updated tasks
      setTasks(updatedUser.tasks); // Update the tasks state
    } catch (error) {
      console.error("Error refreshing tasks:", error.message);
    }
  };

  // Function to open the delete confirmation modal
  const handleModal = (taskId) => {
    const modal = document.getElementById(`modal-${taskId}`);
    if (modal) modal.showModal();
  };

  // Function to handle task deletion
  const handleDeleteTask = useCallback(async (taskId) => {
    console.log(taskId)
    try {
      await deleteTask(user._id, taskId);
      const modal = document.getElementById(`modal-${taskId}`);
      await refreshTasks();
      if (modal) modal.close();
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  }, [user, tasks])
  // Function to highlight the "Upgrade" button
  const highlightUpgradeButton = () => {
    if (upgradeButtonRef.current) {
      upgradeButtonRef.current.classList.add("btn-highlight");
      setTimeout(() => {
        upgradeButtonRef.current.classList.remove("btn-highlight");
      }, 2000);
    }
  };

  return (
      <section className="flex min-h-screen flex-col items-center justify-between p-10 bg">
        {!tasks || tasks.length === 0 ? (
            <FormComponent refreshTasks={refreshTasks} />
        ) : (
            <div className="w-full">
              <TaskTable tasks={tasks} handleModal={handleModal} />
              <div className="flex justify-center mt-5">
                <div
                    className="border-dotted border-8 border-gray-200 p-4 w-full bg-white shadow-md rounded-lg text-center cursor-pointer"
                    onClick={highlightUpgradeButton}
                >
                  <p className="text-gray-700">Add more Tasks</p>
                </div>
              </div>
              <div className="flex justify-center gap-2 mt-5">
                <Link href="/payment" passHref>
                  <button className="btn btn-primary" ref={upgradeButtonRef}>
                    Upgrade to Pro 🚀
                  </button>
                </Link>
              </div>
            </div>
        )}

        {/* Dialog for task deletion confirmation */}
        {tasks?.map((task) => (
            <dialog id={`modal-${task._id}`} className="modal" key={task._id}>
              <div className="modal-box">
                <h3 className="font-bold text-lg">Confirm Deletion</h3>
                <p className="py-4">
                  Are you sure you want to delete this task:{" "}
                  <strong>{task.url}</strong>?
                </p>
                <div className="modal-action">
                  <button
                      type="button"
                      className="btn"
                      onClick={() =>
                          document.getElementById(`modal-${task.id}`).close()
                      }
                  >
                    Cancel
                  </button>
                  <button
                      type="button"
                      className="btn btn-error"
                      onClick={() => handleDeleteTask(task._id)}
                  >
                    Delete task
                  </button>
                </div>
              </div>
            </dialog>
        ))}

        <style jsx>{`
        .btn-highlight {
          background-color: #fff; /* Tailwind amber-500 */
          transition: background-color 0.3s ease-in-out;
        }
      `}</style>
      </section>
  );
}

export default MainContent;
