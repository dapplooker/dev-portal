export interface ChartConfigInterface {
  chartType?: string,
  xAxisValues: any[],
  yAxisValues: any[];
  chartTitle: string;
  xTitle: string;
  yTitle: string;
  strokeColor?: string;
}

export interface RadialBarChartsConfigInterface {
  chartType: string,
  percentage: number,
}

export interface FormattedGeneralStatsResponse {
  title: string;
  totalCount: number;
  last30DaysCount: number;
  icon: string;
}

export interface FormattedEcosystemMetricsInterface {
  title: string;
  totalCount: number;
  percentage: number;
}

export interface FormattedTopDevsInterface {
  [key: string]: string | number | {};
}

export interface FormattedTopDappsInterface {
  [key: string]: string | number;
}

export interface RepositoriesInterface {
  full_name: string;
  language: string;
  forks_count: number;
  stargazers_count: number;
  owner: {
    avatar_url: string;
  }
}

export interface ProjectInfo {
  title: string;
  avatarUrl: string;
}

export interface ActiveMonthlyInterface {
  total_count: number;
  incomplete_results: boolean;
  items: Array<Object>;
}

export interface MonthlyChartConfig {
  activeProjects: {
    options?: any;
    series?: any;
  },
  activeContributions: {
    options?: any;
    series?: any;
  }
}

export interface MonthRange {
  month: string;
  range: string;
};

export interface StackedBarChartData {
  yAxisTitle: string;
  yAxisValues: any[];
  color: string;
};