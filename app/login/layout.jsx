"use client";

import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const isLogin = sessionStorage.getItem("login");
  const router = useRouter();

  if (isLogin !== null) {
    router.push("/event");
  } else
    return (
      <div>
        <section>{children}</section>
      </div>
    );
}
