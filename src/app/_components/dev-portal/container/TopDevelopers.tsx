"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormattedTopDevsInterface } from "@/app/interface";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";
import ResultTable from "../components/ResultTable";
import { Skeleton } from "../../shadecn/ui/skeleton";
import labels from "../constants";
import env, { commonLabels, errorLabels } from "@/app/constants/common/labels";
import styles from "./TopDapps.module.scss";

interface TopDevelopersProps {
  searchKeyword: string;
}

const TopDevelopers = ({ searchKeyword }: TopDevelopersProps) => {
  const [data, setData] = useState<FormattedTopDevsInterface[] | null>(null);
  const [topDevelopers, setTopDevelopers] = useSessionStorage(labels.TOP_DEVELOPERS, commonLabels.emptyString);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
    } catch (error) {
      setIsError(true);
      console.error("Error while fetching Ecosystem Metrics data: ", error);
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <div className="flex flex-col w-[585px] h-[540px] space-y-3 justify-evenly skeletonWrapper">
      <Skeleton className="h-[30px] w-[200px]" />
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
  ) : (
    <div className={styles.topDeveloperSection}>
      <h2 className={styles.tableTitle}>
        {labels.topDevelopers} <span className={styles.subHeading}>({labels.last30days})</span>
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

export default TopDevelopers;
