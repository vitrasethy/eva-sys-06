import Navbar from "./NavBar";
import BackButton from "@/components/back/BackButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Layout({ children }) {
  if (!cookies().has("login")) {
    redirect("/login");
  }

  return (
    <div>
      <Navbar />
      <BackButton />
      <section>{children}</section>
    </div>
  );
}
