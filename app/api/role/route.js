import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://admin.rupp.support/api/v1/auth/protected", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies().get("jwt")?.value}`,
    },
  });
  const data = await res.json();

  let role = "";

  if (data.is_admin) {
    role = "admin"; // admin
  } else if (data.is_admin && data.hasOwnProperty("eve_committee_id")) {
    role = "admin-committee"; // event committee and admin
  } else role = "committee"; // event committee

  const newData = {
    role: role,
  };

  return NextResponse.json(newData);
}
