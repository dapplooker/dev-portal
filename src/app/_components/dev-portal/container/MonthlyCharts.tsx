"use client";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./MonthlyCharts.module.scss";
import axios from "axios";
import ChartData from "@/app/lib/apexCharts/chartConfig";
import LoadingSpinner from "../../ui/components/Loading/LoadingSpinner";
import env, { commonLabels } from "@/app/constants/common/labels";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";

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

        const contributionRes = await axios.get(
          `${env.CLIENT_RESTFUL_API_END_POINT}/api/monthly-contributions?keyword=${searchKeyword}`
        );
        const activeContributionsConfig = ChartData.getChartConfig(contributionRes.data.data);

        const config = {
          activeProjects: activeProjectConfig,
          activeContributions: activeContributionsConfig,
        };

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
      <div className={styles.activeProjectChartWrapper}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ReactApexChart
            options={data?.activeProjects?.options as any}
            series={data?.activeProjects?.series}
            type="line"
            width="100%"
            height="100%"
          />
        )}
      </div>
      <div className={styles.activeProjectChartWrapper}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <ReactApexChart
            options={data?.activeContributions?.options as any}
            series={data?.activeContributions?.series}
            type="line"
            width="100%"
            height="100%"
          />
        )}
      </div>
    </section>
  );
};

export default MonthlyCharts;
