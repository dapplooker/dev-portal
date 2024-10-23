import { Instrument_Sans } from "next/font/google";
import { Suspense } from "react";
import Footer from "./_components/ui/components/Footer/Footer";
import "./globals.scss";
import styles from "./layout.module.scss";

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      style={{ colorScheme: "dark" }}
    >
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </head>
      <body className={instrumentSans.className}>
        <Suspense>
          <section>
            <main className={styles.main}>
              {children}
              <Footer />
            </main>
          </section>
        </Suspense>
      </body>
    </html>
  );
}
