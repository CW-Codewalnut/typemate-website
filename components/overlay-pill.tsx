"use client";

/* A faithful replica of the app's dictation overlay pill
   (lib/src/components/overlay_pill.dart): 210x58, radius 29,
   #1F2230 background, a 12.5px message line, and seven #7A8BFF bars
   (4px wide, 5px gap) animating 4-14px on a 70ms sine tick. */

import { useEffect, useState } from "react";

export function OverlayPill({ message }: { message: string }) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 70);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex flex-col items-center shadow-[0_10px_32px_rgba(0,0,0,0.45)]"
      style={{
        width: 210,
        height: 58,
        borderRadius: 29,
        background: "#1F2230",
        paddingTop: 7,
      }}
    >
      <div className="flex h-[22px] items-center text-[12.5px] leading-none text-white">
        {message}
      </div>
      <div className="flex flex-1 items-center" style={{ gap: 5 }}>
        {Array.from({ length: 7 }).map((_, i) => {
          const height = 4 + ((Math.sin((tick + i * 2) * 0.55) + 1) / 2) * 10;
          return (
            <span
              key={i}
              style={{
                width: 4,
                height,
                borderRadius: 2,
                background: "#7A8BFF",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
