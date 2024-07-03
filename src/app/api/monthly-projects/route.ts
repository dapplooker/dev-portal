import { NextRequest, NextResponse } from 'next/server';
import { ActiveMonthlyInterface, ChartConfigInterface } from '@/app/interface';
import SortApiData from '@/app/lib/sortData/sortData';
import monthlyChartsApi from '@/app/services/monthly-charts';
import devPortalConstant from '@/app/_components/dev-portal/constants';
import { monthsMap } from '@/app/constants';

async function getResponse(req: any): Promise<any> {
  const KEYWORD = req.nextUrl.searchParams.get("keyword")
  try {
    let allProjectsList: any[] = [];
    const monthlyProjectCountMap = new Map();
    let responseLen = 0;
    let page = 1;

    do {
      let response: ActiveMonthlyInterface = await monthlyChartsApi.getMonthlyProjects(KEYWORD, page);
      allProjectsList = [...allProjectsList, ...response?.items || []];
      page += 1;
      responseLen = response?.items?.length;
    } while (responseLen >= 100);

    if (allProjectsList?.length > 0) {
      allProjectsList.map((projects: any) => {
        const month = new Date(projects?.created_at).getMonth() + 1;
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

    const projectsChartDetails: ChartConfigInterface = {
      chartType: "line",
      chartTitle: devPortalConstant.activeProjectsMonthly,
      xAxisValues: Array.from(sortedMonthsMap.keys()),
      yAxisValues: Array.from(sortedMonthsMap.values()),
      xTitle: devPortalConstant.months,
      yTitle: devPortalConstant.projects,
    }

    return NextResponse.json({ data: projectsChartDetails }, { status: 201 });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest): Promise<any> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
