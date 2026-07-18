import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three.js ships untranspiled ESM examples; keep it on the transpile list.
  transpilePackages: ["three"],
  // CI sets these for the GitHub Pages static deploy; local dev and Vercel
  // builds leave them unset and behave as a normal Next.js app.
  output: process.env.NEXT_OUTPUT === "export" ? "export" : undefined,
  basePath: process.env.NEXT_BASE_PATH || undefined,
  // Folder-style URLs so GitHub Pages serves /pricing/ directly.
  trailingSlash: true,
};

export default nextConfig;
