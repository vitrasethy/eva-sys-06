import React from "react";
import EvaluateForm from "./EvaluateForm";
import getEvaluateData from "@/app/events/projects/evaluate/getEvaluateData";

export default async function Page() {
  const data = await getEvaluateData()

  return (
    <main className="md:mx-[3%] my-[5%]">
      <div className="h-auto flex justify-center">
        <div className="w-screen xl:w-[70%] p-6 bg-white border-2 border-gray-300 rounded-lg shadow sm:p-6 md:p-16">
          <EvaluateForm data={data} />
        </div>
      </div>
    </main>
  );
}
