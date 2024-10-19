"use server";

import {redirect} from "next/navigation";
import {cookies} from "next/headers";

export default async function action(prevState, formData) {
  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const res = await fetch("https://admin.rupp.support/api/v1/auth/login", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    return { message: "Incorrect Username or Password. Please try again." };
  }

  const resData = await res.json();
  cookies().set("token", resData.access_token, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });
  cookies().set("login", "true")

  redirect('/events')
}
