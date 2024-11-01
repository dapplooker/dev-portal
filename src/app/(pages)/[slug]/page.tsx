import { redirect } from "next/navigation";
import DevPortalContainer from "@/app/container/DevPortalContainer";
import { fetchPageData } from "@/app/_components/dev-portal/utils";
import { commonLabels } from "@/app/constants";
import Footer from "@/app/_components/ui/components/Footer/Footer";

export default async function Page({ params }: { params: { slug: string } }) {
  const protocolList: any = commonLabels.protocolList;

  const currentProtocol = protocolList[params.slug] || null;

  if (!currentProtocol) {
    const defaultProtocolEnd = commonLabels.theGraphProtocolEndpoint;
    redirect(`/${defaultProtocolEnd}`);
  }

  const {
    cumulativeMonthlyProjects,
    cumulativeMonthlyContributions,
    cumulativeMonthlyDevelopers,
    topDevelopers,
    topDapps,
    generalStats,
    ecosystemGrowthMetrics,
  } = await fetchPageData(currentProtocol.protocolId);

  return (
    <>
      <DevPortalContainer
        generalStats={generalStats}
        cumulativeMonthlyContributions={cumulativeMonthlyContributions}
        cumulativeMonthlyDevelopers={cumulativeMonthlyDevelopers}
        cumulativeMonthlyProjects={cumulativeMonthlyProjects}
        ecosystemGrowthMetrics={ecosystemGrowthMetrics}
        topDevelopers={topDevelopers}
        topDapps={topDapps}
        protocol={currentProtocol}
      />
      <Footer />
    </>
  );
}
