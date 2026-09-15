"use client";

import type { ReactNode } from "react";
import { Reveal } from "./reveal";
import { ALL_RELEASES_URL, RELEASES_URL, useLatestRelease, type ReleaseAsset } from "@/lib/releases";

function PlatformRow({
  title,
  subtitle,
  highlight,
  delay = 0,
  note,
  children,
}: {
  title: string;
  subtitle: string;
  highlight?: boolean;
  delay?: number;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className={`rounded-[16px] border bg-surface p-6 sm:p-7 ${
          highlight ? "border-accent/50" : "border-edge"
        }`}
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="shrink-0 md:w-52">
            <h3 className="text-lg font-bold">{title}</h3>
            <p className="mt-0.5 text-sm text-muted">{subtitle}</p>
          </div>
          <div className="flex flex-1 flex-wrap gap-2.5 md:justify-end">
            {children}
          </div>
        </div>
        {note ? (
          <p className="mt-5 border-t border-edge pt-4 text-sm text-muted">
            {note}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}

// A download that is not a release asset: the Microsoft Store listing.
// Same shape as an asset button, an arrow instead of a size.
function StoreLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="flex w-full items-center justify-between gap-3 rounded-[10px] bg-cta px-4 py-3 text-sm font-medium text-cta-foreground transition hover:bg-cta-hover sm:w-60"
    >
      <span className="flex items-center gap-2.5">
        {/* The Microsoft logo: four squares in the brand colours. */}
        <svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          className="shrink-0"
        >
          <rect x="0" y="0" width="7.5" height="7.5" fill="#F25022" />
          <rect x="8.5" y="0" width="7.5" height="7.5" fill="#7FBA00" />
          <rect x="0" y="8.5" width="7.5" height="7.5" fill="#00A4EF" />
          <rect x="8.5" y="8.5" width="7.5" height="7.5" fill="#FFB900" />
        </svg>
        {label}
      </span>
      <span className="whitespace-nowrap font-mono text-[12px] text-cta-foreground/70">
        →
      </span>
    </a>
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
          ? "bg-cta text-cta-foreground hover:bg-cta-hover"
          : "border border-edge bg-surface hover:border-accent/50"
      }`}
    >
      <span>{label}</span>
      <span
        className={`whitespace-nowrap font-mono text-[12px] ${primary ? "text-cta-foreground/70" : "text-muted"}`}
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
            Download
          </p>
          <h2 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Get TypeMate{" "}
            {release ? (
              <span className="text-accent">{release.version}</span>
            ) : null}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Free, no account needed. Install it, hold the
            shortcut, and start talking.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-4">
          <PlatformRow
            title="Windows"
            subtitle="Windows 10 and 11, x64 and ARM"
            highlight
          >
            <StoreLink
              href="https://apps.microsoft.com/detail/9NB95KDB8MDK"
              label="Microsoft Store"
            />
            <AssetLink asset={release?.msix} label="App package for x86 processors (.msix)" />
            <AssetLink asset={release?.msixArm64} label="App package for ARM processors (.msix)" />
            <AssetLink asset={release?.windowsSetup} label="Installer for x86 processors (.exe)" />
            <AssetLink asset={release?.windowsSetupArm64} label="Installer for ARM processors (.exe)" />
          </PlatformRow>

          <PlatformRow title="Linux" subtitle="X11 desktops, x86_64, tested on Debian and Ubuntu" delay={0.08}>
            <AssetLink asset={release?.deb} label="Debian, Ubuntu (.deb)" primary />
            <AssetLink asset={release?.appImage} label="Portable (.AppImage)" />
          </PlatformRow>

          <PlatformRow title="macOS" subtitle="Early preview build, Apple silicon and Intel" delay={0.16}>
            <AssetLink asset={release?.macos} label="Disk image (.dmg)" primary />
          </PlatformRow>

          <PlatformRow
            title="Android"
            subtitle="Floating mic, DeX (desktop mode) ready"
            delay={0.24}
          >
            <AssetLink asset={release?.apk} label="Direct install (.apk)" primary />
          </PlatformRow>

          <PlatformRow
            title="iPhone and iPad"
            subtitle="Early preview build, not yet signed for the App Store"
            delay={0.32}
          >
            <AssetLink asset={release?.ipa} label="App package (.ipa)" primary />
          </PlatformRow>
        </div>

        <Reveal delay={0.25} className="mt-8 text-center">
          <a
            href={ALL_RELEASES_URL}
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
