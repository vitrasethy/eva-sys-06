"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {setCookie} from "cookies-next";

export default function ButtonAll() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/role")
      .then((res) => res.json())
      .then((data) => setRole(data));
  }, []);

  const handleClick = () => {
    setIsLoading(true);
    setCookie("department_name", "all");
    if (role !== "admin") {
      setCookie("evaluate", true);
    } else {
      setCookie("evaluate", false);
    }
    router.push("/events/projects");
  };

  if (isLoading)
    return (
      <button className="btn btn-active btn-neutral disabled mt-4">
        <span className="loading loading-spinner"></span>
        loading
      </button>
    );
  else
    return (
      <button
        onClick={() => handleClick()}
        className="btn btn-active btn-neutral mt-4"
      >
        Show All Projects
      </button>
    );
}
