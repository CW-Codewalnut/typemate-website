"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { MicGlyph } from "./nav";
import { RELEASES_URL } from "@/lib/releases";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const blobA = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const blobB = useTransform(scrollYProgress, [0, 1], [0, -140]);
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
        aria-hidden
        style={{ y: blobA }}
        className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-accent/18 blur-[140px]"
      />
      <motion.div
        aria-hidden
        style={{ y: blobB }}
        className="absolute top-64 -right-40 h-[380px] w-[380px] rounded-full bg-[#3b2f8f]/25 blur-[120px]"
      />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-7 flex items-center gap-2 rounded-full border border-edge bg-raised/80 px-4 py-1.5 text-[13px] font-medium text-muted"
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
          className="text-5xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-7xl"
        >
          Hold a key. Speak.
          <br />
          <span className="bg-gradient-to-r from-accent-bright via-[#9aa6ff] to-accent bg-clip-text text-transparent">
            Watch it type.
          </span>
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
            className="rounded-[14px] bg-accent px-7 py-3.5 font-semibold text-white shadow-[0_8px_32px_rgba(91,108,255,0.4)] transition hover:bg-accent-bright hover:shadow-[0_8px_40px_rgba(91,108,255,0.55)]"
          >
            Download free
          </a>
          <a
            href={RELEASES_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-[14px] border border-edge bg-raised px-7 py-3.5 font-semibold transition hover:border-accent/50"
          >
            All releases
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-5 text-[13px] text-muted"
        >
          Windows and Linux, with macOS preview and Android. Free and open
          source, Apache 2.0.
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
  mono?: boolean;
};

const scenes: Scene[] = [
  {
    app: "Claude Code",
    hint: "prompt",
    text: "Refactor the recorder behind the adapter contract and add tests for the failure path.",
    mono: true,
  },
  {
    app: "VS Code",
    hint: "commit message",
    text: "fix: debounce the shortcut poller so release events are never dropped",
    mono: true,
  },
  {
    app: "Slack",
    hint: "message to #eng",
    text: "Overlay fix is up for review, can someone rerun the desktop e2e job?",
  },
  {
    app: "Notes",
    hint: "Hindi",
    text: "आज की टीम मीटिंग शाम पाँच बजे शुरू होगी",
  },
  {
    app: "WhatsApp",
    hint: "Hinglish",
    text: "kal ka standup thoda late hoga, sabko bata dena",
  },
];

type Phase = "hold" | "listen" | "type" | "done";

function DictationDemo() {
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("hold");
  const [typed, setTyped] = useState("");
  const scene = scenes[sceneIndex];

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "hold") {
      timer = setTimeout(() => setPhase("listen"), 900);
    } else if (phase === "listen") {
      timer = setTimeout(() => setPhase("type"), 1600);
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
    <div className="overflow-hidden rounded-[22px] border border-edge bg-surface/90 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur">
      <div className="flex items-center gap-2 border-b border-edge px-5 py-3.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[13px] font-medium text-muted">
          {scene.app}
          <span className="mx-2 opacity-40">/</span>
          <span className="opacity-70">{scene.hint}</span>
        </span>
      </div>

      <div className="relative px-6 pt-6 pb-24 sm:px-8">
        <div
          className={`min-h-[76px] text-[15px] leading-relaxed sm:text-base ${
            scene.mono ? "font-mono text-[13.5px] sm:text-sm" : ""
          }`}
        >
          <span>{typed}</span>
          {phase === "type" && <span className="caret ml-0.5" />}
          {phase !== "type" && typed.length === 0 && (
            <span className="text-muted/50">
              {phase === "hold" ? "Click here, then hold the shortcut..." : "Listening..."}
            </span>
          )}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
          <motion.div
            layout
            className="flex items-center gap-3 rounded-full border border-edge bg-raised/95 px-5 py-2.5 shadow-[0_8px_28px_rgba(0,0,0,0.45)]"
          >
            {phase === "hold" ? (
              <span className="flex items-center gap-2 text-[13px] text-muted">
                Hold <span className="kbd">Ctrl</span>
                <span className="text-muted/60">+</span>
                <span className="kbd">Win</span> to talk
              </span>
            ) : phase === "listen" ? (
              <>
                <span className="relative flex h-2.5 w-2.5">
                  <span className="pulse-ring absolute h-full w-full rounded-full bg-accent-bright" />
                  <span className="relative h-2.5 w-2.5 rounded-full bg-accent-bright" />
                </span>
                <span className="flex h-5 items-center gap-[3px]">
                  {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                    <span
                      key={i}
                      className="wave-bar h-full"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </span>
                <span className="text-[13px] font-medium text-foreground">
                  Listening
                </span>
              </>
            ) : (
              <>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
                  <MicGlyph className="h-3 w-3" />
                </span>
                <span className="text-[13px] font-medium text-foreground">
                  {phase === "type" ? "Typing into the focused field" : "Done in 1.2s"}
                </span>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
