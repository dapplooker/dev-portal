"use client";
import { errorLabels } from "@/app/constants/common/labels";
import { FormattedGeneralStatsResponse } from "@/app/interface";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "../../shadecn/ui/skeleton";
import StatsCard from "../components/StatsCard";
import DevPortalConstants from "@/app/_components/dev-portal/constants"
import styles from "./GeneralStats.module.scss";

const GeneralStats = () => {
  const [data, setData] = useState<FormattedGeneralStatsResponse[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      await generalStatsData();
    })();
  }, []);

  const generalStatsData = async () => {
    try {
      const weeklyDataResponse = await axios.get(
        `http://dev.bi-tool.com:8081/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeMonthly}&protocolId=${DevPortalConstants.graphProtocolId}`
      );
      const data = weeklyDataResponse.data.data.genralStats;
      const MonthlyDataResponse = await axios.get(
        `http://dev.bi-tool.com:8081/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeTotal}&protocolId=${DevPortalConstants.graphProtocolId}`
      );
      const weeklyData = weeklyDataResponse.data.data.genralStats;
      const monthlyData = MonthlyDataResponse.data.data.genralStats;
      const newData = [
        { title: "Developers", totalCount: monthlyData.totalDevelopers || 0, last30DaysCount: weeklyData.totalDevelopers || 0, icon: "code" },
        { title: "Projects", totalCount: monthlyData.totalProjects || 0, last30DaysCount: weeklyData.totalProjects || 0, icon: "dashboard" },
        { title: "Commits", totalCount: monthlyData.totalCommits || 0, last30DaysCount: weeklyData.totalCommits, icon: "commit" },
        { title: "PR Raised", totalCount: monthlyData.totalPr || 0, last30DaysCount: weeklyData.totalPr || 0, icon: "archive" },
      ];
      setData(newData);
      console.log(data);
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
