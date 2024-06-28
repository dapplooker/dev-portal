import { Metadata } from "next";
import { metaData } from "@/app/constants/common/metaData";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
  title: metaData.title,
  description: metaData.description,
  twitter: {
    title: metaData.title,
    description: metaData.description,
    images: [metaData.image],
    site: metaData.site,
    card: "summary_large_image",
  },
  openGraph: {
    title: metaData.title,
    description: metaData.description,
    images: [metaData.image],
    type: "website",
    url: metaData.domain,
    siteName: metaData.siteName,
  },
};

export default async function DevPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <main className={styles.main}>
        <div className={styles.titleWrapper}>
          <h1 className={`${styles.pageTitle}`}>The Graph Developer Ecosystem</h1>
        </div>
        {children}
      </main>
    </section>
  );
}
