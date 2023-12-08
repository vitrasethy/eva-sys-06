import { cookies } from "next/headers";
import filterData from "@/components/filterData";

export async function GET(request, { params }) {
    const resProjects = await fetch(`https://admin.rupp.support/api/v1/events/departments/${params.id}/eve-projects`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("jwt")?.value}`,
      },
    });

    if (!resProjects.ok) {
        const error = await resProjects.json();
        throw new Error(error.message);
    }

  const projects = await resProjects.json();

  const allData = await filterData(projects)

  return Response.json(allData);
}