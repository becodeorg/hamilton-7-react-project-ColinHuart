import React, {Fragment, useState, useEffect, useRef} from "react";
// TRY COPY PASTE ALL

const Timer = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(4);
    const [modal, setModal] = useState(false);
    const [start, setStart] = useState(false);
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
            setMinutes(minutes - 1);
        }
    };

    //const firstStart = useRef(true);

    const closePopup = () => {
        setModal(false);
    };
    const restart = () => {
        setModal(false);
        setMinutes(25);
        setStart(true);
    };
    const toggleStart = () => {
        setStart(!start);
    };
    useEffect(() => {
        // if (firstStart.current) {

        //     firstStart.current = !firstStart.current;
        //     return;
        // }

        if (start) {
            tick.current = setInterval(() => {
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
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } // else {
        //     console.log("clear");
        //     clearInterval(tick.current);
        // }
        return () => clearInterval(tick.current);
    }, [seconds, start]);

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <Fragment>
            <section className="timer-container">
                <section className="timer">
                    <div className="clock flex flex-row items-center justify-center text-7xl">
                        <p>
                            {timerMinutes}:{timerSeconds}
                        </p>
                    </div>
                </section>
                <div className="startDiv">
                    <button className="startBut" onClick={toggleStart}>
                        {!start ? "START" : "STOP"}
                    </button>
                    <button onClick={addMinutes} className="p-7">
                        +
                    </button>
                    <button onClick={removeMinutes}>-</button>
                    <button onClick={reset} className="p-4">
                        Reset
                    </button>
                </div>
            </section>

            {modal && (
                <div className="absolute  h-screen w-screen bg-gray-700 bg-opacity-60 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-slate-600 min-w-fit rounded-lg min-h-fit h-1/2 w-1/2 flex flex-col justify-between p-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100">
                        <h2 className="mt-12">Bravo !!</h2>
                        <p>Une pause s'impose</p>
                        <div className="flex flex-row justify-between ">
                            <button
                                onClick={restart}
                                className="text-white bg-slate-600 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 m-3 ">
                                Restart
                            </button>
                            <button
                                onClick={closePopup}
                                className="text-white bg-slate-600 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600 m-3">
                                X
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default Timer;
