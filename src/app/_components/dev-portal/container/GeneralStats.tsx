"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormattedGeneralStatsResponse } from "@/app/interface";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";
import { Skeleton } from "../../shadecn/ui/skeleton";
import StatsCard from "../components/StatsCard";
import env, { errorLabels } from "@/app/constants/common/labels";
import { commonLabels } from "@/app/constants";
import labels from "../constants";
import styles from "./GeneralStats.module.scss";

interface GeneralStatsProps {
  searchKeyword: string;
}

const GeneralStats = ({ searchKeyword }: GeneralStatsProps) => {
  const [generalStats, setGeneralStats] = useSessionStorage(labels.GENERAL_STATS, commonLabels.emptyString);
  const [data, setData] = useState<FormattedGeneralStatsResponse[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      await generalStatsData();
    })();
  }, []);

  const generalStatsData = async () => {
    try {
      if (!generalStats || generalStats.length === 0) {
        const response = await axios.get(
          `${env.CLIENT_RESTFUL_API_END_POINT}/api/general-stats?keyword=${searchKeyword}`
        );
        const stats: FormattedGeneralStatsResponse[] = response.data.data;
        setGeneralStats(stats);
        setData(stats);
      } else {
        setData(generalStats);
      }
    } catch (error) {
      setIsError(true);
      console.error("Error while fetching General Stats data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.generalStatsSection}>
      {loading ? (
        Array.from(Array(4).keys()).map((_, index) => (
          <Skeleton
            key={index}
            className="h-[125px] w-[290px] rounded-xl"
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
