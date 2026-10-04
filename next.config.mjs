/**
 * Build configuration. architecture.md ADR-016.
 *
 * The page is fully static: every route prerenders at build time, so there is
 * no server render on request. These settings are about what ships to the
 * browser and how long it is cached.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // This machine has a lockfile above the project, which made Next infer the
  // wrong workspace root and warn on every build. Pin it.
  turbopack: { root: import.meta.dirname },

  // Tree-shake the icon barrel. Importing a named glyph from the package root
  // otherwise pulls a large module graph into the client bundle.
  experimental: {
    optimizePackageImports: ['@phosphor-icons/react'],
  },

  images: {
    // AVIF first, WebP second. Project screenshots are the heaviest assets on
    // the page and both formats beat the source JPEG substantially.
    formats: ['image/avif', 'image/webp'],
    // Screenshots are content-addressed by filename and change only when a
    // project is recaptured, so a long TTL is safe.
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  // Nothing downstream reads it, and it advertises the framework version.
  poweredByHeader: false,
};

export default nextConfig;
