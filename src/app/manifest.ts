import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BioDataEarth — Free Biodata Maker",
    short_name: "BioDataEarth",
    description:
      "Create beautiful biodatas for matrimonial, job resume, and business profiles. Instant PDF download.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7f0",
    theme_color: "#f97316",
    icons: [
      {
        src: "/app_icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/app_icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
