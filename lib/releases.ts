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
  windowsSetup?: ReleaseAsset;
  windowsZip?: ReleaseAsset;
  windowsArm64Setup?: ReleaseAsset;
  windowsArm64Zip?: ReleaseAsset;
  deb?: ReleaseAsset;
  appImage?: ReleaseAsset;
  macos?: ReleaseAsset;
  apk?: ReleaseAsset;
  msix?: ReleaseAsset;
  cert?: ReleaseAsset;
};

type ApiAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};

const matchers: [keyof Omit<LatestRelease, "version">, RegExp][] = [
  // The x64 installer keeps its unsuffixed name; the ARM64 one carries
  // -arm64, so the x64 pattern must not match it.
  ["windowsSetup", /^TypeMate-Setup-v[0-9.]+\.exe$/],
  ["windowsZip", /windows-x64\.zip$/],
  ["windowsArm64Setup", /^TypeMate-Setup-.*-arm64\.exe$/],
  ["windowsArm64Zip", /windows-arm64\.zip$/],
  ["deb", /\.deb$/],
  ["appImage", /\.AppImage$/],
  ["macos", /macos.*\.zip$/],
  ["apk", /\.apk$/],
  ["msix", /\.msix$/],
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
