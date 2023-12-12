import { cookies } from "next/headers";

export default async function getEvaluateData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const projectId = cookies().get("project_id")

  const res = await fetch(
    `https://admin.rupp.support/api/v1/events/1/evaluation-forms/eve-project-id/${projectId?.value}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.value,
      },
    },
  );

  if (!res.ok) {
    throw new Error("hehe");
  }

  return res.json();
}
