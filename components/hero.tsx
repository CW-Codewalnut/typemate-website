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
} from "./demo-scenes";
import { RELEASES_URL } from "@/lib/releases";

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
          Hold a key. Speak.
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
          users, and heavy typers. Hold a shortcut, speak, release. Your words
          land in whatever field has focus, in 28 languages, with no cloud in
          between.
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
            Download free
          </a>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-[10px] border border-edge bg-surface px-7 py-3.5 font-semibold transition hover:border-accent/50"
          >
            Latest release
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-5 text-[13px] text-muted"
        >
          Free and open source. Available for Windows, Linux, and Android,
          with macOS in preview.
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
  app: string;
  hint: string;
  text: string;
  Scene: (props: SceneProps) => React.ReactNode;
};

const scenes: Scene[] = [
  {
    app: "Claude Code",
    hint: "prompt",
    text: "Refactor the recorder behind the adapter contract and add tests for the failure path.",
    Scene: ClaudeCodeScene,
  },
  {
    app: "VS Code",
    hint: "commit message",
    text: "fix: debounce the shortcut poller",
    Scene: VSCodeScene,
  },
  {
    app: "Slack",
    hint: "message to #eng",
    text: "Overlay fix is up for review, can someone rerun the desktop e2e job?",
    Scene: SlackScene,
  },
  {
    app: "Notes",
    hint: "Hindi",
    text: "आज की टीम मीटिंग शाम पाँच बजे शुरू होगी",
    Scene: NotesScene,
  },
  {
    app: "WhatsApp",
    hint: "Hinglish",
    text: "kal ka standup thoda late hoga, sabko bata dena",
    Scene: WhatsAppScene,
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

  return (
    <div className="overflow-hidden rounded-[16px] border border-edge bg-surface shadow-[0_2px_24px_rgba(23,26,38,0.08)]">
      <div className="flex items-center gap-2 border-b border-edge px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]/70" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]/70" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]/70" />
        <span className="ml-3 text-[13px] font-medium text-muted">
          {scene.app}
          <span className="mx-2 opacity-40">/</span>
          <span className="opacity-70">{scene.hint}</span>
        </span>
      </div>

      <div className="relative h-[290px]">
        <scene.Scene typed={typed} phase={phase} />

        {/* The real overlay: appears while listening and transcribing,
            then hides before the text is typed, exactly like the app. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
          {phase === "hold" ? (
            <div className="flex items-center gap-2 rounded-full border border-edge bg-surface px-5 py-2.5 text-[13px] text-foreground shadow-[0_4px_18px_rgba(23,26,38,0.12)]">
              Hold <span className="kbd">Ctrl</span>
              <span className="text-muted/60">+</span>
              <span className="kbd">Win</span> to talk
            </div>
          ) : phase === "listen" || phase === "transcribe" ? (
            <OverlayPill
              message={
                phase === "listen"
                  ? "TypeMate is listening..."
                  : "Transcribing locally..."
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
