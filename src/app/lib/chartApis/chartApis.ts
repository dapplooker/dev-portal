import devPortalConstant from "@/app/_components/dev-portal/constants";
import { ChartConfigInterface } from "@/app/interface";
import moment from "moment";

const shouldSkipMonth = (range: string): boolean => {
  const rangeStartDate = range.split("..")[0];
  const month = moment(rangeStartDate).format("YYYY-MM");
  const today = moment();

  return month === today.format("YYYY-MM") && today.date() < 21;
};

export const getProjectData = async (searchKeyword: string, projects: any[], isCumulative: boolean) => {
  try {
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
      subtitle: '(Last 6 months)'
    };

    return { data: projectsChartDetails };
  } catch (error) {
    console.error("Error", error);
    return { data: {} };
  }
};

export const getContributionsData = async (KEYWORD: string, commits: any[], isCumulative: boolean = false) => {
  try {
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
      subtitle: '(Last 6 months)'
    };

    return { data: contributionsChartDetails };
  } catch (error) {
    console.error("Error", error);
    return { data: {} };
  }
};

export const getDevelopersData = async (KEYWORD: string, developers: any[], isCumulative: boolean = false) => {
  try {
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
      chartTitle: isCumulative
        ? devPortalConstant.activeDevelopersCumulative
        : devPortalConstant.activeDevelopersMonthly,
      xAxisValues: keys,
      yAxisValues: values,
      xTitle: devPortalConstant.months,
      yTitle: devPortalConstant.developers,
      subtitle: '(Last 6 months)'
    };

    return { data: contributionsChartDetails };
  } catch (error) {
    console.error("Error", error);
    return { data: {} };
  }
};
