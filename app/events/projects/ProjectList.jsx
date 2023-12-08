"use client";

import { useEffect, useState } from "react";
// import useSWR, { preload } from "swr";
import DataTable from "@/app/events/projects/DataTable";
import {getCookie} from "cookies-next";

// const fetcher = (url) => fetch(url).then((res) => res.json());

// preload("/api/user", fetcher);
// preload("/api/department", fetcher);
// preload("/api/allProjects", fetcher);

export default function ProjectList({projects, departments, user}) {

  const departmentName = getCookie("department_name");
  const checkCheck = getCookie("evaluate");
  console.log(checkCheck)
  // const [user, setUser] = useState({});
  // const [departments, setDepartments] = useState([]);
  const [selectDept, setSelectDept] = useState(departmentName);
  const [selectYear, setSelectYear] = useState("all");
  const [selectType, setSelectType] = useState("all");
  const [checked, setChecked] = useState(checkCheck);
  // const [projects, setProjects] = useState([]);
  const [dynamicProjects, setDynamicProjects] = useState([1]);
  // const [isTableLoading, setIsTableLoading] = useState(false)

  const onDeptChange = (e) => {
    setSelectDept(e.target.value);
  };
  const onYearChange = (e) => {
    setSelectYear(e.target.value);
  };
  const onTypeChange = (e) => {
    setSelectType(e.target.value);
  };

  const onCheckChange = () => {
    setChecked(!checked);
  };

  // useSWR("/api/department", fetcher, {
  //   onSuccess: (data) => setDepartments(data),
  // });
  // useSWR("/api/user", fetcher, {
  //   onSuccess: (data) => setUser(data),
  // });
  // const { isLoading } = useSWR("/api/allProjects", fetcher, {
  //   onSuccess: (data) => setProjects(data),
  // });

  useEffect(() => {
    if (checked) {
      setDynamicProjects(
        projects.filter(
          (e) =>
            (selectDept === "all" || e.department === selectDept) &&
            (selectYear === "all" || e.year === selectYear) &&
            (selectType === "all" || e.type === selectType) &&
            e.is_committee,
        ),
      );
    } else {
      setDynamicProjects(
        projects.filter(
          (e) =>
            (selectDept === "all" || e.department === selectDept) &&
            (selectYear === "all" || e.year === selectYear) &&
            (selectType === "all" || e.type === selectType),
        ),
      );
    }
  }, [projects, selectDept, selectYear, selectType, user, checked]);

  // if (isLoading)
  //   return (
  //     <div className={"flex justify-center"}>
  //       <span className="mt-20 loading loading-spinner loading-lg"></span>
  //     </div>
  //   );
  // else
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
            <label className="cursor-pointer label">
              <span className="label-text">Only My Projects</span>
              <input
                onChange={onCheckChange}
                type="checkbox"
                defaultChecked={
                  !!(
                    (user.is_admin &&
                      user.hasOwnProperty("eve_committee_id")) ||
                    user.hasOwnProperty("eve_committee_id")
                  )
                }
                className="checkbox"
              />
            </label>
          </div>
        </div>


          <DataTable dynamicProjects={dynamicProjects} />


        {/* mobile view */}
        {/*<div className="card w-[90%] bg-base-100 shadow-xl lg:hidden">*/}
        {/*  <div className="static card-body">*/}
        {/*    <div className="absolute gap-2 rounded badge badge-success top-1 right-3">*/}
        {/*      Completed*/}
        {/*    </div>*/}
        {/*    <h2 className="card-title">Car Detection</h2>*/}
        {/*    <p>ID: ITE01</p>*/}
        {/*    <p>Leader: Bruno Fernandez</p>*/}
        {/*    <div className="flex justify-between">*/}
        {/*      <div className="justify-end card-actions">*/}
        {/*        <button className="btn btn-primary">Buy Now</button>*/}
        {/*      </div>*/}
        {/*      <div className="justify-end card-actions">*/}
        {/*        <button className="btn btn-primary">Buy Now</button>*/}
        {/*      </div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    );
}
