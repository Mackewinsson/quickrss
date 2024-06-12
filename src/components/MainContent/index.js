"use client";
import React from "react";
import { FormComponent } from "@component/FormComponent";
import deleteRss from "../../actions/users/rss/deleteRss";

export function MainContent({ rssFeed }) {
  const truncate = (str, n) => {
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  const handleModal = async () => {
    document.getElementById("my_modal_1").showModal();
    // await deleteRss(rssFeed.rssUrl);
  };

  const handleDeleteRss = async () => {
    await deleteRss(rssFeed.rssUrl);
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-40 bg">
      {!rssFeed ? (
        <FormComponent />
      ) : (
        <div className="overflow-x-auto w-full mt-10">
          <table className="table w-full">
            <thead>
              <tr>
                <th>RSS URL</th>
                <th>Webhook URL</th>
                <th>Latest Item Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {rssFeed ? (
                <tr>
                  <td>{truncate(rssFeed.rssUrl, 30)}</td>
                  <td>{truncate(rssFeed.webhookUrl, 30)}</td>
                  <td>
                    {rssFeed.latestItemTimestamp
                      ? new Date(rssFeed.latestItemTimestamp).toLocaleString()
                      : "N/A"}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No RSS Feeds found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-center gap-2 mt-5">
            <button className="btn btn-error" onClick={handleModal}>
              Delete
            </button>
          </div>
        </div>
      )}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Are you sure you want to delete this RSS?</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <div className="flex justify-center gap-2 mt-5">
                <button className="btn">Cancel</button>
                <button className="btn btn-error" onClick={handleDeleteRss}>
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
}

export default MainContent;
