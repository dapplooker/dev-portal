import { RepositoriesInterface } from '@/app/interface';
import SortApiData from '@/app/lib/sortData/sortData';
import tableApi from '@/app/services/table';
import { NextRequest, NextResponse } from 'next/server';

interface ActiveProjectsMonlthy {
  total_count: number;
  incomplete_results: boolean;
  items: RepositoriesInterface[];
}

async function getResponse(req: any): Promise<any> {
  const KEYWORD = req.nextUrl.searchParams.get("keyword")
  try {
    const response: ActiveProjectsMonlthy = await tableApi.getTopProjects(KEYWORD);
    const topProjects = response.items;

    const sortedTop10Projects = SortApiData.sortTopProjects(topProjects);

    const formattedTopProjects: any[] = [];
    sortedTop10Projects.forEach(async (project, index) => {
      formattedTopProjects.push({
        "sr no": index + 1,
        "project name": {
          title: project?.full_name,
          avatarUrl: project?.owner?.avatar_url,
        },
        "language": project?.language || "Common",
        "forks": project?.forks_count,
        "stars": project?.stargazers_count
      })
    })

    return NextResponse.json({ data: formattedTopProjects }, { status: 201 });
  } catch (error) {
    console.error("Error while fetching top prjects: ", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

// const getProjectDevelopers = async (fullName: string) => {
//   try {
//     let page = 1;
//     let totalContributors = 0;
//     while (true) {
//       const contributors = await tableApi.getTotalProjectDevelopers(fullName, page);
//       totalContributors += contributors.length;

//       if (contributors.length < 100) break;
//       page++;
//     }
//     return totalContributors;
//   } catch (error) {
//     console.error("Error", error);
//   }
// }

// const getTotalContributions = async (fullName: string) => {
//   try {
//     let page = 1;
//     let totalContributions = 0;
//     while (true) {
//       const commits = await tableApi.getTotalProjectContributions(fullName, page);
//       totalContributions += commits.length;

//       if (commits.length < 100) break;
//       page++;
//     }
//     return totalContributions;
//   } catch (error) {
//     console.error("Error", error);
//   }
// }

export async function GET(req: NextRequest): Promise<any> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
