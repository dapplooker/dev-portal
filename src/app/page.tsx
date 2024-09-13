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
    startDate.setMonth(startDate.getMonth() - 1);

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

const fetchProjectsCommitsDevelopersCount = async (isCumulativeData: boolean = false) => {
  try {
    const url = `${env.apiEndpoint}/web/stats/projects-commits-developers-count?protocolId=${DevPortalConstants.graphProtocolId}&isCumulative=${isCumulativeData}`;

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

    const finalHalfYearlyData = await halfYearlyDataResponse.json();
    const halfYearlyData = finalHalfYearlyData.data.generalStats;
    const finalYearlyData = await yearlyDataResponse.json();
    const yearlyData = finalYearlyData.data.generalStats;

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
    Logger.info("Fetching monthly general stats data.");

    const monthlyDataResponse = await fetch(
      `${env.apiEndpoint}/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeMonthly}&protocolId=${DevPortalConstants.graphProtocolId}`,
      { next: { revalidate: 10 } }
    );
    Logger.info(
      `${env.apiEndpoint}/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeMonthly}&protocolId=${DevPortalConstants.graphProtocolId}`
    );

    if (!monthlyDataResponse.ok) {
      Logger.error(`Failed to fetch Total general stats data: ${monthlyDataResponse.statusText}`);
    }
    const finalMonthlyData = await monthlyDataResponse.json();
    const monthlyData = finalMonthlyData.data.generalStats;
    Logger.info("Monthly general stats data fetched successfully.");

    //Fetching Total general stats
    Logger.info("Fetching total general stats data.");
    const totalDataResponse = await fetch(
      `${env.apiEndpoint}/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeTotal}&protocolId=${DevPortalConstants.graphProtocolId}`,
      { next: { revalidate: 10 } }
    );
    if (!totalDataResponse.ok) {
      Logger.error(`Failed to fetch total general stats data: ${totalDataResponse.statusText}`);
    }
    const finalTotalData = await totalDataResponse.json();
    const totalData = finalTotalData?.data?.generalStats;
    Logger.info("Total general stats data fetched successfully.");

    const newData = [
      {
        title: "Developers",
        totalCount: totalData?.totalDevelopers || 0,
        last30DaysCount: monthlyData?.totalDevelopers || 0,
        icon: "code",
      },
      {
        title: "Projects",
        totalCount: totalData?.totalProjects || 0,
        last30DaysCount: monthlyData?.totalProjects || 0,
        icon: "dashboard",
      },
      {
        title: "Commits",
        totalCount: totalData?.totalCommits || 0,
        last30DaysCount: monthlyData?.totalCommits || 0,
        icon: "commit",
      },
      {
        title: "PR Raised",
        totalCount: totalData?.totalPr || 0,
        last30DaysCount: monthlyData?.totalPr || 0,
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
  const totalMonthlyProjectsCommitsDevelopersCount = await fetchProjectsCommitsDevelopersCount(false);
  const totalMonthlyprojects = await getProjectData(devPortalConstant.SEARCH_KEYWORD, totalMonthlyProjectsCommitsDevelopersCount.projects);
  const totalMonthlycontributions = await getContributionsData(
    devPortalConstant.SEARCH_KEYWORD,
    totalMonthlyProjectsCommitsDevelopersCount.commits,
  );
  const totalMonthlydevelopers = await getDevelopersData(
    devPortalConstant.SEARCH_KEYWORD,
    totalMonthlyProjectsCommitsDevelopersCount.developers,
  );

  const cumulativeMonthlyProjectsCommitsDevelopersCount = await fetchProjectsCommitsDevelopersCount(true);
  const cumulativeMonthlyprojects = await getProjectData(
    devPortalConstant.SEARCH_KEYWORD,
    cumulativeMonthlyProjectsCommitsDevelopersCount.projects
  );
  const cumulativeMonthlycontributions = await getContributionsData(
    devPortalConstant.SEARCH_KEYWORD,
    cumulativeMonthlyProjectsCommitsDevelopersCount.commits
  );
  const cumulativeMonthlydevelopers = await getDevelopersData(
    devPortalConstant.SEARCH_KEYWORD,
    cumulativeMonthlyProjectsCommitsDevelopersCount.developers
  );

  const topDevelopers = await fetchTopDevelopersData();
  const topDapps = await fetchTopDappsData();
  const generalStats = await fetchGeneralStatsData();
  const ecosystemGrowthMetrics = await fetchEcosystemGrowthMetrics();

  return (
    <main className={`${styles.layoutContent} bitool-container`}>
      <GeneralStats generalStats={generalStats} />
      {/* <MonthlyCharts
        searchKeyword={devPortalConstant.SEARCH_KEYWORD}
        topProjects={totalMonthlyprojects?.data}
        topContributions={totalMonthlycontributions!?.data}
        topDevelopers={totalMonthlydevelopers!?.data}
        isCumulative = {false}
      /> */}
      <MonthlyCharts
        searchKeyword={devPortalConstant.SEARCH_KEYWORD}
        topProjects={cumulativeMonthlyprojects?.data}
        topContributions={cumulativeMonthlycontributions!?.data}
        topDevelopers={cumulativeMonthlydevelopers!?.data}
        isCumulative = {true}
      />
      <div className={styles.contentWrapper}>
        <EcosystemGrowthMetrics ecosystemGrowthMetrics={ecosystemGrowthMetrics} />
        <TopDevelopers topDevelopers={topDevelopers} />
      </div>
      <TopDapps topDapps={topDapps} />
    </main>
  );
}
