import devPortalConstant from '@/app/_components/dev-portal/constants';
import { monthsMap } from '@/app/constants';
import { ChartConfigInterface } from '@/app/interface';
import { sortContributionsMap } from '@/app/lib/sortMap/sortMonths';
import monthlyChartsApi from '@/app/services/monthly-charts';
import { NextRequest, NextResponse } from 'next/server';

interface ActiveProjectsMonlthy {
  total_count: number;
  incomplete_results: boolean;
  items: Array<Object>;
}

async function getResponse(req: any): Promise<any> {
  try {

    let totalContributions: any[] = [];
    const monthlyProjectCountMap = new Map();
    let responseLen = 0;
    let page = 1;

    do {
      let response: ActiveProjectsMonlthy = await monthlyChartsApi.getMonthlyContributions('thegraph', page);
      totalContributions = [...totalContributions, ...response?.items || []];
      page += 1;
      responseLen = response?.items?.length || 0;
    } while (responseLen >= 100);

    if (totalContributions.length > 0) {
      totalContributions.map((projects: any) => {
        const month = new Date(projects?.commit?.committer?.date).getMonth() + 1;
        const projectMonth = (monthsMap as any)[month];

        if (monthlyProjectCountMap.has(projectMonth)) {
          monthlyProjectCountMap.set(projectMonth, monthlyProjectCountMap.get(projectMonth) + 1)
        } else {
          monthlyProjectCountMap.set(projectMonth, 1)
        }
      })
    }

    const currentMonth = (monthsMap as any)[new Date().getMonth() + 1];
    const sortedMonthsMap = sortContributionsMap(monthlyProjectCountMap, currentMonth)

    const contributionsChartDetails: ChartConfigInterface = {
      chartType: "line",
      chartTitle: devPortalConstant.activeContributionsMonthly,
      xAxisValues: Array.from(sortedMonthsMap.keys()),
      yAxisValues: Array.from(sortedMonthsMap.values()),
      xTitle: devPortalConstant.months,
      yTitle: devPortalConstant.contributions,
    }

    return NextResponse.json({ data: contributionsChartDetails }, { status: 201 });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest): Promise<any> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';