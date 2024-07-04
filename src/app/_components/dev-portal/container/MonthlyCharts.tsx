"use client";
import React from "react";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import labels from "../constants";
import styles from "./MonthlyCharts.module.scss";

interface MonthlyChartsProps {
  searchKeyword: string;
}

const MonthlyCharts = ({ searchKeyword }: MonthlyChartsProps) => {
  return (
    <>
      <section className={styles.monthlyChartsSection}>
        <LineChart
          searchKeyword={searchKeyword}
          endpointKeyName={labels.MONTHLY_PROJECT}
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
        />
      </section>
    </>
  );
};

export default MonthlyCharts;
