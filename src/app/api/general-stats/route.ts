import { NextRequest, NextResponse } from 'next/server';
import statsApi from '../../services/stats/index';
import { FormattedGeneralStatsResponse } from '@/app/interface';

async function getResponse(req: any): Promise<any> {
  const KEYWORD = req.nextUrl.searchParams.get("keyword")
  try {
    const totalDevelopersWithinAMonth: number = (await statsApi.getTotalDevelopers(KEYWORD, { withinLast30Days: true })).total_count;
    const totalDevelopers: number = (await statsApi.getTotalDevelopers(KEYWORD)).total_count;
    const totalProjects: number = (await statsApi.getTotalProjects(KEYWORD)).total_count;
    const totalProjectsWithinAMonth: number = (await statsApi.getTotalProjects(KEYWORD, { withinLast30Days: true })).total_count;
    const totalCommits: number = (await statsApi.getTotalCommits(KEYWORD)).total_count;
    const totalCommitsWithinAMonth: number = (await statsApi.getTotalCommits(KEYWORD, { withinLast30Days: true })).total_count;
    const totalPrs: number = (await statsApi.getTotalPrs(KEYWORD)).total_count;
    const totalPrsWithinAMonth: number = (await statsApi.getTotalPrs(KEYWORD, true)).total_count;

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
