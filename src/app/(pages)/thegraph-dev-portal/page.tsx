import GeneralStats from "@/app/_components/dev-portal/container/GeneralStats";
import MonthlyCharts from "@/app/_components/dev-portal/container/MonthlyCharts";
import EcosystemGrowthMetrics from "@/app/_components/dev-portal/container/EcosystemGrowthMetrics";
import TopDevelopers from "@/app/_components/dev-portal/container/TopDevelopers";
import TopDapps from "@/app/_components/dev-portal/container/TopDapps";
import styles from "./layout.module.scss";

export default async function TheGraphDevPortalPage() {
  return (
    <main className={`${styles.layoutContent} bitool-container`}>
      <GeneralStats searchKeyword="thegraph" />
      <MonthlyCharts searchKeyword="thegraph" />
      <div className={styles.contentWrapper}>
        <EcosystemGrowthMetrics searchKeyword="thegraph" />
        <TopDevelopers searchKeyword="thegraph" />
      </div>
      <TopDapps searchKeyword="thegraph" />
    </main>
  );
}
