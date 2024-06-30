"use client";
import env from "@/app/constants/common/labels";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./TableContainer.module.scss";
import { FormattedTopDevsInterface } from "@/app/interface";
import LoadingSpinner from "../../ui/components/Loading/LoadingSpinner";
import TopDevelopersTable from "../components/TopDevelopersTable";

const TableContainer = () => {
  const [topDevelopers, setTopDevelopers] = useState<FormattedTopDevsInterface[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await fetchTopDevlopersData();
    })();
  }, []);

  const fetchTopDevlopersData = async () => {
    try {
      // const response = await axios.get(`${env.CLIENT_RESTFUL_API_END_POINT}/api/top-developers`);
      // const topDevsData: FormattedTopDevsInterface[] = response.data.data;

      const topDevsData = [
        { name: "graphprotocol", commits: 0 },
        { name: "TheGraphAcademy", commits: 0 },
        { name: "hop-protocol", commits: 0 },
        { name: "enzymefinance", commits: 0 },
        { name: "decentraland", commits: 0 },
        { name: "Consensys", commits: 0 },
        { name: "EVMcrispr", commits: 0 },
        { name: "lucidao-developer", commits: 9 },
        { name: "messari", commits: 0 },
        { name: "PatrickAlphaC", commits: 404 },
      ];
      console.log("topsDevData", topDevsData);

      setTopDevelopers(topDevsData);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching Ecosystem Metrics data: ", error);
    }
  };

  return (
    <section className={styles.tableContainer}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        topDevelopers &&
        topDevelopers?.length > 0 && (
          <TopDevelopersTable
            columnsData={Object.keys(topDevelopers[0])}
            rowsData={topDevelopers}
          />
        )
      )}
    </section>
  );
};

export default TableContainer;
