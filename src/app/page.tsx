import { getContributionsData, getDevelopersData, getProjectData } from "./lib/chartApis/chartApis";
import GeneralStats from "@/app/_components/dev-portal/container/GeneralStats";
import MonthlyCharts from "@/app/_components/dev-portal/container/MonthlyCharts";
import EcosystemGrowthMetrics from "@/app/_components/dev-portal/container/EcosystemGrowthMetrics";
import TopDevelopers from "@/app/_components/dev-portal/container/TopDevelopers";
import TopDapps from "@/app/_components/dev-portal/container/TopDapps";
import devPortalConstant from "@/app/_components/dev-portal/constants";
import styles from "./layout.module.scss";

export default async function Home() {
  const projects = await getProjectData(devPortalConstant.SEARCH_KEYWORD);
  const contributions = await getContributionsData(devPortalConstant.SEARCH_KEYWORD);
  const developers = await getDevelopersData(devPortalConstant.SEARCH_KEYWORD);

  return (
    <main className={`${styles.layoutContent} bitool-container`}>
      <GeneralStats searchKeyword={devPortalConstant.SEARCH_KEYWORD} />
      <MonthlyCharts
        searchKeyword={devPortalConstant.SEARCH_KEYWORD}
        topProjects={projects?.data}
        topContributions={contributions!?.data}
        topDevelopers={developers!?.data}
      />
      <div className={styles.contentWrapper}>
        <EcosystemGrowthMetrics searchKeyword={devPortalConstant.SEARCH_KEYWORD} />
        <TopDevelopers searchKeyword={devPortalConstant.SEARCH_KEYWORD} />
      </div>
      <TopDapps searchKeyword={devPortalConstant.SEARCH_KEYWORD} />
    </main>
  );
}
