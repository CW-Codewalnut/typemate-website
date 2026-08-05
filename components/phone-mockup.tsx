"use client";

/* Animated Android mockup. The floating mic bubble morphs into the
   overlay pill while dictating (they are the same surface in the app,
   never shown together), then collapses back as the text lands in the
   focused input. Pill styling matches overlay_pill.dart. */

import { motion } from "motion/react";
import { useEffect, useState } from "react";

type Phase = "idle" | "listen" | "transcribe" | "type" | "done";

const DICTATED = "haan do minute mein bhejta hoon";

/* Screen interior is 246px wide (270 frame - 2x12 padding). */
const bubble = {
  left: 186,
  top: 150,
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: "rgba(232, 235, 245, 0.78)",
};

const pill = {
  left: 18,
  top: 180,
  width: 210,
  height: 58,
  borderRadius: 29,
  backgroundColor: "rgba(31, 34, 48, 1)",
};

export function PhoneMockup() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (phase === "idle") {
      timer = setTimeout(() => setPhase("listen"), 1800);
    } else if (phase === "listen") {
      timer = setTimeout(() => setPhase("transcribe"), 2300);
    } else if (phase === "transcribe") {
      timer = setTimeout(() => setPhase("type"), 1100);
    } else if (phase === "type") {
      if (typed.length < DICTATED.length) {
        timer = setTimeout(
          () => setTyped(DICTATED.slice(0, typed.length + 1)),
          35,
        );
      } else {
        timer = setTimeout(() => setPhase("done"), 1600);
      }
    } else {
      timer = setTimeout(() => {
        setTyped("");
        setPhase("idle");
      }, 400);
    }
    return () => clearTimeout(timer);
  }, [phase, typed]);

  const active = phase === "listen" || phase === "transcribe";

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
            link bheja hai, check karo
          </div>
        </div>

        {/* input row: dictated text lands here */}
        <div className="mx-3 mb-4 flex items-center gap-2 rounded-full bg-surface px-4 py-2.5">
          {typed.length > 0 ? (
            <span className="flex-1 truncate text-[12px] text-foreground">
              {typed}
              {phase === "type" && <span className="caret ml-0.5 !h-[0.95em]" />}
            </span>
          ) : (
            <span className="flex-1 text-[12px] text-muted/60">Message</span>
          )}
        </div>

        {/* the bubble that morphs into the overlay pill and back */}
        <motion.div
          initial={bubble}
          animate={active ? pill : bubble}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="absolute flex items-center justify-center overflow-hidden shadow-[0_8px_26px_rgba(0,0,0,0.4)] backdrop-blur-sm"
        >
          {active ? (
            <motion.div
              key="pill"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.12 }}
              className="flex flex-col items-center pt-[7px]"
            >
              <div className="flex h-[22px] items-center whitespace-nowrap text-[12.5px] leading-none text-white">
                {phase === "listen"
                  ? "TypeMate is listening..."
                  : "Transcribing locally..."}
              </div>
              <div className="flex h-[22px] items-center" style={{ gap: 5 }}>
                <Bars />
              </div>
            </motion.div>
          ) : (
            <motion.svg
              key="mic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 shrink-0 text-[#1F2230]"
              aria-hidden
            >
              <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
              <path
                d="M5 11a7 7 0 0 0 14 0M12 18v3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </motion.svg>
          )}
        </motion.div>
      </div>
    </div>
  );
}

function Bars() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 70);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      {Array.from({ length: 7 }).map((_, i) => {
        const height = 4 + ((Math.sin((tick + i * 2) * 0.55) + 1) / 2) * 10;
        return (
          <span
            key={i}
            style={{ width: 4, height, borderRadius: 2, background: "#7A8BFF" }}
          />
        );
      })}
    </>
  );
}
