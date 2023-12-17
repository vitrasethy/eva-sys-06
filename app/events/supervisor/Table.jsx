"use client";

const Table = ({ data }) => {
  console.log(data);
  return (
    <div>
      <main>
        <h1 className="font-extrabold text-4xl md:text-5xl text-gray-700 text-center mt-5">
          Best Supervisor
        </h1>
        <div className=" justify-center hidden md:flex">
          <table className=" border-2 rounded-md shadow-2xl  border-gray-300 mt-5">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">No</th>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border  border-gray-300 px-4 py-2">
                  Department
                </th>
                <th className="border  border-gray-300 px-4 py-2">Gold</th>
                <th className="border  border-gray-300 px-4 py-2">Silver</th>
                <th className="border  border-gray-300 px-4 py-2">Bronze</th>
                <th
                  className=" border-gray-300 px-4 py-2 cursor-pointer flex"
                  // onClick={sortData}
                >
                  Score
                  {/*<Image className="m-1" src={Sort} width={18} height={18} />*/}
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.supervisor.name_latin}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.department}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.supervisor.total_gold}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.supervisor.total_silver}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.supervisor.total_bronze}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {row.supervisor.total_score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col items-center justify-center md:hidden mt-5">
          {/*<button*/}
          {/*  onClick={sortData}*/}
          {/*  className="p-2 rounded-md bg-gray-400 text-white border"*/}
          {/*>*/}
          {/*  Sort Score*/}
          {/*</button>*/}
          <div className="">
            {data.map((row, index) => (
              <div
                key={index}
                className="sm:w-[70vw] w-[90vw] border shadow-md rounded-md mt-5"
              >
                <div className="flex">
                  <div className=" px-4 py-4 ">
                    {/* <p className="text-gray-400">No :</p> */}
                    <p
                      className={`font-bold border py-0.5 bg-[#014164] text-white rounded-full ${
                        index === 0 ? "px-[10px]" : "px-[9px]"
                      }`}
                    >
                      {index + 1}
                    </p>
                  </div>

                  <div className="w-[50%] px-4 py-2">
                    <p className="text-gray-400">Name :</p>
                    <p className="font-bold">{row.supervisor.name_latin}</p>
                  </div>
                  <div className="w-[50%] px-4 py-2">
                    <p className="text-gray-400">Department :</p>
                    <p className="font-bold">{row.department}</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className=" px-4 py-2">
                    <p className="text-gray-400">Gold :</p>
                    <p className="font-bold">{row.supervisor.total_gold}</p>
                  </div>
                  <div className=" px-4 py-2">
                    <p className="text-gray-400">Silver :</p>
                    <p className="font-bold">{row.supervisor.total_silver}</p>
                  </div>
                  <div className=" px-4 py-2">
                    <p className="text-gray-400">Bronze :</p>
                    <p className="font-bold">{row.supervisor.total_bronze}</p>
                  </div>
                  <div className=" px-4 py-2">
                    <p className="text-gray-400">Score :</p>
                    <p className="font-bold">{row.supervisor.total_score}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Table;
