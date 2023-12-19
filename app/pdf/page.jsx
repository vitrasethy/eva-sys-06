import { cookies } from "next/headers";
import Certificate from "@/app/pdf/certificate";

async function getData() {
  const res = await fetch(
    "https://admin.rupp.support/api/v1/events/eve-certificate",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + cookies().get("token")?.value,
      },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const dataY2 = await getData();
  const dataY1 = await getData();
  const newData = dataY1.poster_year1.ranks.map((rank) => ({
    rank: rank.rank,
    project: {
    project_code: rank.project.project_code,
    project_topic: rank.project.project_topic,
    project_members: rank.project.project_members,
    },
  }));
  return (
    <>
      <Certificate dataY2={dataY2}
      dataY1 = {newData} />
    </>
  );
}
