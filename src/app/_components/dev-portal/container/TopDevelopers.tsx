"use client";
import { errorLabels } from "@/app/constants/common/labels";
import { FormattedTopDevsInterface } from "@/app/interface";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "../../shadecn/ui/skeleton";
import ResultTable from "../components/ResultTable";
import DevPortalConstants from "@/app/_components/dev-portal/constants"
import labels from "../constants";
import styles from "./TopDapps.module.scss";

interface TopDevelopersProps {
  topDevelopers: any[]
}

const TopDevelopers = ({topDevelopers}: TopDevelopersProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (topDevelopers && topDevelopers.length > 0) {
      setData(topDevelopers);
      setLoading(false);
    } else if (!topDevelopers || topDevelopers.length === 0) {
      setIsError(true);
      setLoading(false);
    }
  }, [topDevelopers]);

  return loading ? (
    <div className="flex flex-col w-[585px] h-[540px] space-y-3 justify-evenly skeletonWrapper">
      <Skeleton className="h-[30px] w-[200px]" />
      <Skeleton className="h-full w-full rounded-xl" />
    </div>
  ) : (
    <div className={styles.topDeveloperSection}>
      <h2 className={styles.tableTitle}>
        {labels.topDevelopers} <span className={styles.subHeading}>({labels.last6months})</span>
      </h2>
      <section className={styles.topDapps}>
        {!data || data?.length === 0 || isError ? (
          <h1 className={styles.noDataFound}>{errorLabels.oopsNoDataFound}</h1>
        ) : (
          <ResultTable
            columnsData={Object.keys(data[0])}
            rowsData={data}
            type="TopDevelopers"
          />
        )}
      </section>
    </div>
  );
};

export default TopDevelopers;
