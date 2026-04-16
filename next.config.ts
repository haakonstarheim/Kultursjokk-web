import type { NextConfig } from "next";

/**
 * Next.js-konfigurasjon for Kultursjokk
 *
 * Vi holder denne minimal i starten. Når vi senere legger til
 * bildehosting (Supabase Storage) må `images.remotePatterns`
 * utvides med det tilhørende domenet.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Tillat eksterne bildekilder vi vil bruke senere (tom foreløpig)
    remotePatterns: [],
  },
};

export default nextConfig;
