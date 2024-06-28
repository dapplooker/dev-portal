import { NextRequest, NextResponse } from 'next/server';
import statsApi from '../../services/stats/index';

async function getResponse(req: any): Promise<any> {
    try {
        const totalDevelopers: number = (await statsApi.getTotalDevelopers('thegraph')).total_count;
        const totalDevelopersWithinSixMonths: number = (await statsApi.getTotalDevelopers('thegraph', { withinLastSixMonths: true })).total_count;
        const totalProjects: number = (await statsApi.getTotalProjects('thegraph')).total_count;
        const totalProjectsWithinSixMonths: number = (await statsApi.getTotalProjects('thegraph', { withinLastSixMonths: true })).total_count;
        const totalContributions: number = (await statsApi.getTotalCommits('thegraph')).total_count;
        const totalContributionsWithinSixMonths: number = (await statsApi.getTotalCommits('thegraph', { withinLastSixMonths: true })).total_count;

        const developersGrowth: number = Math.round((totalDevelopersWithinSixMonths/totalDevelopers)*100);
        const projectsGrowth: number = Math.round((totalProjectsWithinSixMonths/totalProjects)*100);
        const contributionsGrowth: number = Math.round((totalContributionsWithinSixMonths/totalContributions)*100);

        const responseData = {
            new_developers_within_six_months: totalDevelopersWithinSixMonths,
            developers_growth_percentage: developersGrowth,
            new_repositories_within_six_months: totalProjectsWithinSixMonths,
            repositories_growth_percentage: projectsGrowth,
            new_contributions_within_six_months: totalContributionsWithinSixMonths,
            contributions_growth: contributionsGrowth,
        }
      
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