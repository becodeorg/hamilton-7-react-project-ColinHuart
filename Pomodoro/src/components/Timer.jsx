import React, {Fragment, useState, useEffect, useRef} from "react";
import sound from "../assets/mixkit-gaming-lock-2848.wav";

import {MdRestartAlt} from "react-icons/md";
import {ImCancelCircle} from "react-icons/im";
import useInterval from "use-interval";

const Timer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [modal, setModal] = useState(false);
    const [start, setStart] = useState(false);
    const [progress, setProgress] = useState(0);
    const tick = useRef();
    const addMinutes = () => {
        if (!start) {
            setMinutes(minutes + 1);
        }
    };
    const reset = () => {
        if (!start) {
            setMinutes(25);
            setSeconds(0);
        }
    };

    const removeMinutes = () => {
        if (!start) {
            if (minutes > 0) {
                setMinutes(minutes - 1);
            }
        }
    };
    const workTime = () => {
        if (!start) {
            setMinutes(25);
            setSeconds(0);
        }
    };
    const breakTime = () => {
        if (!start) {
            setMinutes(5);
            setSeconds(0);
        }
    };

    const closePopup = () => {
        setModal(false);
    };
    const restart = () => {
        setModal(false);
        setMinutes(25);
        setStart(true);
        setProgress(minutes * 60 + seconds);
    };
    const toggleStart = () => {
        setStart(!start);
        setProgress(minutes * 60 + seconds);
    };

    // useInterval instead useEffect to run in Background (was just a copy paste, then adapt to the useInterval function)
    useInterval(() => {
        if (start) {
            //time ticking
            clearInterval(tick.current);
            if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            } else if (minutes == 0 && seconds == 1) {
                setSeconds(0);
                setStart(false);
                setModal(true);
                new Audio(sound).play();
            } else {
                setSeconds(seconds - 1);
            }
        }
    }, 1000);

    const pourcentage = 100 - ((minutes * 60 + seconds) / progress) * 100;
    console.log(pourcentage);
    const bgPourcentage = {
        background: `conic-gradient(rgb(103 232 249) ${pourcentage}%, transparent ${pourcentage}%)`,
    };
    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return (
        <Fragment>
            <div className="flex flex-wrap content-center justify-around ml-[150px] mr-[150px]">
                <div>
                    <section
                        className="h-[400px] w-[400px] rounded-full  mt-22 ml-auto mr-auto place-items-center shadow-shadowCircle p-[8px] transition-colors"
                        style={bgPourcentage}>
                        <div className="timer-container min-w-[110px] rounded-full border-4 border-slate-600 w-96 h-96 ml-auto mr-auto pt-[90px] bg-slate-800 place-self-center  ">
                            <section className="timer w-[300px] ml-auto mr-auto">
                                <div className="clock flex flex-row items-center justify-center text-7xl ">
                                    <p className="ml-auto mr-auto">
                                        {timerMinutes}:{timerSeconds}
                                    </p>
                                </div>
                            </section>
                            <div className="startDiv w-[250px] ml-auto mr-auto pt-6">
                                <button
                                    className="startBut  text-white bg-slate-700 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-full border border-slate-600 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 m-3"
                                    onClick={toggleStart}>
                                    {!start ? "START" : "STOP"}
                                </button>
                                <button
                                    onClick={reset}
                                    className="p-4 text-white bg-slate-700 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-full border border-slate-600 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 m-3">
                                    Reset
                                </button>
                                <button
                                    onClick={addMinutes}
                                    className="p-7 text-white bg-slate-700 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-full border border-slate-600 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 m-3">
                                    +
                                </button>
                                <button
                                    onClick={removeMinutes}
                                    className="text-white bg-slate-700 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-full border border-slate-600 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 m-3">
                                    -
                                </button>
                            </div>
                        </div>
                    </section>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-10 max-w-[350px] ml-auto mr-auto shadow-shadowCircle">
                        <div
                            className={`bg-cyan-300 h-2.5 rounded-full`}
                            style={{width: `${pourcentage}%`}}></div>
                    </div>
                </div>
                <section className="flex flex-row lg:flex-col justify-around pt-20 pb-20 ">
                    <button
                        onClick={workTime}
                        className="startBut  text-white h-[120px] w-[120px] shadow-shadowCircle bg-slate-800 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-full border border-cyan-300 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 m-3">
                        Work Time
                    </button>
                    <button
                        onClick={breakTime}
                        className="startBut  text-white h-[120px] w-[120px] shadow-shadowCircle bg-slate-800 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-full border border-cyan-300 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 m-3">
                        Break Time
                    </button>
                </section>
            </div>
            {modal && (
                <div className="absolute  h-full w-screen bg-slate-800 bg-opacity-60 top-[37%] lg:top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                    <div className="bg-slate-800 min-w-fit rounded-lg min-h-fit h-1/2 w-1/2 flex flex-col justify-between p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 border border-cyan-300 ">
                        <h2 className="mt-12">Bravo !!</h2>
                        <p>Une pause s'impose</p>
                        <div className="flex flex-row justify-between ">
                            <button
                                onClick={restart}
                                className="text-white bg-slate-700 hover:bg-slate-300  focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 m-3 ">
                                <MdRestartAlt size={28} />
                            </button>
                            <button
                                onClick={closePopup}
                                className="text-white bg-slate-700 hover:bg-slate-300  focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 m-3">
                                <ImCancelCircle size={28} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Timer;
