import {cookies} from "next/headers";

export async function GET() {
  const token = cookies().get("token")?.value;
  const projectId = cookies().get("project_id")?.value;
  const res = await fetch(
    `https://admin.rupp.support/api/v1/events/1/evaluation-forms/eve-project-id/${projectId}`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Error Fetch Data");
  }
  const data = await res.json();

  return Response.json(data);
}
