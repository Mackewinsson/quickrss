import React from "react";

const RssFeedTable = ({ rssFeed, handleModal }) => {
  const truncate = (str, n) => {
    return str.length > n ? str.substring(0, n - 1) + "..." : str;
  };

  return (
    <>
      <h2 className="text-3xl font-bold text-[#494949] mb-4 text-center relative">
        Your <span className="text-[#6fda44]">quick</span>
        <span className="text-[#494949]">RSS</span> Feeds
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1/2 bg-[#6fda44]"></div>
      </h2>
      <div className="overflow-x-auto w-full mt-10 bg-white shadow-md rounded-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">RSS URL</th>
              <th className="py-3 px-6 text-left">Webhook URL</th>
              <th className="py-3 px-6 text-left">Latest Item Timestamp</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            <tr className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {truncate(rssFeed.rssUrl, 30)}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {truncate(rssFeed.webhookUrl, 30)}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {rssFeed.latestItemTimestamp
                  ? new Date(rssFeed.latestItemTimestamp).toLocaleString()
                  : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RssFeedTable;
