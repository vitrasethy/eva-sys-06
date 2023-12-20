import React from "react";
import EvaluateForm from "./EvaluateForm";
import getEvaluateData from "@/app/events/projects/evaluate/getEvaluateData";
import Link from "next/link";

export default async function Page() {
  const data = await getEvaluateData()

  return (
    <>
      <div className={"flex lg:block justify-center"}>
        <Link
          href={"/events/projects"}
          className="flex w-full text-white my-4 mx-3 lg:ml-3 items-center justify-center lg:w-[10%] px-5 py-4 text-sm transition-colors duration-200 bg-[#014164] border rounded-lg gap-x-2"
        >
          <svg
            className="w-5 h-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>Go back</span>
        </Link>
      </div>
      <main className="md:mx-[3%] my-[5%]">
        <div className="h-auto flex justify-center">
          <div className="w-screen xl:w-[70%] p-6 bg-white border-2 border-gray-300 rounded-lg shadow sm:p-6 md:p-16">
            <EvaluateForm data={data}/>
          </div>
        </div>
      </main>
    </>
  );
}
