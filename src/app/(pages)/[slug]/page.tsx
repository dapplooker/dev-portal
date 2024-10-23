import { default as devPortalConstant } from "@/app/_components/dev-portal/constants";
import { getContributionsData, getDevelopersData, getProjectData } from "@/app/lib/chartApis/chartApis";
import DevPortalContainer from "@/app/container/DevPortalContainer";
import {
  fetchEcosystemGrowthMetrics,
  fetchGeneralStatsData,
  fetchProjectsCommitsDevelopersCount,
  fetchTopDappsData,
  fetchTopDevelopersData,
} from "@/app/services/FetchInitialData";
import ErrorComponent from "@/app/_components/ui/components/Error/ErrorComponent";
import { Container } from "@/app/_components/ui/styledComponents/Container.styled";
import { commonLabels } from "@/app/constants";
import styles from "./page.module.scss";

export default async function Page({ params }: { params: { slug: string }}) {
  const protocolList = commonLabels.protocolList;
  const currentProtocol = protocolList[params.slug as "the-graph" | "celo"].protocolId || null;

  if (currentProtocol == null) {
    return (
      <Container className={styles.errorContainer}>
        <ErrorComponent
          errorTitle="404"
          errorDescription="Page does not exist"
        />
      </Container>
    );
  }

  const cumulativeMonthlyProjectsCommitsDevelopersCount = await fetchProjectsCommitsDevelopersCount(
    true,
    currentProtocol
  );

  const cumulativeMonthlyprojects = await getProjectData(
    devPortalConstant.SEARCH_KEYWORD,
    cumulativeMonthlyProjectsCommitsDevelopersCount.projects,
    true
  );
  const cumulativeMonthlycontributions = await getContributionsData(
    devPortalConstant.SEARCH_KEYWORD,
    cumulativeMonthlyProjectsCommitsDevelopersCount.commits,
    true
  );
  const cumulativeMonthlydevelopers = await getDevelopersData(
    devPortalConstant.SEARCH_KEYWORD,
    cumulativeMonthlyProjectsCommitsDevelopersCount.developers,
    true
  );

  const topDevelopers = await fetchTopDevelopersData(currentProtocol);
  const topDapps = await fetchTopDappsData(currentProtocol);
  const generalStats = await fetchGeneralStatsData(currentProtocol);
  const ecosystemGrowthMetrics = await fetchEcosystemGrowthMetrics(currentProtocol);

  return (
    <DevPortalContainer
      generalStats={generalStats}
      cumulativeMonthlycontributions={cumulativeMonthlycontributions}
      cumulativeMonthlydevelopers={cumulativeMonthlydevelopers}
      cumulativeMonthlyprojects={cumulativeMonthlyprojects}
      ecosystemGrowthMetrics={ecosystemGrowthMetrics}
      topDevelopers={topDevelopers}
      topDapps={topDapps}
      protocol={protocolList[params.slug as "the-graph" | "celo"]}
    />
  );
}
