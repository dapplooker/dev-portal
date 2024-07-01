"use client";
import env, { commonLabels } from "@/app/constants/common/labels";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./TopDapps.module.scss";
import { FormattedTopDevsInterface } from "@/app/interface";
import LoadingSpinner from "../../ui/components/Loading/LoadingSpinner";
import ResultTable from "../components/ResultTable";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";

interface TopDevelopersProps {
  searchKeyword: string;
}

const TopDevelopers = ({ searchKeyword }: TopDevelopersProps) => {
  const [data, setData] = useState<FormattedTopDevsInterface[] | null>(null);
  const [topDevelopers, setTopDevelopers] = useSessionStorage("top-developers", commonLabels.emptyString);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchTopDevlopersData();
    })();
  }, []);

  const fetchTopDevlopersData = async () => {
    try {
      if (!topDevelopers || topDevelopers.length === 0) {
        const response = await axios.get(
          `${env.CLIENT_RESTFUL_API_END_POINT}/api/top-developers?keyword=${searchKeyword}`
        );
        const responseData: FormattedTopDevsInterface[] = response.data.data;
        setTopDevelopers(responseData);
        setData(responseData);
      } else {
        setData(topDevelopers);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching Ecosystem Metrics data: ", error);
    }
  };

  return (
    <div className={styles.topDeveloperSection}>
      <h2 className={styles.tableTitle}>
        Top Developers <span className={styles.subHeading}>(Last 30 days)</span>
      </h2>
      <section className={styles.topDapps}>
        {loading ? (
          <LoadingSpinner />
        ) : data && data?.length > 0 ? (
          <ResultTable
            columnsData={Object.keys(data[0])}
            rowsData={data}
          />
        ) : (
          <h1 className={styles.noDataFound}>No Data Found</h1>
        )}
      </section>
    </div>
  );
};

export default TopDevelopers;
