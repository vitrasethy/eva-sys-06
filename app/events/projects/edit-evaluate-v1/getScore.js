import { cookies } from "next/headers";

async function getUserData(){
  const res = await fetch("https://admin.rupp.support/api/v1/auth/protected", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("token")?.value}`,
    },
  });

  return res.json();
}

export default async function getScore() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const projectId = cookieStore.get("project_id");
  const userData = await getUserData()


  const res = await fetch(`https://admin.rupp.support/api/v1/events/eve-committees/${userData.eve_committee_id}/project-shortlists/${projectId.value}`, {
    method: "GET",
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token?.value,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
