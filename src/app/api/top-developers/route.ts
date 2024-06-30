import { FormattedTopDevsInterface } from '@/app/interface';
import { sortAndTakeTopEntries } from '@/app/lib/sortMap/sortDevelopers';
import tableApi from '@/app/services/table';
import { NextRequest, NextResponse } from 'next/server';

interface ActiveProjectsMonlthy {
  total_count: number;
  incomplete_results: boolean;
  items: Array<Object>;
}

async function getResponse(req: any): Promise<any> {
  try {

    let topRepos: any[] = [];
    const topDevelopersMap = new Map();
    let responseLen = 0;
    let page = 1;

    do {
      let response: ActiveProjectsMonlthy = await tableApi.getTopDevelopers('thegraph', page);
      topRepos = [...topRepos, ...response?.items || []];
      page += 1;
      responseLen = response?.items?.length || 0;
    } while (responseLen >= 100);

    console.log("top Repos", topRepos.length)

    //Get Top Developers
    if (topRepos.length > 0) {
      topRepos.map((repository: any) => {
        const developerName = repository?.owner?.login;

        if (topDevelopersMap.has(developerName)) {
          topDevelopersMap.set(developerName, topDevelopersMap.get(developerName) + 1)
        } else {
          topDevelopersMap.set(developerName, 1)
        }
      })

      console.log("Top Developers Map", topDevelopersMap)
    }

    const top10Developers = sortAndTakeTopEntries(topDevelopersMap, 10);

    const formattedDetails: FormattedTopDevsInterface[] = [];
    top10Developers.forEach(async (value: number, key: string) => {
      const commits = await getCommitsDetails(key);
      formattedDetails.push({
        name: key,
        commits: commits || 0
      })
      console.log("formatted PUSH", formattedDetails)
    });

    console.log("formattedDetails", formattedDetails)
    return NextResponse.json({ data: formattedDetails }, { status: 201 });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

async function getCommitsDetails(authorName: string) {
  try {
    console.log("fetching 30days commits for author", authorName);
    let response: ActiveProjectsMonlthy = await tableApi.getDevelopersCommits(authorName, 1);
    return response.total_count;
  } catch (error) {
    console.error('Error while fetching commits for author:', authorName);
  }
}


export async function GET(req: NextRequest): Promise<any> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
