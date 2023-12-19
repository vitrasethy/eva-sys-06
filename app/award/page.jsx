import { cookies } from "next/headers";
import Award from "@/app/award/award";

async function getData() {
  const res = await fetch(
    "https://admin.rupp.support/api/v1/awards/posters/year1/all",
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

async function getDataAll() {
  const res = await fetch("https://admin.rupp.support/api/v1/awards/year2-up", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + cookies().get("token")?.value,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const year1PosterData = await getData();
  const fromYear2Data = await getDataAll();

  const newData = year1PosterData.poster.years[0].ranks.map(item => ({
    rank: item.rank,
    department: item.department, // Replace this with actual total_score if available
    projects: {
      project_code: item.project.code,
      project_topic: item.project.topic,
    },
  }));

  return (
    <>
      <Award
        year1PosterData={newData}
        fromYear2Data={fromYear2Data}
      />
    </>
  );
}
