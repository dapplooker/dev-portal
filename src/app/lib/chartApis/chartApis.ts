import devPortalConstant from "@/app/_components/dev-portal/constants";
import { ActiveMonthlyInterface, ChartConfigInterface } from "@/app/interface";
import monthlyChartsApi from "@/app/services/monthly-charts";
import SortApiData from "../sortData/sortData";
import staticData from "../staticData/staticData";
import moment from "moment";

export const getProjectData = async (searchKeyword: string) => {
  try {
    const projectsMap = staticData.totalProjectsLastSixMonths;
    const startDate = staticData.fetchDataStartDate;
    const currentDate = moment().format("YYYY-MM-DD");
    const dateRange = SortApiData.getMonthRanges(startDate, currentDate);

    for (let dateItem in dateRange) {
      const dateObj = dateRange[dateItem];
      let response: ActiveMonthlyInterface = await monthlyChartsApi.getMonthlyProjects(searchKeyword, dateObj.range);
      const contributionCount = response?.total_count;

      if (projectsMap.has(dateObj.month)) {
        projectsMap.set(dateObj.month, projectsMap.get(dateObj.month)! + contributionCount);
      } else {
        projectsMap.set(dateObj.month, contributionCount);
      }
    }

    const projectsChartDetails: ChartConfigInterface = {
      chartType: "line",
      chartTitle: devPortalConstant.activeProjectsMonthly,
      xAxisValues: Array.from(projectsMap.keys()),
      yAxisValues: Array.from(projectsMap.values()),
      xTitle: devPortalConstant.months,
      yTitle: devPortalConstant.projects,
    };

    return { data: projectsChartDetails };

  } catch (error) {
    console.error("Error", error);
    return { data: {} }
  }
};

export const getContributionsData = async (KEYWORD: string) => {
  try {

    const contributionsMap = staticData.totalContributionLastSixMonths;
    const startDate = staticData.fetchDataStartDate;
    const currentDate = moment().format('YYYY-MM-DD');
    const dateRange = SortApiData.getMonthRanges(startDate, currentDate);

    for (let dateItem in dateRange) {
      const dateObj = dateRange[dateItem]
      let response: ActiveMonthlyInterface = await monthlyChartsApi.getMonthlyContributions(KEYWORD, dateObj.range);
      const contributionCount = response?.total_count;

      if (contributionsMap.has(dateObj.month)) {
        contributionsMap.set(dateObj.month, contributionsMap.get(dateObj.month)! + contributionCount)
      } else {
        contributionsMap.set(dateObj.month, contributionCount)
      }
    }

    const contributionsChartDetails: ChartConfigInterface = {
      chartType: "line",
      chartTitle: devPortalConstant.activeContributionsMonthly,
      xAxisValues: Array.from(contributionsMap.keys()),
      yAxisValues: Array.from(contributionsMap.values()),
      xTitle: devPortalConstant.months,
      yTitle: devPortalConstant.contributions,
    }

    return { data: contributionsChartDetails };
  } catch (error) {
    console.error("Error", error);
    return { data: {} }
  }
};

export const getDevelopersData = async (KEYWORD: string) => {
  try {

    const developersMap = staticData.totalDevelopersLastSixMonths;
    const startDate = staticData.fetchDataStartDate;
    const currentDate = moment().format('YYYY-MM-DD');
    const dateRange = SortApiData.getMonthRanges(startDate, currentDate);

    for (let dateItem in dateRange) {
      const dateObj = dateRange[dateItem]

      let totalCommits: any[] = [];
      let responseLen = 0;
      let page = 1;

      do {
        let response: ActiveMonthlyInterface = await monthlyChartsApi.getMonthlyDevelopers(KEYWORD, dateObj.range, page);
        totalCommits = [...totalCommits, ...response?.items || []];
        page += 1;
        responseLen = response?.items?.length || 0;
      } while (responseLen >= 100);


      let uniqueDevelopers = new Set<string>();
      totalCommits.forEach((item: any) => {
        const author = item?.commit?.author;
        uniqueDevelopers.add(`${author.name} <${author.email}>`);
      });

      if (developersMap.has(dateObj.month)) {
        developersMap.set(dateObj.month, developersMap.get(dateObj.month)! + uniqueDevelopers.size)
      } else {
        developersMap.set(dateObj.month, uniqueDevelopers.size)
      }
    }

    const contributionsChartDetails: ChartConfigInterface = {
      chartType: "bar",
      chartTitle: devPortalConstant.activeDevelopersMonthly,
      xAxisValues: Array.from(developersMap.keys()),
      yAxisValues: Array.from(developersMap.values()),
      xTitle: devPortalConstant.months,
      yTitle: devPortalConstant.developers,
    }

    return { data: contributionsChartDetails };
  } catch (error) {
    console.error("Error", error);
    return { data: {} }
  }
};