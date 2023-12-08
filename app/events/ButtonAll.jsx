"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
    sessionStorage.setItem("department_name", "all");
    if (role !== "admin") {
      sessionStorage.setItem("evaluate", "true");
    } else {
      sessionStorage.setItem("evaluate", "false");
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
