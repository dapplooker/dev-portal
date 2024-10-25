"use client";
import { useEffect, useState } from "react";
import { FormattedGeneralStatsResponse } from "@/app/interface";
import { Skeleton } from "../../shadecn/ui/skeleton";
import StatsCard from "../components/StatsCard";
import { errorLabels } from "@/app/constants/common/labels";
import styles from "./GeneralStats.module.scss";
import statsCardStyles from "../components/StatsCard.module.scss";

interface GeneralStats {
  generalStats: any[];
}

const GeneralStats = ({ generalStats }: GeneralStats) => {
  const [data, setData] = useState<FormattedGeneralStatsResponse[] | null>(generalStats);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (generalStats && generalStats.length > 0) {
      setData(generalStats);
      setLoading(false);
    } else if (!generalStats || generalStats.length === 0) {
      setIsError(true);
      setLoading(false);
    }
  }, [generalStats]);

  return (
    <section className={styles.generalStatsSection}>
      {loading ? (
        Array.from(Array(4).keys()).map((_, index) => (
          <Skeleton
            key={index}
            className={`${statsCardStyles.statsCard} ${styles.hideBorder}`}
          />
        ))
      ) : isError || !data ? (
        <div className={styles.showErrorMsg}>
          <span className={styles.errorText}>{errorLabels.oopsNoDataFound}</span>
        </div>
      ) : (
        data!.map((item, index) => (
          <StatsCard
            key={index}
            statsData={item}
          />
        ))
      )}
    </section>
  );
};

export default GeneralStats;
