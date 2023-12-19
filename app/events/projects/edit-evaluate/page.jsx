// import { cookies } from "next/headers";
import EvaluateForm from "@/app/events/projects/edit-evaluate/EvaluateForm";

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

  return <EvaluateForm/>
}
