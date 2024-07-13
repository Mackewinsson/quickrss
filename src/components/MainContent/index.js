"use client";
import React, { useRef } from "react";
import { FormComponent } from "@component/FormComponent";
import deleteRss from "../../actions/users/rss/deleteRss";
import RssFeedTable from "@component/RssFeedTable";
import Link from "next/link";

export function MainContent({ rssFeed }) {
  const upgradeButtonRef = useRef(null);

  const handleModal = () => {
    document.getElementById("my_modal_1").showModal();
  };

  const handleDeleteRss = async (e) => {
    e.preventDefault();
    await deleteRss(rssFeed.rssUrl);
    document.getElementById("my_modal_1").close();
  };

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
      {!rssFeed ? (
        <FormComponent />
      ) : (
        <div className="w-full">
          <RssFeedTable rssFeed={rssFeed} handleModal={handleModal} />
          <div className="flex justify-center mt-5">
            <div
              className="border-dotted border-8 border-gray-200 p-4 w-full bg-white shadow-md rounded-lg text-center cursor-pointer"
              onClick={highlightUpgradeButton}
            >
              <p className="text-gray-700">Add more RSS</p>
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-5">
            <Link href="/payment" passHref>
              <button className="btn btn-primary" ref={upgradeButtonRef}>
                Upgrade to Pro 🚀
              </button>
            </Link>
            <button className="btn btn-error" onClick={handleModal}>
              Delete
            </button>
          </div>
        </div>
      )}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete this RSS feed?</p>
          <div className="modal-action">
            <form method="dialog" onSubmit={handleDeleteRss}>
              <div className="flex justify-center gap-2 mt-5">
                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("my_modal_1").close()}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-error">
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
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
