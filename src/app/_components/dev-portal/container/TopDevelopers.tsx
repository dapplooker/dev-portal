"use client";
import { errorLabels } from "@/app/constants/common/labels";
import { FormattedTopDevsInterface } from "@/app/interface";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "../../shadecn/ui/skeleton";
import ResultTable from "../components/ResultTable";
import labels from "../constants";
import styles from "./TopDapps.module.scss";


const TopDevelopers = () => {
  const [data, setData] = useState<FormattedTopDevsInterface[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      await fetchTopDevlopersData();
    })();
  }, []);

  const fetchTopDevlopersData = async () => {
    try {
      
        const response = await axios.get(
          `http://dev.bi-tool.com:8081/web/stats/top-developers?frequency=MONTHLY&protocolId=1`
        );
        const responseData: FormattedTopDevsInterface[] = response.data.data.topDevelopers;
        
        setData(responseData);
     
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
