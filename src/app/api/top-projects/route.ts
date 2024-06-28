import tableApi from '@/app/services/table';
import { NextRequest, NextResponse } from 'next/server';

interface ActiveProjectsMonlthy {
  total_count: number;
  incomplete_results: boolean;
  items: RepositoriesInterface[];
}

interface RepositoriesInterface {
  full_name: string;
  language: string;
  forks_count: number;
  stargazers_count: number;
  owner: {
    avatar_url: string;
  }
}

async function getResponse(req: any): Promise<any> {
  try {

    const response: ActiveProjectsMonlthy = await tableApi.getTopProjects('thegraph');
    const topProjects = response.items;
    console.log("topProjects", topProjects);

    const formattedTopProjects: any[] = [];
    topProjects.forEach(async (project) => {
      formattedTopProjects.push({
        projectName: project?.full_name,
        avatarUrl: project?.owner?.avatar_url,
        language: project?.language,
        forksCount: project?.forks_count,
        starsCount: project?.stargazers_count
      })
    })

    console.log("formattted Projects", formattedTopProjects)
    return NextResponse.json({ data: formattedTopProjects }, { status: 201 });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

const getProjectDevelopers = async (fullName: string) => {
  try {
    let page = 1;
    let totalContributors = 0;
    while (true) {
      const contributors = await tableApi.getTotalProjectDevelopers(fullName, page);
      totalContributors += contributors.length;

      if (contributors.length < 100) break;
      page++;
    }

    console.log("totalContributors", totalContributors)
    return totalContributors;
  } catch (error) {
    console.error("Error", error);
  }
}

const getTotalContributions = async (fullName: string) => {
  try {
    let page = 1;
    let totalContributions = 0;
    while (true) {
      const commits = await tableApi.getTotalProjectContributions(fullName, page);
      totalContributions += commits.length;

      if (commits.length < 100) break;
      page++;
    }

    console.log("totalContributions", totalContributions)
    return totalContributions;
  } catch (error) {
    console.error("Error", error);
  }
}



export async function GET(req: NextRequest): Promise<any> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
