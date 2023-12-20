import ProjectList from "@/app/events/projects/ProjectList";
import { cookies } from "next/headers";
import filterData from "@/components/filterData";
import Link from "next/link";

async function getAllProject() {
  const resProjects = await fetch(
    `https://admin.rupp.support/api/v1/events/eve-projects`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
    },
  );

  if (!resProjects.ok) {
    const error = await resProjects.json();
    throw new Error(error.message);
  }

  const projects = await resProjects.json();

  return filterData(projects);
}

async function getDepartments() {
  const resProjects = await fetch(
    "https://admin.rupp.support/api/v1/departments",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
    },
  );

  if (!resProjects.ok) {
    const error = await resProjects.json();
    throw new Error(error.message);
  }

  return resProjects.json();
}

async function getUser() {
  const resProjects = await fetch(
    "https://admin.rupp.support/api/v1/auth/protected",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
    },
  );

  if (!resProjects.ok) {
    const error = await resProjects.json();
    throw new Error(error.message);
  }

  return resProjects.json();
}

export default async function Page() {
  const allProjectsData = getAllProject();
  const departmentsData = getDepartments();
  const userData = getUser();

  const [allProjects, departments, user] = await Promise.all([
    allProjectsData,
    departmentsData,
    userData,
  ]);

  return (
    <>
      <div className={"flex lg:block justify-center"}>
        <Link
          href={"/events"}
          className="flex w-full text-white my-4 mx-3 lg:ml-3 items-center justify-center lg:w-[10%] px-5 py-4 text-sm transition-colors duration-200 bg-[#014164] border rounded-lg gap-x-2"
        >
          <svg
            className="w-5 h-5 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          <span>Go back</span>
        </Link>
      </div>
      <ProjectList
        projects={allProjects}
        user={user}
        departments={departments}
      />
    </>
  );
}
