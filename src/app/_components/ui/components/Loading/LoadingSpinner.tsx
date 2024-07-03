import React from "react";
import { commonLabels } from "@/app/constants";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={styles.loadingSpinner}>
      <div className={styles.spinIcon}></div>
      <h2 className={styles.loadingText}>{commonLabels.loading}</h2>
    </div>
  );
};

export default LoadingSpinner;
