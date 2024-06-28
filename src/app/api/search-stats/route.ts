import { NextRequest, NextResponse } from 'next/server';
import statsApi from '../../services/stats/index';

async function getResponse(req: any): Promise<any> {
  try {
    // let response = await axios.get(`https://api.github.com/search/users?q=subgraphs`);
    const totalDevelopersWithinAMonth: number = (await statsApi.getTotalDevelopers('thegraph', { withinLast30Days: true })).total_count;
    const totalDevelopers: number = (await statsApi.getTotalDevelopers('thegraph')).total_count;
    const totalProjects: number = (await statsApi.getTotalProjects('thegraph')).total_count;
    const totalProjectsWithinAMonth: number = (await statsApi.getTotalProjects('thegraph', { withinLast30Days: true })).total_count;
    const totalCommits: number = (await statsApi.getTotalCommits('thegraph')).total_count;
    const totalCommitsWithinAMonth: number = (await statsApi.getTotalCommits('thegraph', { withinLast30Days: true })).total_count;
    const totalPrs: number = (await statsApi.getTotalPrs('thegraph')).total_count;
    const totalPrsWithinAMonth: number = (await statsApi.getTotalPrs('thegraph', true)).total_count;
    const responseData = {
      totalDevelopersCount: totalDevelopers,
      totalDevelopersWithinAMonthCount: totalDevelopersWithinAMonth,
      totalProjectsCount: totalProjects,
      totalProjectsWithinAMonthCount: totalProjectsWithinAMonth,
      totalCommitsCount: totalCommits,
      totalCommitsWithinAMonthCount: totalCommitsWithinAMonth,
      totalPrCount: totalPrs,
      totalPrWithinAMonthCount: totalPrsWithinAMonth,
    };
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
