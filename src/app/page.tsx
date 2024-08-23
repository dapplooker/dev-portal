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

    const startDateString = startDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];
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

const fetchEcosystemGrowthMetrics = async () => {
  try {
    const halfYearlyDataResponse = await axios.get(
      `http://dev.bi-tool.com:8081/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeHalfYearly}&protocolId=${DevPortalConstants.graphProtocolId}`
    );
    const yearlyDataResponse = await axios.get(
      `http://dev.bi-tool.com:8081/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeYearly}&protocolId=${DevPortalConstants.graphProtocolId}`
    );
    const halfYearlyData = halfYearlyDataResponse.data.data.genralStats;
    const yearlyData = yearlyDataResponse.data.data.genralStats;

    const totalDevelopersWithIn12Months: number = yearlyData.totalDevelopers;
    const totalDevelopersWithinSixMonths: number = halfYearlyData.totalDevelopers;

    const totalProjectsWithIn12Months: number = yearlyData.totalProjects;
    const totalProjectsWithinSixMonths: number = halfYearlyData.totalProjects;

    const totalContributionsWithIn12Months: number = yearlyData.totalCommits;
    const totalContributionsWithinSixMonths: number = halfYearlyData.totalCommits;

    const developersGrowth: number =
      Math.round((totalDevelopersWithinSixMonths / totalDevelopersWithIn12Months) * 100) || 0;
    const projectsGrowth: number = Math.round((totalProjectsWithinSixMonths / totalProjectsWithIn12Months) * 100) || 0;
    const contributionsGrowth: number =
      Math.round((totalContributionsWithinSixMonths / totalContributionsWithIn12Months) * 100) || 0;
    const newData = [
      {
        title: "New Developer",
        totalCount: totalDevelopersWithinSixMonths,
        percentage: developersGrowth,
      },
      {
        title: "New Repositories",
        totalCount: totalProjectsWithinSixMonths,
        percentage: projectsGrowth,
      },
      {
        title: "Contributions",
        totalCount: totalContributionsWithinSixMonths,
        percentage: contributionsGrowth,
      },
    ];
    return newData;
  } catch (error) {
    console.error("Error while fetching General Stats data: ", error);
    return [];
  }
};

const fetchGeneralStatsData = async () => {
  try {
    const weeklyDataResponse = await axios.get(
      `http://dev.bi-tool.com:8081/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeMonthly}&protocolId=${DevPortalConstants.graphProtocolId}`
    );
    const data = weeklyDataResponse.data.data.genralStats;
    const MonthlyDataResponse = await axios.get(
      `http://dev.bi-tool.com:8081/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeTotal}&protocolId=${DevPortalConstants.graphProtocolId}`
    );
    const weeklyData = weeklyDataResponse.data.data.genralStats;
    const monthlyData = MonthlyDataResponse.data.data.genralStats;
    const newData = [
      {
        title: "Developers",
        totalCount: monthlyData.totalDevelopers || 0,
        last30DaysCount: weeklyData.totalDevelopers || 0,
        icon: "code",
      },
      {
        title: "Projects",
        totalCount: monthlyData.totalProjects || 0,
        last30DaysCount: weeklyData.totalProjects || 0,
        icon: "dashboard",
      },
      {
        title: "Commits",
        totalCount: monthlyData.totalCommits || 0,
        last30DaysCount: weeklyData.totalCommits,
        icon: "commit",
      },
      {
        title: "PR Raised",
        totalCount: monthlyData.totalPr || 0,
        last30DaysCount: weeklyData.totalPr || 0,
        icon: "archive",
      },
    ];
    return newData;
    console.log(data);
  } catch (error) {
    console.error("Error while fetching General Stats data: ", error);
    return [];
  }
};

export default async function Home() {
  const projectsCommitsDevelopersCount = await fetchProjectsCommitsDevelopersCount();
  const projects = await getProjectData(devPortalConstant.SEARCH_KEYWORD, projectsCommitsDevelopersCount.projects);
  const contributions = await getContributionsData(
    devPortalConstant.SEARCH_KEYWORD,
    projectsCommitsDevelopersCount.commits
  );
  const developers = await getDevelopersData(
    devPortalConstant.SEARCH_KEYWORD,
    projectsCommitsDevelopersCount.developers
  );
  const topDevelopers = await fetchTopDevelopersData();
  const topDapps = await fetchTopDappsData();
  const generalStats = await fetchGeneralStatsData();
  const ecosystemGrowthMetrics = await fetchEcosystemGrowthMetrics();

  return (
    <main className={`${styles.layoutContent} bitool-container`}>
      <GeneralStats generalStats={generalStats} />
      <MonthlyCharts
        searchKeyword={devPortalConstant.SEARCH_KEYWORD}
        topProjects={projects?.data}
        topContributions={contributions!?.data}
        topDevelopers={developers!?.data}
      />
      <div className={styles.contentWrapper}>
        <EcosystemGrowthMetrics ecosystemGrowthMetrics={ecosystemGrowthMetrics} />
        <TopDevelopers topDevelopers={topDevelopers} />
      </div>
      <TopDapps topDapps={topDapps} />
    </main>
  );
}
