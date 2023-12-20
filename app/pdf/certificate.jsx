'use client'
import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "../pdf/fonts/fonts.css";

function Certificate({ dataY2, dataY1 }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [selectDept, setSelectDept] = useState("");
  const [selectYear, setSelectYear] = useState("");
  const [selectType, setSelectType] = useState("");
  const [newData, setNewData] = useState([]);
  const departments = ["Select", "ALL"];
  const onDeptChange = (e) => setSelectDept(e.target.value);
  const onYearChange = (e) => setSelectYear(e.target.value);
  const onTypeChange = (e) => setSelectType(e.target.value);
  

  String.prototype.toKhmerDigit = function () {
    var id = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
    return this.replace(/[0-9]/g, function (w) {
      return id[+w];
    });
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    const elements = document.querySelectorAll('.myDivClass');
    const canvases = await Promise.all(Array.from(elements).map(element => html2canvas(element, { scale: 4 })));

    const pdf = new jsPDF("l", "mm", "a4");

    canvases.forEach((canvas, index) => {
      const imgData = canvas.toDataURL('image/jpeg');
      const pdfWidth = 297;
      const pdfHeight = 210;
      // Add the image to the PDF
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      // Add a new page for the next image if it's not the last image
      if (index < canvases.length - 1) {
        pdf.addPage();
      }
    });

    pdf.save('download.pdf');
    setIsDownloading(false);
    setIsDownloaded(true);
  };

  useEffect(() => {
    if (isDownloaded) {
      setTimeout(() => setIsDownloaded(false), 2000);
    }
  }, [isDownloaded]);

  const filterData = (data, typeName, deptName, year) => {
    const type = data.poster_and_presentation_year2_up.find((item) => item.project_type_name === typeName);
    if (!type) return [];

    if (deptName === "ALL") {
      let allDepts = [];
      type.departments.forEach((dept) => {
        if (year === "Year234") {
          ["Year2", "Year3", "Year4"].forEach((year) => {
            const yearData = dept.years.find((item) => item.year === year);
            if (yearData) {
              allDepts = [...allDepts, ...yearData.ranks];
            }
          });
        } else {
          const yearData = dept.years.find((item) => item.year === year);
          if (yearData) {
            allDepts = [...allDepts, ...yearData.ranks];
          }
        }
      });
      return allDepts;
    } else {
      const dept = type.departments.find((item) => item.department_name === deptName);
      if (!dept) return [];

      let allYears = [];
      if (year === "Year234") {
        ["Year2", "Year3", "Year4"].forEach((year) => {
          const yearData = dept.years.find((item) => item.year === year);
          if (yearData) {
            allYears = [...allYears, ...yearData.ranks];
          }
        });
      } else {
        const yearData = dept.years.find((item) => item.year === year);
        if (yearData) {
          allYears = [...allYears, ...yearData.ranks];
        }
      }
      return allYears;
    }
  };
  useEffect(() => {
    if (selectDept === "ALL" && selectYear === "Year1" && selectType === "Poster")
      setNewData(dataY1);
    else {
      const filteredData = filterData(dataY2, selectType, selectDept, selectYear);
      setNewData(filteredData);
    }
  }, [dataY2, dataY2.poster_and_presentation_year2_up, selectDept, selectType, selectYear, dataY1]);

  // console.log(data)
  return (
    <div>

      <div>
        <select className="border-2 bg-transparent px-4 py-2 text-2xl" defaultValue="" onChange={onDeptChange}>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>{dept}</option>
          ))}
        </select>

        <select className="border-2 bg-transparent px-4 py-2 text-2xl" defaultValue="" onChange={onYearChange}>
          <option value="" disabled>Year</option>
          <option value="Year1">1</option>
          <option value="Year234">y2up</option>
        </select>
        <div className="flex gap-12 mt-8 text-2xl items-center" onChange={onTypeChange}>
          <input id="default-radio-1" type="radio" value="Presentation" name="default-radio" className="w-6 h-6" />&nbsp;Presentation
          <input id="default-radio-2" type="radio" value="Poster" name="default-radio" className="w-6 h-6" />&nbsp;Poster
        </div>
        {/* <div>{JSON.stringify(newData)}</div> */}
      </div>



      {newData.map((item, index) => (

        <div key={index}>
          {item.project.project_members.map((member, id) => (

              <div key={id}
                className="myDivClass w-[297mm] h-[210mm] bg-no-repeat"
              >
                <div className="flex flex-col justify-center items-center h-full">
                  <div className="pt-[5rem]">
                    <div className="grid grid-cols-2 gap-[122px]">
                      <div className="flex flex-col justify-center text-center items-center font-['Times New Roman'] gap-1 w-[391px] h-[300px]">
                        <p className="font-extrabold text-[17.5pt] pt-px font-['HelveticaNowMTTextRegular']">
                          6th ENGINEERING DAY
                        </p>
                        <p className="text-[14pt] font-['HelveticaNowMTTextRegular'] font-normal">
                          AWARDS 2023
                        </p>
                        <p className="text-[17.5pt] font-extrabold leading-7 font-['HelveticaNowMTTextRegular']">
                          CERTIFICATE OF APPRECIATION
                        </p>
                        <p className="text-[13pt] font-['serif']">
                          is hereby awarded to
                        </p>
                        <div className=" text-[17.5pt] font-extrabold font-['HelveticaNowMTTextRegular']">
                          {member.sys_gender.name_latin === 'Male' ? (
                            <p>Mr. {member.name_latin}</p>
                          ) : (
                            <p>Ms. {member.name_latin}</p>
                          )}
                        </div>
                        <div className="text-[13pt] text-center font-['serif']">
                          <p className="">in recognition for winning the</p>
                          <div className="">
                            {selectType === 'Poster' ? (<p>{item.rank} Award for top poster entitled</p>) : (<p>{item.rank} Award for top project entitled</p>)}
                          </div>
                          <div className="flex italic">
                            <p className=" w-full text-center">&quot;{item.project.project_topic}&quot;</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center gap-1 w-[391px] h-[300px]">
                        <p className="font-[KhmerMoulLight] text-[16pt] pt-1">
                          ទិវាវិស្វកម្មលើកទី៦
                        </p>
                        <p className="font-[KhmerBTB] text-[13pt]">
                          ជ័យលាភីឆ្នាំ ២០២៣
                        </p>
                        <p className="font-[KhmerMoulLight] text-[16pt]">
                          ប័ណ្ណសរសើរ
                        </p>
                        <p className="font-[KhmerBTB] text-[13pt]">ជូនចំពោះ</p>
                        <div className="font-[KhmerMoulLight] text-[18pt]">
                          {member.sys_gender.name_latin === 'Male' ? (
                            <p>លោក {member.name_khmer}</p>
                          ) : (
                            <p>កញ្ញា {member.name_khmer}</p>
                          )}
                        </div>
                        <div className="font-[KhmerOSSiemreap] text-[12pt] text-center">
                          <p className="">ដែលទទួលបានជ័យលាភី</p>
                          <div className="">
                            {selectType === 'Poster' ? (<p>Poster ឆ្នើមលេខ {item.rank.toString().toKhmerDigit()} ក្រោមប្រធាមបទ</p>) : (<p>គម្រោងឆ្នើមលេខ {item.rank.toString().toKhmerDigit()} ក្រោមប្រធាមបទ</p>)}
                          </div>
                          <span className="font-['serif'] text-[13pt] italic">
                            <p>&quot;{item.project.project_topic}&quot;</p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-center pb-12 mt-1">
                      <p className="font-[KhmerOSSiemreap] text-[11.54pt]">
                        រាជធានីភ្នំពេញ ថ្ងៃទី២១ ខែវិច្ឆិកា ឆ្នាំ២០២៣
                      </p>
                      <p className="font-['serif'] text-[13.02pt] mb-2">
                        Phnom Penh, 21 November 2023
                      </p>
                    </div>
                  </div>
                  <div className="text-start w-full px-[7.5rem] pt-[5rem] text-xs text-gray-400">
                  <div className="flex">
                  <p>{member.page_index}-</p>
                      <p>{item.project.project_code}-</p>
                      <p>{item.project.project_members.length}</p>
                  </div>
                  </div>
                </div>
              </div>
      ))}
        </div>
      ))}


      <div className="flex justify-end w-[297mm]">
        <button
          onClick={handleDownload}
          className="mt-4 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-30 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          {isDownloading
            ? "Downloading..."
            : isDownloaded
              ? "Download Complete!"
              : "Download PDF"}
        </button>
      </div>
    </div>
  );
}

export default Certificate;

