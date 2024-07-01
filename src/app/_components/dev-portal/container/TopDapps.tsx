"use client";
import env, { commonLabels } from "@/app/constants/common/labels";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./TopDapps.module.scss";
import { FormattedTopDappsInterface } from "@/app/interface";
import LoadingSpinner from "../../ui/components/Loading/LoadingSpinner";
import ResultTable from "../components/ResultTable";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";

interface TopDappsProps {
  searchKeyword: string;
}

const TopDapps = ({ searchKeyword }: TopDappsProps) => {
  const [topDapps, setTopDapps] = useSessionStorage("top-projects", commonLabels.emptyString);
  const [data, setData] = useState<FormattedTopDappsInterface[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchTopDappsData();
    })();
  }, []);

  const fetchTopDappsData = async () => {
    try {
      if (!topDapps || topDapps.length === 0) {
        const response = await axios.get(
          `${env.CLIENT_RESTFUL_API_END_POINT}/api/top-projects?keyword=${searchKeyword}`
        );
        const responseData: FormattedTopDappsInterface[] = response.data.data;
        setTopDapps(responseData);
        setData(responseData);
      } else {
        setData(topDapps);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error while fetching Ecosystem Metrics data: ", error);
    }
  };

  return (
    <div className={styles.sectionWrapper}>
      <h2 className={styles.tableTitle}>
        Top Projects <span className={styles.subHeading}>(Last 30 days)</span>
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

export default TopDapps;
