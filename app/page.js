import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  if (cookies().has("login")) {
    redirect("/events");
  } else redirect("/login");

  return (
    <main>
      <p>Hello WORLD</p>
    </main>
  );
}
