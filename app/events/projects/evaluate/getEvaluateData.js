// import { cookies } from "next/headers";

import {cookies} from "next/headers";

export default async function getEvaluateData() {
  // const cookieStore = cookies();
  // const token = cookieStore.get("access_token");
  const eventId = 1;

  const res = await fetch(
    `https://admin.rupp.support/api/v1/events/${eventId}/evaluation-forms`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("jwt")?.value}`
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}