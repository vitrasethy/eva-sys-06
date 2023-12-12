import { cookies } from "next/headers";

export default async function getEvaluateData() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const res = await fetch(
    `https://admin.rupp.support/api/v1/events/${eventId}/evaluation-forms/eve-project_id/${cookies().get("project_id")?.value}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.value,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
