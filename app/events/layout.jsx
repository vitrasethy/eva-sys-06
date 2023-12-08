"use client";

import Navbar from "./NavBar";
import BackButton from "@/components/back/BackButton";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const isLogin = sessionStorage.getItem("login");
  const router = useRouter();

  if (isLogin === null) {
    router.push("/login");
  } else
    return (
      <div>
        <Navbar />
        <BackButton />
        <section>{children}</section>
      </div>
    );
}
