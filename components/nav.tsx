"use client";

import { useScroll, useMotionValueEvent } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { TypeMateLogo } from "./logo";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#languages", label: "Languages" },
  { href: "#android", label: "Android" },
  { href: "#download", label: "Download" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  // Scroll spy: the section crossing the middle band of the viewport
  // highlights its nav link.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    for (const l of links) {
      const el = document.getElementById(l.href.slice(1));
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled
          ? "border-edge bg-background/85"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#top" className="flex items-center gap-2">
          <TypeMateLogo className="h-9 w-9" standColor="var(--logo-stand)" />
          <span className="text-[17px] font-bold tracking-tight">
            TypeMate
          </span>
        </a>
        <div className="hidden items-center gap-7 text-sm md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`transition-colors hover:text-foreground ${
                active === l.href.slice(1)
                  ? "font-semibold text-accent"
                  : "text-muted"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href="https://github.com/CW-Codewalnut/typemate"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-edge bg-surface px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:border-accent/50"
          >
            <GitHubGlyph />
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}

const emptySubscribe = () => () => {};

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);
  // False during SSR and hydration, true after: safe theme-icon rendering.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";

    // Browsers without the View Transitions API switch instantly.
    if (!document.startViewTransition) {
      setTheme(next);
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${radius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 550,
          easing: "cubic-bezier(0.3, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="Toggle light or dark theme"
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-edge bg-surface text-muted transition-colors hover:border-accent/50 hover:text-foreground"
    >
      {!mounted ? (
        <span className="h-4 w-4" />
      ) : resolvedTheme === "dark" ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="h-4 w-4"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.3M12 19.2v2.3M2.5 12h2.3M19.2 12h2.3M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
          aria-hidden
        >
          <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" />
        </svg>
      )}
    </button>
  );
}

export function GitHubGlyph({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className={className} aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.42 7.42 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
