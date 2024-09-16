"use client";
import { errorLabels } from "@/app/constants";
import { ChartConfigInterface, StackedBarChartData } from "@/app/interface";
import ChartData from "@/app/lib/apexCharts/chartConfig";
import subtitlePlugin from "@/app/lib/apexCharts/chartSubtitle";
import utils from "@/app/utils/utils";
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Skeleton } from "../../shadecn/ui/skeleton";
import styles from "./LineChart.module.scss";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend, subtitlePlugin);

interface BarChartProps {
  searchKeyword: string;
  endpointKeyName: string;
  secondDataSet?: StackedBarChartData;
  apiData: ChartConfigInterface;
}

const BarChart = ({ searchKeyword, endpointKeyName, secondDataSet, apiData }: BarChartProps) => {
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
      if (!utils.validateNonEmptyObject(apiData)) {
        setData({});
        return;
      }
      setCaptureRes(apiData);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setIsError(true);
      console.error("Error while fetching monthly projects data: ", error);
    }
  };

  useEffect(() => {
    if (utils.validateNonEmptyObject(secondDataSet!) && utils.validateNonEmptyObject(captureRes)) {
      let dataSet2Config: ChartConfigInterface = {
        chartTitle: secondDataSet?.yAxisTitle!,
        yTitle: secondDataSet?.yAxisTitle!,
        xTitle: secondDataSet?.yAxisTitle!,
        yAxisValues: secondDataSet?.yAxisValues!,
        xAxisValues: secondDataSet?.yAxisValues!,
        subtitle: ""
      };

      const { chartData, options } = ChartData.getStackedBarChartData(captureRes, dataSet2Config);

      setData({ chartData, options });

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
