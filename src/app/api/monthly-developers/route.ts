import { NextRequest, NextResponse } from 'next/server';
import moment from 'moment';
import { ActiveMonthlyInterface, ChartConfigInterface } from '@/app/interface';
import SortApiData from '@/app/lib/sortData/sortData';
import monthlyChartsApi from '@/app/services/monthly-charts';
import devPortalConstant from '@/app/_components/dev-portal/constants';
import staticData from '@/app/lib/staticData/staticData';

async function getResponse(req: any): Promise<any> {
  const KEYWORD = req.nextUrl.searchParams.get("keyword")
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

    // if (totalDevelopers?.length > 0) {
    //   totalDevelopers.map((projects: any) => {
    //     const month = new Date(projects?.commit?.committer?.date).getMonth() + 1;
    //     const projectMonth = (monthsMap as any)[month];

    //     if (monthlyProjectCountMap.has(projectMonth)) {
    //       monthlyProjectCountMap.set(projectMonth, monthlyProjectCountMap.get(projectMonth) + 1)
    //     } else {
    //       monthlyProjectCountMap.set(projectMonth, 1)
    //     }
    //   })
    // }

    // console.log("totalDevelopers::monthlyProjectCountMap", monthlyProjectCountMap);

    // const currentMonth = (monthsMap as any)[new Date().getMonth() + 1];
    // const sortedMonthsMap = SortApiData.sortContributionsMap(monthlyProjectCountMap, currentMonth)

    const contributionsChartDetails: ChartConfigInterface = {
      chartType: "bar",
      chartTitle: devPortalConstant.activeDevelopersMonthly,
      xAxisValues: Array.from(developersMap.keys()),
      yAxisValues: Array.from(developersMap.values()),
      xTitle: devPortalConstant.months,
      yTitle: devPortalConstant.developers,
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
