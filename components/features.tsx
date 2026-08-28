import { Reveal } from "./reveal";
import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const features = [
  {
    icon: (
      <Icon>
        <rect x="4" y="10" width="16" height="10" rx="2.5" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2.5" />
      </Icon>
    ),
    title: "Private by design",
    body: "Every word is transcribed on your own CPU. Audio never leaves your machine, and there are no accounts, uploads, or cloud APIs in the path.",
  },
  {
    icon: (
      <Icon>
        <path d="M13 2 4.5 13.5H11L10 22l8.5-11.5H12L13 2Z" />
      </Icon>
    ),
    title: "Fast where it counts",
    body: "English is powered by NVIDIA Parakeet running in-process. A spoken sentence lands as text in about a second on an ordinary laptop.",
  },
  {
    icon: (
      <Icon>
        <path d="M4 7V5.5A1.5 1.5 0 0 1 5.5 4H7M17 4h1.5A1.5 1.5 0 0 1 20 5.5V7M20 17v1.5a1.5 1.5 0 0 1-1.5 1.5H17M7 20H5.5A1.5 1.5 0 0 1 4 18.5V17M12 8.5v7M9.5 8.5h5M9.5 15.5h5" />
      </Icon>
    ),
    title: "Works in any app",
    body: "IDE, terminal, browser, chat, AI agent prompt. Whatever field has focus receives the text directly, no copy-paste dance.",
  },
  {
    icon: (
      <Icon>
        <path d="M4 21v-5M4 12V3M12 21v-9M12 8V3M20 21v-3M20 14V3M2 16h4M10 12h4M18 18h4" />
      </Icon>
    ),
    title: "Noise suppression built in",
    body: "A local denoiser cleans up fans, keyboards, and background chatter before transcription, so accuracy holds up outside quiet rooms.",
  },
  {
    icon: (
      <Icon>
        <path d="M4 20V10M9.5 20V4M15 20v-7M20.5 20V8" />
      </Icon>
    ),
    title: "Insights, kept local",
    body: "Words dictated, speed, streaks, and a daily activity heatmap. Computed on your device like everything else, never reported anywhere.",
  },
  {
    icon: (
      <Icon>
        <path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6Z" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M5 19 19 5" />
      </Icon>
    ),
    title: "A truly quiet overlay",
    body: "The listening indicator is built to never take input focus. Your cursor stays in your work while you talk, which is the whole point.",
  },
  {
    icon: (
      <Icon>
        <circle cx="12" cy="12" r="9" />
        <path d="M3.5 12h17M12 3c2.6 2.4 4 5.6 4 9s-1.4 6.6-4 9c-2.6-2.4-4-5.6-4-9s1.4-6.6 4-9Z" />
      </Icon>
    ),
    title: "28 languages, curated",
    body: "English plus 24 European languages, and dedicated fine-tuned models for Hindi, Hinglish, and Tamil. Every language ships only after it proves itself.",
  },
  {
    icon: (
      <Icon>
        <path d="M3.5 3.5h7l10 10-7 7-10-10v-7Z" />
        <circle cx="7.5" cy="7.5" r="1.2" />
      </Icon>
    ),
    title: "Free to use",
    body: "No account, no subscription, no usage caps. Install it once and dictate as much as you like.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.18em] text-accent">
            02. Why TypeMate
          </p>
          <h2 className="max-w-2xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Built for people who type for a living
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            Prompting agents, writing commits, replying in chat. Speaking is
            faster than typing, and TypeMate makes it feel native to the
            desktop.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.1}>
              <div className="group relative h-full rounded-[14px] border border-edge bg-surface p-7 transition-colors duration-300 hover:border-edge-strong">
                <span className="absolute right-6 top-6 font-mono text-[12px] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                  {f.icon}
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-tight">
                  {f.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
