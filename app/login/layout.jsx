"use client";

// import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  // const isLogin = sessionStorage.getItem("login");
  // const router = useRouter();

    return (
      <div>
        <section>{children}</section>
      </div>
    );
}
