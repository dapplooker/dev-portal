"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import millify from "millify";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import utils from "@/app/utils/utils";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";
import { Skeleton } from "../../shadecn/ui/skeleton";
import { ChartConfigInterface } from "@/app/interface";
import { commonLabels, errorLabels } from "@/app/constants";
import env from "@/app/constants/common/labels";
import styles from "./LineChart.module.scss";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface BarChartProps {
  searchKeyword: string;
  endpointKeyName: string;
}

const BarChart = ({ searchKeyword, endpointKeyName }: BarChartProps) => {
  const [activeChartData, setActiveChartData] = useSessionStorage(endpointKeyName, commonLabels.emptyString);

  const [data, setData] = useState<any | {}>({});
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      await getProjectsData();
    })();
  }, []);

  const getProjectsData = async () => {
    try {
      //Fetch Projects
      if (!utils.validateNonEmptyObject(activeChartData)) {
        const response = await axios.get(
          `${env.CLIENT_RESTFUL_API_END_POINT}/api/${endpointKeyName}?keyword=${searchKeyword}`
        );

        const { chartTitle, xAxisValues, yAxisValues, xTitle, yTitle }: ChartConfigInterface = response.data.data;

        const barColor = "#4DD0E1";

        const chartData = {
          labels: [...xAxisValues],
          datasets: [
            {
              label: yTitle,
              data: [...yAxisValues], // Y-axis data points
              backgroundColor: barColor, // Fill color for the bars
              borderColor: barColor,
              borderWidth: 0,
            },
          ],
        };

        // Chart options
        const options = {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top", // Position the legend at the top
              align: "end", // Align legend to the right (end of the top)
              labels: {
                color: "#fff", // Legend text color
                font: {
                  weight: "bold", // Legend font weight
                },
              },
            },
            title: {
              display: true,
              text: chartTitle,
              align: "start", // Align title to the left
              color: "#fff", // Title color
              font: {
                size: 18, // Title font size
                weight: "bold", // Title font weight
              },
              padding: {
                left: 20, // Padding from the left side
                top: 10, // Padding from the top
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: xTitle,
                color: "#fff", // X-axis title color
                font: {
                  size: 14, // X-axis title font size
                  weight: "bold", // X-axis title font weight
                },
              },
              grid: {
                display: false, // Disable vertical grid lines
              },
              ticks: {
                color: "#fff", // X-axis labels color
                padding: 10, // Gap between x-axis values and grid lines
              },
            },
            y: {
              title: {
                display: true,
                text: yTitle,
                color: "#fff", // Y-axis title color
                font: {
                  size: 14, // Y-axis title font size
                  weight: "bold", // Y-axis title font weight
                },
              },
              grid: {
                color: "#333", // Horizontal grid lines color
                borderDash: [5], // Dashed horizontal grid lines
              },
              ticks: {
                color: "#fff", // Y-axis labels color
                padding: 10, // Gap between y-axis values and grid lines
                callback: (value: any) => millify(value), // Format Y-axis values using millify
              },
            },
          },
        };

        setData({ chartData, options });
        setActiveChartData({ chartData, options });
      } else {
        setData(activeChartData);
      }
    } catch (error) {
      setIsError(true);
      console.error("Error while fetching monthly projects data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <Skeleton className="h-[350px] w-full rounded-xl skeletonWrapper" />
  ) : (
    <div className={`${styles.activeProjectChartWrapper} ${styles.barChartWrapper}`}>
      {!utils.validateNonEmptyObject(data) || isError ? (
        <h1 className={styles.noDataFound}>{errorLabels.oopsNoDataFound}</h1>
      ) : (
        <Bar
          data={data?.chartData}
          options={data?.options as any}
        />
      )}
    </div>
  );
};

export default BarChart;
