"use client";
import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="loading loading-ring loading-lg"></span>
      <p>Loading</p>
    </div>
  );
};

export default Loader;
