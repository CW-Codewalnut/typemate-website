import { GitHubGlyph } from "./nav";
import { TypeMateLogo } from "./logo";

export function Footer() {
  return (
    <footer className="border-t border-edge px-5 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <TypeMateLogo className="h-8 w-8" />
          <span className="font-bold tracking-tight">TypeMate</span>
          <span className="ml-2 text-sm text-muted">
            Local dictation for desktop power users
          </span>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted">
          <a
            href="https://github.com/CW-Codewalnut/typemate"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-foreground"
          >
            <GitHubGlyph className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href="https://www.codewalnut.com"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Built by CodeWalnut
          </a>
        </div>
      </div>
    </footer>
  );
}
