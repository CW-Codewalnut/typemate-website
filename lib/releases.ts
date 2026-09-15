"use client";

import { useEffect, useState } from "react";

// The app repo went private, so its releases vanished from public view;
// the public typemate-downloads repo mirrors every release's installers
// (kept current by the release pipeline) and this page reads it exactly
// like it read the app repo before.
export const RELEASES_URL =
  "https://github.com/CW-Codewalnut/typemate-downloads/releases/latest";

export const ALL_RELEASES_URL =
  "https://github.com/CW-Codewalnut/typemate-downloads/releases";

export type ReleaseAsset = {
  name: string;
  url: string;
  sizeMb: number;
};

export type LatestRelease = {
  version: string;
  deb?: ReleaseAsset;
  appImage?: ReleaseAsset;
  macos?: ReleaseAsset;
  apk?: ReleaseAsset;
  ipa?: ReleaseAsset;
  msix?: ReleaseAsset;
  msixArm64?: ReleaseAsset;
  cert?: ReleaseAsset;
};

type ApiAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};

const matchers: [keyof Omit<LatestRelease, "version">, RegExp][] = [
  // Windows on the site is the Store and the MSIX; the Setup .exe stays
  // on the releases page only and the portable zips are no longer built.
  ["deb", /\.deb$/],
  ["appImage", /\.AppImage$/],
  ["macos", /macos.*\.dmg$/],
  ["apk", /\.apk$/],
  ["ipa", /\.ipa$/],
  // Two MSIX packages, one per architecture; the suffix tells them apart.
  ["msix", /-x64\.msix$/],
  ["msixArm64", /-arm64\.msix$/],
  ["cert", /\.cer$/],
];

export function useLatestRelease(): LatestRelease | null {
  const [release, setRelease] = useState<LatestRelease | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(
      "https://api.github.com/repos/CW-Codewalnut/typemate-downloads/releases/latest",
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled || !data?.tag_name) return;
        const result: LatestRelease = { version: data.tag_name };
        for (const asset of (data.assets ?? []) as ApiAsset[]) {
          for (const [key, pattern] of matchers) {
            if (pattern.test(asset.name)) {
              result[key] = {
                name: asset.name,
                url: asset.browser_download_url,
                sizeMb: Math.round(asset.size / 1024 / 1024),
              };
            }
          }
        }
        setRelease(result);
      })
      .catch(() => {
        /* Buttons fall back to the releases page. */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return release;
}
