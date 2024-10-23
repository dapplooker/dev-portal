
import Link from "next/link";
import { commonLabels } from "@/app/constants";
import { errorLabels } from "@/app/constants";
import styles from "./ErrorComponent.module.scss";

interface ErrorComponentProps {
  errorTitle?: string;
  errorDescription?: string;
  redirectLink?: string;
  redirectLinkText?: string;
  isRedirectToNewPage?: boolean;
  isShowCta?: boolean;
}
const ErrorComponent = ({
  errorDescription = errorLabels.insufficientData,
  errorTitle = errorLabels.noDataFound,
  redirectLink,
  redirectLinkText,
  isRedirectToNewPage,
  isShowCta,
}: ErrorComponentProps) => {
  const target = isRedirectToNewPage ? "_blank" : "";
  return (
    <div className={styles.wrapperContainer}>
      <div className={styles.errorContainer}>
        <img
          src={`${commonLabels.CLOUDFRONT_BASE_URL}/assets/svg/sever-error-icon.svg`}
          alt="not found error"
          className={styles.errorSymbol}
        />
        <h1 className={styles.errorTitle}>{errorTitle}</h1>
        <p className={styles.errorDescription}>
          {errorDescription}{" "}
          {redirectLink && (
            <Link
              target={target}
              className={styles.errorRedirectLink}
              href={redirectLink}
            >
              {redirectLinkText}
            </Link>
          )}
        </p>
        {isShowCta && <button className={styles.tryAgainCta}>Try Again</button>}
      </div>
    </div>
  );
};

export default ErrorComponent;
