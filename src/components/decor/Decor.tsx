/**
 * Небольшие декоративные SVG-элементы. Все они декоративные (aria-hidden)
 * и масштабируются через className (w-*, h-*).
 */
type P = { className?: string };

const common = { "aria-hidden": true, focusable: false } as const;

export function Chick({ className, flip }: P & { flip?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={flip ? { transform: "scaleX(-1)" } : undefined} {...common}>
      <ellipse cx="35" cy="40" rx="20" ry="16.5" fill="#FFD54A" />
      <circle cx="24" cy="26" r="13" fill="#FFD54A" />
      <path d="M23 13.5c.4-4 3.4-6.4 7-5.6-2.6 1-3.6 2.8-3.8 5" stroke="#F2B705" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M11.8 24.6 4 27.4l7.8 2.8z" fill="#FF8A3D" strokeLinejoin="round" />
      <circle cx="19.5" cy="23.5" r="2.3" fill="#2D3036" />
      <circle cx="18.8" cy="22.8" r=".8" fill="#fff" />
      <circle cx="18" cy="30.5" r="2.8" fill="#FFB48F" opacity=".85" />
      <path d="M33 38.5c6.5-4 13.5-1.5 15.5 4-5.5 3.4-12.4 2.6-15.5-4z" fill="#F2B705" />
      <path d="M30 55.5v5m-3.2 0h6.4M41 55.5v5m-3.2 0h6.4" stroke="#FF8A3D" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function ChickHatch({ className }: P) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...common}>
      <circle cx="32" cy="24" r="13" fill="#FFD54A" />
      <path d="M30 11.5c.6-3.6 3.6-5.6 6.6-4.6-2.4.8-3.2 2.4-3.4 4.4" stroke="#F2B705" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <circle cx="27" cy="22" r="2.1" fill="#2D3036" />
      <circle cx="37" cy="22" r="2.1" fill="#2D3036" />
      <path d="m29.5 26.5 2.5 3.4 2.5-3.4z" fill="#FF8A3D" />
      <circle cx="24" cy="28" r="2.4" fill="#FFB48F" opacity=".8" />
      <circle cx="40" cy="28" r="2.4" fill="#FFB48F" opacity=".8" />
      <path d="M12 36c0 14 9 22 20 22s20-8 20-22l-5 4-5-5-5 5-5-5-5 5-5-5-5 5z" fill="#fff" stroke="#F0E4C8" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function Sun({ className }: P) {
  return (
    <svg viewBox="0 0 64 64" className={className} {...common}>
      <g stroke="#FFC21A" strokeWidth="3.4" strokeLinecap="round">
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i * Math.PI * 2) / 10;
          const x1 = 32 + Math.cos(a) * 20;
          const y1 = 32 + Math.sin(a) * 20;
          const x2 = 32 + Math.cos(a) * (i % 2 ? 26 : 29);
          const y2 = 32 + Math.sin(a) * (i % 2 ? 26 : 29);
          return <line key={i} x1={x1.toFixed(2)} y1={y1.toFixed(2)} x2={x2.toFixed(2)} y2={y2.toFixed(2)} />;
        })}
      </g>
      <circle cx="32" cy="32" r="15" fill="#FFD54A" />
      <circle cx="27" cy="30" r="1.8" fill="#2D3036" />
      <circle cx="37" cy="30" r="1.8" fill="#2D3036" />
      <path d="M27.5 36c2.6 2.6 6.4 2.6 9 0" stroke="#2D3036" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="23.5" cy="35" r="2.2" fill="#FFB48F" opacity=".8" />
      <circle cx="40.5" cy="35" r="2.2" fill="#FFB48F" opacity=".8" />
    </svg>
  );
}

export function Cloud({ className, tone = "#fff" }: P & { tone?: string }) {
  return (
    <svg viewBox="0 0 96 56" className={className} {...common}>
      <path
        d="M24 50h50a16 16 0 0 0 2-31.9A22 22 0 0 0 34.4 13 15 15 0 0 0 10 26a12 12 0 0 0 14 24z"
        fill={tone}
        stroke="#F0E4C8"
        strokeWidth="2"
      />
    </svg>
  );
}

export function Star({ className, color = "#FFD54A" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...common}>
      <path
        d="m20 4 4.6 9.6 10.4 1.4-7.6 7.3 1.9 10.4L20 27.7l-9.3 5 1.9-10.4L5 15l10.4-1.4z"
        fill={color}
        stroke={color}
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Sparkle({ className, color = "#26B3A6" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} {...common}>
      <path d="M16 2c1.2 7.6 6.4 12.8 14 14-7.6 1.2-12.8 6.4-14 14-1.2-7.6-6.4-12.8-14-14C9.6 14.8 14.8 9.6 16 2z" fill={color} />
    </svg>
  );
}

export function Flower({ className, petal = "#FFB48F", center = "#FFD54A" }: P & { petal?: string; center?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...common}>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="24" cy="12.5" rx="7" ry="9.5" fill={petal} transform={`rotate(${r} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="7" fill={center} stroke="#fff" strokeWidth="2" />
    </svg>
  );
}

export function Pencil({ className, body = "#26B3A6" }: P & { body?: string }) {
  return (
    <svg viewBox="0 0 80 24" className={className} {...common}>
      <rect x="14" y="4" width="54" height="16" rx="3" fill={body} />
      <rect x="14" y="4" width="54" height="5" rx="2" fill="#fff" opacity=".25" />
      <rect x="64" y="4" width="10" height="16" rx="3" fill="#FFB48F" />
      <rect x="61" y="4" width="4" height="16" fill="#C9CFD6" />
      <path d="M14 4 2 12l12 8z" fill="#F7D9B4" />
      <path d="M6 9.3 2 12l4 2.7z" fill="#2D3036" />
    </svg>
  );
}

export function Squiggle({ className, color = "#26B3A6" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 90 20" className={className} fill="none" {...common}>
      <path d="M3 10c7-8 14-8 21 0s14 8 21 0 14-8 21 0 14 8 21 0" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function Triangle({ className, color = "#FF8A3D" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...common}>
      <path d="M20 5 36 33H4z" fill="none" stroke={color} strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

export function Ring({ className, color = "#FFD54A" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...common}>
      <circle cx="20" cy="20" r="13" fill="none" stroke={color} strokeWidth="5" />
    </svg>
  );
}

export function Dots({ className, color = "#FFB48F" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} {...common}>
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => <circle key={`${r}-${c}`} cx={8 + c * 15} cy={8 + r * 12} r="3" fill={color} />),
      )}
    </svg>
  );
}

export function Heart({ className, color = "#FF8A3D" }: P & { color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} {...common}>
      <path d="M20 34S5 25.5 5 15a8 8 0 0 1 15-3.8A8 8 0 0 1 35 15c0 10.5-15 19-15 19z" fill={color} />
    </svg>
  );
}

/** Волнистый разделитель секций. `fill` — цвет следующей секции. */
export function Wave({ className, fill, flip }: P & { fill: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
      {...common}
    >
      <path
        d="M0 34c120-22 240-30 360-14s240 38 360 30 240-40 360-44 240 18 360 28v30H0z"
        fill={fill}
      />
    </svg>
  );
}
