import ProjectList from "@/app/events/projects/ProjectList";
import { cookies } from "next/headers";
import filterData from "@/components/filterData";

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
      <ProjectList projects={allProjects} user={user} departments={departments}/>
    </>
  )

}
