import getProjectsByDepartment from "./filterData";
import Button from "@/app/events/Button";
import ButtonAll from "@/app/events/ButtonAll";

export default async function Page() {
  const projectsByDepartment = await getProjectsByDepartment();

  return (
    <div className="flex flex-col items-center">
      <section className="flex justify-center items-center mt-10 mb-10">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
            List of all the events <br /> and their details
          </h1>
        </div>
      </section>
      <div className="card w-[90%] bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Engineering Day 2023</h2>
          <div className="flex flex-col items-center">
            {/* each event card */}
            <div className="stats stats-vertical bg-base-200 w-full lg:stats-horizontal shadow">
              {projectsByDepartment.map((item, id) => (
                <div
                  key={id}
                  className="stat flex flex-col justify-between items-baseline">
                  <div className="stat-title whitespace-normal  overflow-hidden">
                    {item.name_latin}
                  </div>
                  <div>
                    <div className="stat-value">{item.count}</div>
                    <div className="stat-desc">{item.subDesc}</div>
                    <Button departmentId={item.name_latin}/>
                  </div>
                </div>
              ))}
            </div>
            <ButtonAll/>
          </div>
        </div>
      </div>
    </div>
  );
}
