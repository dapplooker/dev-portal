import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./MonthlyCharts.module.scss";
import axios from "axios";
import ChartData from "@/app/lib/apexCharts/chartConfig";
import LoadingSpinner from "../../ui/components/Loading/LoadingSpinner";
import env from "@/app/constants/common/labels";

const MonthlyCharts = () => {
  const [activeProjects, setActiveProjects] = useState<any | null>(null);
  const [activeContributions, setActiveContributions] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchMonthlyChartData();
    })();
  }, []);

  const fetchMonthlyChartData = async () => {
    try {
      const response = await axios.get(`${env.CLIENT_RESTFUL_API_END_POINT}/api/monthly-projects`);
      const activeProjectConfig = ChartData.getChartConfig(response.data.data);
      setActiveProjects(activeProjectConfig);

      const contributionRes = await axios.get(`${env.CLIENT_RESTFUL_API_END_POINT}/api/monthly-contributions`);
      const activeContributionsConfig = ChartData.getChartConfig(contributionRes.data.data);
      setActiveContributions(activeContributionsConfig);

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
            options={activeProjects?.options as any}
            series={activeProjects?.series}
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
            options={activeContributions?.options as any}
            series={activeContributions?.series}
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
