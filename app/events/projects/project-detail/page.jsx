"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import arrow from "/public/arrow.svg";
import Link from "next/link";

export default function ProjectTable({}) {
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  // const [filteredData, setFilteredData] = useState([]);
  // const [type, setType] = useState("Presentation");

  const [openDropdowns, setOpenDropdowns] = useState([]);

  // Modify the handleClick function
  const handleClick = (id) => {
    if (openDropdowns.includes(id)) {
      setOpenDropdowns(openDropdowns.filter((dropdownId) => dropdownId !== id));
    } else {
      setOpenDropdowns([...openDropdowns, id]);
    }
  };

  useEffect(() => {
    fetch("/api/detail")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((e) => console.log(e));
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((e) => console.log(e));
  }, []);

  function renderMember(index) {
    if (index === 0) {
      return "hidden";
    }
    return "";
  }

  return (
    <>
      <div className={"flex lg:block justify-center"}>
        <Link
          href={"/events/projects"}
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
      <div className=" flex flex-col justify-center items-center">
        <h1 className="text-center font-extrabold text-4xl md:text-5xl px-5 my-10">
          Projects Detail
        </h1>
        {data?.map((data, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-md md:px-10 px-2 py-2 md:py-10 text-lg border-2 w-[90%] sm:w-[70%] md:w-[60%] duration-500"
          >
            <div className="bg-gray-200 p-2 rounded-md">
              <div className="text-sm text-gray-500 uppercase">Project Name</div>
              <div>{data.eve_project_topic}</div>
            </div>
            <div className="bg-gray-200 p-2 rounded-md mt-2">
              <div className="text-sm text-gray-500 uppercase">Project ID</div>
              <div>{data.eve_project_code}</div>
            </div>
            <div className="bg-gray-200 p-2 rounded-md mt-2">
              <div className="text-sm text-gray-500 uppercase">
                Project Supervisor
              </div>
              <div>{data.eve_project_supervisor_name}</div>
            </div>
            <div className="bg-gray-200 p-2 rounded-md mt-2">
              <div className="text-sm text-gray-500 uppercase">
                Project Leader
              </div>
              <div>{data.eve_project_members[0].name_latin}</div>
            </div>
            <div className="bg-gray-200 p-2 rounded-md mt-2">
              {data.eve_project_members.map((members, index) => (
                <div key={members.id} className={renderMember(index)}>
                  <div className="text-sm text-gray-500 uppercase">
                    {index === 1 ? "Project Member" : ""}
                  </div>
                  <li className="ml-5">{members.name_latin}</li>
                </div>
              ))}
            </div>
            <div
              className={`bg-gray-200 p-2 rounded-md mt-2 ${
                user.is_admin ? "" : "hidden"
              }`}
            >
              <div className={`text-sm text-gray-500 uppercase ${user.is_admin ? "" : "hidden"}`}>Total Score</div>
              <div>{data.eve_project_total_score}</div>
            </div>

            <div className="bg-gray-200 p-2 rounded-md mt-2">
              {data.eve_project_committee.map((committee, index) => (
                <div
                  className={
                    !user.is_admin && user.eve_committee_id !== committee.id
                      ? "hidden"
                      : ""
                  }
                  key={committee.id}
                  onClick={
                    committee.project_score !== 0
                      ? () => handleClick(committee.id)
                      : null
                  }
                  style={
                    committee.project_score === 0 ? {pointerEvents: "none"} : {}
                  }
                >
                  <div className="text-sm text-gray-500 uppercase">
                    {index === 0 ? "Judge" : ""}
                  </div>

                  <div>
                    <div
                      className="border flex justify-between px-5 bg-gray-100 border-gray-300 w-auto my-1 rounded-md p-2 cursor-pointer hover:bg-gray-300 duration-300">
                      <div>{committee.name}</div>
                      <div className="flex">
                        <div className="sm:mx-3">
                          {/*{"Point : "}*/}
                          {/*{committee.project_score}*/}
                          {committee.project_score === 0
                            ? "Not Yet Evaluate"
                            : `Point : ${committee.project_score}`}
                        </div>
                        <Image
                          className={`${
                            openDropdowns.includes(committee.id)
                              ? "rotate-180"
                              : ""
                          } duration-300 mx-3`}
                          src={arrow}
                          alt="arrow"
                          width={15}
                          height={20}
                        />
                      </div>
                    </div>
                    <div>
                      {openDropdowns.includes(committee.id) && (
                        <div className="border border-gray-300 rounded-md px-3 md:px-10 md:py-5 bg-white">
                          <div>
                            <h1>
                              {committee.categories.map((categories) => (
                                <div key={categories.id}>
                                  {categories.criterias.map((criterias) => (
                                    <div
                                      key={criterias.id}
                                      className="my-5 border-2 border-gray-300 flex justify-between py-1 px-5 rounded-lg bg-gray-200 items-center"
                                    >
                                      <div>{criterias.name}</div>
                                      <div
                                        className={`ml-5 border border-black rounded-full bg-[#014194] text-white ${
                                          criterias.score < 10
                                            ? "px-3 py-1"
                                            : "px-2 py-1"
                                        }`}
                                      >
                                        {criterias.score}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ))}
                            </h1>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
