import { monthsMap } from '@/app/constants';
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

    console.log("allProjects contributins", totalContributions.length)

    if (totalContributions.length > 0) {
      console.log("date", totalContributions[0].projects?.commit?.committer?.date)
      totalContributions.map((projects: any) => {
        const month = new Date(projects?.commit?.committer?.date).getMonth() + 1;
        const projectMonth = (monthsMap as any)[month];

        if (monthlyProjectCountMap.has(projectMonth)) {
          monthlyProjectCountMap.set(projectMonth, monthlyProjectCountMap.get(projectMonth) + 1)
        } else {
          monthlyProjectCountMap.set(projectMonth, 1)
        }
      })

      console.log("My Map conributions", monthlyProjectCountMap)
    }

    const currentMonth = (monthsMap as any)[new Date().getMonth() + 1];
    const sortedMonthsMap = sortContributionsMap(monthlyProjectCountMap, currentMonth)
    console.log("sortedMonthsMap:", sortedMonthsMap)

    const projectsChartDetails = {
      xAxisValues: sortedMonthsMap.keys(),
      yAxisValues: sortedMonthsMap.values(),
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
