"use client";
import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressBarProps {
  percentage: number;
}

const CircularProgressBar = ({ percentage }: CircularProgressBarProps) => {
  return (
    <div className="w-[100px] h-[150px] flex">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
      />
    </div>
  );
};

export default CircularProgressBar;
