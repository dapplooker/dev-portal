"use client";
import React, { useEffect, useState } from "react";
import styles from "./EcosystemGrowthMetrics.module.scss";
import CircularProgressBar from "../components/CircularProgressBar";
import axios from "axios";
import { FormattedEcosystemMetricsInterface } from "@/app/interface";
import LoadingSpinner from "../../ui/components/Loading/LoadingSpinner";
import env from "@/app/constants/common/labels";

const EcosystemGrowthMetrics = () => {
  const [ecosystemMetrics, setEcosystemMetrics] = useState<FormattedEcosystemMetricsInterface[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchEcosystemMetricsData();
    })();
  }, []);

  const fetchEcosystemMetricsData = async () => {
    try {
      const response = await axios.get(`${env.CLIENT_RESTFUL_API_END_POINT}/api/ecosystem-growth`);
      const metrics: FormattedEcosystemMetricsInterface[] = response.data.data;
      setEcosystemMetrics(metrics);
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
          {ecosystemMetrics!?.length &&
            ecosystemMetrics?.map((metrics, index) => (
              <div
                key={index}
                className={styles.growthMetricContainer}
              >
                <CircularProgressBar percentage={metrics.percentage} />
                <h2 className={styles.metricsCount}>
                  +{metrics.totalCount} <span className={styles.metricsTitle}>{metrics.title}</span>
                </h2>
              </div>
            ))}
        </div>
      )}
    </section>
  );
};

export default EcosystemGrowthMetrics;
