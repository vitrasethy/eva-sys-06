import { cookies } from "next/headers";

async function getUserInfo() {
  const token = cookies().get("token")?.value;
  const res = await fetch("https://admin.rupp.support/api/v1/auth/protected", {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  return res.json();
}

export async function GET() {
  const token = cookies().get("token")?.value;
  const projectId = cookies().get("project_id")?.value;
  const userInfo = await getUserInfo();

  const res = await fetch(
    `https://admin.rupp.support/api/v1/events/eve-committees/${userInfo.eve_committee_id}/project-shortlists/${projectId}`,
    {
      method: "GET",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + token,
      },
    },
  );

  if (!res.ok) {
    const message = await res;
    console.log(message);
    throw new Error("error");
  }
  const data = await res.json();

  return Response.json(data);
}
