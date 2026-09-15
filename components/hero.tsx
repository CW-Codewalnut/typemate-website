"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { OverlayPill } from "./overlay-pill";
import {
  ClaudeCodeScene,
  NotesScene,
  SlackScene,
  VSCodeScene,
  WhatsAppScene,
  type SceneProps,
  AndroidScene,
  IosScene,
} from "./demo-scenes";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const drift = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-screen flex-col items-center overflow-hidden px-5 pt-36 pb-24"
    >
      <div className="dot-grid absolute inset-0" aria-hidden />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex items-center gap-2 rounded-full border border-edge bg-surface px-4 py-1.5 text-[13px] font-medium text-foreground"
        >
          <span className="relative flex h-2 w-2">
            <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-success" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          100% local. Your voice never leaves your machine.
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl"
        >
          Press. Speak.
          <br />
          <span className="text-accent">Watch it type.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mt-7 max-w-xl text-lg leading-relaxed text-muted"
        >
          TypeMate is a fast, private dictation app for developers, AI power
          users, and heavy typers. Hold the shortcut on your computer or tap
          the mic on your phone, speak, and your words land in whatever field
          has focus, in 28 languages, with no cloud in between.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#download"
            className="rounded-[10px] bg-cta px-7 py-3.5 font-semibold text-cta-foreground transition hover:bg-cta-hover"
          >
            Download
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-5 text-[13px] text-muted"
        >
          Free to use. Available for Windows, macOS, Linux, Android,
          iPhone and iPad.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        style={{ y: drift }}
        className="relative z-10 mt-16 w-full max-w-3xl"
      >
        <DictationDemo />
      </motion.div>
    </section>
  );
}

type Scene = {
  // The label above the screen always reads "app / language".
  app: string;
  language: string;
  text: string;
  Scene: (props: SceneProps) => React.ReactNode;
  // Mobile scenes draw their own dictation surface (the floating mic on
  // Android, the keyboard on iOS), so the desktop overlay stays out, and
  // they play inside a phone frame instead of the laptop.
  mobile?: boolean;
};

const scenes: Scene[] = [
  {
    app: "Claude Code",
    language: "English",
    text: "Refactor the recorder behind the adapter contract and add tests for the failure path.",
    Scene: ClaudeCodeScene,
  },
  {
    app: "VS Code",
    language: "English",
    text: "fix: debounce the shortcut poller",
    Scene: VSCodeScene,
  },
  {
    app: "Slack",
    language: "English",
    text: "Overlay fix is up for review, can someone rerun the desktop e2e job?",
    Scene: SlackScene,
  },
  {
    app: "Notes",
    language: "Hindi",
    text: "आज की टीम मीटिंग शाम पाँच बजे शुरू होगी",
    Scene: NotesScene,
  },
  {
    app: "WhatsApp",
    language: "Hinglish",
    text: "kal ka standup thoda late hoga, sabko bata dena",
    Scene: WhatsAppScene,
  },
  {
    app: "Chat on Android",
    language: "Hinglish",
    text: "haan do minute mein bhejta hoon",
    Scene: AndroidScene,
    mobile: true,
  },
  {
    app: "Messages on iPhone",
    language: "English",
    text: "running ten minutes late, start without me",
    Scene: IosScene,
    mobile: true,
  },
];

type Phase = "hold" | "listen" | "transcribe" | "type" | "done";

