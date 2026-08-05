import Image from "next/image";
import { GitHubGlyph } from "./nav";
import { TypeMateLogo } from "./logo";

const productLinks = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#languages", label: "Languages" },
  { href: "#android", label: "Android" },
  { href: "#download", label: "Download" },
];

export function Footer() {
  return (
    <footer className="border-t border-edge px-5 pt-14 pb-8">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 sm:flex-row">
        <div>
          <div className="flex items-center gap-2">
            <TypeMateLogo className="h-8 w-8" />
            <span className="text-[17px] font-bold tracking-tight">
              TypeMate
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
            Fast, private dictation that types into any app. Everything runs
            on your machine.
          </p>
        </div>
        <div className="sm:text-right">
          <h3 className="text-sm font-bold">Product</h3>
          <ul className="mt-3 flex flex-col gap-2.5">
            {productLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between border-t border-edge pt-7">
        <a
          href="https://www.codewalnut.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 opacity-90 transition-opacity hover:opacity-100"
        >
          <span className="text-[13px] text-muted">Built by</span>
          <Image
            src="/codewalnut-logo.svg"
            alt="CodeWalnut"
            width={125}
            height={49}
            className="h-7 w-auto"
          />
        </a>
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/CW-Codewalnut/typemate"
            target="_blank"
            rel="noreferrer"
            aria-label="TypeMate on GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-edge bg-raised text-muted transition-colors hover:text-foreground"
          >
            <GitHubGlyph />
          </a>
          <a
            href="https://www.linkedin.com/company/codewalnut"
            target="_blank"
            rel="noreferrer"
            aria-label="CodeWalnut on LinkedIn"
            className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-edge bg-raised text-muted transition-colors hover:text-foreground"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M3.6 1.8a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0ZM.2 5h3.2v11H.2V5Zm5.4 0h3.1v1.5h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V16h-3.2v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V16H5.6V5Z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
