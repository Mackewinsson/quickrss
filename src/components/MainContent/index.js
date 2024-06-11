"use client";
import React from "react";
import { FormComponent } from "@component/FormComponent";
import deleteRss from "../../actions/users/rss/deleteRss";

export function MainContent({ rssFeed }) {
  const truncate = (str, n) => {
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
  };
  const handleDelete = async () => {
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
                    {new Date(rssFeed.latestItemTimestamp).toLocaleString()}
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
          <div className="flex justify-end gap-2 mt-5">
            <button
              className="btn btn-primary"
              onClick={() => console.log("edit")}
            >
              Edit
            </button>
            <button className="btn btn-error" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default MainContent;
