import Table from "@/app/events/supervisor/Table";
import {cookies} from "next/headers";

const getData = async () => {
  const res = await fetch(
    "https://admin.rupp.support/api/v1/event/1/best-supervisor", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
    });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

const getTopScoringSupervisors = (data) => {
  const topScoringSupervisors = [];

  data.forEach((department) => {
    let topScore = 0;
    let topScoringSupervisor = null;

    department.supervisors.forEach((supervisor) => {
      if (supervisor.total_score > topScore) {
        topScore = supervisor.total_score;
        topScoringSupervisor = supervisor;
      }
    });

    topScoringSupervisors.push({
      department: department.department_name,
      supervisor: topScoringSupervisor,
    });
  });

  return topScoringSupervisors;
};

const Page = async () => {
  const data = await getData();
  const sorted = getTopScoringSupervisors(data).sort((a, b) => b.supervisor.total_score - a.supervisor.total_score);
  return <Table data={sorted} />;
};

export default Page;
