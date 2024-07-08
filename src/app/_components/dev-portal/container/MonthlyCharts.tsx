"use client";
import React, { useState } from "react";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import { ChartConfigInterface, StackedBarChartData } from "@/app/interface";
import labels from "../constants";
import devPortalConstant from "../constants";
import styles from "./MonthlyCharts.module.scss";

interface MonthlyChartsProps {
  searchKeyword: string;
  topProjects: ChartConfigInterface | any;
  topContributions: ChartConfigInterface | any;
  topDevelopers: ChartConfigInterface | any;
}

const MonthlyCharts = ({ searchKeyword, topProjects, topContributions, topDevelopers }: MonthlyChartsProps) => {
  const [commonData, setCommonData] = useState<any | StackedBarChartData>({});

  const handleCommonData = (config: StackedBarChartData) => {
    setCommonData(config);
  };

  return (
    <>
      <section className={styles.monthlyChartsSection}>
        <LineChart
          searchKeyword={searchKeyword}
          endpointKeyName={labels.MONTHLY_PROJECT}
          apiData={topProjects}
        />
        <LineChart
          searchKeyword={searchKeyword}
          endpointKeyName={labels.MONTHLY_CONTRIBUTIONS}
          // onHandleCommonData={handleCommonData}
          apiData={topContributions}
        />
      </section>
      <section className={styles.monthlyChartsSection}>
        <BarChart
          searchKeyword={searchKeyword}
          endpointKeyName={labels.MONTHLY_DEVELOPERS}
          secondDataSet={{
            yAxisTitle: topProjects?.yTitle,
            yAxisValues: topProjects?.yAxisValues,
            color: devPortalConstant.COLOR_PROJECTS,
          }}
          apiData={topDevelopers}
        />
      </section>
    </>
  );
};

export default MonthlyCharts;
