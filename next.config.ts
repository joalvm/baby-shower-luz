import type { NextConfig } from "next";

function getGithubPagesBasePath() {
  if (process.env.GITHUB_PAGES !== "true") return "";

  const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
  if (!owner || !repo) return "";

  return repo.toLowerCase() === `${owner.toLowerCase()}.github.io` ? "" : `/${repo}`;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? getGithubPagesBasePath();

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  // Allow reaching the dev server from phones on the LAN (http://<ip>:3000).
  // Without the device's origin here, Next 16 blocks its dev/HMR requests and
  // the page never hydrates (no interactions, animations, or countdown).
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "192.168.1.36",
    "192.168.1.*",
    "192.168.*.*",
    "10.*.*.*",
  ],
  devIndicators: false,
};

export default nextConfig;
