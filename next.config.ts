// import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  // experimental: {
  //   ppr: "incremental",
  //   // after: true,
  // },
  devIndicators: {
    appIsrStatus: true,
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },
};



// next.config.mjs
import { withSentryConfig } from "@sentry/nextjs";

export default withSentryConfig(nextConfig, {
    org: "hardik-kharb",
    project: "javascript-nextjs",
    silent: !process.env.CI,
    widenClientFileUpload: true,
    reactComponentAnnotation: {
      enabled: true,
    },
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  }
);



// SENTRY_AUTH_TOKEN=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