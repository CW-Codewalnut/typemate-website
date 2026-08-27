import type { NextConfig } from "next";

// App asset downloads. Installed TypeMate apps have these URLs baked in
// (see typemate's lib/src/core/stt/speech_model_catalog.dart and
// tool/fetch_whisper_runtime.dart), so the /dl and /tools paths must
// never change; the blob store behind them can. Model file names under
// /dl are deliberately unlabelled: the app is closed source and the
// URLs must not advertise which speech models it ships.
const assetStoreBaseUrl =
  "https://tunstae1yh3qiiea.public.blob.vercel-storage.com";

const nextConfig: NextConfig = {
  redirects() {
    return Promise.resolve([
      {
        source: "/dl/:path*",
        destination: `${assetStoreBaseUrl}/dl/:path*`,
        permanent: false,
      },
      {
        source: "/tools/:path*",
        destination: `${assetStoreBaseUrl}/tools/:path*`,
        permanent: false,
      },
    ]);
  },
};

export default nextConfig;
