import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Explicitly set root to this project directory to prevent Next.js from
    // incorrectly inferring a parent workspace root from /Users/stufox/package-lock.json
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
