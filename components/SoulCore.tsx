/**
 * The animated "soul core": a glowing nucleus wrapped in counter-rotating
 * orbital rings. Pure SVG + CSS, so it costs nothing in JavaScript.
 */
export default function SoulCore() {
  return (
    <div className="core" aria-hidden="true">
      <div className="core-glow" />
      <svg viewBox="0 0 400 400" className="core-svg">
        <defs>
          <radialGradient id="nucleus" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#b9f8ff" />
            <stop offset="60%" stopColor="#5ef2ff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8b5cff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ring" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#5ef2ff" />
            <stop offset="100%" stopColor="#8b5cff" />
          </linearGradient>
        </defs>

        <g className="ring r1">
          <circle cx="200" cy="200" r="180" fill="none" stroke="url(#ring)" strokeWidth="0.8" strokeDasharray="2 10" />
        </g>
        <g className="ring r2">
          <circle cx="200" cy="200" r="150" fill="none" stroke="url(#ring)" strokeWidth="1.2" strokeDasharray="160 60 20 60" strokeLinecap="round" />
          <circle cx="350" cy="200" r="4" fill="#5ef2ff" />
        </g>
        <g className="ring r3">
          <ellipse cx="200" cy="200" rx="120" ry="44" fill="none" stroke="#5ef2ff" strokeOpacity="0.6" strokeWidth="1" />
          <circle cx="80" cy="200" r="3" fill="#ffffff" />
        </g>
        <g className="ring r4">
          <ellipse cx="200" cy="200" rx="44" ry="120" fill="none" stroke="#8b5cff" strokeOpacity="0.7" strokeWidth="1" />
          <circle cx="200" cy="80" r="3" fill="#c4b0ff" />
        </g>
        <g className="ring r5">
          <circle cx="200" cy="200" r="96" fill="none" stroke="url(#ring)" strokeWidth="0.6" strokeDasharray="1 4" />
        </g>

        <circle className="nucleus" cx="200" cy="200" r="70" fill="url(#nucleus)" />
        <circle cx="200" cy="200" r="14" fill="#fff" />
      </svg>
      <div className="core-scan" />
    </div>
  );
}
