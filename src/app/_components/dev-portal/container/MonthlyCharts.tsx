"use client";
import React from "react";
import labels from "../constants";
import styles from "./MonthlyCharts.module.scss";
import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("../components/LineChart"), { ssr: false });

interface MonthlyChartsProps {
  searchKeyword: string;
}

const MonthlyCharts = ({ searchKeyword }: MonthlyChartsProps) => {
  return (
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
  );
};

export default MonthlyCharts;
