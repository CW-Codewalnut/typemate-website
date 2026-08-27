import type { NextConfig } from "next";

// App asset downloads. Installed TypeMate apps have these URLs baked in
// (see typemate's lib/src/core/stt/speech_model_catalog.dart and
// tool/fetch_whisper_runtime.dart), so the /dl and /tools paths must
// never change; the blob store behind them can. Model file names under
// /dl are deliberately unlabelled: the app is closed source and the
// URLs must not advertise which speech models it ships.
const assetStoreBaseUrl =
  "https://tunstae1yh3qiiea.public.blob.vercel-storage.com";

// The two large model directories exceed the Blob plan's storage cap, so
// their files live as release assets on this repo instead (tag assets-1,
// same unlabelled ids, flattened to <id>-<file> because release asset
// names cannot contain slashes). These two rules must stay ABOVE the
// generic /dl rule; redirects match in order.
const releaseAssetsBaseUrl =
  "https://github.com/CW-Codewalnut/typemate-website/releases/download/assets-1";

const nextConfig: NextConfig = {
  redirects() {
    return Promise.resolve([
      {
        source: "/dl/0ad41d2e791a/:file",
        destination: `${releaseAssetsBaseUrl}/0ad41d2e791a-:file`,
        permanent: false,
      },
      {
        source: "/dl/6d14cbd16e11/:file",
        destination: `${releaseAssetsBaseUrl}/6d14cbd16e11-:file`,
        permanent: false,
      },
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
