import { FormattedTopDevsInterface } from '@/app/interface';
import { sortAndTakeTopEntries } from '@/app/lib/sortMap/sortDevelopers';
import tableApi from '@/app/services/table';
import { NextRequest, NextResponse } from 'next/server';

interface ActiveProjectsMonlthy {
  total_count: number;
  incomplete_results: boolean;
  items: {
    author: {
      login: string;
      avatar_url: string;
    };
  }[];
}

async function getResponse(req: any): Promise<any> {
  const KEYWORD = req.nextUrl.searchParams.get("keyword")
  try {
    let topRepos: any[] = [];
    const topDevelopersMap = new Map();
    let responseLen = 0;
    let page = 1;

    do {
      let response: ActiveProjectsMonlthy = await tableApi.getTopDevelopers(KEYWORD, page);
      topRepos = [...topRepos, ...response?.items || []];
      page += 1;
      responseLen = response?.items?.length || 0;
    } while (responseLen >= 100);

    //Get Top Developers
    if (topRepos.length > 0) {
      topRepos.map((repository: any) => {
        const developerName = repository?.author?.login;
        const isUser = repository?.author?.type === "User";

        if (topDevelopersMap.has(developerName)) {
          topDevelopersMap.set(developerName, topDevelopersMap.get(developerName) + 1)
        } else if (developerName && developerName?.length > 0 && isUser) {
          topDevelopersMap.set(developerName, 1)
        }
      })
    }

    const top10Developers = sortAndTakeTopEntries(topDevelopersMap, 10);

    const formattedDetails: FormattedTopDevsInterface[] = [];
    for (let [key, value] of top10Developers.entries() as any) {
      const commitsResponse = await getCommitsDetails(key);
      formattedDetails.push({
        "name": {
          title: key,
          avatarUrl: commitsResponse?.items[0]?.author?.avatar_url,
        },
        "commits": commitsResponse?.total_count || 0
      })
    }

    return NextResponse.json({ data: formattedDetails }, { status: 201 });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

const getCommitsDetails = async (authorName: string) => {
  try {
    let response: ActiveProjectsMonlthy = await tableApi.getDevelopersCommits(authorName, 1);
    return response;
  } catch (error) {
    console.error('Error while fetching commits for author:', authorName);
  }
}


export async function GET(req: NextRequest): Promise<any> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