function DictationDemo() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("hold");
  const [typed, setTyped] = useState("");
  const scene = scenes[sceneIndex];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "hold") {
      timer = setTimeout(() => setPhase("listen"), 1100);
    } else if (phase === "listen") {
      timer = setTimeout(() => setPhase("transcribe"), 1900);
    } else if (phase === "transcribe") {
      timer = setTimeout(() => setPhase("type"), 950);
    } else if (phase === "type") {
      if (typed.length < scene.text.length) {
        timer = setTimeout(
          () => setTyped(scene.text.slice(0, typed.length + 1)),
          scene.text[typed.length] === " " ? 12 : 26,
        );
      } else {
        timer = setTimeout(() => setPhase("done"), 2200);
      }
    } else {
      timer = setTimeout(() => {
        setTyped("");
        setSceneIndex((i) => (i + 1) % scenes.length);
        setPhase("hold");
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [phase, typed, scene.text]);

  const screen = (compact: boolean) => (
    <>
      <scene.Scene typed={typed} phase={phase} compact={compact} />

      {/* The real desktop overlay: appears while listening and
          transcribing, then hides before the text is typed, exactly like
          the app. Mobile scenes draw their own surface. */}
      {!scene.mobile && (
        <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
          {phase === "hold" ? (
            <div className="flex items-center gap-2 rounded-full border border-edge bg-surface px-5 py-2.5 text-[13px] text-foreground shadow-[0_4px_18px_rgba(23,26,38,0.12)]">
              Hold <span className="kbd">Ctrl</span>
              <span className="text-muted/60">+</span>
              <span className="kbd">Win</span> and speak
            </div>
          ) : phase === "listen" || phase === "transcribe" ? (
            <OverlayPill
              message={phase === "listen" ? "TypeMate is listening..." : "Transcribing locally..."}
            />
          ) : null}
        </div>
      )}

    </>
  );

  return (
    <div id="demo" className="flex flex-col items-center">
      <p className="mb-6 font-mono text-sm uppercase tracking-[0.18em] text-accent">
        How it works
      </p>
      {scene.mobile ? (
        <>
          <div className="mb-4 flex items-center text-[13px] font-medium text-muted">
            <SceneLabel scene={scene} />
          </div>
          <PhoneFrame>{screen(true)}</PhoneFrame>
        </>
      ) : (
        <LaptopFrame>
          <div className="flex items-center gap-2 border-b border-edge px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]/70" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]/70" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]/70" />
            <span className="ml-3 flex items-center text-[13px] font-medium text-muted">
              <SceneLabel scene={scene} />
            </span>
          </div>
          <LaptopScreen>{screen}</LaptopScreen>
        </LaptopFrame>
      )}
    </div>
  );
}

/* "Slack" and a small "English" tag: the app being dictated into and the
   language spoken. No separator between them, a slash read as a choice. */
function SceneLabel({ scene }: { scene: Scene }) {
  return (
    <>
      {scene.app}
      <span className="ml-2.5 rounded-full border border-edge bg-background px-2 py-0.5 text-[11px] font-medium text-accent">
        {scene.language}
      </span>
    </>
  );
}

/* The laptop screen always fills the frame. Two layouts, chosen by the
   width the frame actually has (not the viewport): the desktop and tablet
   one is a 16:10 screen with the apps' sidebars and side panels, the
   phone one is a 4:3 screen where every app drops to its message area
   only, at full text size, instead of the same picture shrunk down. */
const COMPACT_BELOW = 480;

function LaptopScreen({
  children,
}: {
  children: (compact: boolean) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setCompact(el.clientWidth < COMPACT_BELOW);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: compact ? "4 / 3" : "16 / 10" }}
    >
      <div className="absolute inset-0">{children(compact)}</div>
    </div>
  );
}

/* A laptop: dark bezel around the window, a base below it. */
function LaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[624px]">
      <div className="rounded-t-[16px] rounded-b-[8px] border border-edge bg-[#171A26] p-2.5 shadow-[0_24px_60px_rgba(23,26,38,0.18)]">
        <div className="overflow-hidden rounded-[10px] bg-surface">{children}</div>
      </div>
      <div className="mx-auto h-3.5 w-[106%] -translate-x-[3%] rounded-b-[12px] border border-t-0 border-edge bg-gradient-to-b from-[#2a2e3f] to-[#1d2030]" />
    </div>
  );
}

/* A phone: the same frame the app's own mockups use. */
function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-[520px] w-[262px] rounded-[38px] border border-edge bg-[#171A26] p-3 shadow-[0_24px_60px_rgba(23,26,38,0.18)]">
      <div className="relative h-full w-full overflow-hidden rounded-[28px]">{children}</div>
    </div>
  );
}
