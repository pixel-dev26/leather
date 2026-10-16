import type { Metadata } from "next";
import "./home.css";

// The version list has its own root layout, so the versions' globals.css never touches it (and its plain element
// styles never reach them). Fonts load from Google Fonts exactly as the earlier static list did.
export const metadata: Metadata = {
  title: "Morucha | Homepage versions",
  robots: { index: false },
};

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500&family=Jost:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      {/* browser extensions (e.g. Grammarly) add attributes to <html>/<body> before React loads */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
