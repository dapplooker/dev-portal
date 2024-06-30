import React from "react";
import styles from "./GeneralStats.module.scss";
import StatsCard from "../components/StatsCard";
import { FormattedGeneralStatsResponse } from "@/app/interface";

interface GeneralStatsProps {
  data: FormattedGeneralStatsResponse[];
}

const GeneralStats = ({ data }: GeneralStatsProps) => {
  return (
    <section className={styles.generalStatsSection}>
      {data.map((item, index) => (
        <StatsCard
          key={index}
          statsData={item}
        />
      ))}
    </section>
  );
};

export default GeneralStats;
