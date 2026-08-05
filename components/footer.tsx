import Image from "next/image";
import { GitHubGlyph } from "./nav";
import { TypeMateLogo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-edge px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-2.5">
          <div className="flex items-center gap-2">
            <TypeMateLogo className="h-8 w-8" />
            <span className="font-bold tracking-tight">TypeMate</span>
          </div>
          <span className="text-center text-sm text-muted sm:ml-2">
            Local dictation for desktop power users
          </span>
        </div>
        <a
          href="https://github.com/CW-Codewalnut/typemate"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <GitHubGlyph className="h-3.5 w-3.5" />
          GitHub
        </a>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center gap-3 border-t border-edge pt-8">
        <span className="text-[13px] text-muted">Built by</span>
        <a
          href="https://www.codewalnut.com"
          target="_blank"
          rel="noreferrer"
          className="opacity-90 transition-opacity hover:opacity-100"
        >
          <Image
            src="/codewalnut-logo.svg"
            alt="CodeWalnut"
            width={125}
            height={49}
            className="h-9 w-auto"
          />
        </a>
      </div>
    </footer>
  );
}
