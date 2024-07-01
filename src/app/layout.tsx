import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.scss";

const instrumentSans = Instrument_Sans({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dev Portal",
  description: "Dev Portal",
};

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
      <body className={instrumentSans.className}>{children}</body>
    </html>
  );
}
