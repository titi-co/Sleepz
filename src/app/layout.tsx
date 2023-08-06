import "./globals.css";
import type { Metadata } from "next";
import { Roboto_Flex } from "next/font/google";
import ThemeRegistry from "./ThemeRegistry";

const font = Roboto_Flex({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sleepz",
  description: "Get some sleep!",
  icons: ""
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
       <link rel="shortcut icon" href="/favicon.svg" sizes="32x32" />
       </head>
      <body className={font.className}>
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
