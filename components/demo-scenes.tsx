"use client";

/* Stylized miniatures of the apps the hero demo dictates into. Each
   scene draws the app's recognizable chrome and puts the dictated text
   in that app's real input area. */

export type ScenePhase = "hold" | "listen" | "transcribe" | "type" | "done";

export type SceneProps = { typed: string; phase: ScenePhase };

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
export function ClaudeCodeScene({ typed, phase }: SceneProps) {
  return (
    <div
      style={darkCaret}
      className="flex h-full flex-col bg-[#121212] px-4 py-3 font-mono text-[12px] leading-relaxed sm:px-5"
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
export function VSCodeScene({ typed, phase }: SceneProps) {
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
        <div className="flex w-44 shrink-0 flex-col border-r border-white/10 bg-[#1f1f1f] p-2.5 sm:w-52">
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
        <div className="hidden min-w-0 flex-1 flex-col gap-1 p-3 font-mono text-[10.5px] leading-relaxed text-white/40 sm:flex">
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
export function SlackScene({ typed, phase }: SceneProps) {
  return (
    <div style={darkCaret} className="flex h-full bg-[#1a1d21] text-[11.5px]">
      <div className="hidden w-40 shrink-0 flex-col bg-[#19171d] p-3 sm:flex">
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
export function NotesScene({ typed, phase }: SceneProps) {
  return (
    <div className="flex h-full flex-col bg-[#faf6ec] px-5 py-4 sm:px-7">
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
export function WhatsAppScene({ typed, phase }: SceneProps) {
  return (
    <div style={darkCaret} className="flex h-full flex-col bg-[#0b141a] text-[11.5px]">
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
  );
}
