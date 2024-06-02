"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@img/logo.png";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar = () => {
  const { user, error, isLoading } = useUser();
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href={"/"}>Login</Link>
              <ul className="p-2">
                {user ? (
                  <li>
                    <Link href={"/api/auth/logout"}>Cerrar Sesion</Link>
                  </li>
                ) : (
                  <li>
                    <Link href={"/api/auth/login"}>Iniciar Sesion</Link>
                  </li>
                )}
              </ul>
            </li>
          </ul>
        </div>
        <Link href={"/"} className="btn btn-ghost text-xl">
          {/* <Image src={logo} alt="logo wise-ass" width={40} /> Up-rss */}
          Quickrss
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        {user && <div>Hola 👋 {user.name}</div>}
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Login</summary>
              <ul className="p-2">
                {user ? (
                  <li>
                    <Link href={"/api/auth/logout"}>Cerrar Sesion</Link>
                  </li>
                ) : (
                  <li>
                    <Link href={"/api/auth/login"}>Iniciar Sesion</Link>
                  </li>
                )}
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
