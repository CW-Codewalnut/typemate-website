import { Reveal } from "./reveal";

const points = [
  {
    title: "Tap the floating mic",
    body: "A small bubble sits on top of whatever app you are in. Tap, speak, and the words land in the focused field.",
  },
  {
    title: "Or hold a keyboard shortcut",
    body: "With a keyboard attached, hold Ctrl + Meta and talk. The exact same hold-to-talk flow as the desktop app.",
  },
  {
    title: "Made for Samsung DeX",
    body: "Dock your phone into DeX desktop mode and TypeMate behaves exactly like it does on a PC: shortcut, speak, release, typed.",
  },
];

export function Android() {
  return (
    <section id="android" className="relative px-5 py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-accent-bright">
              Android
            </p>
            <h2 className="max-w-xl text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">
              The same dictation, in your pocket
            </h2>
            <p className="mt-5 max-w-xl text-lg text-muted">
              TypeMate ships an Android app with the same local engines running
              on the device. No cloud on the phone either.
            </p>
          </Reveal>
          <div className="mt-10 flex flex-col gap-7">
            {points.map((p, i) => (
              <Reveal key={p.title} delay={0.08 * (i + 1)}>
                <div className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-soft font-mono text-[13px] text-accent-bright">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold tracking-tight">{p.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.35}>
            <a
              href="#download"
              className="mt-10 inline-block rounded-[14px] border border-edge bg-raised px-6 py-3 font-semibold transition hover:border-accent/50"
            >
              Get the APK below
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="flex justify-center">
          <PhoneMockup />
        </Reveal>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative h-[540px] w-[270px] rounded-[38px] border border-edge bg-surface p-3 shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[28px] bg-raised">
        {/* status bar */}
        <div className="flex items-center justify-between px-5 pt-3 text-[10px] text-muted">
          <span>9:41</span>
          <span className="h-4 w-14 rounded-full bg-surface" />
        </div>

        {/* chat area */}
        <div className="flex flex-1 flex-col justify-end gap-2.5 px-4 pb-3">
          <div className="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-surface px-3.5 py-2 text-[12.5px] text-muted">
            Standup notes ready?
          </div>
          <div className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-[12.5px] text-white">
            haan bhej raha hoon, two minutes
            <span className="caret ml-1 !h-[0.95em]" />
          </div>
        </div>

        {/* input row */}
        <div className="mx-3 mb-4 flex items-center gap-2 rounded-full bg-surface px-4 py-2.5">
          <span className="flex-1 text-[12px] text-muted/60">Message</span>
          <span className="h-4 w-4 rounded-full bg-accent-soft" />
        </div>

        {/* floating mic bubble */}
        <div className="absolute right-3 top-1/3 flex h-12 w-12 items-center justify-center rounded-full bg-accent shadow-[0_8px_24px_rgba(91,108,255,0.55)]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 text-white"
            aria-hidden
          >
            <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
            <path
              d="M5 11a7 7 0 0 0 14 0M12 18v3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <span className="pulse-ring absolute inset-0 rounded-full bg-accent" />
        </div>
      </div>
    </div>
  );
}
