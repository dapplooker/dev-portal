"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormattedEcosystemMetricsInterface } from "@/app/interface";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";
import { Skeleton } from "../../shadecn/ui/skeleton";
import CircularProgressBar from "../components/CircularProgressBar";
import env, { commonLabels, errorLabels } from "@/app/constants/common/labels";
import labels from "../constants";
import DevPortalConstants from "@/app/_components/dev-portal/constants"
import styles from "./EcosystemGrowthMetrics.module.scss";

interface EcosystemGrowthMetricsProps {
  searchKeyword: string;
}

const EcosystemGrowthMetrics = ({ searchKeyword }: EcosystemGrowthMetricsProps) => {
  const [ecosystemMetrics, setEcosystemMetrics] = useSessionStorage(labels.ECOSYSTEM_GROWTH, commonLabels.emptyString);
  const [data, setData] = useState<FormattedEcosystemMetricsInterface[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchEcosystemMetricsData();
    })();
  }, []);

  const fetchEcosystemMetricsData = async () => {
    try {
      const halfYearlyDataResponse = await axios.get(
        `http://dev.bi-tool.com:8081/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeHalfYearly}&protocolId=${DevPortalConstants.graphProtocolId}`
      );
      const yearlyDataResponse = await axios.get(
        `http://dev.bi-tool.com:8081/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeYearly}&protocolId=${DevPortalConstants.graphProtocolId}`
      );
      const halfYearlyData = halfYearlyDataResponse.data.data.genralStats;
      const yearlyData = yearlyDataResponse.data.data.genralStats;

      const totalDevelopersWithIn12Months: number = yearlyData.totalDevelopers;
      const totalDevelopersWithinSixMonths: number = halfYearlyData.totalDevelopers;

      const totalProjectsWithIn12Months: number = yearlyData.totalProjects;
      const totalProjectsWithinSixMonths: number = halfYearlyData.totalProjects;

      const totalContributionsWithIn12Months: number = yearlyData.totalCommits;
      const totalContributionsWithinSixMonths: number = halfYearlyData.totalCommits;

      const developersGrowth: number =
        Math.round((totalDevelopersWithinSixMonths / totalDevelopersWithIn12Months) * 100) || 0;
      const projectsGrowth: number =
        Math.round((totalProjectsWithinSixMonths / totalProjectsWithIn12Months) * 100) || 0;
      const contributionsGrowth: number =
        Math.round((totalContributionsWithinSixMonths / totalContributionsWithIn12Months) * 100) || 0;
      const newData = [
        {
          title: "New Developer",
          totalCount: totalDevelopersWithinSixMonths,
          percentage: developersGrowth,
        },
        {
          title: "New Repositories",
          totalCount: totalProjectsWithinSixMonths,
          percentage: projectsGrowth,
        },
        {
          title: "Contributions",
          totalCount: totalContributionsWithinSixMonths,
          percentage: contributionsGrowth,
        },
      ];
      setData(newData);
      console.log(newData);
    } catch (error) {
      setIsError(true);
      console.error("Error while fetching General Stats data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="flex flex-col w-[585px] h-[540px] space-y-3 justify-evenly skeletonWrapper">
      <Skeleton className="h-[30px] w-[200px]" />
      {Array.from(Array(3).keys()).map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-4"
        >
          <Skeleton className="h-[120px] w-[120px] rounded-full" />
          <div className="space-y-3">
            <Skeleton className="h-[28px] w-[250px]" />
            <Skeleton className="h-[28px] w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  ) : (
    <>
      <section className={styles.ecosystemGrowthMetricsSection}>
        <h3 className={styles.sectionTitle}>
          {labels.ecosystemGrowth} <span className={styles.subHeading}>({labels.last6months})</span>
        </h3>

        <div className={styles.contentWrapper}>
          {!data || data?.length === 0 || isError ? (
            <div className={styles.showErrorMsg}>
              <span className={styles.errorText}>{errorLabels.oopsNoDataFound}</span>
            </div>
          ) : (
            data?.map((metrics: FormattedEcosystemMetricsInterface, index: number) => (
              <div
                key={index}
                className={styles.growthMetricContainer}
              >
                <CircularProgressBar percentage={metrics?.percentage || 0} />
                <h2 className={styles.metricsCount}>
                  +{metrics?.totalCount} <span className={styles.metricsTitle}>{metrics?.title}</span>
                </h2>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default EcosystemGrowthMetrics;
