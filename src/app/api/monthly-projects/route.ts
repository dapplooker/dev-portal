import { monthsMap } from '@/app/constants';
import { sortContributionsMap } from '@/app/lib/sortMap/sortMonths';
import monthlyChartsApi from '@/app/services/monthly-charts';
import statsApi from '@/app/services/stats';
import axios, { all } from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface ActiveProjectsMonlthy {
  total_count: number;
  incomplete_results: boolean;
  items: Array<Object>;
}

async function getResponse(req: any): Promise<any> {
  try {

    let allProjectsList: any[] = [];
    const monthlyProjectCountMap = new Map();
    let responseLen = 0;
    let page = 1;

    do {
      let response: ActiveProjectsMonlthy = await monthlyChartsApi.getMonthlyProjects('thegraph', page);
      allProjectsList = [...allProjectsList, ...response?.items || []];
      page += 1;
      responseLen = response.items.length;
    } while (responseLen >= 100);

    console.log("allProjects", allProjectsList.length)

    if (allProjectsList.length > 0) {
      allProjectsList.map((projects: any) => {
        const month = new Date(projects?.created_at).getMonth() + 1;
        const projectMonth = (monthsMap as any)[month];

        if (monthlyProjectCountMap.has(projectMonth)) {
          monthlyProjectCountMap.set(projectMonth, monthlyProjectCountMap.get(projectMonth) + 1)
        } else {
          monthlyProjectCountMap.set(projectMonth, 1)
        }
      })

      console.log("My Map", monthlyProjectCountMap)
      console.log("My Map", monthlyProjectCountMap.keys())
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
