import devPortalConstant from "../_components/dev-portal/constants";
import EcosystemGrowthMetrics from "../_components/dev-portal/container/EcosystemGrowthMetrics";
import GeneralStats from "../_components/dev-portal/container/GeneralStats";
import MonthlyCharts from "../_components/dev-portal/container/MonthlyCharts";
import TopDapps from "../_components/dev-portal/container/TopDapps";
import TopDevelopers from "../_components/dev-portal/container/TopDevelopers";
import Navbar from "../_components/ui/components/Navbar/Navbar";
import styles from "./DevPortalContainer.module.scss";

interface DevPortalContainerProps {
  generalStats: any;
  cumulativeMonthlyProjects: any;
  cumulativeMonthlyContributions: any;
  cumulativeMonthlyDevelopers: any;
  ecosystemGrowthMetrics: any;
  topDevelopers: any;
  topDapps: any;
  protocol: any;
}

function DevPortalContainer({
  generalStats,
  cumulativeMonthlyProjects,
  cumulativeMonthlyContributions,
  cumulativeMonthlyDevelopers,
  ecosystemGrowthMetrics,
  topDevelopers,
  topDapps,
  protocol,
}: DevPortalContainerProps) {
  return (
    <div className={styles.bitoolContainer}>
      <Navbar protocol={protocol} />
      <div className={styles.titleWrapper}>
        <h1 className={`${styles.pageTitle}`}>{devPortalConstant.theGraphDeveloperEcosystem}</h1>
      </div>
      <GeneralStats generalStats={generalStats} />
      <MonthlyCharts
        searchKeyword={devPortalConstant.SEARCH_KEYWORD}
        topProjects={cumulativeMonthlyProjects?.data}
        topContributions={cumulativeMonthlyContributions!?.data}
        topDevelopers={cumulativeMonthlyDevelopers!?.data}
        isCumulative={true}
      />
      <div className={styles.contentWrapper}>
        <EcosystemGrowthMetrics ecosystemGrowthMetrics={ecosystemGrowthMetrics} />
        <TopDevelopers topDevelopers={topDevelopers} />
      </div>
      <TopDapps topDapps={topDapps} />
    </div>
  );
}

export default DevPortalContainer;
