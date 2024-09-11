"use client";
import { errorLabels } from "@/app/constants/common/labels";
import { FormattedEcosystemMetricsInterface } from "@/app/interface";
import { useEffect, useState } from "react";
import { Skeleton } from "../../shadecn/ui/skeleton";
import CircularProgressBar from "../components/CircularProgressBar";
import labels from "../constants";
import styles from "./EcosystemGrowthMetrics.module.scss";

interface EcosystemGrowthMetricsProps {
  ecosystemGrowthMetrics: any[];
}

const EcosystemGrowthMetrics = ({ ecosystemGrowthMetrics }: EcosystemGrowthMetricsProps) => {
  const [data, setData] = useState<FormattedEcosystemMetricsInterface[] | null>(ecosystemGrowthMetrics);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (ecosystemGrowthMetrics && ecosystemGrowthMetrics.length > 0) {
      setData(ecosystemGrowthMetrics);
      setLoading(false);
    } else if (!ecosystemGrowthMetrics || ecosystemGrowthMetrics.length === 0) {
      setIsError(true);
      setLoading(false);
    }
  }, [ecosystemGrowthMetrics]);

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
