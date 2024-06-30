"use client";
import { RadialBarChartsConfigInterface } from "@/app/interface";
import ChartData from "@/app/lib/apexCharts/chartConfig";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface CircularProgressBarProps {
  percentage: number;
}

const CircularProgressBar = ({ percentage }: CircularProgressBarProps) => {
  const radialBarConfig = ChartData.getRadialBarChart(percentage);

  return (
    <ReactApexChart
      options={radialBarConfig?.options as any}
      series={radialBarConfig?.series}
      type="radialBar"
      width="140px"
      height="140px"
    />
  );
};

export default CircularProgressBar;
