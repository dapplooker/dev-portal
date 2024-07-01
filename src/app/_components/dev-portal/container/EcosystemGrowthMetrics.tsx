"use client";
import React, { useEffect, useState } from "react";
import styles from "./EcosystemGrowthMetrics.module.scss";
import CircularProgressBar from "../components/CircularProgressBar";
import axios from "axios";
import { FormattedEcosystemMetricsInterface } from "@/app/interface";
import LoadingSpinner from "../../ui/components/Loading/LoadingSpinner";
import env, { commonLabels } from "@/app/constants/common/labels";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";

interface EcosystemGrowthMetricsProps {
  searchKeyword: string;
}

const EcosystemGrowthMetrics = ({ searchKeyword }: EcosystemGrowthMetricsProps) => {
  const [ecosystemMetrics, setEcosystemMetrics] = useSessionStorage("ecosystem-growth", commonLabels.emptyString);
  const [data, setData] = useState<FormattedEcosystemMetricsInterface[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchEcosystemMetricsData();
    })();
  }, []);

  const fetchEcosystemMetricsData = async () => {
    try {
      if (!ecosystemMetrics || ecosystemMetrics.length === 0) {
        const response = await axios.get(
          `${env.CLIENT_RESTFUL_API_END_POINT}/api/ecosystem-growth?keyword=${searchKeyword}`
        );
        const metrics: FormattedEcosystemMetricsInterface[] = response.data.data;
        setEcosystemMetrics(metrics);
        setData(metrics);
      } else {
        setData(ecosystemMetrics);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching Ecosystem Metrics data: ", error);
    }
  };

  return (
    <section className={styles.ecosystemGrowthMetricsSection}>
      <h3 className={styles.sectionTitle}>Ecosystem growth</h3>
      <h3 className={styles.sectionSubTitle}>last 30 days</h3>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.contentWrapper}>
          {data && data?.length ? (
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
          ) : (
            <h1 className={styles.noDataFound}>No Data Found</h1>
          )}
        </div>
      )}
    </section>
  );
};

export default EcosystemGrowthMetrics;
