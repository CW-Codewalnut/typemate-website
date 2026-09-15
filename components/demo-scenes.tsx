"use client";

/* Stylized miniatures of the apps the hero demo dictates into. Each
   scene draws the app's recognizable chrome and puts the dictated text
   in that app's real input area. */

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export type ScenePhase = "hold" | "listen" | "transcribe" | "type" | "done";

/* `compact` is the phone layout of a desktop scene: the frame is too
   narrow for sidebars and side panels, so only the message area shows.
   It follows the frame's width, not the viewport's. */
export type SceneProps = { typed: string; phase: ScenePhase; compact?: boolean };

/* The site theme's caret is dark ink-blue; inside these dark app
   miniatures it must stay light to remain visible. */
const darkCaret = { "--caret-color": "#7C8AFF" } as React.CSSProperties;

function TypedText({
  typed,
  phase,
  placeholder,
  className = "",
}: SceneProps & { placeholder: string; className?: string }) {
  if (typed.length === 0) {
    return <span className={`opacity-40 ${className}`}>{placeholder}</span>;
  }
  return (
    <span className={className}>
      {typed}
      {phase === "type" && <span className="caret ml-0.5 !h-[1em]" />}
    </span>
  );
}

/* Claude Code: dark terminal, coral spark, bordered prompt box. */
export function ClaudeCodeScene({ typed, phase, compact }: SceneProps) {
  return (
    <div
      style={darkCaret}
      className={`flex h-full flex-col bg-[#121212] py-3 font-mono text-[12px] leading-relaxed ${compact ? "px-4" : "px-5"}`}
    >
      <div className="text-[#d97757]">
        ✻ Claude Code
        <span className="ml-2 text-white/25">~/typemate</span>
      </div>
      <div className="mt-1 text-white/30">
        4 files changed · tests passing · /help for commands
      </div>
      <div className="mt-auto rounded-lg border border-white/15 bg-[#1c1c1c] px-3 py-2.5 text-white/90">
        <span className="text-[#d97757]">&gt; </span>
        <TypedText
          typed={typed}
          phase={phase}
          placeholder="Describe what to build..."
        />
      </div>
      <div className="mt-1.5 text-[10px] text-white/25">
        ? for shortcuts · tab to accept
      </div>
    </div>
  );
}

/* VS Code: activity bar, Source Control sidebar with the commit
   message box, dim editor, blue status bar. */
export function VSCodeScene({ typed, phase, compact }: SceneProps) {
  return (
    <div style={darkCaret} className="flex h-full flex-col bg-[#181818] text-[11px]">
      <div className="flex min-h-0 flex-1">
        <div className="flex w-9 shrink-0 flex-col items-center gap-4 border-r border-white/10 pt-3 text-white/35">
          <span>⧉</span>
          <span>🔍</span>
          <span className="relative text-white">
            ⑂
            <span className="absolute -right-1.5 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0078d4] text-[8px] text-white">
              3
            </span>
          </span>
          <span>▷</span>
        </div>
        <div
          className={`flex shrink-0 flex-col border-r border-white/10 bg-[#1f1f1f] p-2.5 ${compact ? "min-w-0 flex-1" : "w-52"}`}
        >
          <div className="mb-2 text-[10px] font-semibold tracking-wide text-white/50">
            SOURCE CONTROL
          </div>
          <div className="rounded-md border border-[#0078d4]/70 bg-[#2a2a2a] px-2 py-1.5 leading-snug text-white/90">
            <TypedText
              typed={typed}
              phase={phase}
              placeholder="Message (Ctrl+Enter)"
              className="font-mono text-[10.5px]"
            />
          </div>
          <button className="mt-2 rounded-md bg-[#0078d4] py-1 text-center text-[10.5px] font-medium text-white">
            ✓ Commit
          </button>
          <div className="mt-3 text-[10px] text-white/45">Changes · 3</div>
          <div className="mt-1.5 flex flex-col gap-1 text-white/60">
            <span>M shortcut_poller.dart</span>
            <span>M dictation_ctrl.dart</span>
            <span className="text-[#73c991]">U poller_test.dart</span>
          </div>
        </div>
        <div
          className={`min-w-0 flex-1 flex-col gap-1 p-3 font-mono text-[10.5px] leading-relaxed text-white/40 ${compact ? "hidden" : "flex"}`}
        >
          <span>
            <span className="text-[#c586c0]">class</span>{" "}
            <span className="text-[#4ec9b0]">ShortcutPoller</span> {"{"}
          </span>
          <span className="pl-4">
            <span className="text-[#c586c0]">final</span> Duration interval;
          </span>
          <span className="pl-4 text-[#6a9955]">
            {"// debounce release events"}
          </span>
          <span>{"}"}</span>
        </div>
      </div>
      <div className="flex h-5 shrink-0 items-center gap-3 bg-[#0078d4] px-3 text-[9.5px] text-white">
        <span>⑂ dev</span>
        <span>↻ 0↓ 1↑</span>
        <span className="ml-auto">Dart · UTF-8</span>
      </div>
    </div>
  );
}

