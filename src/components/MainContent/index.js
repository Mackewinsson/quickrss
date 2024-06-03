"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FormComponent } from "@component/FormComponent";
import Loader from "@component/Loader";
import React from "react";

const MainContent = () => {
  const { user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-40">
        <Loader />
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-40">
      {user ? <FormComponent /> : ""}
    </main>
  );
};

export default MainContent;
