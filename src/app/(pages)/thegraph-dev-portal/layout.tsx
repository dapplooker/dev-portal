import { Metadata } from "next";
import { metaData } from "@/app/constants/common/metaData";
import styles from "./layout.module.scss";
import devPortalConstant from "@/app/_components/dev-portal/constants";
import Footer from "@/app/_components/ui/components/Footer/Footer";

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
        {children}
      </main>
      <Footer/>
    </section>
  );
}
