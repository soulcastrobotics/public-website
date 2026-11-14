"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$<>/\\*+=";

type Props = {
  /** One phrase, or several to cycle through. */
  text: string | string[];
  className?: string;
  /** Delay before the first decode, ms. */
  delay?: number;
  /** How long each phrase stays before scrambling to the next, ms. */
  hold?: number;
};

/** Decodes text out of random glyphs, like a signal locking in. */
export default function ScrambleText({ text, className, delay = 0, hold = 3200 }: Props) {
  const phrases = Array.isArray(text) ? text : [text];
  const [out, setOut] = useState(phrases[0]);
  const idx = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;

    const decode = (target: string) => {
      const start = performance.now();
      const dur = 900 + target.length * 35;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        const settled = Math.floor(p * target.length);
        let s = "";
        for (let i = 0; i < target.length; i++) {
          const c = target[i];
          s += i < settled || c === " " ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        setOut(s);
        if (p < 1) raf = requestAnimationFrame(tick);
        else if (phrases.length > 1) {
          timer = setTimeout(() => {
            idx.current = (idx.current + 1) % phrases.length;
            decode(phrases[idx.current]);
          }, hold);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    timer = setTimeout(() => decode(phrases[0]), delay);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
    // phrases is derived from props; join keeps the dependency stable
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phrases.join("|"), delay, hold]);

  return (
    <span className={className}>
      <span className="sr-only">{phrases.join(". ")}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
