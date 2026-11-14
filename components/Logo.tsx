export default function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5ef2ff" />
          <stop offset="1" stopColor="#8b5cff" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="none" stroke="url(#lg)" strokeWidth="2.5" strokeDasharray="120 30" />
      <ellipse cx="32" cy="32" rx="18" ry="7" fill="none" stroke="#5ef2ff" strokeWidth="2" transform="rotate(-30 32 32)" />
      <circle cx="32" cy="32" r="6" fill="#fff" />
    </svg>
  );
}
