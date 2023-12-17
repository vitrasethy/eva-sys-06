"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {deleteCookie} from "cookies-next";

export default function Navbar() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = React.useState(false);

  React.useEffect(() => {
    fetch("/api/role/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.role === "admin" || data.role === "admin-committee") {
          setIsAdmin(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = () => {
    deleteCookie("login")
    router.push("/login");
  };

  return (
    <div className="sticky top-0 bg-[#014164] z-50">
      <div>
        <div className="Desktop text-white h-20 justify-between items-center hidden md:flex mx-5">
          <div>
            <Link href={"/events"}>
              <Image src="/logoFE.webp" alt="" width={50} height={50} />
            </Link>
          </div>
          <div className="flex justify-around w-2/2 focus:outline-none focus:ring uppercase">
            <Link
              className={`${
                isAdmin ? "" : "hidden"
              } hover:bg-white hover:text-black px-5 py-6 transition ease-in-out delay-50 focus:outline-none focus:ring`}
              href={"/award"}>
              Result
            </Link>
            <Link
              className={`${
                isAdmin ? "" : "hidden"
              } hover:bg-white hover:text-black px-5 py-6 transition ease-in-out delay-50 focus:outline-none focus:ring`}
              href={"/events/supervisor"}>
              Best Supervisor
            </Link>
            <button
              onClick={() => {
                handleLogout();
              }}
              className="hover:bg-white hover:text-black px-5 py-6 transition ease-in-out delay-50 focus:outline-none focus:ring">
              LOG OUT
            </button>
          </div>
        </div>
        <div className="text-white flex h-20 items-center ml-5 justify-between md:hidden transition duration-200 z-50">
          <Link href={"/events"}>
            <Image src="/logoFE.webp" alt="" width={50} height={50} />
          </Link>
          {/* hamburger menu */}
          <div className="drawer flex justify-end mr-4 drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* ProjectList content here */}
              <label
                htmlFor="my-drawer-4"
                className="drawer-button btn bg-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6">
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
            <div className="drawer-side ">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"></label>
              <div className="menu p-4 w-80 min-h-full bg-[#014164] text-base-content">
                {/* Sidebar content here */}
                <p className="text-white text-2xl font-semibold mb-6">Menu</p>
                <hr/>
                <a
                  href={"/events/supervisor"}
                  className={`${
                    isAdmin ? "" : "hidden"
                  } block text-center bg-[#014164] border-white border-2 hover:bg-[#014190] text-white focus:ring-blue-300 font-medium text-sm py-2.5 mr-2 mt-8 mb-2 focus:outline-none`}>
                  Best Supervisor
                </a>
                <a
                  href={"/award"}
                  className={`${
                    isAdmin ? "" : "hidden"
                  } block text-center bg-[#014164] border-white border-2 hover:bg-[#014190] text-white focus:ring-blue-300 font-medium text-sm py-2.5 mr-2 mt-8 mb-2 focus:outline-none`}>
                  Result
                </a>
                <button
                  onClick={() => {
                    handleLogout();
                  }}
                  className="block text-center bg-[#014164] border-white border-2 hover:bg-[#014190] text-white focus:ring-blue-300 font-medium text-sm py-2.5 mr-2 mt-8 mb-2 focus:outline-none">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
