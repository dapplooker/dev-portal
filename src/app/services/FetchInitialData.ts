import Logger from "../utils/Logger";
import { default as devPortalConstant, default as DevPortalConstants } from "@/app/_components/dev-portal/constants";
import env from "./../constants/common/labels";

export const fetchTopDevelopersData = async (protocolId:number=1) => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);

    const startDateString = startDate.toISOString().split("T")[0];
    const endDateString = endDate.toISOString().split("T")[0];
    const url = `${env.apiEndpoint}/web/stats/top-developers?protocolId=${protocolId}&startDate=${startDateString}&endDate=${endDateString}`;

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

export const fetchTopDappsData = async (protocolId:number=1) => {
  try {
    const url = `${env.apiEndpoint}/web/stats/top-projects?protocolId=${protocolId}`;

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

export const fetchProjectsCommitsDevelopersCount = async (isCumulativeData: boolean = false, protocolId:number=1) => {
  try {
    const url = `${env.apiEndpoint}/web/stats/projects-commits-developers-count?protocolId=${protocolId}&isCumulative=${isCumulativeData}`;

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

export const fetchEcosystemGrowthMetrics = async (protocolId:number=1) => {
  try {
    Logger.info("Fetching half-yearly general stats data.");

    const halfYearlyDataResponse = await fetch(
      `${env.apiEndpoint}/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeHalfYearly}&protocolId=${protocolId}`,
      { next: { revalidate: 10 } }
    );

    if (!halfYearlyDataResponse.ok) {
      Logger.error(`Failed to fetch half-yearly data: ${halfYearlyDataResponse.statusText}`);
    }

    Logger.info("Half-yearly general stats data fetched successfully.");

    Logger.info("Fetching yearly general stats data.");

    const yearlyDataResponse = await fetch(
      `${env.apiEndpoint}/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeYearly}&protocolId=${protocolId}`,
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

export const fetchGeneralStatsData = async (protocolId:number=1) => {
  try {
    Logger.info("Fetching monthly general stats data.");

    const monthlyDataResponse = await fetch(
      `${env.apiEndpoint}/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeMonthly}&protocolId=${protocolId}`,
      { next: { revalidate: 10 } }
    );
    Logger.info(
      `${env.apiEndpoint}/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeMonthly}&protocolId=${protocolId}`
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
      `${env.apiEndpoint}/web/stats/general-stats?frequency=${DevPortalConstants.frequencyTypeTotal}&protocolId=${protocolId}`,
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
