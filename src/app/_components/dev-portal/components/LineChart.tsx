"use client";
import { errorLabels } from "@/app/constants";
import { ChartConfigInterface, StackedBarChartData } from "@/app/interface";
import ChartData from "@/app/lib/apexCharts/chartConfig";
import utils from "@/app/utils/utils";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Skeleton } from "../../shadecn/ui/skeleton";
import subtitlePlugin from '@/app/lib/apexCharts/chartSubtitle'; 
import devPortalConstant from "../constants";
import styles from "./LineChart.module.scss";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, subtitlePlugin);

interface LineChartProps {
  searchKeyword: string;
  endpointKeyName: string;
  onHandleCommonData?: (data: StackedBarChartData) => void;
  apiData: ChartConfigInterface;
}

const LineChart = ({ searchKeyword, endpointKeyName, onHandleCommonData, apiData }: LineChartProps) => {
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
      if (!utils.validateNonEmptyObject(apiData)) {
        setData({});
        return;
      }

      const { yAxisValues, yTitle }: ChartConfigInterface = apiData;

      const isMonthlyProjectsChart = endpointKeyName === devPortalConstant.MONTHLY_PROJECT;

      const strokeColor = isMonthlyProjectsChart
        ? devPortalConstant.COLOR_PROJECTS
        : devPortalConstant.COLOR_CONTRIBUTIONS;

      handleProjectData(yTitle, yAxisValues, strokeColor);

      const { chartData, options } = ChartData.getChartConfig({ ...apiData, strokeColor: strokeColor });

      setData({ chartData, options });
    } catch (error) {
      setIsError(true);
      console.error("Error while fetching monthly projects data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectData = (yTitle: string, yValues: any[], color: string) => {
    //This will not working util onHandleCommonData is true
    if (endpointKeyName === devPortalConstant.MONTHLY_PROJECT && onHandleCommonData) {
      onHandleCommonData({
        yAxisTitle: yTitle || "Title",
        yAxisValues: yValues || [],
        color: color,
      });
    }
  };

  return loading ? (
    <Skeleton className="h-[350px] w-[600px] rounded-xl skeletonWrapper" />
  ) : (
    <div className={styles.activeProjectChartWrapper}>
      {!utils.validateNonEmptyObject(data) || isError ? (
        <h1 className={styles.noDataFound}>{errorLabels.oopsNoDataFound}</h1>
      ) : (
        <Line
          data={data?.chartData}
          options={data?.options as any}
        />
      )}
    </div>
  );
};

export default LineChart;
