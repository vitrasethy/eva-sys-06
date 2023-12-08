import { cookies } from "next/headers";

async function getDepartments() {
  const res = await fetch("https://admin.rupp.support/api/v1/departments", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies().get("jwt")?.value,
    },
  });

  return res.json();
}

async function getAllProjects() {
  const res = await fetch(
    "https://admin.rupp.support/api/v1/events/eve-projects",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies().get("jwt")?.value,
      },
    }
  );

  return res.json();
}

async function getUserData() {
  const res = await fetch("https://admin.rupp.support/api/v1/auth/protected", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookies().get("jwt")?.value,
    },
  });

  return res.json();
}

export default async function getProjectsByDepartment() {
  const departmentsData = getDepartments();
  const projectsData = getAllProjects();
  const userData = getUserData();

  const [departments, projects, user] = await Promise.all([
    departmentsData,
    projectsData,
    userData,
  ]);

  if (!user.is_admin) {
    const subDesc = "projects you can evaluate."
    const filteredProjects = projects.filter((project) =>
      project.eve_project_committee.some(
        (member) => member.id === user.eve_committee_id
      )
    );

    let countProjects = [];
    departments.forEach((department) => {
      const count = filteredProjects.filter(
        (project) => project.eve_project_department === department.name_latin
      ).length;
      countProjects.push({ ...department, count, subDesc });
    });

    return countProjects;
  } else {
    const subDesc = "projects"
    let countProjects = [];
    departments.forEach((department) => {
      const count = projects.filter(
        (project) => project.eve_project_department === department.name_latin
      ).length;
      countProjects.push({ ...department, count, subDesc });
    });

    return countProjects;
  }
}