/* Slack: aubergine sidebar, #eng channel, toolbar input. */
export function SlackScene({ typed, phase, compact }: SceneProps) {
  return (
    <div style={darkCaret} className="flex h-full bg-[#1a1d21] text-[11.5px]">
      <div
        className={`w-40 shrink-0 flex-col bg-[#19171d] p-3 ${compact ? "hidden" : "flex"}`}
      >
        <div className="mb-3 text-[12.5px] font-bold text-white">
          CodeWalnut ▾
        </div>
        <div className="flex flex-col gap-1 text-white/55">
          <span className="px-2 py-0.5"># general</span>
          <span className="rounded bg-[#1164a3] px-2 py-0.5 text-white">
            # eng
          </span>
          <span className="px-2 py-0.5"># release</span>
          <span className="px-2 py-0.5"># random</span>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-white/10 px-4 py-2 font-bold text-white">
          # eng
          <span className="ml-2 font-normal text-white/40">12 members</span>
        </div>
        <div className="flex flex-1 flex-col justify-end gap-3 px-4 pb-2">
          <div className="flex gap-2">
            <span className="mt-0.5 h-6 w-6 shrink-0 rounded bg-[#e8912d]/80 text-center text-[10px] leading-6 text-white">
              P
            </span>
            <div>
              <div>
                <span className="font-bold text-white">Priya</span>
                <span className="ml-2 text-[10px] text-white/35">11:42</span>
              </div>
              <div className="text-white/75">
                desktop e2e is red again, anyone free?
              </div>
            </div>
          </div>
        </div>
        <div className="mx-4 mb-3 rounded-lg border border-white/20 bg-[#222529] px-3 py-2">
          <div className="text-white/85">
            <TypedText typed={typed} phase={phase} placeholder="Message #eng" />
          </div>
          <div className="mt-1.5 flex gap-2.5 text-[10px] text-white/35">
            <span className="font-bold">B</span>
            <span className="italic">I</span>
            <span className="line-through">S</span>
            <span>&lt;/&gt;</span>
            <span>@</span>
            <span>😊</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Notes: warm light note page for Devanagari. */
export function NotesScene({ typed, phase, compact }: SceneProps) {
  return (
    <div className={`flex h-full flex-col bg-[#faf6ec] py-4 ${compact ? "px-5" : "px-7"}`}>
      <div className="flex items-baseline justify-between border-b border-[#e5ddc8] pb-2">
        <span className="text-[14px] font-bold text-[#3a3428]">टीम नोट्स</span>
        <span className="text-[10px] text-[#a89e88]">5 अगस्त 2026</span>
      </div>
      <div className="pt-3 text-[13.5px] leading-relaxed text-[#3a3428]">
        <TypedText
          typed={typed}
          phase={phase}
          placeholder="यहाँ लिखना शुरू करें..."
        />
      </div>
      <div className="mt-auto flex gap-4 pb-1 text-[12px] text-[#b8ad93]">
        <span>Aa</span>
        <span>☑</span>
        <span>📷</span>
        <span>✏️</span>
      </div>
    </div>
  );
}

/* WhatsApp: dark chat, teal outgoing bubble, round green action. */
export function WhatsAppScene({ typed, phase, compact }: SceneProps) {
  const chats = [
    ["Team Standup", "10 baje, calendar dekh lo", true],
    ["Priya", "PR merged, thanks!", false],
    ["Arjun", "call at 4?", false],
    ["Meera", "sent the deck", false],
  ] as const;
  return (
    <div style={darkCaret} className="flex h-full bg-[#0b141a] text-[11.5px]">
      {/* WhatsApp Desktop's chat list; the phone layout has no room for it. */}
      <div
        className={`w-44 shrink-0 flex-col border-r border-white/10 bg-[#111b21] ${compact ? "hidden" : "flex"}`}
      >
        <div className="px-4 py-3 text-[13px] font-bold text-white">Chats</div>
        {chats.map(([name, last, active]) => (
          <div
            key={name}
            className={`flex items-center gap-2.5 px-3 py-2 ${active ? "bg-[#2a3942]" : ""}`}
          >
            <span className="h-7 w-7 shrink-0 rounded-full bg-[#3b4a54]" />
            <div className="min-w-0">
              <div className="truncate font-medium text-white">{name}</div>
              <div className="truncate text-[10px] text-white/45">{last}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
      <div className="flex items-center gap-2.5 bg-[#202c33] px-4 py-2">
        <span className="h-7 w-7 rounded-full bg-gradient-to-br from-[#00a884] to-[#1164a3]" />
        <div>
          <div className="font-semibold text-white">Team Standup</div>
          <div className="text-[9.5px] text-white/45">
            Priya, Arjun, Meera, You
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 px-4 pb-2">
        <div className="max-w-[75%] self-start rounded-lg rounded-tl-none bg-[#202c33] px-2.5 py-1.5 text-white/85">
          kal standup kitne baje hai?
          <span className="ml-2 text-[9px] text-white/35">11:58</span>
        </div>
        <div className="max-w-[75%] self-end rounded-lg rounded-tr-none bg-[#005c4b] px-2.5 py-1.5 text-white/90">
          10 baje, calendar dekh lo
          <span className="ml-2 text-[9px] text-white/40">11:59 ✓✓</span>
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 pb-3">
        <div className="flex-1 rounded-full bg-[#202c33] px-4 py-2 text-white/85">
          <TypedText typed={typed} phase={phase} placeholder="Message" />
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-white">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
            <path
              d="M5 11a7 7 0 0 0 14 0M12 18v3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </div>
      </div>
    </div>
  );
}

/* Breathing bars shared by the two mobile scenes. */
function Bars({
  count,
  width,
  still,
  color,
  min,
  max,
}: {
  count: number;
  width: number;
  still: boolean;
  color: string;
  min: number;
  max: number;
}) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (still) return;
    const id = setInterval(() => setTick((t) => t + 1), 70);
    return () => clearInterval(id);
  }, [still]);
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const height = still
          ? (min + max) / 2
          : min + ((Math.sin((tick + i * 2) * 0.55) + 1) / 2) * (max - min);
        return (
          <span
            key={i}
            style={{ width, height, borderRadius: width / 2, background: color }}
          />
        );
      })}
    </>
  );
}

