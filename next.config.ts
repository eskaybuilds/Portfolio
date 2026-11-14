import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // GitHub Pages serves plain files: build to out/ and skip the image optimiser, which needs a server.
  output: "export",
  trailingSlash: true, // every page becomes a folder with index.html, which any static host serves
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default createMDX()(nextConfig);
