/*
 * @Date: 2026-01-11 13:02:14
 * @LastEditTime: 2026-01-12 19:57:08
 * @FilePath: \NextChat\app\layout.tsx
 */
/* eslint-disable @next/next/no-page-custom-font */
import "./styles/globals.scss";
import "./styles/markdown.scss";
import "./styles/highlight.scss";
import { getClientConfig } from "./config/client";
import type { Metadata, Viewport } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleTagManager, GoogleAnalytics } from "@next/third-parties/google";
import { getServerSideConfig } from "./config/server";

export const metadata: Metadata = {
  title: "DeepSeek",
  description: "办公助手",
  appleWebApp: {
    title: "DeepSeek",
    statusBarStyle: "default",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#151515" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverConfig = getServerSideConfig();

  return (
    <html lang="en">
      <head>
        <meta name="config" content={JSON.stringify(getClientConfig())} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="manifest"
          href="/site.webmanifest"
          crossOrigin="use-credentials"
        ></link>
        <script src="/serviceWorkerRegister.js" defer></script>
      </head>
      <body>
        {children}
        {serverConfig?.isVercel && (
          <>
            <SpeedInsights />
          </>
        )}
        {serverConfig?.gtmId && (
          <>
            <GoogleTagManager gtmId={serverConfig.gtmId} />
          </>
        )}
        {serverConfig?.gaId && (
          <>
            <GoogleAnalytics gaId={serverConfig.gaId} />
          </>
        )}
      </body>
    </html>
  );
}
