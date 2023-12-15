"use client";

import { useEffect, useState } from "react";
import DataTable from "@/app/events/projects/DataTable";
import { getCookie } from "cookies-next";
import 'react-toastify/dist/ReactToastify.css';

export default function ProjectList({ projects, departments, user }) {
  const cookieChecked = getCookie("evaluate") === "true";
  const departmentName = getCookie("department_name");
  const [selectDept, setSelectDept] = useState(departmentName);
  const [selectYear, setSelectYear] = useState("all");
  const [selectType, setSelectType] = useState("all");
  const [checked, setChecked] = useState(cookieChecked);
  const [dynamicProjects, setDynamicProjects] = useState([1]);
  const [sort, setSort] = useState(true);

  const onDeptChange = (e) => setSelectDept(e.target.value);
  const onYearChange = (e) => setSelectYear(e.target.value);
  const onTypeChange = (e) => setSelectType(e.target.value);

  const onCheckChange = () => setChecked(!checked);

  const handleSort = () => {
    const sortingComparator = (a, b) =>
      sort ? b.total_score - a.total_score : a.total_score - b.total_score;
    setDynamicProjects([...dynamicProjects].sort(sortingComparator));
    setSort(!sort);
  };

  useEffect(() => {
    const filterCondition = (e) =>
      (selectDept === "all" || e.department === selectDept) &&
      (selectYear === "all" || e.year === selectYear) &&
      (selectType === "all" || e.type === selectType);

    const committeeFilter = (e) => (checked ? e.is_committee : true);

    const filteredProjects = projects.filter(
      (e) => filterCondition(e) && committeeFilter(e),
    );
    setDynamicProjects(filteredProjects);
  }, [checked, projects, selectDept, selectType, selectYear]);

  return (
    <div className="flex flex-col items-center">
      <p className="mt-5 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Engineering Day
      </p>
      <h1 className="mt-5 mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
        List of Projects
      </h1>

      {/* select department, year, project type, and only my projects */}
      <div className="flex flex-wrap justify-center mb-4 lg:flex-nowrap lg:mb-0 lg:space-x-4">
        <label className="form-control w-[40%] max-w-xs mr-4 lg:mr-0">
          <div className="label">
            <span className="label-text">Select Department</span>
          </div>
          <select
            value={selectDept}
            onChange={onDeptChange}
            className="select bg-[#014164] text-white select-bordered"
          >
            <option value={"all"}>All</option>
            {departments.map((dept) => (
              <option value={dept.name_latin} key={dept.id}>
                {dept.name_latin}
              </option>
            ))}
          </select>
        </label>
        <label className="form-control w-[40%] max-w-xs">
          <div className="label">
            <span className="label-text">Select Year</span>
          </div>
          <select
            onChange={onYearChange}
            className="select bg-[#014164] text-white select-bordered"
          >
            <option value={"all"} defaultValue={"all"}>
              All
            </option>
            <option value={"Year1"}>Year 1</option>
            <option value={"Year2"}>Year 2</option>
            <option value={"Year3"}>Year 3</option>
            <option value={"Year4"}>Year 4</option>
          </select>
        </label>
        <label className="form-control w-[40%] max-w-xs mr-4">
          <div className="label">
            <span className="label-text">Select Project Type</span>
          </div>
          <select
            onChange={onTypeChange}
            className="select bg-[#014164] text-white select-bordered"
          >
            <option value={"all"} defaultValue={"all"}>
              All
            </option>
            <option value={"Presentation"}>Presentation</option>
            <option value={"Poster"}>Poster</option>
          </select>
        </label>
        <div className="form-control w-[40%] justify-end">
          <label className="cursor-pointer label space-x-2">
            <input
              onChange={onCheckChange}
              type="checkbox"
              checked={checked}
              className="checkbox"
            />
            <span className="label-text">Show Only My Projects</span>
          </label>
        </div>
      </div>

      <DataTable
        dynamicProjects={dynamicProjects}
        user={user}
        handleSort={handleSort}
      />
    </div>
  );
}
