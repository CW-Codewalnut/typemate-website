"use client";

import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { RELEASES_URL, useLatestRelease, type ReleaseAsset } from "@/lib/releases";

function PlatformRow({
  title,
  subtitle,
  highlight,
  delay = 0,
  children,
}: {
  title: string;
  subtitle: string;
  highlight?: boolean;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`flex flex-col gap-5 rounded-[22px] border bg-surface p-6 sm:p-7 md:flex-row md:items-center md:justify-between ${
          highlight
            ? "border-accent/40 shadow-[0_0_60px_rgba(91,108,255,0.12)]"
            : "border-edge"
        }`}
      >
        <div className="shrink-0 md:w-52">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="mt-0.5 text-sm text-muted">{subtitle}</p>
        </div>
        <div className="flex flex-1 flex-wrap gap-2.5 md:justify-end">
          {children}
        </div>
      </div>
    </Reveal>
  );
}

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
      className={`flex w-full items-center justify-between gap-3 rounded-[14px] px-4 py-3 text-sm font-medium transition sm:w-60 ${
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

        <div className="mt-14 flex flex-col gap-4">
          <PlatformRow
            title="Windows"
            subtitle="Windows 10 and 11, x64"
            highlight
          >
            <AssetLink asset={release?.windowsSetup} label="Installer (.exe)" primary />
            <AssetLink asset={release?.windowsZip} label="Portable (.zip)" />
          </PlatformRow>

          <PlatformRow title="Linux" subtitle="X11 desktops, x64" delay={0.08}>
            <AssetLink asset={release?.deb} label="Debian, Ubuntu (.deb)" primary />
            <AssetLink asset={release?.rpm} label="Fedora, SUSE (.rpm)" />
            <AssetLink asset={release?.tarball} label="Portable (.tar.gz)" />
          </PlatformRow>

          <PlatformRow title="macOS" subtitle="Early preview build" delay={0.16}>
            <AssetLink asset={release?.macos} label="Preview (.zip)" primary />
          </PlatformRow>

          <PlatformRow
            title="Android"
            subtitle="Floating mic, DeX ready"
            delay={0.24}
          >
            <AssetLink asset={release?.apk} label="Direct install (.apk)" primary />
          </PlatformRow>
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
