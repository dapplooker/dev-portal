"use client";
import env, { commonLabels } from "@/app/constants/common/labels";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./TopDapps.module.scss";
import { FormattedTopDappsInterface } from "@/app/interface";
import ResultTable from "../components/ResultTable";
import useSessionStorage from "@/app/hooks/useSessionStorage/useSessionStorage";
import devPortalConstant from "../constants";
import { Skeleton } from "../../shadecn/ui/skeleton";

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

  return loading ? (
    <div className="flex flex-col w-full h-auto space-y-3 justify-evenly">
      <Skeleton className="h-[30px] w-[200px]" />
      {Array.from(Array(7).keys()).map((_, index) => (
        <Skeleton
          key={index}
          className="h-[35px] w-full"
        />
      ))}
    </div>
  ) : (
    <div className={styles.sectionWrapper}>
      <h2 className={styles.tableTitle}>
        {devPortalConstant.topProjects} <span className={styles.subHeading}>({devPortalConstant.last30days})</span>
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

export default TopDapps;
