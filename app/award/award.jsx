"use client";
import "../award/page.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Award({ year1PosterData, fromYear2Data }) {
    const [show, setShow] = useState({
        winner1: false,
        winner2: false,
        winner3: false,
        allWinner: false,
    });
    const [numParticles, setNumParticles] = useState(30);
    const [selectDept, setSelectDept] = useState("");
    const [selectYear, setSelectYear] = useState("");
    const [selectType, setSelectType] = useState("");
    const [newData, setNewData] = useState([]);

    const onDeptChange = (e) => setSelectDept(e.target.value);
    const onYearChange = (e) => setSelectYear(e.target.value);
    const onTypeChange = (e) => setSelectType(e.target.value);

    const getRankSuffix = (rank) => {
        switch (rank) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "";
        }
    };

    const getMedalImage = (rank) => {
        switch (rank) {
            case 1:
                return "/gold.png";
            case 2:
                return "/silver.png";
            case 3:
                return "/bronze.png";
            default:
                return "";
        }
    };

    const getGradientColor = (index) => {
        switch (index) {
            case 1:
                return "from-[#cc9910] to-[#fcf97c]";
            case 2:
                return "from-[#C0C0C0] to-[#e9e9eb]";
            case 3:
                return "from-[#ca6533] to-[#F0C9BA]";
            default:
                return "";
        }
    };

    const filterData = (data, typeName, deptName, year) => {
        const type = data.project_types.find((item) => item.project_type_name === typeName);
        if (!type) return [];

        const dept = type.departments.find((item) => item.department_name === deptName);
        if (!dept) return [];

        const yearData = dept.years.find((item) => item.year === year);
        if (!yearData) return [];

        return yearData.ranks;
    };

    useEffect(() => {
        if (selectDept === "ALL" && selectYear === "Year1" && selectType === "Poster")
            setNewData(year1PosterData);
        else {
            const filteredData = filterData(fromYear2Data, selectType, selectDept, selectYear);
            setNewData(filteredData);
        }
    }, [fromYear2Data, fromYear2Data.project_types, selectDept, selectType, selectYear, year1PosterData]);

    const particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push(<div className="particle" key={i}></div>);
    }

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        const interval = setInterval(() => {
            const change = Math.floor(Math.random() * 3) - 1;
            setNumParticles((prev) => Math.max(0, prev + change));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        function handleKeyDown(event) {
            setShow({ winner1: false, winner2: false, winner3: false });

            // Set visibility based on key pressed
            if (event.key === "1") {
                setShow((prevState) => ({ ...prevState, winner1: true }));
            } else if (event.key === "2") {
                setShow((prevState) => ({ ...prevState, winner2: true }));
            } else if (event.key === "3") {
                setShow((prevState) => ({ ...prevState, winner3: true }));
            } else if (event.key === "4") {
                setShow((prevState) => ({ ...prevState, allWinner: true }));
            }
            if (event.key === "w") {
                window.scroll({
                    top: window.innerHeight * 2 - window.scrollY,
                    behavior: "smooth",
                });
            }
            if (event.key === "s") {
                window.scroll({
                    top: innerHeight * 2,
                    left: 0,
                    behavior: "smooth",
                });
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);
    document.body.style.overflow = "hidden";
    return (
        <>
            <main>
                <div className="bg-[#070707]">
                    <section className="first-screen h-screen">
                        <div id="particle-container">{particles}</div>

                        <div className="text-center h-full flex flex-col justify-center items-center">
                            <h1 className="text-8xl tracking-tight font-extrabold font-['Georgia'] uppercase bg-gradient-to-r from-[#3b7cc1] to-[#9ae2ff] inline-block text-transparent bg-clip-text drop-shadow-[7px_5px_rgba(205,245,253,0.2)]">
                                Engineering&apos;s Day
                            </h1>
                            <p className="max-w-4xl mx-auto text-4xl mt-8 text-white leading-snug">
                                Award of Engineering&apos;s Day 2023
                            </p>
                            <p className="max-w-4xl mx-auto text-4xl mt-8 text-white">
                                Congratulation to the winners...
                            </p>
                            <div className="flex gap-8 mt-8">
                                <select className="border-2 bg-transparent text-white px-4 py-2 text-xl" defaultValue="" onChange={onDeptChange}>
                                    <option value="" disabled>ALL</option>
                                    <option value="ALL">FE</option>
                                    <option value="Information Technology Engineering">ITE</option>
                                    <option value="Bio Engineering">BIO</option>
                                    <option value="Telecommunication and Electric Engineering">TEED</option>
                                    <option value="Supply Chain and Automation Engineering">ASCSE</option>
                                    <option value="Environmental Engineering">EE</option>
                                </select>

                                <select className="border-2 bg-transparent text-white px-4 py-2 text-xl" defaultValue="" onChange={onYearChange}>
                                    <option value="" disabled>Year</option>
                                    <option value="Year1">1</option>
                                    <option value="Year2">2</option>
                                    <option value="Year3">3</option>
                                    <option value="Year4">4</option>
                                </select>
                            </div>
                            <div className="flex gap-12 text-white mt-8 text-xl items-center" onChange={onTypeChange}>
                                <input id="default-radio-1" type="radio" value="Presentation" name="default-radio" className="w-5 h-5" />&nbsp;Presentation
                                <input id="default-radio-2" type="radio" value="Poster" name="default-radio" className="w-5 h-5" />&nbsp;Poster
                            </div>

                        </div>
                    </section>

                    <div className="h-screen">
                        <div id="particle-container">{particles}</div>
                    </div>



                    <section className="second-screen h-screen">
                        <div className="pyro">
                            <div className="before"></div>
                            <div className="after"></div>
                        </div>
                        <div className=" h-full flex flex-col justify-center items-center">
                            <div className="text-white flex justify-center items-center gap-16 mb-8">
                                <div className="flex items-center gap-4 w-auto">
                                    <div>
                                        <Image
                                            src="/RUPP logo.png"
                                            alt=""
                                            width={125}
                                            height={50}
                                            className=" object-cover bg-no-repeat"
                                        />
                                    </div>
                                    <div className="flex border-2 border-white">
                                        <Image
                                            src="/FE Logo v1.jpg"
                                            alt=""
                                            width={105}
                                            height={40}
                                            className="sm:w-[90px] sm:h-[120px] object-cover bg-no-repeat"
                                        />
                                        <Image
                                            src="/EDay6th.png"
                                            alt=""
                                            width={338}
                                            height={40}
                                            className="sm:w-[300px] sm:h-[120px] object-contain bg-no-repeat border-white border-2"
                                        />
                                    </div>
                                </div>
                                <h1 className="text-5xl font-semibold">Engineering&apos;s Day 2023</h1>
                            </div>
                            <div className="bg-[url('/reward3.jpeg')] bg-no-repeat bg-cover border-2 border-gray-500">

                                <div className="flex flex-col justify-center h-full rounded-md bg-sky-950/30 backdrop-brightness-[.6] w-full px-14 py-8">
                                    <div>
                                        <div className="text-white text-center">
                                            <h3 className="text-5xl font-medium">Leader Board</h3>
                                            <h2 className="my-2 text-3xl">Department: {selectDept}</h2>
                                            <h2 className="text-3xl">Year: {selectYear.slice(4)}</h2>
                                        </div>
                                        <div className="my-5 flex gap-4 w-fit text-white text-center text-xl">
                                            <div>
                                                <p>Diamond sponsor</p>
                                                <div className="mt-2 bg-white w-[180px] flex justify-center">
                                                    <Image
                                                        src="/intech@2x.png"
                                                        alt=""
                                                        width={180}
                                                        height={40}
                                                        className="sm:w-[150px] sm:h-[100px] object-cover bg-no-repeat"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <p>Platinum sponsor</p>
                                                <div className="mt-2 bg-white w-[180px] flex justify-center">
                                                    <Image
                                                        src="/beniten.png"
                                                        alt=""
                                                        width={150}
                                                        height={50}
                                                        className="sm:w-[150px] sm:h-[100px] object-cover bg-no-repeat bg-white"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <p>Silver sponsor</p>
                                                <div className="mt-2 bg-white flex gap-4 w-[500px]">
                                                    <Image
                                                        src="/DKSH.png"
                                                        alt=""
                                                        width={150}
                                                        height={50}
                                                        className="sm:w-[150px] sm:h-[100px] object-cover bg-no-repeat"
                                                    />
                                                    <Image
                                                        src="/Dynamic.png"
                                                        alt=""
                                                        width={150}
                                                        height={50}
                                                        className="sm:w-[150px] sm:h-[100px] object-cover bg-no-repeat"
                                                    />
                                                    <Image
                                                        src="/stellent.png"
                                                        alt=""
                                                        width={150}
                                                        height={50}
                                                        className="sm:w-[150px] sm:h-[100px] object-cover bg-no-repeat"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <p>Bronze sponsor</p>
                                                <div className="mt-2 bg-white gap-6 flex w-[610px] h-[100px] justify-center items-center">
                                                    <Image
                                                        src="/cp.png"
                                                        alt=""
                                                        width={150}
                                                        height={50}
                                                        className="sm:w-[100px] sm:h-[90px] object-cover bg-no-repeat"
                                                    />
                                                    <Image
                                                        src="/koica.png"
                                                        alt=""
                                                        width={150}
                                                        height={50}
                                                        className="sm:w-[110px] sm:h-[90px] object-cover bg-no-repeat"
                                                    />
                                                    <Image
                                                        src="/rs.png"
                                                        alt=""
                                                        width={150}
                                                        height={50}
                                                        className="sm:w-[110px] sm:h-[90px] object-cover bg-no-repeat"
                                                    />
                                                    <Image
                                                        src="/x lap.png"
                                                        alt=""
                                                        width={150}
                                                        height={50}
                                                        className="sm:w-[110px] sm:h-[90px] object-cover bg-no-repeat"
                                                    />
                                                    <Image
                                                        src="/sp.png"
                                                        alt=""
                                                        width={150}
                                                        height={50}
                                                        className="sm:w-[110px] sm:h-[90px] object-cover bg-no-repeat"
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {newData.map((item, index) => (
                                        <div key={index}>
                                            {index < 3 && show[`winner${index + 1}`] && (
                                                <div id={`winner${index + 1}`}>
                                                    <div className="relative flex justify-center items-center">
                                                        <div className={`bg-gradient-to-r ${getGradientColor(index + 1)} shadow-lg border-1 py-10 px-[2rem] w-[95rem] rounded-xl`}>
                                                            <p className="text-[2rem] text-center">{item.rank}{getRankSuffix(index + 1)} Winner</p>
                                                            <div className="flex my-4 justify-between items-center">
                                                                <h2 className="text-2xl">Department: {selectDept == "ALL" ? item.department : selectDept}</h2>
                                                                <h2 className="text-2xl">Year: {selectYear.slice(4)}</h2>
                                                            </div>
                                                            <div className="text-3xl text-center w-full uppercase flex flex-col justify-center gap-4">
                                                                <p>Project Name: {item.projects.project_topic}</p>
                                                                <p>Project ID: {item.projects.project_code}</p>
                                                            </div>
                                                        </div>
                                                        <Image
                                                            src={getMedalImage(index + 1)}
                                                            alt=""
                                                            width={70}
                                                            height={80}
                                                            className="absolute top-[-14px] left-[-25px] rotate-12"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {show.allWinner && (
                                        <div id="allWinner">
                                            {newData.slice(0, 3).map((item, index) => (
                                                <div key={index} className={`relative mt-${index === 0 ? '0' : '4'}`}>
                                                    <div className={`flex bg-gradient-to-r ${getGradientColor(index + 1)} shadow-lg border-1 py-4 px-[4rem] rounded-xl h-[7.5rem]`}>
                                                        <div className="flex gap-8 text-2xl items-center w-full">
                                                            <p>{item.rank}{getRankSuffix(index + 1)}</p>
                                                            <p className={`w-[74rem] leading-snug`}>{item.projects.project_topic}</p>
                                                            <p className="">{item.projects.project_code}</p>
                                                        </div>
                                                    </div>
                                                    <Image
                                                        src={getMedalImage(index + 1)}
                                                        alt=""
                                                        width={60}
                                                        height={70}
                                                        className="absolute top-[-10px] left-[-25px] rotate-12"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <p className="text-center text-xl mt-8 text-white">Royal University of Phnom Penh || Faculty of Engineering</p>
                                </div>

                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </>

    );
}
