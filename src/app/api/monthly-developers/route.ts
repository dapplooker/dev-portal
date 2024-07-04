import { NextRequest, NextResponse } from 'next/server';
import { ActiveMonthlyInterface, ChartConfigInterface } from '@/app/interface';
import SortApiData from '@/app/lib/sortData/sortData';
import monthlyChartsApi from '@/app/services/monthly-charts';
import devPortalConstant from '@/app/_components/dev-portal/constants';
import { monthsMap } from '@/app/constants';

async function getResponse(req: any): Promise<any> {
  const KEYWORD = req.nextUrl.searchParams.get("keyword")
  try {
    let totalDevelopers: any[] = [];
    const monthlyProjectCountMap = new Map();
    let responseLen = 0;
    let page = 1;

    do {
      let response: ActiveMonthlyInterface = await monthlyChartsApi.getMonthlyContributions(KEYWORD, page);
      totalDevelopers = [...totalDevelopers, ...response?.items || []];
      page += 1;
      responseLen = response?.items?.length || 0;
    } while (responseLen >= 100);

    if (totalDevelopers?.length > 0) {
      totalDevelopers.map((projects: any) => {
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
    const sortedMonthsMap = SortApiData.sortContributionsMap(monthlyProjectCountMap, currentMonth)

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
