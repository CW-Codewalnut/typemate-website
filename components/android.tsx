import { PhoneMockup } from "./phone-mockup";
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
