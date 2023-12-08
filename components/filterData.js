import {cookies} from "next/headers";

export default async function filterData(projects) {
  const resUserData = await fetch(
    "https://admin.rupp.support/api/v1/auth/protected",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("jwt")?.value}`,
      },
    },
  );
  if (!resUserData.ok) {
    const error = await resUserData.json();
    throw new Error(error.message);
  }
  const userData = await resUserData.json();

  let allData = [];
  projects.forEach((project, i) => {
    let data;
    if (userData.is_admin) {
      let status;
      if (
        project.eve_project_committee.every(
          (item) => item.is_evaluated === true,
        )
      )
        status = 1;
      else if (
        project.eve_project_committee.every(
          (item) => item.is_evaluated === false,
        )
      )
        status = 0;
      else status = 2;
      data = {
        status: status,
        total_score: project.project_total_score.toFixed(2),
      };
    } else {
      let status;
      const committee = project.eve_project_committee.find(
        (item) => item.id === userData.eve_committee_id,
      );
      if (committee.is_evaluated) {
        status = 1;
      } else status = 0;

      data = {
        status: status,
        total_score: committee.project_score.toFixed(2),
      };
    }

    allData.push({
      ...data,
      no: i + 1,
      id: project.eve_project_code,
      is_committee: project.eve_project_committee.some((x) => x.id === userData.eve_committee_id),
      project_id: project.eve_shortlist_id,
      name: project.eve_project_topic,
      type: project.eve_project_type,
      department: project.eve_project_department,
      year: project.eve_project_year,
      supervisor: project.eve_project_supervisor_name,
      leader: project.eve_project_members[0],
    });
  });

  return allData
}