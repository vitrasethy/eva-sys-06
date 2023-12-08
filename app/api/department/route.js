import { cookies } from "next/headers";

export async function GET() {
    const res = await fetch("https://admin.rupp.support/api/v1/departments", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies().get("jwt")?.value}`,
      },
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
    }

    const data = await res.json();

    return Response.json(data);
}