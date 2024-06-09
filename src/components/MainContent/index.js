"use client";
import React from "react";
import { FormComponent } from "@component/FormComponent";
import getUser from "../../actions/users/getUser";
import deleteRss from "../../actions/users/rss/deleteRss";

export function MainContent({ rssFeeds }) {
  const truncate = (str, n) => {
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
  };
  const handleDelete = async () => {
    await deleteRss(rssFeeds[0].rssUrl);
  };
  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-40 bg">
      {rssFeeds ? (
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
              {rssFeeds.length > 0 ? (
                rssFeeds.map((rssFeed, index) => (
                  <tr key={rssFeed._id}>
                    <td>{truncate(rssFeed.rssUrl, 30)}</td>
                    <td>{truncate(rssFeed.webhookUrl, 30)}</td>
                    <td>
                      {new Date(rssFeed.latestItemTimestamp).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No RSS Feeds found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <button className="btn btn-error" onClick={handleDelete}>
            Delete rss
          </button>
        </div>
      )}
    </section>
  );
}

export default MainContent;
