import { NextRequest, NextResponse } from 'next/server';
import statsApi from '../../services/stats/index';
import { FormattedEcosystemMetricsInterface } from '@/app/interface';

async function getResponse(req: any): Promise<any> {
  const KEYWORD = req.nextUrl.searchParams.get("keyword")
  try {
    const totalDevelopersWithIn12Months: number = (await statsApi.getTotalDevelopers(KEYWORD, { withinLast12Months: true })).total_count;
    const totalDevelopersWithinSixMonths: number = (await statsApi.getTotalDevelopers(KEYWORD, { withinLastSixMonths: true })).total_count;

    const totalProjectsWithIn12Months: number = (await statsApi.getTotalProjects(KEYWORD, { withinLast12Months: true })).total_count;
    const totalProjectsWithinSixMonths: number = (await statsApi.getTotalProjects(KEYWORD, { withinLastSixMonths: true })).total_count;

    const totalContributionsWithIn12Months: number = (await statsApi.getTotalCommits(KEYWORD, { withinLast12Months: true })).total_count;
    const totalContributionsWithinSixMonths: number = (await statsApi.getTotalCommits(KEYWORD, { withinLastSixMonths: true })).total_count;

    const developersGrowth: number = Math.round((totalDevelopersWithinSixMonths / totalDevelopersWithIn12Months) * 100) || 0;
    const projectsGrowth: number = Math.round((totalProjectsWithinSixMonths / totalProjectsWithIn12Months) * 100) || 0;
    const contributionsGrowth: number = Math.round((totalContributionsWithinSixMonths / totalContributionsWithIn12Months) * 100) || 0;

    const responseData: FormattedEcosystemMetricsInterface[] = [
      {
        title: "New Developer",
        totalCount: totalDevelopersWithinSixMonths,
        percentage: developersGrowth,
      },
      {
        title: "New Repositories",
        totalCount: totalProjectsWithinSixMonths,
        percentage: projectsGrowth,
      },
      {
        title: "Contributions",
        totalCount: totalContributionsWithinSixMonths,
        percentage: contributionsGrowth,
      },
    ]

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
