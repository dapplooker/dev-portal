import React from "react";
import { ArchiveIcon, CodeIcon, CommitIcon, DashboardIcon } from "@radix-ui/react-icons";
import { FormattedGeneralStatsResponse } from "@/app/interface";
import devPortalConstant from "../constants";
import { errorLabels } from "@/app/constants";
import styles from "./StatsCard.module.scss";

const menuIconMap: { [key: string]: React.ElementType } = {
  code: CodeIcon,
  dashboard: DashboardIcon,
  commit: CommitIcon,
  archive: ArchiveIcon,
};

interface StatsCardProps {
  statsData: FormattedGeneralStatsResponse;
}

const StatsCard = ({ statsData }: StatsCardProps) => {
  const MenuIconComponent = menuIconMap[statsData.icon];

  return (
    <div className={styles.statsCard}>
      {!statsData?.totalCount ? (
        <span className={styles.errorText}>{errorLabels.oopsNoDataFound}</span>
      ) : (
        <>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>{statsData.title}</h3>
            <MenuIconComponent className={styles.icon} />
          </div>
          <h2 className={styles.totalCount}>{statsData.totalCount}</h2>
          {statsData.title !== "PR Raised" && (
            <h4 className={styles.subCount}>
              +{statsData.last30DaysCount} {devPortalConstant.inlast30Days}
            </h4>
          )}
        </>
      )}
    </div>
  );
};

export default StatsCard;
