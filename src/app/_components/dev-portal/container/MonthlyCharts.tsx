"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ChartData from "@/app/lib/apexCharts/chartConfig";
import env, { commonLabels } from "@/app/constants/common/labels";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";
import { Skeleton } from "../../shadecn/ui/skeleton";
import dynamic from "next/dynamic";
import styles from "./MonthlyCharts.module.scss";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface MonthlyChartsProps {
  searchKeyword: string;
}

const MonthlyCharts = ({ searchKeyword }: MonthlyChartsProps) => {
  const [activeChartData, setActiveChartData] = useSessionStorage("active-charts-monthly", commonLabels.emptyString);
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchMonthlyChartData();
    })();
  }, []);

  const fetchMonthlyChartData = async () => {
    try {
      if (!activeChartData || activeChartData?.length === 0) {
        const response = await axios.get(
          `${env.CLIENT_RESTFUL_API_END_POINT}/api/monthly-projects?keyword=${searchKeyword}`
        );
        const activeProjectConfig = ChartData.getChartConfig(response.data.data);
        console.log("response pro", response.data);

        const contributionRes = await axios.get(
          `${env.CLIENT_RESTFUL_API_END_POINT}/api/monthly-contributions?keyword=${searchKeyword}`
        );
        const activeContributionsConfig = ChartData.getChartConfig(contributionRes.data.data);
        console.log("response cri", contributionRes.data);

        const config = {
          activeProjects: activeProjectConfig,
          activeContributions: activeContributionsConfig,
        };

        console.log("config", config);

        setActiveChartData(config);
        setData(config);
      } else {
        setData(activeChartData);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error while fetching monthly chart data: ", error);
    }
  };

  return (
    <section className={styles.monthlyChartsSection}>
      {loading ? (
        <Skeleton className="h-[350px] w-[600px] rounded-xl" />
      ) : (
        <div className={styles.activeProjectChartWrapper}>
          {typeof window !== "undefined" && (
            <ReactApexChart
              options={data?.activeProjects?.options as any}
              series={data?.activeProjects?.series}
              type="line"
              width="100%"
              height="100%"
            />
          )}
        </div>
      )}

      {loading ? (
        <Skeleton className="h-[350px] w-[600px] rounded-xl" />
      ) : (
        <div className={styles.activeProjectChartWrapper}>
          {typeof window !== "undefined" && (
            <ReactApexChart
              options={data?.activeContributions?.options as any}
              series={data?.activeContributions?.series}
              type="line"
              width="100%"
              height="100%"
            />
          )}
        </div>
      )}
    </section>
  );
};

export default MonthlyCharts;
