"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import utils from "@/app/utils/utils";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";
import ChartData from "@/app/lib/apexCharts/chartConfig";
import { Skeleton } from "../../shadecn/ui/skeleton";
import { ChartConfigInterface, StackedBarChartData } from "@/app/interface";
import { commonLabels, errorLabels } from "@/app/constants";
import env from "@/app/constants/common/labels";
import styles from "./LineChart.module.scss";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface BarChartProps {
  searchKeyword: string;
  endpointKeyName: string;
  secondDataSet?: StackedBarChartData;
}

const BarChart = ({ searchKeyword, endpointKeyName, secondDataSet }: BarChartProps) => {
  const [activeChartData, setActiveChartData] = useSessionStorage(endpointKeyName, commonLabels.emptyString);

  const [data, setData] = useState<any | {}>({});
  const [captureRes, setCaptureRes] = useState<any | {}>({});
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
        setCaptureRes(response.data.data);
      } else {
        setData(activeChartData);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setIsError(true);
      console.error("Error while fetching monthly projects data: ", error);
    }
  };

  useEffect(() => {
    if (utils.validateNonEmptyObject(activeChartData)) {
      return;
    }

    if (
      utils.validateNonEmptyObject(secondDataSet!) &&
      (utils.validateNonEmptyObject(captureRes) || utils.validateNonEmptyObject(activeChartData))
    ) {
      let dataSet2Config: ChartConfigInterface = {
        chartTitle: secondDataSet?.yAxisTitle!,
        yTitle: secondDataSet?.yAxisTitle!,
        xTitle: secondDataSet?.yAxisTitle!,
        yAxisValues: secondDataSet?.yAxisValues!,
        xAxisValues: secondDataSet?.yAxisValues!,
      };

      const { chartData, options } = ChartData.getStackedBarChartData(captureRes, dataSet2Config);

      setData({ chartData, options });
      setActiveChartData({ chartData, options });
      setLoading(false);
    }
  }, [captureRes, secondDataSet]);

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
