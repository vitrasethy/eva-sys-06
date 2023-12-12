// import { cookies } from "next/headers";

import {cookies} from "next/headers";

export default async function getEvaluateData() {
  // const cookieStore = cookies();
  // const token = cookieStore.get("access_token");
  // const eventId = 1;

  const res = await fetch(
    `https://admin.rupp.support/api/v1/events/1/evaluation-forms/eve-project-id/${cookies().get("project_id")?.value}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
