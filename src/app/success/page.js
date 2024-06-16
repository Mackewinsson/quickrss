"use client";
import { useEffect, useState } from "react";
import JSConfetti from "js-confetti";
import Link from "next/link";

export default function Success() {
  useEffect(() => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({ confettiRadius: 10 });
  }, []);
  return (
    <div className="flex flex-col items-center min-h-screen bg-white pt-52">
      <h1 className="text-4xl font-bold text-center">
        Thank you for your purchase!🎉
      </h1>
      <Link href="/" passHref>
        <button className="mt-6 btn btn-primary">Volver al inicio</button>
      </Link>
    </div>
  );
}
