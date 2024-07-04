import { NextRequest, NextResponse } from 'next/server';
import moment from 'moment';
import { ActiveMonthlyInterface, ChartConfigInterface } from '@/app/interface';
import SortApiData from '@/app/lib/sortData/sortData';
import monthlyChartsApi from '@/app/services/monthly-charts';
import staticData from '@/app/lib/staticData/staticData';
import devPortalConstant from '@/app/_components/dev-portal/constants';

async function getResponse(req: any): Promise<any> {
  const KEYWORD = req.nextUrl.searchParams.get("keyword")
  try {

    const projectsMap = staticData.totalProjectsLastSixMonths;
    const startDate = staticData.fetchDataStartDate;
    const currentDate = moment().format('YYYY-MM-DD');
    const dateRange = SortApiData.getMonthRanges(startDate, currentDate);

    for (let dateItem in dateRange) {
      const dateObj = dateRange[dateItem]
      let response: ActiveMonthlyInterface = await monthlyChartsApi.getMonthlyProjects(KEYWORD, dateObj.range);
      const contributionCount = response?.total_count;

      if (projectsMap.has(dateObj.month)) {
        projectsMap.set(dateObj.month, projectsMap.get(dateObj.month)! + contributionCount)
      } else {
        projectsMap.set(dateObj.month, contributionCount)
      }
    }

    const projectsChartDetails: ChartConfigInterface = {
      chartType: "line",
      chartTitle: devPortalConstant.activeProjectsMonthly,
      xAxisValues: Array.from(projectsMap.keys()),
      yAxisValues: Array.from(projectsMap.values()),
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
