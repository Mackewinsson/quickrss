"use client";
import React, { useState } from "react";

const plans = [
  {
    name: "Free 🌟",
    price: "$0",
    description: "Start for Free",
    features: [
      "📄 1 Upwork RSS Feed",
      "🔔 Receive Notifications Every 30 Minutes",
      "💬 Basic Support",
    ],
    buttonLabel: "Get Started",
  },
  {
    name: "Pro 🚀",
    price: "$5",
    description: "/ month",
    features: [
      "📄 1 Upwork RSS Feed",
      "🔔 Receive Notifications Every 5 Minutes",
      "🚀 Be the First to Apply on Upwork",
      "🌟 Priority Customer Support",
    ],
    billingInfo: "*Billed as $60 yearly",
    buttonLabel: "Get Started",
  },
];

export default function Payment() {
  const handleSelectPlan = async (plan) => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify(plan),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const session = await response.json();
    console.log(session);
    // Redirect to the checkout session (Stripe)
    window.location.href = session.url;
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Plans and Pricing</h1>
      <div className="flex justify-center space-x-4">
        {plans.map((plan, index) => (
          <div key={index} className="card bg-base-100 shadow-md w-80">
            <div className="card-body flex flex-col justify-between h-full">
              <div>
                <h2 className="card-title text-center">{plan.name}</h2>
                <p className="text-4xl font-bold text-center">{plan.price}</p>
                <p className="text-center mb-4">{plan.description}</p>
                <ul className="text-center mb-4 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                {plan.billingInfo && (
                  <p className="text-center text-sm mb-4">{plan.billingInfo}</p>
                )}
              </div>
              <div className="card-actions justify-center mt-4">
                <button
                  className={`btn btn-primary`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {plan.buttonLabel}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <a href="#" className="link link-primary">
          Contact us
        </a>{" "}
        for more information.
      </div>
    </div>
  );
}