/* Android: a dark chat with the floating mic bubble on top of it. The
   bubble is the overlay on Android: it becomes the listening pill while
   dictating and collapses back as the words land in the field. */
export function AndroidScene({ typed, phase }: SceneProps) {
  const active = phase === "listen" || phase === "transcribe";
  return (
    <div style={darkCaret} className="relative flex h-full flex-col bg-[#131624] text-[11.5px]">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2 text-white">
        <span className="h-6 w-6 rounded-full bg-[#5b6cff]/70" />
        <span className="font-bold">Priya</span>
        <span className="text-[10px] text-white/40">online</span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 px-4 pb-2">
        <div className="max-w-[60%] self-start rounded-2xl rounded-bl-md bg-[#0e1019] px-3.5 py-2 text-[#9299b0]">
          Standup notes ready?
        </div>
        <div className="max-w-[60%] self-end rounded-2xl rounded-br-md bg-[#5b6cff] px-3.5 py-2 text-white">
          link bheja hai, check karo
        </div>
      </div>
      <div className="mx-4 mb-3 flex items-center rounded-full bg-[#0e1019] px-4 py-2.5 text-[#e8ebf5]">
        <TypedText typed={typed} phase={phase} placeholder="Message" />
      </div>

      <motion.div
        initial={false}
        animate={
          active
            ? { right: 16, top: 70, width: 210, height: 58, borderRadius: 29, backgroundColor: "rgba(31, 34, 48, 1)" }
            : { right: 20, top: 80, width: 48, height: 48, borderRadius: 24, backgroundColor: "rgba(232, 235, 245, 0.85)" }
        }
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        className="absolute flex items-center justify-center overflow-hidden shadow-[0_8px_26px_rgba(0,0,0,0.4)]"
      >
        {active ? (
          <div className="flex flex-col items-center pt-[7px]">
            <div className="flex h-[22px] items-center whitespace-nowrap text-[12.5px] leading-none text-white">
              {phase === "listen" ? "TypeMate is listening..." : "Transcribing locally..."}
            </div>
            <div className="flex h-[22px] items-center" style={{ gap: 5 }}>
              <Bars count={7} width={4} still={phase === "transcribe"} color="#7A8BFF" min={4} max={14} />
            </div>
          </div>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[#1F2230]" aria-hidden>
            <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </motion.div>
    </div>
  );
}

/* iPhone: Messages with the TypeMate keyboard. iOS allows no overlay over
   other apps, so the keyboard is the dictation surface: one purple mic,
   a status line above it, bars while listening. */
export function IosScene({ typed, phase }: SceneProps) {
  const listening = phase === "listen" || phase === "transcribe";
  const status =
    phase === "listen"
      ? "Listening..."
      : phase === "transcribe"
        ? "Transcribing..."
        : "Tap the mic to start listening";
  return (
    <div
      style={{ "--caret-color": "#4B63DC" } as React.CSSProperties}
      className="flex h-full flex-col bg-white text-[11.5px] text-[#1F2230]"
    >
      <div className="flex items-center justify-center gap-2 border-b border-[#eceef3] py-2">
        <span className="h-6 w-6 rounded-full bg-gradient-to-b from-[#b9c1e8] to-[#6f7fd6]" />
        <span className="rounded-full bg-[#f1f2f6] px-3 py-0.5 text-[11px] font-semibold">
          +1 (555) 564-8583
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 px-4 pb-2">
        <div className="max-w-[60%] self-start rounded-2xl rounded-bl-md bg-[#e9e9eb] px-3.5 py-2">
          Are you joining the call?
        </div>
      </div>
      <div className="mx-4 mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f1f2f6] text-[15px]">+</span>
        <div className="flex min-w-0 flex-1 items-center rounded-full border border-[#e3e5ec] px-3 py-1.5">
          <span className="min-w-0 flex-1 truncate">
            <TypedText typed={typed} phase={phase} placeholder="iMessage" />
          </span>
        </div>
      </div>
      <div className="flex h-[38%] min-h-[132px] flex-col bg-[#e1e3ea] px-4 pt-4 pb-2">
        <span className="text-center text-[11px] text-[#6b7186]">{status}</span>
        <div className="mt-3 flex h-9 items-center justify-center">
          {listening ? (
            <div
              className="flex w-full items-center justify-between"
              style={{ opacity: phase === "transcribe" ? 0.45 : 1 }}
            >
              <Bars count={28} width={5} still={phase === "transcribe"} color="#5b6cff" min={10} max={34} />
            </div>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-[#5b6cff]" aria-hidden>
              <rect x="9.5" y="2.5" width="5" height="11" rx="2.5" fill="currentColor" />
              <path d="M6.5 11a5.5 5.5 0 0 0 11 0M12 17.5V21M9.5 21h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between px-1 text-[#1F2230]">
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
            <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}
