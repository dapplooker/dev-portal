"use client";
import React, { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import { FormattedGeneralStatsResponse } from "@/app/interface";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";
import { commonLabels } from "@/app/constants";
import axios from "axios";
import env from "@/app/constants/common/labels";
import LoadingSpinner from "../../ui/components/Loading/LoadingSpinner";
import styles from "./GeneralStats.module.scss";

interface GeneralStatsProps {
  searchKeyword: string;
}

const GeneralStats = ({ searchKeyword }: GeneralStatsProps) => {
  const [generalStats, setGeneralStats] = useSessionStorage("general-stats", commonLabels.emptyString);
  const [data, setData] = useState<FormattedGeneralStatsResponse[] | null>(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching General Stats data: ", error);
    }
  };

  return (
    <section className={styles.generalStatsSection}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        // <div className={styles.contentWrapper}>
        data!.map((item, index) => (
          <StatsCard
            key={index}
            statsData={item}
          />
        ))
        // </div>
      )}
    </section>
  );
};

export default GeneralStats;
