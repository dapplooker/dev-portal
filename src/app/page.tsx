import { getContributionsData, getDevelopersData, getProjectData } from "./lib/chartApis/chartApis";
import { default as devPortalConstant, default as DevPortalConstants } from "@/app/_components/dev-portal/constants";

import EcosystemGrowthMetrics from "@/app/_components/dev-portal/container/EcosystemGrowthMetrics";
import GeneralStats from "@/app/_components/dev-portal/container/GeneralStats";
import MonthlyCharts from "@/app/_components/dev-portal/container/MonthlyCharts";
import TopDapps from "@/app/_components/dev-portal/container/TopDapps";
import TopDevelopers from "@/app/_components/dev-portal/container/TopDevelopers";

import env from "./constants/common/labels";
import Logger from "./utils/Logger";
import styles from "./layout.module.scss";

const fetchTopDevelopersData = async () => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 6);

    const startDateString = startDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];
    const url = `${env.apiEndpoint}/web/stats/top-developers?protocolId=${DevPortalConstants.graphProtocolId}&startDate=${startDateString}&endDate=${endDateString}`;

    Logger.info("Fetching Top Developers data from:", url);

    const response = await fetch(url, { next: { revalidate: 10 } });

    if (!response.ok) {
      Logger.error(`Failed to fetch Top Developers data: ${response.statusText}`);
      return [];
    }

    const responseData = await response.json();
    if (!responseData.data?.topDevelopers) {
      Logger.warn("Warning: No top developers data found in the response.");
      return [];
    }

    Logger.info("Top Developers data fetched successfully.");
    return responseData.data.topDevelopers;
  } catch (error: any) {
    Logger.error("Error while fetching Top Developers data:", error.message);
    return [];
  }
};

const fetchTopDappsData = async () => {
  try {
    const url = `${env.apiEndpoint}/web/stats/top-projects?protocolId=${DevPortalConstants.graphProtocolId}`;

    Logger.info("Fetching Top Dapps data from:", url);

    const response = await fetch(url, { next: { revalidate: 10 } });

    if (!response.ok) {
      Logger.error(`Failed to fetch Top Dapps data: ${response.statusText}`);
      return [];
    }

    const responseData = await response.json();
    if (!responseData.data?.topProjects) {
      Logger.warn("Warning: No top Dapps data found in the response.");
      return [];
    }

    Logger.info("Top Dapps data fetched successfully.");
    return responseData.data.topProjects;
  } catch (error: any) {
    Logger.error("Error while fetching Top Dapps data:", error.message);
    return [];
  }
};

const fetchProjectsCommitsDevelopersCount = async () => {
  try {
    const url = `${env.apiEndpoint}/web/stats/projects-commits-developers-count?protocolId=${DevPortalConstants.graphProtocolId}`;

    Logger.info("Fetching data from: fetchProjectsCommitsDevelopersCount:", url);

    const response = await fetch(url, { next: { revalidate: 10 } });

    if (!response.ok) {
      Logger.error(`Failed to fetch Projects Commits Developers Count: ${response.statusText}`);
      return [];
    }

    const responseData = await response.json();
    if (!responseData.data) {
      Logger.warn("Warning: No data found in the response.");
      return [];
    }

    Logger.info("Data fetched successfully.");
    return responseData.data;
  } catch (error: any) {
    Logger.error("Error while fetching data:", error.message);
    return [];
  }
};

const fetchEcosystemGrowthMetrics = async () => {
  try {
    Logger.info("Fetching half-yearly general stats data.");

    const halfYearlyDataResponse = await fetch(
      `${env.apiEndpoint}/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeHalfYearly}&protocolId=${DevPortalConstants.graphProtocolId}`,
      { next: { revalidate: 10 } }
    );

    if (!halfYearlyDataResponse.ok) {
      Logger.error(`Failed to fetch half-yearly data: ${halfYearlyDataResponse.statusText}`);
    }

    Logger.info("Half-yearly general stats data fetched successfully.");

    Logger.info("Fetching yearly general stats data.");

    const yearlyDataResponse = await fetch(
      `${env.apiEndpoint}/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeYearly}&protocolId=${DevPortalConstants.graphProtocolId}`,
      { next: { revalidate: 10 } }
    );

    if (!yearlyDataResponse.ok) {
      Logger.error(`Failed to fetch yearly data: ${yearlyDataResponse.statusText}`);
    }

    Logger.info("Yearly general stats data fetched successfully.");

    const halfYearlyData = (await halfYearlyDataResponse.json()).data.genralStats;
    const yearlyData = (await yearlyDataResponse.json()).data.genralStats;

    Logger.info("Calculating growth metrics.");

    const totalDevelopersWithIn12Months = yearlyData.totalDevelopers;
    const totalDevelopersWithinSixMonths = halfYearlyData.totalDevelopers;

    const totalProjectsWithIn12Months = yearlyData.totalProjects;
    const totalProjectsWithinSixMonths = halfYearlyData.totalProjects;

    const totalContributionsWithIn12Months = yearlyData.totalCommits;
    const totalContributionsWithinSixMonths = halfYearlyData.totalCommits;

    const developersGrowth = Math.round((totalDevelopersWithinSixMonths / totalDevelopersWithIn12Months) * 100) || 0;
    const projectsGrowth = Math.round((totalProjectsWithinSixMonths / totalProjectsWithIn12Months) * 100) || 0;
    const contributionsGrowth =
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

    Logger.info("Ecosystem growth metrics calculated successfully.");
    return newData;
  } catch (error: any) {
    Logger.error("Error while fetching Ecosystem Growth Metrics data:", error.message);
    return [];
  }
};

const fetchGeneralStatsData = async () => {
  try {
    Logger.info("Fetching weekly general stats data.");

    const weeklyDataResponse = await fetch(
      `${env.apiEndpoint}/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeMonthly}&protocolId=${DevPortalConstants.graphProtocolId}`,
      { next: { revalidate: 10 } }
    );

    if (!weeklyDataResponse.ok) {
      Logger.error(`Failed to fetch weekly general stats data: ${weeklyDataResponse.statusText}`);
    }

    const weeklyData = (await weeklyDataResponse.json()).data.genralStats;
    Logger.info("Weekly general stats data fetched successfully.");

    Logger.info("Fetching monthly general stats data.");

    const monthlyDataResponse = await fetch(
      `${env.apiEndpoint}/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeTotal}&protocolId=${DevPortalConstants.graphProtocolId}`,
      { next: { revalidate: 10 } }
    );

    if (!monthlyDataResponse.ok) {
      Logger.error(`Failed to fetch monthly general stats data: ${monthlyDataResponse.statusText}`);
    }

    const monthlyData = (await monthlyDataResponse.json()).data.genralStats;
    Logger.info("Monthly general stats data fetched successfully.");

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
        last30DaysCount: weeklyData.totalCommits || 0,
        icon: "commit",
      },
      {
        title: "PR Raised",
        totalCount: monthlyData.totalPr || 0,
        last30DaysCount: weeklyData.totalPr || 0,
        icon: "archive",
      },
    ];

    Logger.info("General stats data processed successfully.");
    return newData;
  } catch (error: any) {
    Logger.error("Error while fetching General Stats data:", error.message);
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
