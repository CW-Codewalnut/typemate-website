"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { OverlayPill } from "./overlay-pill";

const steps = [
  {
    title: "Hold your shortcut",
    body: "One global shortcut works from any app. No window switching, no clicking a mic button, no waiting for anything to open.",
  },
  {
    title: "Speak naturally",
    body: "A quiet overlay shows that TypeMate is listening. It never takes focus, so the field you were typing in stays exactly where it was.",
  },
  {
    title: "Release. Text appears.",
    body: "Transcription runs on your own CPU and the words are typed straight into the focused field. English lands in about a second.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="how" ref={ref} className="relative h-[340vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-5">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.18em] text-accent">
            01 — How it works
          </p>
          <h2 className="max-w-xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Three moves. Zero friction.
          </h2>

          <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-3">
              {steps.map((step, i) => (
                <StepRow
                  key={step.title}
                  index={i}
                  title={step.title}
                  body={step.body}
                  progress={scrollYProgress}
                />
              ))}
            </div>
            <StepVisual progress={scrollYProgress} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* Each step owns a third of the scroll range, with soft edges. */
function stepRange(index: number): [number, number] {
  return [index / 3, (index + 1) / 3];
}

function StepRow({
  index,
  title,
  body,
  progress,
}: {
  index: number;
  title: string;
  body: string;
  progress: MotionValue<number>;
}) {
  const [start, end] = stepRange(index);
  const active = useTransform(
    progress,
    [start - 0.06, start, end - 0.02, end + 0.04],
    [0, 1, 1, 0],
  );
  const opacity = useTransform(active, [0, 1], [0.38, 1]);
  const x = useTransform(active, [0, 1], [0, 14]);
  const barScale = useTransform(active, [0, 1], [0, 1]);

  return (
    <motion.div style={{ opacity, x }} className="relative rounded-2xl p-5">
      <motion.span
        style={{ scaleY: barScale }}
        className="absolute top-4 bottom-4 left-0 w-[3px] origin-top rounded-full bg-accent"
      />
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm text-accent">
          0{index + 1}
        </span>
        <div>
          <h3 className="font-serif text-xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-2 max-w-md leading-relaxed text-muted">{body}</p>
        </div>
      </div>
    </motion.div>
  );
}

function StepVisual({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative hidden h-72 items-center justify-center rounded-[16px] border border-edge bg-white lg:flex">
      <VisualPane progress={progress} index={0}>
        <div className="flex items-center gap-3 text-2xl">
          <motion.span
            className="kbd !px-5 !py-3"
            animate={{ y: [0, 3, 3, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, times: [0, 0.15, 0.85, 1] }}
          >
            Ctrl
          </motion.span>
          <span className="text-muted">+</span>
          <motion.span
            className="kbd !px-5 !py-3"
            animate={{ y: [0, 3, 3, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, times: [0, 0.15, 0.85, 1] }}
          >
            Win
          </motion.span>
        </div>
      </VisualPane>

      <VisualPane progress={progress} index={1}>
        <div className="flex flex-col items-center gap-6">
          <OverlayPill message="TypeMate is listening..." />
          <span className="text-sm text-muted">
            The overlay never steals focus
          </span>
        </div>
      </VisualPane>

      <VisualPane progress={progress} index={2}>
        <div
          style={{ "--caret-color": "#7C8AFF" } as React.CSSProperties}
          className="w-4/5 rounded-xl bg-[#171A26] p-5 font-mono text-sm leading-relaxed text-[#e8ebf5]"
        >
          <span className="text-[#e8ebf5]/50">$ </span>
          ship the overlay fix and rerun the desktop suite
          <span className="caret ml-1" />
          <div className="mt-4 flex items-center gap-2 text-[12px] text-[#4ade80]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            transcribed locally in 1.1s
          </div>
        </div>
      </VisualPane>
    </div>
  );
}

function VisualPane({
  progress,
  index,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  children: React.ReactNode;
}) {
  const [start, end] = stepRange(index);
  // Explicit piecewise curve. The first pane is visible immediately and the
  // last one stays visible at the end of the pinned range.
  const opacity = useTransform(progress, (p: number) => {
    const fadeInStart = index === 0 ? -1 : start - 0.05;
    const fadeInEnd = index === 0 ? 0 : start + 0.02;
    const fadeOutStart = index === 2 ? 2 : end - 0.03;
    const fadeOutEnd = index === 2 ? 3 : end + 0.03;
    if (p < fadeInStart) return 0;
    if (p < fadeInEnd) return (p - fadeInStart) / (fadeInEnd - fadeInStart);
    if (p <= fadeOutStart) return 1;
    if (p < fadeOutEnd) return 1 - (p - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    return 0;
  });
  const scale = useTransform(opacity, (o: number) => 0.93 + 0.07 * o);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
}
