import { cookies } from "next/headers";

const fetchUserData = async () => {
  const resUserData = await fetch(
    "https://admin.rupp.support/api/v1/auth/protected",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("token")?.value}`,
      },
    },
  );

  if (!resUserData.ok) {
    const error = await resUserData.json();
    throw new Error(error.message);
  }

  return await resUserData.json();
};

const evaluateStatus = (committee) => {
  if (committee.every((item) => item.is_evaluated === true)) {
    return 1;
  } else if (committee.every((item) => item.is_evaluated === false)) {
    return 0;
  } else {
    return 2;
  }
};

const evaluateData = (userData, project) => {
  let data = {};

  if (userData.is_admin) {
    let isEva = false;

    if (userData.hasOwnProperty("eve_committee_id")) {
      const temp = project.eve_project_committee.find(
        (e) => e.id === userData.eve_committee_id
      );

      if (temp !== undefined) {
        isEva = temp.is_evaluated;
      }
    }

    const status = evaluateStatus(project.eve_project_committee);

    data = {
      status: status,
      is_evaluated: isEva,
      total_score: project.project_total_score.toFixed(2),
    };
  } else {
    const committee = project.eve_project_committee.find(
      (item) => item.id === userData.eve_committee_id
    );

    if (committee !== undefined) {
      if (committee.is_evaluated) {
        data = {
          is_evaluated: committee.is_evaluated,
          status: 1,
          total_score: committee.project_score.toFixed(2),
        };
      } else {
        data = {
          is_evaluated: committee.is_evaluated,
          status: 0,
          total_score: committee.project_score.toFixed(2),
        };
      }
    }
  }

  return data;
};

const filterData = async (projects) => {
  const userData = await fetchUserData();

  return projects.map((project) => {
    const data = evaluateData(userData, project);

    return {
      ...data,
      id: project.eve_project_code,
      is_committee: project.eve_project_committee.some(
        (x) => x.id === userData.eve_committee_id
      ),
      project_id: project.eve_shortlist_id,
      name: project.eve_project_topic,
      type: project.eve_project_type,
      department: project.eve_project_department,
      year: project.eve_project_year,
      supervisor: project.eve_project_supervisor_name,
      leader: project.eve_project_members[0],
    };
  });
};

export default filterData;
