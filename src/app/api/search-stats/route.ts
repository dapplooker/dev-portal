import { NextRequest, NextResponse } from 'next/server';
import statsApi from '../../services/stats/index';
import { FormattedGeneralStatsResponse } from '@/app/_components/dev-portal/interface';

async function getResponse(req: any): Promise<any> {
  try {
    const totalDevelopersWithinAMonth: number = (await statsApi.getTotalDevelopers('thegraph', { withinLast30Days: true })).total_count;
    const totalDevelopers: number = (await statsApi.getTotalDevelopers('thegraph')).total_count;
    const totalProjects: number = (await statsApi.getTotalProjects('thegraph')).total_count;
    const totalProjectsWithinAMonth: number = (await statsApi.getTotalProjects('thegraph', { withinLast30Days: true })).total_count;
    const totalCommits: number = (await statsApi.getTotalCommits('thegraph')).total_count;
    const totalCommitsWithinAMonth: number = (await statsApi.getTotalCommits('thegraph', { withinLast30Days: true })).total_count;
    const totalPrs: number = (await statsApi.getTotalPrs('thegraph')).total_count;
    const totalPrsWithinAMonth: number = (await statsApi.getTotalPrs('thegraph', true)).total_count;

    const responseData: FormattedGeneralStatsResponse[] = [
      {
        title: "Developers",
        totalCount: totalDevelopers,
        last30DaysCount: totalDevelopersWithinAMonth,
        icon: "code"
      },
      {
        title: "Projects",
        totalCount: totalProjects,
        last30DaysCount: totalProjectsWithinAMonth,
        icon: "dashboard"
      },
      {
        title: "Commits",
        totalCount: totalCommits,
        last30DaysCount: totalCommitsWithinAMonth,
        icon: "commit"
      },
      {
        title: "PR Raised",
        totalCount: totalPrs,
        last30DaysCount: totalPrsWithinAMonth,
        icon: "archive"
      }
    ];
    return NextResponse.json({ data: responseData }, { status: 201 });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(req: NextRequest): Promise<any> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
