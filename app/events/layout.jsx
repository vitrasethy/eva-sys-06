"use client";

import Navbar from "./NavBar";
import BackButton from "@/components/back/BackButton";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <BackButton />
      <section>{children}</section>
    </div>
  );
}
