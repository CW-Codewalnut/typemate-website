"use client";

import { useEffect, useState } from "react";

export const RELEASES_URL =
  "https://github.com/CW-Codewalnut/typemate/releases/latest";

export const ALL_RELEASES_URL =
  "https://github.com/CW-Codewalnut/typemate/releases";

export type ReleaseAsset = {
  name: string;
  url: string;
  sizeMb: number;
};

export type LatestRelease = {
  version: string;
  windowsSetup?: ReleaseAsset;
  windowsZip?: ReleaseAsset;
  deb?: ReleaseAsset;
  rpm?: ReleaseAsset;
  tarball?: ReleaseAsset;
  macos?: ReleaseAsset;
  apk?: ReleaseAsset;
};

type ApiAsset = {
  name: string;
  browser_download_url: string;
  size: number;
};

const matchers: [keyof Omit<LatestRelease, "version">, RegExp][] = [
  ["windowsSetup", /^TypeMate-Setup-.*\.exe$/],
  ["windowsZip", /windows-x64\.zip$/],
  ["deb", /\.deb$/],
  ["rpm", /\.rpm$/],
  ["tarball", /linux-x64\.tar\.gz$/],
  ["macos", /macos.*\.zip$/],
  ["apk", /\.apk$/],
];

export function useLatestRelease(): LatestRelease | null {
  const [release, setRelease] = useState<LatestRelease | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(
      "https://api.github.com/repos/CW-Codewalnut/typemate/releases/latest",
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
