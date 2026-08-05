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
        className={`flex flex-col gap-5 rounded-[16px] border bg-white p-6 sm:p-7 md:flex-row md:items-center md:justify-between ${
          highlight ? "border-accent/50" : "border-edge"
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
      className={`flex w-full items-center justify-between gap-3 rounded-[10px] px-4 py-3 text-sm font-medium transition sm:w-60 ${
        primary
          ? "bg-[#171A26] text-[#F6F3EB] hover:bg-black"
          : "border border-edge bg-white hover:border-accent/50"
      }`}
    >
      <span>{label}</span>
      <span
        className={`whitespace-nowrap font-mono text-[12px] ${primary ? "text-[#F6F3EB]/70" : "text-muted"}`}
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
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="text-center">
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.18em] text-accent">
            05 — Download
          </p>
          <h2 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Get TypeMate{" "}
            {release ? (
              <span className="text-accent">{release.version}</span>
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
