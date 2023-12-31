"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getUserData(){
  const res = await fetch("https://admin.rupp.support/api/v1/auth/protected", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });

  return res.json();
}

export async function action(fetchData, formData) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const eventId = 1
  const projectId = cookieStore.get("project_id");

  const userDetail = await getUserData();

  const data = {
    project_id: projectId?.value,
    committee_id: userDetail.eve_committee_id,
    comment: formData.get("comment"),
    results: [].concat(
      ...fetchData.map((e) => ({
        criteria_id: e.id,
        score: formData.get(e.name),
      })),
    ),
  };

  const res = await fetch(
    `https://admin.rupp.support/api/v1/events/${eventId}/project_shortlist/${projectId.value}/committees/${userDetail.eve_committee_id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.value,
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    console.log(res)
    throw new Error("hehe");
  }

  redirect('/events/projects')
}
