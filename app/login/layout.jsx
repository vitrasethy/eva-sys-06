import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  if (cookies().has("login")) {
    redirect("/events");
  }

  return (
    <div>
      <section>{children}</section>
    </div>
  );
}
