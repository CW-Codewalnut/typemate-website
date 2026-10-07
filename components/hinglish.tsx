import { Icon } from "./features";
import { Reveal } from "./reveal";

/* The Hinglish model CodeWalnut trained itself. Every figure here comes
   from our own tests and says so. A comparison names the model users
   had before it (TypeMate 1.11) and only where that was measured; the
   rest are plain figures. Never promise that a single word is always
   right, and never name the base model, its maker or the data. */

const points = [
  {
    icon: (
      <Icon>
        <path d="M3.5 3.5h7l10 10-7 7-10-10v-7Z" />
        <circle cx="7.5" cy="7.5" r="1.2" />
      </Icon>
    ),
    title: "Built for Indian names",
    body: "Brand names, medicines, tech words and legal terms. In our tests it wrote them correctly 85% of the time.",
  },
  {
    icon: (
      <Icon>
        <path d="M9 4 7 20M17 4l-2 16M4.5 9h15M3.5 15h15" />
      </Icon>
    ),
    title: "Numbers the way you type them",
    body: "Amounts and ranges come out in digits, the way people in India write them.",
  },
  {
    icon: (
      <Icon>
        <path d="M21 12a9 9 0 1 1-9-9" />
        <path d="m8.5 11.5 3 3L21 5" />
      </Icon>
    ),
    title: "Fewer mistakes in everyday Hinglish",
    body: "In our tests it got about 6 words in 100 wrong when people read everyday Hinglish aloud: about 40% fewer mistakes than the Hinglish model in TypeMate 1.11. It did a little better in conversation too.",
  },
  {
    icon: (
      <Icon>
        <rect x="4" y="10" width="16" height="10" rx="2.5" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v2.5" />
      </Icon>
    ),
    title: "Long dictations, still private",
    body: "Long messages come out complete, about 5 times faster than the Hinglish model in TypeMate 1.11. Like every TypeMate language, it runs fully on your device, so no audio leaves it.",
  },
];

const numberExamples = [
  { said: "paanch sau rupaye", typed: "500 rupaye" },
  { said: "chaar paanch sau", typed: "400-500" },
];

// The "You say" and "You get" columns line up across rows because
// every row shares this template. The spoken side is wider so a phrase
// stays on one line at phone width.
const exampleRow =
  "grid grid-cols-[minmax(0,1.4fr)_1.25rem_minmax(0,1fr)] items-center gap-x-3";
const cardLabel =
  "font-mono text-[12px] uppercase tracking-[0.14em] text-muted";

const nameExamples = [
  "LIC",
  "SBI",
  "Zomato",
  "Blinkit",
  "ECG",
  "CBC",
  "PR",
  "ChatGPT",
  "Claude",
  "Vercel",
];

export function Hinglish() {
  return (
    <section id="hinglish" className="relative px-5 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.18em] text-accent">
            New for Hinglish
          </p>
          <h2 className="max-w-2xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Our own Hinglish model, trained for Indian names and numbers.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-muted">
            TypeMate&apos;s Hinglish now runs on a speech model we trained
            ourselves, on a MacBook. It learned from licensed recordings of
            Indian speech and about 144 hours of computer-made sentences full
            of everyday Indian names, each one checked for pronunciation. Pick
            Hinglish in Settings, hold the shortcut on your computer or tap
            the mic on your phone, and speak the way you normally do.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <ul className="flex flex-col gap-8">
            {points.map((p, i) => (
              <li key={p.title}>
                <Reveal delay={i * 0.08} className="flex gap-4">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] bg-accent-soft text-accent">
                    {p.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal delay={0.15}>
            <div className="rounded-[16px] border border-accent/50 bg-surface p-5 sm:p-8">
              <div className={exampleRow}>
                <p className={cardLabel}>You say</p>
                <span />
                <p className={cardLabel}>You get</p>
              </div>
              {numberExamples.map((n) => (
                <div
                  key={n.said}
                  className={`${exampleRow} mt-4 border-t border-edge pt-4`}
                >
                  <p className="text-[14px] italic text-muted sm:text-base">
                    &ldquo;{n.said}&rdquo;
                  </p>
                  <span className="font-mono text-[13px] text-accent" aria-hidden>
                    →
                  </span>
                  <p className="font-mono text-[14px] font-semibold text-foreground sm:text-base">
                    {n.typed}
                  </p>
                </div>
              ))}

              <div className="mt-8 border-t border-edge pt-6">
                <p className={cardLabel}>Written correctly in our tests</p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {nameExamples.map((name) => (
                    <span
                      key={name}
                      className="rounded-full border border-accent/40 bg-accent-soft px-4 py-1.5 text-sm font-medium text-accent"
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
