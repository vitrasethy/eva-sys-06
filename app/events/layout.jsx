import Navbar from "./NavBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  if (!cookies().has("login")) {
    redirect("/login");
  }

  return (
    <div>
      <Navbar />
      <section>{children}</section>
    </div>
  );
}
