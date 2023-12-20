// import { cookies } from "next/headers";
import EvaluateForm from "@/app/events/projects/edit-evaluate/EvaluateForm";
import Link from "next/link";
import React from "react";

// const token = cookies().get("token")?.value;
// const projectId = cookies().get("project_id")?.value;
//
// async function getUserInfo() {
//   const res = await fetch("https://admin.rupp.support/api/v1/auth/protected", {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "Bearer " + token,
//     },
//   });
//
//   return res.json();
// }
//
// async function getEvaForm() {
//   const res = await fetch(
//     `https://admin.rupp.support/api/v1/events/1/evaluation-forms/eve-project-id/${projectId}`,
//     {
//       method: "GET",
//       cache: "no-cache",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//     },
//   );
//
//   if (!res.ok) {
//     throw new Error("Error Fetch Data");
//   }
//
//   return res.json();
// }
//
// async function getScores() {
//   const userInfo = await getUserInfo();
//
//   const res = await fetch(
//     `https://admin.rupp.support/api/v1/events/eve-committees/${userInfo.eve_committee_id}/project-shortlists/${projectId}`,
//     {
//       method: "GET",
//       cache: "no-cache",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//         Authorization: "Bearer " + token,
//       },
//     },
//   );
//
//   if (!res.ok) {
//     const message = await res
//     console.log(message)
//     throw new Error("error");
//   }
//
//   return res.json();
// }

export default async function Page() {
  // const evaFormRes = getEvaForm()
  // const scoresRes = getScores()
  // const [evaForm, scores] = await Promise.all([evaFormRes, scoresRes])

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
      <EvaluateForm/>
    </>
  );
}
