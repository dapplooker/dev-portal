import axios from "axios";
import styles from "./layout.module.scss";
import GeneralStats from "@/app/_components/dev-portal/container/GeneralStats";
import { FormattedGeneralStatsResponse } from "@/app/interface";
import env from "@/app/constants/common/labels";
import MonthlyCharts from "@/app/_components/dev-portal/components/MonthlyCharts";
import EcosystemGrowthMetrics from "@/app/_components/dev-portal/container/EcosystemGrowthMetrics";
import TableContainer from "@/app/_components/dev-portal/container/TableContainer";

const getGeneralStatsData = async () => {
  const res: any = await axios.get(`${env.NEXT_SERVER_RESTFUL_API_END_POINT}/api/search-stats`);
  const generalStatsData: FormattedGeneralStatsResponse[] = res.data?.data;
  return generalStatsData;
};

export default async function TheGraphDevPortalPage() {
  // const generalStatsData = await getGeneralStatsData();

  return (
    <main className={`${styles.layoutContent} bitool-container`}>
      {/* <GeneralStats data={generalStatsData} /> */}
      {/* <MonthlyCharts /> */}
      {/* <EcosystemGrowthMetrics /> */}
      <TableContainer />
    </main>
  );
}
