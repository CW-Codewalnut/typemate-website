"use client";

import { Reveal } from "./reveal";
import { RELEASES_URL, useLatestRelease, type ReleaseAsset } from "@/lib/releases";

function AssetLink({
  asset,
  label,
  primary,
}: {
  asset?: ReleaseAsset;
  label: string;
  primary?: boolean;
}) {
  return (
    <a
      href={asset?.url ?? RELEASES_URL}
      className={`flex items-center justify-between gap-3 rounded-[14px] px-4 py-3 text-sm font-medium transition ${
        primary
          ? "bg-accent text-white hover:bg-accent-bright"
          : "border border-edge bg-raised hover:border-accent/50"
      }`}
    >
      <span>{label}</span>
      <span
        className={`whitespace-nowrap ${primary ? "text-white/70" : "text-muted"}`}
      >
        {asset ? `${asset.sizeMb} MB` : "→"}
      </span>
    </a>
  );
}

export function Downloads() {
  const release = useLatestRelease();

  return (
    <section id="download" className="relative overflow-hidden px-5 py-28">
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/12 blur-[140px]"
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent-bright">
            Download
          </p>
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
            Get TypeMate{" "}
            {release ? (
              <span className="text-accent-bright">{release.version}</span>
            ) : null}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Free, open source, no account needed. Install it, hold the
            shortcut, and start talking.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <Reveal>
            <div className="flex h-full flex-col rounded-[22px] border border-accent/40 bg-surface p-7 shadow-[0_0_60px_rgba(91,108,255,0.12)]">
              <h3 className="text-lg font-bold">Windows</h3>
              <p className="mt-1 mb-6 text-sm text-muted">Windows 10 and 11, x64</p>
              <div className="mt-auto flex flex-col gap-2.5">
                <AssetLink asset={release?.windowsSetup} label="Installer (.exe)" primary />
                <AssetLink asset={release?.windowsZip} label="Portable (.zip)" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-[22px] border border-edge bg-surface p-7">
              <h3 className="text-lg font-bold">Linux</h3>
              <p className="mt-1 mb-6 text-sm text-muted">X11 desktops, x64</p>
              <div className="mt-auto flex flex-col gap-2.5">
                <AssetLink asset={release?.deb} label="Debian, Ubuntu (.deb)" primary />
                <AssetLink asset={release?.rpm} label="Fedora, openSUSE (.rpm)" />
                <AssetLink asset={release?.tarball} label="Portable (.tar.gz)" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex h-full flex-col rounded-[22px] border border-edge bg-surface p-7">
              <h3 className="text-lg font-bold">More platforms</h3>
              <p className="mt-1 mb-6 text-sm text-muted">
                Early builds, rough edges expected
              </p>
              <div className="mt-auto flex flex-col gap-2.5">
                <AssetLink asset={release?.macos} label="macOS preview (.zip)" />
                <AssetLink asset={release?.apk} label="Android (.apk)" />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.25} className="mt-8 text-center">
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            All versions and release notes on GitHub
          </a>
        </Reveal>
      </div>
    </section>
  );
}
