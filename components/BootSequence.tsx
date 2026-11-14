"use client";

import { useEffect, useState } from "react";

const LINES = [
  "initializing cognition core",
  "calibrating actuators",
  "mapping 1,000+ industries",
  "learning how humans work",
  "rewriting the rules of labour",
  "awaiting launch signal",
];

/** A terminal that types a cryptic boot log, then loops. */
export default function BootSequence() {
  const [lines, setLines] = useState<string[]>([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLines(LINES);
      return;
    }
    let li = 0, ci = 0;
    let timer: ReturnType<typeof setTimeout>;
    let done: string[] = [];

    const step = () => {
      const line = LINES[li];
      if (ci <= line.length) {
        setCurrent(line.slice(0, ci));
        ci++;
        timer = setTimeout(step, 28 + Math.random() * 40);
      } else {
        done = [...done, line].slice(-4);
        setLines(done);
        setCurrent("");
        ci = 0;
        li = (li + 1) % LINES.length;
        timer = setTimeout(step, li === 0 ? 2600 : 420);
      }
    };
    timer = setTimeout(step, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="boot" aria-hidden="true">
      <div className="boot-bar">
        <span /><span /><span />
        <em>soulcast://core</em>
      </div>
      <div className="boot-body">
        {lines.map((l, i) => (
          <p key={`${l}-${i}`}>
            <b>&gt;</b> {l} <i>OK</i>
          </p>
        ))}
        <p>
          <b>&gt;</b> {current}
          <span className="caret" />
        </p>
      </div>
    </div>
  );
}
