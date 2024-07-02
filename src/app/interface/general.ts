export interface ChartConfigInterface {
  chartType: string,
  xAxisValues: any[],
  yAxisValues: any[];
  chartTitle: string;
  xTitle: string;
  yTitle: string;
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