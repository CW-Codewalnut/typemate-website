import Link from "next/link";
import type { ReactNode } from "react";
import { TypeMateLogo } from "./logo";
import { Footer } from "./footer";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main>
      <header className="border-b border-edge">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2">
            <TypeMateLogo className="h-8 w-8" />
            <span className="text-[17px] font-bold tracking-tight">
              TypeMate
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            Back to home
          </Link>
        </div>
      </header>
      <article className="legal mx-auto max-w-3xl px-5 pt-14 pb-24">
        <h1 className="text-4xl font-extrabold tracking-[-0.03em]">{title}</h1>
        <p className="!mt-3 text-sm">Last updated: {updated}</p>
        {children}
      </article>
      <Footer />
    </main>
  );
}
