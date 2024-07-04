"use client";
import React, { useState } from "react";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import { StackedBarChartData } from "@/app/interface";
import labels from "../constants";
import styles from "./MonthlyCharts.module.scss";

interface MonthlyChartsProps {
  searchKeyword: string;
}

const MonthlyCharts = ({ searchKeyword }: MonthlyChartsProps) => {
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
          onHandleCommonData={handleCommonData}
        />
        <LineChart
          searchKeyword={searchKeyword}
          endpointKeyName={labels.MONTHLY_CONTRIBUTIONS}
        />
      </section>
      <section className={styles.monthlyChartsSection}>
        <BarChart
          searchKeyword={searchKeyword}
          endpointKeyName={labels.MONTHLY_DEVELOPERS}
          secondDataSet={commonData}
        />
      </section>
    </>
  );
};

export default MonthlyCharts;
