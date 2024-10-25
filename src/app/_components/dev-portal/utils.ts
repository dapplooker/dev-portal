import { ChartConfigInterface } from "@/app/interface";
import {
  fetchEcosystemGrowthMetrics,
  fetchGeneralStatsData,
  fetchProjectsCommitsDevelopersCount,
  fetchTopDappsData,
  fetchTopDevelopersData,
} from "@/app/services/FetchInitialData";
import { default as devPortalConstant } from "@/app/_components/dev-portal/constants";
import moment from "moment";

export async function fetchPageData(protocolId: number) {
  const cumulativeMonthlyProjectsCommitsDevelopersCount = await fetchProjectsCommitsDevelopersCount(true, protocolId);

  const cumulativeMonthlyProjects = formateProjectsData(
    devPortalConstant.SEARCH_KEYWORD,
    cumulativeMonthlyProjectsCommitsDevelopersCount.projects,
    true,
  );

  const cumulativeMonthlyContributions = formateContributionsData(
    devPortalConstant.SEARCH_KEYWORD,
    cumulativeMonthlyProjectsCommitsDevelopersCount.commits,
    true,
  );

  const cumulativeMonthlyDevelopers = formateDevelopersData(
    devPortalConstant.SEARCH_KEYWORD,
    cumulativeMonthlyProjectsCommitsDevelopersCount.developers,
    true,
  );

  const [topDevelopers, topDapps, generalStats, ecosystemGrowthMetrics] = await Promise.all([
    fetchTopDevelopersData(protocolId),
    fetchTopDappsData(protocolId),
    fetchGeneralStatsData(protocolId),
    fetchEcosystemGrowthMetrics(protocolId),
  ]);

  return {
    cumulativeMonthlyProjects,
    cumulativeMonthlyContributions,
    cumulativeMonthlyDevelopers,
    topDevelopers,
    topDapps,
    generalStats,
    ecosystemGrowthMetrics,
  };
}

const shouldSkipMonth = (range: string): boolean => {
  const rangeStartDate = range.split("..")[0];
  const month = moment(rangeStartDate).format("YYYY-MM");
  const today = moment();

  return month === today.format("YYYY-MM") && today.date() < 21;
};

export const formateProjectsData = (searchKeyword: string, projects: any[], isCumulative: boolean) => {
  const keys: any[] = [];
  const values: any[] = [];
  projects.forEach((obj) => {
    const key = Object.keys(obj)[0];
    const value = Object.values(obj)[0];
    keys.push(key);
    values.push(value);
  });

  const projectsChartDetails: ChartConfigInterface = {
    chartType: "line",
    chartTitle: isCumulative ? devPortalConstant.activeProjectsCumulative : devPortalConstant.activeProjectsMonthly,
    xAxisValues: keys,
    yAxisValues: values,
    xTitle: devPortalConstant.months,
    yTitle: devPortalConstant.projects,
    subtitle: "(Last 6 months)",
  };
  return { data: projectsChartDetails };
};

export const formateContributionsData = (KEYWORD: string, commits: any[], isCumulative: boolean = false) => {
  const keys: any[] = [];
  const values: any[] = [];
  commits.forEach((obj) => {
    const key = Object.keys(obj)[0];
    const value = Object.values(obj)[0];
    keys.push(key);
    values.push(value);
  });

  const contributionsChartDetails: ChartConfigInterface = {
    chartType: "line",
    chartTitle: isCumulative
      ? devPortalConstant.activeContributionsCumulative
      : devPortalConstant.activeContributionsMonthly,
    xAxisValues: keys,
    yAxisValues: values,
    xTitle: devPortalConstant.months,
    yTitle: devPortalConstant.contributions,
    subtitle: "(Last 6 months)",
  };

  return { data: contributionsChartDetails };
};

export const formateDevelopersData = (KEYWORD: string, developers: any[], isCumulative: boolean = false) => {
  const keys: any[] = [];
  const values: any[] = [];
  developers.forEach((obj) => {
    const key = Object.keys(obj)[0];
    const value = Object.values(obj)[0];
    keys.push(key);
    values.push(value);
  });

  const contributionsChartDetails: ChartConfigInterface = {
    chartType: "bar",
    chartTitle: isCumulative ? devPortalConstant.activeDevelopersCumulative : devPortalConstant.activeDevelopersMonthly,
    xAxisValues: keys,
    yAxisValues: values,
    xTitle: devPortalConstant.months,
    yTitle: devPortalConstant.developers,
    subtitle: "(Last 6 months)",
  };

  return { data: contributionsChartDetails };
};
