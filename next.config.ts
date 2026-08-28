import type { NextConfig } from "next";

// App asset downloads. Installed TypeMate apps have these URLs baked in
// (see typemate's lib/src/core/stt/speech_model_catalog.dart and
// tool/fetch_whisper_runtime.dart), so the /dl and /tools paths must
// never change; the storage behind them can, and has: everything lives
// on the public typemate-downloads repo's "assets" release since
// 2026-08-28 (free, unmetered). Model file names under /dl are
// deliberately unlabelled: the app is closed source and the URLs must
// not advertise which speech models it ships. Release assets are flat,
// so the two model directories flatten to <id>-<file> names; those two
// rules must stay ABOVE the generic /dl rule (redirects match in
// order).
const assetsBaseUrl =
  "https://github.com/CW-Codewalnut/typemate-downloads/releases/download/assets";

const nextConfig: NextConfig = {
  redirects() {
    return Promise.resolve([
      {
        source: "/dl/0ad41d2e791a/:file",
        destination: `${assetsBaseUrl}/0ad41d2e791a-:file`,
        permanent: false,
      },
      {
        source: "/dl/6d14cbd16e11/:file",
        destination: `${assetsBaseUrl}/6d14cbd16e11-:file`,
        permanent: false,
      },
      {
        source: "/dl/:path*",
        destination: `${assetsBaseUrl}/:path*`,
        permanent: false,
      },
      {
        source: "/tools/:path*",
        destination: `${assetsBaseUrl}/:path*`,
        permanent: false,
      },
    ]);
  },
};

export default nextConfig;
