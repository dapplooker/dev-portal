"use client";
import GeneralStats from "@/app/_components/dev-portal/container/GeneralStats";
import MonthlyCharts from "@/app/_components/dev-portal/container/MonthlyCharts";
import EcosystemGrowthMetrics from "@/app/_components/dev-portal/container/EcosystemGrowthMetrics";
import TopDevelopers from "@/app/_components/dev-portal/container/TopDevelopers";
import TopDapps from "@/app/_components/dev-portal/container/TopDapps";
import devPortalConstant from "@/app/_components/dev-portal/constants";
import styles from "./layout.module.scss";

export default function Home() {
  return (
    <main className={`${styles.layoutContent} bitool-container`}>
      <GeneralStats searchKeyword={devPortalConstant.SEARCH_KEYWORD} />
      <MonthlyCharts searchKeyword={devPortalConstant.SEARCH_KEYWORD} />
      <div className={styles.contentWrapper}>
        <EcosystemGrowthMetrics searchKeyword={devPortalConstant.SEARCH_KEYWORD} />
        <TopDevelopers searchKeyword={devPortalConstant.SEARCH_KEYWORD} />
      </div>
      <TopDapps searchKeyword={devPortalConstant.SEARCH_KEYWORD} />
    </main>
  );
}
