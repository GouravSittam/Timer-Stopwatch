import React, { useState, useEffect } from "react";
import "./Assignment.css";

const Timer = () => {
  const [workTime, setWorkTime] = useState(25 * 60);
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setTimeLeft(isWorkTime ? workTime : breakTime);
  }, [workTime, breakTime, isWorkTime]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            if (isWorkTime) {
              alert("Work time is complete! Time for a break.");
            } else {
              alert("Break time is complete! Time to get back to work.");
            }
            setIsWorkTime(!isWorkTime);
            return isWorkTime ? breakTime : workTime;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isWorkTime, breakTime, workTime]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${minutes}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsWorkTime(true);
    setTimeLeft(workTime);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleSetTimes = () => {
    const workInput = document.getElementById("workInput").value;
    const breakInput = document.getElementById("breakInput").value;
    if (!workInput || !breakInput) {
      alert("Please enter both work and break durations.");
      return;
    }
    setWorkTime(workInput * 60);
    setBreakTime(breakInput * 60);
    setTimeLeft(workInput * 60);
  };

  return (
    <div className="timer">
      <div>
        <h1>{isWorkTime ? "Work Time" : "Break Time"}</h1>
        <h2>{formatTime(timeLeft)}</h2>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleReset}>Reset</button>
        <br />
        <input id="workInput" type="number" placeholder="Enter Work duration (min)" />
        <input id="breakInput" type="number" placeholder="Enter Break duration (min)" />
        <button onClick={handleSetTimes}>Set</button>
      </div>
    </div>
  );
};

export default Timer;