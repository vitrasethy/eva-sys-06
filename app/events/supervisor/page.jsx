import Table from "@/app/events/supervisor/Table";
import { cookies } from "next/headers";
import Link from "next/link";

const getData = async () => {
  const res = await fetch(
    "https://admin.rupp.support/api/v1/event/1/best-supervisor",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
    },
  );

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
  const sorted = getTopScoringSupervisors(data).sort(
    (a, b) => b.supervisor.total_score - a.supervisor.total_score,
  );
  return (
    <>
      <Link href={'/events'}
              className="flex text-white my-4 ml-3 items-center justify-center lg:w-[10%] px-5 py-4 text-sm transition-colors duration-200 bg-[#014164] border rounded-lg gap-x-2">
        <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
             strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
        </svg>
        <span>Go back</span>
      </Link>
      <Table data={sorted}/>
    </>
  );
};

export default Page;
