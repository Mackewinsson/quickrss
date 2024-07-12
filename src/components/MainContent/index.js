"use client";
import React from "react";
import { FormComponent } from "@component/FormComponent";
import deleteRss from "../../actions/users/rss/deleteRss";
import RssFeedTable from "@component/RssFeedTable";
import Link from "next/link";

export function MainContent({ rssFeed }) {
  const handleModal = async () => {
    document.getElementById("my_modal_1").showModal();
    // await deleteRss(rssFeed.rssUrl);
  };

  const handleDeleteRss = async () => {
    await deleteRss(rssFeed.rssUrl);
  };

  return (
    <section className="flex min-h-screen flex-col items-center justify-between p-10 bg">
      {!rssFeed ? (
        <FormComponent />
      ) : (
        <div className="w-full">
          <RssFeedTable rssFeed={rssFeed} handleModal={handleModal} />
          <div className="flex justify-center gap-2 mt-5">
            <Link href="/payment" passHref>
              <button className="btn btn-primary">
                Add more RSS - Upgrade to Pro 🚀
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
            <form method="dialog">
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
