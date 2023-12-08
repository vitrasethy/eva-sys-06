"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false)
  const router = useRouter();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      username,
      password,
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch("/api/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          sessionStorage.setItem("login", "true");
          router.push("/events");
        } else {
          setLoading(false);
          setError(true)
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  return (
    <div className="card w-[80%] md:w-auto bg-base-100 shadow-xl">
      <div className="card-body text-black">
        <h2 className="card-title">SIGN IN</h2>

        {/* username input */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Username</span>
          </div>
          <input
            type="text"
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            className="input input-bordered w-full max-w-xs"
          />
        </label>

        {/* password input */}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            className="input input-bordered w-full max-w-xs"
          />
          <div className={`${error ? "" : "invisible"} label justify-end`}>
            <span className="label-text-alt text-error">
              Incorrect Username or Password. Please try again.
            </span>
          </div>
        </label>
        <div className="card-actions">
          <button className={`${loading ? "" : "hidden"} btn w-full max-w-xs`}>
            <span className="loading loading-spinner"></span>
            loading
          </button>
          <button
            className={`${loading ? "hidden" : ""} btn btn-neutral w-full max-w-xs`}
            onClick={handleSubmit}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
