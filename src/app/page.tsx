import { default as devPortalConstant, default as DevPortalConstants } from "@/app/_components/dev-portal/constants";
import EcosystemGrowthMetrics from "@/app/_components/dev-portal/container/EcosystemGrowthMetrics";
import GeneralStats from "@/app/_components/dev-portal/container/GeneralStats";
import MonthlyCharts from "@/app/_components/dev-portal/container/MonthlyCharts";
import TopDapps from "@/app/_components/dev-portal/container/TopDapps";
import TopDevelopers from "@/app/_components/dev-portal/container/TopDevelopers";
import axios from "axios";
import styles from "./layout.module.scss";
import { getContributionsData, getDevelopersData, getProjectData } from "./lib/chartApis/chartApis";
import Logger from "./utils/Logger";

const fetchTopDevelopersData = async () => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    
    const startDateString = startDate.toISOString().split('T')[0];
    const endDateString = endDate.toISOString().split('T')[0];
    const url = `http://dev.bi-tool.com:8081/web/stats/top-developers?protocolId=${DevPortalConstants.graphProtocolId}&startDate=${startDateString}&endDate=${endDateString}`;
    Logger.info("Fetching Top Developers data from:", url);
    const response = await axios.get(url);
    const responseData = response.data.data.topDevelopers;
    if (!responseData) {
      Logger.warn("Warning: No top developers data found in the response.");
      return [];
    }
    Logger.info("Top Developers data fetched successfully.");
    return responseData;
  } catch (error) {
    Logger.error("Error while fetching Top Developers data:", JSON.stringify(error));
    return [];
  }
};

const fetchTopDappsData = async () => {
  try {
    const url = `http://dev.bi-tool.com:8081/web/stats/top-projects?protocolId=${DevPortalConstants.graphProtocolId}`;
    Logger.info("Fetching Top Dapps data from:", url);
    const response = await axios.get(url);
    const responseData = response.data.data.topProjects;
    if (!responseData) {
      Logger.warn("Warning: No top Dapps data found in the response.");
      return [];
    }
    Logger.info("Top Dapps data fetched successfully.");
    return responseData;
  } catch (error) {
    Logger.error("Error while fetching Top Dapps data:", JSON.stringify(error));
    return [];
  }
};

const fetchProjectsCommitsDevelopersCount = async () => {
  try {
    const url = `http://dev.bi-tool.com:8081/web/stats/projects-commits-developers-count?protocolId=${DevPortalConstants.graphProtocolId}`;
    Logger.info("Fetching data from::fetchProjectsCommitsDevelopersCount:", url);
    const response = await axios.get(url);
    const responseData = response.data.data;
    if (!responseData) {
      Logger.warn("Warning: No data found in the response.");
      return [];
    }
    Logger.info("data fetched successfully.");
    return responseData;
  } catch (error) {
    Logger.error("Error while fetching data:", JSON.stringify(error));
    return [];
  }
};

export default async function Home() {
  const projectsCommitsDevelopersCount = await fetchProjectsCommitsDevelopersCount();
  const projects = await getProjectData(devPortalConstant.SEARCH_KEYWORD, projectsCommitsDevelopersCount.projects);
  const contributions = await getContributionsData(
    devPortalConstant.SEARCH_KEYWORD,
    projectsCommitsDevelopersCount.commits,
  );
  const developers = await getDevelopersData(
    devPortalConstant.SEARCH_KEYWORD,
    projectsCommitsDevelopersCount.developers,
  );
  const topDevelopers = await fetchTopDevelopersData();
  const topDapps = await fetchTopDappsData();

  return (
    <main className={`${styles.layoutContent} bitool-container`}>
      <GeneralStats />
      <MonthlyCharts
        searchKeyword={devPortalConstant.SEARCH_KEYWORD}
        topProjects={projects?.data}
        topContributions={contributions!?.data}
        topDevelopers={developers!?.data}
      />
      <div className={styles.contentWrapper}>
        <EcosystemGrowthMetrics searchKeyword={devPortalConstant.SEARCH_KEYWORD} />
        <TopDevelopers topDevelopers={topDevelopers} />
      </div>
      <TopDapps topDapps={topDapps} />
    </main>
  );
}
