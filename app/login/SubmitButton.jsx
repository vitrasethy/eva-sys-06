"use client"

import { useFormStatus } from 'react-dom'

export default function SubmitButton(){
  const { pending } = useFormStatus()
  return (
    <div className="card-actions">
      <button
        className={`${pending ? "" : "hidden"} btn w-full max-w-xs`}
      >
        <span className="loading loading-spinner"></span>
        loading
      </button>
      <button
        type={"submit"}
        className={`btn btn-neutral w-full max-w-xs ${pending ? "hidden" : ""}`}
      >
        Sign in
      </button>
    </div>
  )
}