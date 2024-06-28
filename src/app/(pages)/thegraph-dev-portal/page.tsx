import axios from "axios";
import styles from "./layout.module.scss";
import GeneralStats from "@/app/_components/dev-portal/container/GeneralStats";
import { FormattedGeneralStatsResponse } from "@/app/_components/dev-portal/interface";
import env from "@/app/constants/common/labels";
import MonthlyCharts from "@/app/_components/dev-portal/components/MonthlyCharts";

const getGeneralStatsData = async () => {
  const res: any = await axios.get(`${env.NEXT_SERVER_RESTFUL_API_END_POINT}/api/search-stats`);
  const generalStatsData: FormattedGeneralStatsResponse[] = res.data?.data;
  return generalStatsData;
};

export default async function TheGraphDevPortalPage() {
  const generalStatsData = await getGeneralStatsData();

  return (
    <main className={`${styles.layoutContent} bitool-container`}>
      <GeneralStats data={generalStatsData} />
      <MonthlyCharts />
    </main>
  );
}
