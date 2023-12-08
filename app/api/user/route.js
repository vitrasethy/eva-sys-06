import { cookies } from "next/headers";

export async function GET() {
  const res = await fetch("https://admin.rupp.support/api/v1/auth/protected", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("jwt")?.value}`,
    },
  });
  const data = await res.json();

  return Response.json(data);
}
