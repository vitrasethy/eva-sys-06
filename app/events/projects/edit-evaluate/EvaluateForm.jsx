import Image from "next/image";
import React from "react";
import getEvaluateData from "./getEvaluateData";
import {action} from "./action";
import SubmitButton from "./SubmitButton";
import getScore from "./getScore";

function isOneDigit({ sco }) {
  return sco < 10;
}

export default async function EvaluateForm() {
  const data = await getEvaluateData()
  const points = await getScore()

  const combinedCriterias = [];

  points.committees.forEach(committee => {
    committee.projects.forEach(project => {
      project.categories.forEach(category => {
        combinedCriterias.push(...category.criterias.map(criteria => ({
          category_id: category.id,
          category_name: category.name,
          criteria_id: criteria.id,
          criteria_name: criteria.name,
          score: criteria.score,
          rubric: criteria.rubric
        })));
      });
    });
  });

  const isCheck = (id, score) => {
    const result = combinedCriterias.find(item => item.criteria_id === id);
    return result.score === score;
  }

  const allCriteria = data.category.flatMap((category) => category.criteria);

  const actionWithProp = action.bind(null, allCriteria);

  return (
    <form className="space-y-6" action={actionWithProp}>
      <div className="flex flex-wrap justify-around">
        <div className="sm:w-[45%] my-4">
          <Image alt="" src="/bgcol.png" width={400} height={400} />
        </div>
        <div className="sm:w-[50%] mx-[1%]">
          <h2 className="my-4 text-3xl lg:text-4xl 2xl:text-[2.75rem] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#024164] to-[#025886] drop-shadow-[3px_1px_rgba(2,65,100,0.3)] ">
            EVALUATION&nbsp;FORM
          </h2>
          <div>
            <p className="text-lg font-medium">
              Project Code: <span className="font-normal text-base">{data.project_code}</span>
            </p>
            <p className="text-lg font-medium">
              Project Name: {data.project_topic}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-around max-md:flex-wrap items-center bg-[#f7f9f9] border-2 border-gray-300 my-10 sm:p-4 md:px-6">
        <div className="md:w-1/2">
          <h2 className="text-2xl sm:text-3xl p-2.5 font-bold text-gray-900">
            JUDGING CRITERIA
          </h2>
        </div>
        <div className="md:w-1/2 w-full block">
          <p className="text-2xl font-semibold max-md:text-center md:p-2.5">
            Evaluation
          </p>
          <div className="flex justify-around gap-2 text-sm sm:text-md text-white text-center p-2.5">
            <p className="bg-[#014164] py-2 flex flex-col w-[25%] rounded-sm">
              Superior <span>10-9</span>
            </p>
            <p className="bg-[#014164] py-2 flex flex-col w-[25%] rounded-sm">
              Excellent <span>8-7</span>
            </p>
            <p className="bg-[#014164] py-2 flex flex-col w-[25%] rounded-sm">
              Good <span>6-5</span>
            </p>
            <p className="bg-[#014164] py-2 flex flex-col w-[25%] rounded-sm">
              Fair <span>4-3</span>
            </p>
          </div>
        </div>
      </div>
      {data.category.map((cat) => (
        <div key={cat.id}>
          <div className="flex justify-around items-center border-2 border-sky-700 py-4 px-6 bg-[#014164] text-white rounded-md">
            <h4 className="text-lg font-bold w-1/2 p-2.5">{cat.name}</h4>
            <h4 className="text-lg font-bold text-center w-1/2">
              {cat.weight * 100}&nbsp;%
            </h4>
          </div>
          {cat.criteria.map((cri) => (
            <div
              key={cri.id}
              className="md:flex md:justify-around my-10 p-4 sm:px-6 rounded-lg bg-[#f7f9f9] border-2 border-gray-300 "
            >
              <div className="md:w-1/2">
                <h2 className="text-gray-900 text-lg rounded-lg peer-checked:ring-blue-500 peer-checked:border-blue-500 block w-full p-2.5">
                  {cri.name}
                </h2>
              </div>
              <ul className="flex items-center gap-1 md:gap-2 justify-center mt-4 md:mt-0 mb-4 md:mb-0">
                {cri.score.map((sco) => (
                  <li key={sco}>
                    <input
                      defaultChecked={isCheck(cri.id, sco)}
                      type="radio"
                      id={sco.toString() + cri.name}
                      name={cri.name}
                      value={sco}
                      className="hidden peer"
                      required
                    />
                    <label
                      htmlFor={sco.toString() + cri.name}
                      className={`${
                        isOneDigit({ sco })
                          ? "sm:px-4 sm:py-3 px-2.5 py-1.5"
                          : "sm:p-3 p-1.5"
                      } text-gray-900 bg-white peer-checked:bg-[#014164] peer-checked:text-white border border-gray-500 rounded-full cursor-pointer `}
                    >
                      {sco}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
      <label className="flex max-md:flex-wrap justify-around items-center border-2 p-4 bg-[#f7f9f9] border-gray-300 rounded-lg ">
        <div className="md:w-2/5 p-2.5 md:text-lg">
          <p>COMMENTS:</p>
        </div>
        <div className="md:w-1/2">
          <textarea
            name="comment"
            rows={4}
            cols={60}
            className="border-2 border-gray-400 p-4 w-full"
            placeholder="write your comments..."
          />
        </div>
      </label>
      <div className="flex justify-around items-center border-2 border-sky-700 py-4 px-6 bg-[#014164] text-white rounded-md">
        <h4 className="text-lg font-bold w-1/2 p-2.5">PAST TOTAL SCORE</h4>
        <h4 className="text-lg font-bold text-center w-1/2">
          {points.committees[0].projects[0].total_score} Points
        </h4>
      </div>
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}