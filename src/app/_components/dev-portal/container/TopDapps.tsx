"use client";
import { errorLabels } from "@/app/constants/common/labels";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "../../shadecn/ui/skeleton";
import ResultTable from "../components/ResultTable";
import labels from "../constants";
import DevPortalConstants from "@/app/_components/dev-portal/constants";
import styles from "./TopDapps.module.scss";

interface TopDappsProps {
  topDapps: any
}

const TopDapps = ({topDapps}: TopDappsProps) => {
  const [data, setData] = useState(topDapps);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (topDapps && topDapps.length > 0) {
      setData(topDapps);
      setLoading(false);
    } else if (!topDapps || topDapps.length === 0) {
      setIsError(true);
      setLoading(false);
    }
  }, [topDapps]);

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
