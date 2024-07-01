"use client";
import env, { commonLabels } from "@/app/constants/common/labels";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./TopDapps.module.scss";
import { FormattedTopDevsInterface } from "@/app/interface";
import ResultTable from "../components/ResultTable";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";
import devPortalConstant from "../constants";
import { Skeleton } from "../../shadecn/ui/skeleton";

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

  return loading ? (
    <div className="flex flex-col w-[585px] h-[540px] space-y-3 justify-evenly">
      <Skeleton className="h-[30px] w-[200px]" />
      {Array.from(Array(6).keys()).map((_, index) => (
        <Skeleton
          key={index}
          className="h-[35px] w-full"
        />
      ))}
    </div>
  ) : (
    <div className={styles.topDeveloperSection}>
      <h2 className={styles.tableTitle}>
        {devPortalConstant.topDevelopers} <span className={styles.subHeading}>({devPortalConstant.last30days})</span>
      </h2>
      <section className={styles.topDapps}>
        {data && data?.length > 0 ? (
          <ResultTable
            columnsData={Object.keys(data[0])}
            rowsData={data}
          />
        ) : (
          <h1 className={styles.noDataFound}>{commonLabels.noDataFound}</h1>
        )}
      </section>
    </div>
  );
};

export default TopDevelopers;
