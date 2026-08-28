import type { NextConfig } from "next";

// App asset downloads. Installed TypeMate apps have these URLs baked in
// (see typemate's lib/src/core/stt/speech_model_catalog.dart and
// tool/fetch_whisper_runtime.dart), so the /dl and /tools paths must
// never change; the blob store behind them can. Model file names under
// /dl are deliberately unlabelled: the app is closed source and the
// URLs must not advertise which speech models it ships.
const assetStoreBaseUrl =
  "https://tunstae1yh3qiiea.public.blob.vercel-storage.com";

// The two large model directories exceed the Blob plan's storage cap.
// For now they redirect to their upstream source at pinned immutable
// revisions (deliberate: zero hosting cost, decided 2026-08-27); move
// them onto our own storage later by repointing these two rules, no app
// release needed. They must stay ABOVE the generic /dl rule; redirects
// match in order.
const englishModelBaseUrl =
  "https://huggingface.co/csukuangfj2/sherpa-onnx-nemo-parakeet-unified-en-0.6b-int8-non-streaming/resolve/8c3a10fb13408c7a7054f6898958bf1c64a8d6c7";
const multilingualModelBaseUrl =
  "https://huggingface.co/csukuangfj/sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8/resolve/2bda32ec70b097a55adaa07d9a7173915b43cc78";

const nextConfig: NextConfig = {
  redirects() {
    return Promise.resolve([
      {
        source: "/dl/0ad41d2e791a/:file",
        destination: `${englishModelBaseUrl}/:file`,
        permanent: false,
      },
      {
        source: "/dl/6d14cbd16e11/:file",
        destination: `${multilingualModelBaseUrl}/:file`,
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
      {
        source: "/app/:path*",
        destination: `${assetStoreBaseUrl}/app/:path*`,
        permanent: false,
      },
    ]);
  },
};

export default nextConfig;
