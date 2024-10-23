import devPortalConstant from "../_components/dev-portal/constants";
import EcosystemGrowthMetrics from "../_components/dev-portal/container/EcosystemGrowthMetrics";
import GeneralStats from "../_components/dev-portal/container/GeneralStats";
import MonthlyCharts from "../_components/dev-portal/container/MonthlyCharts";
import TopDapps from "../_components/dev-portal/container/TopDapps";
import TopDevelopers from "../_components/dev-portal/container/TopDevelopers";
import styles from './DevPortalContainer.module.scss'

interface DevPortalContainerProps {
  generalStats: any;
  cumulativeMonthlyprojects: any;
  cumulativeMonthlycontributions: any;
  cumulativeMonthlydevelopers: any;
  ecosystemGrowthMetrics: any;
  topDevelopers: any;
  topDapps: any;
}

function DevPortalContainer({
  generalStats,
  cumulativeMonthlyprojects,
  cumulativeMonthlycontributions,
  cumulativeMonthlydevelopers,
  ecosystemGrowthMetrics,
  topDevelopers,
  topDapps,
}: DevPortalContainerProps) {
  return (
    <div className={styles.bitoolContainer}>
      <GeneralStats generalStats={generalStats} />
      <MonthlyCharts
        searchKeyword={devPortalConstant.SEARCH_KEYWORD}
        topProjects={cumulativeMonthlyprojects?.data}
        topContributions={cumulativeMonthlycontributions!?.data}
        topDevelopers={cumulativeMonthlydevelopers!?.data}
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
