import Image from "next/image";
import Link from "next/link";
import { GitHubGlyph } from "./nav";
import { TypeMateLogo } from "./logo";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-edge bg-raised text-muted transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-edge px-5 pt-14 pb-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
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
        <div className="mt-5 flex gap-6 text-sm text-muted">
          <Link
            href="/privacy"
            className="transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="transition-colors hover:text-foreground"
          >
            Terms
          </Link>
          <Link
            href="/support"
            className="transition-colors hover:text-foreground"
          >
            Support
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center gap-6 border-t border-edge pt-7 sm:flex-row sm:justify-between">
        <a
          href="https://www.codewalnut.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2.5 opacity-90 transition-opacity hover:opacity-100"
        >
          <span className="whitespace-nowrap text-[13px] text-muted">
            Built by
          </span>
          <Image
            src="/codewalnut-logo.svg"
            alt="CodeWalnut"
            width={125}
            height={49}
            className="h-7 w-auto"
          />
        </a>
        <div className="flex items-center gap-3">
          <SocialLink href="https://github.com/CW-Codewalnut/typemate" label="TypeMate on GitHub">
            <GitHubGlyph />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/company/codewalnut" label="CodeWalnut on LinkedIn">
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M3.6 1.8a1.8 1.8 0 1 1-3.6 0 1.8 1.8 0 0 1 3.6 0ZM.2 5h3.2v11H.2V5Zm5.4 0h3.1v1.5h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5V16h-3.2v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V16H5.6V5Z" />
            </svg>
          </SocialLink>
          <SocialLink href="https://x.com/codewalnut" label="CodeWalnut on X">
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M9.5 6.8 15.3 0h-1.4L8.9 5.9 4.9 0H.3l6.1 8.9L.3 16h1.4l5.3-6.2 4.3 6.2h4.6L9.5 6.8Zm-1.9 2.2-.6-.9-4.9-7h2.1l4 5.7.6.9 5.1 7.3h-2.1L7.6 9Z" />
            </svg>
          </SocialLink>
          <SocialLink href="https://www.instagram.com/codewalnut" label="CodeWalnut on Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden>
              <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none" />
            </svg>
          </SocialLink>
          <SocialLink href="https://www.youtube.com/@CodeWalnut" label="CodeWalnut on YouTube">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden>
              <path d="M23.5 6.5a3 3 0 0 0-2.1-2.2C19.5 3.8 12 3.8 12 3.8s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5 32 32 0 0 0 0 12a32 32 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A32 32 0 0 0 24 12a32 32 0 0 0-.5-5.5ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
            </svg>
          </SocialLink>
        </div>
      </div>
    </footer>
  );
}
