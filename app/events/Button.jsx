"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {setCookie} from "cookies-next";

export default function Button({ departmentId }) {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch("/api/role")
      .then((res) => res.json())
      .then((data) => setRole(data));
  }, []);

  const handleClick = (departmentId) => {
    setIsLoading(true)
    setCookie("department_name", departmentId);
    if (role !== "admin") {
      setCookie("evaluate", true);
    } else {
      setCookie("evaluate", false);
    }
    router.push("/events/projects");
  };

  if (isLoading)
    return (
      <button className="btn btn-sm btn-outline btn-info disabled mt-4">
        <span className="loading loading-spinner"></span>
        loading
      </button>
    );
  else
    return (
      <button
        onClick={() => handleClick(departmentId)}
        className="btn btn-sm btn-outline btn-info mt-4"
      >
        Show Projects
      </button>
    );
}
