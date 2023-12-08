import NoData from "@/app/events/projects/NoData";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function DataTable({ dynamicProjects }) {
  const router = useRouter();

  const handleClick = (projectId) => {
    setCookie("project_id", projectId);
    return router.push("/events/projects/project-detail");
  };

  const handleClickEva = (projectId) => {
    setCookie("project_id", projectId);
    return router.push("/events/projects/edit-evaluate");
  };

  if (dynamicProjects.length !== 0)
    return (
      <div>
        <div>
          <table className="hidden lg:block lg:pr-4 table-auto rounded-lg border-2 bg-white mt-10 border-gray-400 shadow-2xl mb-20">
            <thead className="">
              <tr>
                <th className="p-5 text-start">No</th>
                <th className="p-5 text-start" key="Id">
                  ID
                </th>
                <th className="p-5 text-start">Project Name</th>
                <th className="p-5 text-start">Type</th>
                <th className="p-5 text-start">Leader</th>
                <th
                  className="p-5 text-start cursor-pointer flex justify-center"
                  key="score"
                >
                  Score
                </th>
                <th className="p-5 text-start" key="action">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {dynamicProjects.map((row, id) => (
                <tr key={row.no} className={`table-row rounded-xl`}>
                  <td className="px-5 py-4  ">{id + 1}</td>
                  <td className="px-5 py-4  ">{row.id}</td>
                  <td className="px-5 py-4  ">{row.name}</td>
                  <td className="px-5 py-4  ">{row.type}</td>
                  <td className="px-5 py-4  ">
                    {row.leader && row.leader.name_latin ? (
                      row.leader.name_latin
                    ) : (
                      <span style={{ color: "red" }}>
                        Leader or leader.name_latin is undefined!
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4  ">{row.total_score}</td>
                  <td className="px-5 py-4">
                    <p
                      className={`p-1 border-2 rounded-lg w-fit ${
                        row.status === 1
                          ? "bg-green-200 border-2 border-green-600"
                          : ""
                      }
                    ${
                      row.status === 0
                        ? "bg-red-200 border-2 border-red-600"
                        : ""
                    }
                    ${
                      row.status === 2
                        ? "bg-yellow-200 border-2 border-yellow-600"
                        : ""
                    }`}
                    >
                      {row.status === 1 ? "Completed" : ""}
                      {row.status === 0 ? "Not Yet Evaluate" : ""}
                      {row.status === 2 ? "Partially Evaluated" : ""}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleClick(row.project_id)}
                      className="btn btn-outline btn-info"
                    >
                      Detail
                    </button>
                  </td>
                  <td className={"px-5 py-4"}>
                    <button
                      onClick={() => handleClickEva(row.project_id)}
                      className={`btn btn-outline btn-info ${
                        row.is_committee ? "" : "hidden"
                      } ${
                        row.is_committee && row.status === 1 ? "hidden" : ""
                      }`}
                    >
                      Evaluate
                    </button>
                    <button
                      onClick={() => handleClickEva(row.project_id)}
                      className={`btn btn-outline btn-info ${
                        row.is_committee && row.status === 1 ? "" : "hidden"
                      }`}
                    >
                      Edit Evaluate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={"flex flex-col items-center space-y-4 w-full"}>
          {dynamicProjects.map((e, i) => (
            <div key={i} className="card bg-base-100 shadow-xl lg:hidden px-2">
              <div className="static card-body w-[90vw]">
                <div
                  className={`absolute gap-2 rounded badge ${
                    e.status === 0 ? "badge-error" : ""
                  } ${e.status === 2 ? "badge-warning" : ""} ${
                    e.status === 1 ? "badge-success" : ""
                  } top-1 right-3`}
                >
                  {e.status === 1 ? "Completed" : ""}
                  {e.status === 0 ? "Not Yet Evaluate" : ""}
                  {e.status === 2 ? "Partially Evaluated" : ""}
                </div>
                <h2 className="card-title">{e.name}</h2>
                <p>ID: {e.id}</p>
                <p>
                  Leader:{" "}
                  {e.leader && e.leader.name_latin ? (
                    e.leader.name_latin
                  ) : (
                    <span style={{ color: "red" }}>
                      Leader or leader.name_latin is undefined!
                    </span>
                  )}
                </p>
                <div className="flex justify-between">
                  <div className="justify-end card-actions">
                    <button
                      onClick={() => handleClick(e.project_id)}
                      className="btn btn-outline btn-info"
                    >
                      Detail
                    </button>
                  </div>
                  <div className="justify-end card-actions">
                    <button
                      onClick={() => handleClickEva(e.project_id)}
                      className={`btn btn-outline btn-info ${
                        e.is_committee ? "" : "hidden"
                      } ${
                        e.is_committee && e.status === 1 ? "hidden" : ""
                      }`}
                    >
                      Evaluate
                    </button>
                    <button
                      onClick={() => handleClickEva(e.project_id)}
                      className={`btn btn-outline btn-info ${
                        e.is_committee && e.status === 1 ? "" : "hidden"
                      }`}
                    >
                      Edit Evaluate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  else return <NoData/>;
}
