"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormattedTopDappsInterface } from "@/app/interface";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";
import ResultTable from "../components/ResultTable";
import { Skeleton } from "../../shadecn/ui/skeleton";
import labels from "../constants";
import env, { commonLabels, errorLabels } from "@/app/constants/common/labels";
import styles from "./TopDapps.module.scss";

interface TopDappsProps {
  searchKeyword: string;
}

const TopDapps = ({ searchKeyword }: TopDappsProps) => {
  const [topDapps, setTopDapps] = useSessionStorage(labels.TOP_PROJECTS, commonLabels.emptyString);
  const [data, setData] = useState<FormattedTopDappsInterface[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
    } catch (error) {
      setIsError(true);
      console.error("Error while fetching Ecosystem Metrics data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="flex flex-col w-full h-auto space-y-3 justify-evenly skeletonWrapper">
      <Skeleton className="h-[30px] w-[200px]" />
      <Skeleton className="h-[400px] w-full rounded-xl" />
    </div>
  ) : (
    <div className={styles.sectionWrapper}>
      <h2 className={styles.tableTitle}>
        {labels.topProjects} <span className={styles.subHeading}>({labels.last30days})</span>
      </h2>
      <section className={styles.topDapps}>
        {!data || data?.length === 0 || isError ? (
          <h1 className={styles.noDataFound}>{errorLabels.oopsNoDataFound}</h1>
        ) : (
          <ResultTable
            columnsData={Object.keys(data[0])}
            rowsData={data}
          />
        )}
      </section>
    </div>
  );
};

export default TopDapps;
