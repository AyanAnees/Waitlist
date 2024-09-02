import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Poppins } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

export const metadata: Metadata = {
  title: "contribu | waitlist",
  description: "waitlist for contribu, a platform for finding and collaborating on projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <Head>
          <link rel="icon" href="/favicon.ico" />
          <html lang="en">
              <body className={`${poppins.className}`}>{children}</body>
          </html>
      </Head>
  );
}
