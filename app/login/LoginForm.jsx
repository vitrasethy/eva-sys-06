"use client";

import action from "@/app/login/action";
import { useFormStatus, useFormState } from "react-dom";
import SubmitButton from "@/app/login/SubmitButton";

const initialState = {
  message: null,
};

export default function LoginForm() {
  const { pending } = useFormStatus();
  const [state, formAction] = useFormState(action, initialState);

  return (
    <form className={"flex justify-center"} action={formAction}>
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
              name={"username"}
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
              name={"password"}
              placeholder="Enter your password"
              className="input input-bordered w-full max-w-xs"
            />
            <div className={"label justify-end"}>
              <span className="label-text-alt text-error">
                {state?.message}
              </span>
            </div>
          </label>
          <SubmitButton/>
        </div>
      </div>
    </form>
  );
}
