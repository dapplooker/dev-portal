import { Suspense } from "react";
import { Instrument_Sans } from "next/font/google";
import "./globals.scss";

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
        <Suspense>{children}</Suspense>
      </body>
    </html>
  );
}
