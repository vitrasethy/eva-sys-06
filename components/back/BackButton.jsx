"use client"

import {useRouter} from "next/navigation";

export default function BackButton() {
  const router = useRouter()

  return (
    <button onClick={() => router.back()} type="button"
            className="flex text-white my-4 ml-3 items-center justify-center lg:w-[10%] px-5 py-4 text-sm transition-colors duration-200 bg-[#014164] border rounded-lg gap-x-2">
      <svg className="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
           strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
      </svg>
      <span>Go back</span>
    </button>
  )
}