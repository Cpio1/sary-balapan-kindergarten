/** Тематические иллюстрации: главный экран, кружки, питание, группы, карта. */
type P = { className?: string };
const common = { "aria-hidden": true, focusable: false } as const;

/* ---------- Главный экран (используется, пока нет фото в public/hero) ---------- */
export function HeroScene({ className }: P) {
  return (
    <svg viewBox="0 0 520 460" className={className} preserveAspectRatio="xMidYMid slice" {...common}>
      <defs>
        <linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D9F3EF" />
          <stop offset="1" stopColor="#FFF6D6" />
        </linearGradient>
      </defs>
      <rect width="520" height="460" fill="url(#hs-sky)" />
      {/* солнце */}
      <circle cx="410" cy="92" r="62" fill="#FFE68A" opacity=".55" />
      <circle cx="410" cy="92" r="40" fill="#FFD54A" />
      {/* облака */}
      <path d="M70 118h96a22 22 0 0 0 0-44 30 30 0 0 0-56-10 24 24 0 0 0-40 26 14 14 0 0 0 0 28z" fill="#fff" />
      <path d="M300 64h58a14 14 0 0 0 0-28 19 19 0 0 0-35-6 15 15 0 0 0-23 17 9 9 0 0 0 0 17z" fill="#fff" opacity=".9" />
      {/* холмы */}
      <path d="M0 300c80-46 170-56 260-30s170 30 260-6v196H0z" fill="#9FDCD3" />
      <path d="M0 340c110-30 220-24 320 0s150 16 200 2v118H0z" fill="#7ACFC3" />
      {/* здание садика */}
      <g>
        <rect x="150" y="214" width="190" height="130" rx="14" fill="#FFF9EE" />
        <path d="M134 224 245 148l111 76z" fill="#FF8A3D" strokeLinejoin="round" stroke="#FF8A3D" strokeWidth="10" />
        <circle cx="245" cy="196" r="17" fill="#FFF9EE" />
        <circle cx="245" cy="196" r="11" fill="#FFD54A" />
        <rect x="170" y="244" width="44" height="38" rx="8" fill="#BDE9E3" />
        <path d="M192 244v38M170 263h44" stroke="#fff" strokeWidth="4" />
        <rect x="276" y="244" width="44" height="38" rx="8" fill="#BDE9E3" />
        <path d="M298 244v38M276 263h44" stroke="#fff" strokeWidth="4" />
        <path d="M226 344v-46a19 19 0 0 1 38 0v46z" fill="#26B3A6" />
        <circle cx="255" cy="322" r="3" fill="#FFD54A" />
      </g>
      {/* дорожка */}
      <path d="M226 344c-14 40-40 70-70 116h160c-20-46-38-76-52-116z" fill="#FFE9A8" />
      {/* цветы */}
      <g>
        <circle cx="96" cy="372" r="9" fill="#FFB48F" />
        <circle cx="96" cy="372" r="4" fill="#FFD54A" />
        <path d="M96 381v24" stroke="#26B3A6" strokeWidth="4" strokeLinecap="round" />
        <circle cx="430" cy="380" r="9" fill="#FF8A3D" />
        <circle cx="430" cy="380" r="4" fill="#FFF3C4" />
        <path d="M430 389v24" stroke="#26B3A6" strokeWidth="4" strokeLinecap="round" />
        <circle cx="470" cy="350" r="7" fill="#FFD54A" />
        <path d="M470 357v18" stroke="#26B3A6" strokeWidth="4" strokeLinecap="round" />
      </g>
      {/* цыплята */}
      <g transform="translate(330 352) scale(1.25)">
        <ellipse cx="35" cy="40" rx="20" ry="16.5" fill="#FFD54A" />
        <circle cx="24" cy="26" r="13" fill="#FFD54A" />
        <path d="M11.8 24.6 4 27.4l7.8 2.8z" fill="#FF8A3D" />
        <circle cx="19.5" cy="23.5" r="2.3" fill="#2D3036" />
        <circle cx="18" cy="30.5" r="2.8" fill="#FFB48F" />
        <path d="M33 38.5c6.5-4 13.5-1.5 15.5 4-5.5 3.4-12.4 2.6-15.5-4z" fill="#F2B705" />
        <path d="M30 55.5v5m-3.2 0h6.4M41 55.5v5m-3.2 0h6.4" stroke="#FF8A3D" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      <g transform="translate(150 380) scale(.85) translate(64 0) scale(-1 1)">
        <ellipse cx="35" cy="40" rx="20" ry="16.5" fill="#FFD54A" />
        <circle cx="24" cy="26" r="13" fill="#FFD54A" />
        <path d="M11.8 24.6 4 27.4l7.8 2.8z" fill="#FF8A3D" />
        <circle cx="19.5" cy="23.5" r="2.3" fill="#2D3036" />
        <circle cx="18" cy="30.5" r="2.8" fill="#FFB48F" />
        <path d="M33 38.5c6.5-4 13.5-1.5 15.5 4-5.5 3.4-12.4 2.6-15.5-4z" fill="#F2B705" />
        <path d="M30 55.5v5m-3.2 0h6.4M41 55.5v5m-3.2 0h6.4" stroke="#FF8A3D" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* ---------- Кружки ---------- */
export function EnglishArt({ className }: P) {
  return (
    <svg viewBox="0 0 80 80" className={className} {...common}>
      <path d="M10 16h44a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H30l-10 9v-9h-10a8 8 0 0 1-8-8V24a8 8 0 0 1 8-8z" fill="#26B3A6" />
      <text x="32" y="41.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="17" fill="#fff">ABC</text>
      <path d="M52 44h18a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6h-3v6l-7-6h-8a6 6 0 0 1-6-6V50a6 6 0 0 1 6-6z" fill="#FFD54A" />
      <text x="61" y="59.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="800" fontSize="11" fill="#2D3036">Hi!</text>
    </svg>
  );
}

export function DanceArt({ className }: P) {
  return (
    <svg viewBox="0 0 80 80" className={className} {...common}>
      <path d="M22 66c-4-14 4-22 14-26s20-12 14-24c-4-7-14-6-14 2 0 6 8 8 14 4" stroke="#FF8A3D" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M58 30c8 4 14 14 6 22" stroke="#FFB48F" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="m14 70 14-14" stroke="#2D3036" strokeWidth="4" strokeLinecap="round" />
      <circle cx="28" cy="56" r="3.4" fill="#2D3036" />
      <path d="m62 8 2 5 5 1-4 3 1 5-4-3-4 3 1-5-4-3 5-1z" fill="#FFD54A" />
      <path d="m12 22 1.4 3.4 3.6.6-2.6 2.4.6 3.6-3-1.8-3 1.8.6-3.6L7 26l3.6-.6z" fill="#26B3A6" />
    </svg>
  );
}

export function MusicArt({ className }: P) {
  return (
    <svg viewBox="0 0 80 80" className={className} {...common}>
      <ellipse cx="34" cy="62" rx="22" ry="8" fill="#FF8A3D" />
      <path d="M12 44v18c0 4.4 9.8 8 22 8s22-3.6 22-8V44" fill="#FFB48F" />
      <path d="M12 46l7 18 7-18 8 20 8-20 7 18 7-18" stroke="#fff" strokeWidth="3" fill="none" strokeLinejoin="round" />
      <ellipse cx="34" cy="44" rx="22" ry="8" fill="#FFF3C4" stroke="#FF8A3D" strokeWidth="3" />
      <path d="M50 30 60 20M62 34l8-8" stroke="#2D3036" strokeWidth="3" strokeLinecap="round" />
      <path d="M58 6v18" stroke="#26B3A6" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M58 6c4 2 8 2 10 6" stroke="#26B3A6" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <ellipse cx="54" cy="24" rx="5" ry="4" fill="#26B3A6" />
      <path d="M22 10v14" stroke="#F2B705" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="18.5" cy="24" rx="4.4" ry="3.4" fill="#F2B705" />
    </svg>
  );
}

export function SpeechArt({ className }: P) {
  return (
    <svg viewBox="0 0 80 80" className={className} {...common}>
      <circle cx="30" cy="40" r="22" fill="#FFD54A" />
      <circle cx="23" cy="36" r="2.6" fill="#2D3036" />
      <circle cx="37" cy="36" r="2.6" fill="#2D3036" />
      <ellipse cx="30" cy="47" rx="6" ry="4.6" fill="#FF8A3D" />
      <circle cx="18" cy="44" r="3" fill="#FFB48F" />
      <circle cx="42" cy="44" r="3" fill="#FFB48F" />
      <path d="M56 32c4 4 4 12 0 16M63 26c7 7 7 21 0 28M70 20c10 10 10 30 0 40" stroke="#26B3A6" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path d="M58 14s-6-3.4-6-7.4A3.4 3.4 0 0 1 58 5a3.4 3.4 0 0 1 6 1.6C64 10.6 58 14 58 14z" fill="#FF8A3D" />
    </svg>
  );
}

export function ChessArt({ className }: P) {
  return (
    <svg viewBox="0 0 80 80" className={className} {...common}>
      <g>
        {[0, 1, 2, 3].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`${r}${c}`}
              x={8 + c * 16}
              y={44 + r * 8}
              width="16"
              height="8"
              fill={(r + c) % 2 ? "#26B3A6" : "#DFF5F2"}
            />
          )),
        )}
      </g>
      <rect x="8" y="44" width="64" height="32" rx="3" fill="none" stroke="#0F7F75" strokeWidth="2" />
      <circle cx="40" cy="14" r="8" fill="#2D3036" />
      <path d="M33 24h14l-2 4h-10z" fill="#2D3036" />
      <path d="M35 28h10l3 12H32z" fill="#2D3036" />
      <rect x="28" y="40" width="24" height="6" rx="3" fill="#2D3036" />
      <circle cx="37.5" cy="11.5" r="2.4" fill="#fff" opacity=".5" />
    </svg>
  );
}

export function AikidoArt({ className }: P) {
  return (
    <svg viewBox="0 0 80 80" className={className} {...common}>
      <path d="M22 12h36l14 18-10 6-4-6v42H22V30l-4 6-10-6z" fill="#fff" stroke="#E4D6B6" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M32 12 40 34l8-22" fill="none" stroke="#E4D6B6" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M40 34v38" stroke="#E4D6B6" strokeWidth="2" />
      <rect x="21" y="44" width="38" height="8" rx="2" fill="#2D3036" />
      <path d="M36 50l-6 18M44 50l6 18" stroke="#2D3036" strokeWidth="5" strokeLinecap="round" />
      <rect x="35" y="43" width="10" height="10" rx="2.4" fill="#2D3036" stroke="#fff" strokeWidth="1.6" />
      <circle cx="66" cy="12" r="5" fill="#FF8A3D" />
    </svg>
  );
}

/* ---------- Питание ---------- */
export function PlateArt({ className }: P) {
  return (
    <svg viewBox="0 0 220 220" className={className} {...common}>
      <ellipse cx="110" cy="200" rx="78" ry="10" fill="#2D3036" opacity=".08" />
      {/* вилка */}
      <g fill="#C9CFD6">
        <rect x="10" y="62" width="7" height="120" rx="3.5" />
        <rect x="2" y="28" width="5" height="40" rx="2.5" />
        <rect x="11" y="28" width="5" height="40" rx="2.5" />
        <rect x="20" y="28" width="5" height="40" rx="2.5" />
        <path d="M2 62h23a11.5 11.5 0 0 1-23 0z" />
      </g>
      {/* ложка */}
      <g fill="#C9CFD6">
        <ellipse cx="208" cy="52" rx="11" ry="18" />
        <rect x="204.5" y="62" width="7" height="120" rx="3.5" />
      </g>
      <circle cx="110" cy="110" r="84" fill="#fff" stroke="#F0E4C8" strokeWidth="4" />
      <circle cx="110" cy="110" r="66" fill="#FFF9EE" stroke="#FFE7A3" strokeWidth="3" strokeDasharray="2 9" strokeLinecap="round" />
    </svg>
  );
}

export function AppleArt({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...common}>
      <path d="M24 14c-4-3-14-3-16 7-2 9 4 21 10 21 2.4 0 3.6-1 6-1s3.6 1 6 1c6 0 12-12 10-21-2-10-12-10-16-7z" fill="#FF8A3D" />
      <path d="M24 14c0-4 1-7 3-9" stroke="#8A5A2B" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M26 10c3-5 9-5 11-3-2 4-7 5-11 3z" fill="#26B3A6" />
      <ellipse cx="15" cy="22" rx="2.6" ry="4" fill="#fff" opacity=".45" />
    </svg>
  );
}

export function CarrotArt({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...common}>
      <path d="M30 14c4 2 6 6 4 10L14 44c-2 1.4-4-.6-2.6-2.6L24 18c2-4 2-6 6-4z" fill="#FF8A3D" />
      <path d="M22 26l4 2M18 33l3 1.6M25 20l3 1.4" stroke="#D9600F" strokeWidth="2" strokeLinecap="round" />
      <path d="M31 15c0-6 2-10 6-11-1 4-2 7-3 9M33 16c4-3 9-3 11-1-3 2-7 3-10 3" fill="#26B3A6" stroke="#26B3A6" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function BananaArt({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...common}>
      <path d="M8 18c2 16 18 24 32 16 2-1 1.4-4-1-3.4C28 33 17 28 13 16c-.8-2.4-5.2-2-5 2z" fill="#FFD54A" stroke="#F2B705" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 16 8 12" stroke="#8A5A2B" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function CupArt({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...common}>
      <path d="M10 14h24l-3 28H13z" fill="#fff" stroke="#BDE9E3" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M11.4 24h21.2L31 40H13z" fill="#DFF5F2" />
      <path d="M34 20h3a5 5 0 0 1 0 10h-4" fill="none" stroke="#BDE9E3" strokeWidth="2.6" />
      <path d="M20 4c-2 3 2 5 0 8M26 4c-2 3 2 5 0 8" stroke="#FFB48F" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function PearArt({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} {...common}>
      <path d="M24 10c-4 0-6 4-6 8 0 3-6 6-6 14a12 12 0 0 0 24 0c0-8-6-11-6-14 0-4-2-8-6-8z" fill="#B7E36A" />
      <path d="M24 10V5" stroke="#8A5A2B" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M25 8c3-3 7-3 9-1-3 3-6 3-9 1z" fill="#26B3A6" />
      <ellipse cx="18" cy="30" rx="2.4" ry="4" fill="#fff" opacity=".45" />
    </svg>
  );
}

/* ---------- Группы ---------- */
export function NestArt({ className }: P) {
  return (
    <svg viewBox="0 0 80 64" className={className} {...common}>
      <ellipse cx="30" cy="30" rx="9" ry="11" fill="#fff" stroke="#F0E4C8" strokeWidth="2" />
      <ellipse cx="50" cy="28" rx="9" ry="11" fill="#FFF3C4" stroke="#F0E4C8" strokeWidth="2" />
      <ellipse cx="40" cy="32" rx="9" ry="11" fill="#FFD54A" />
      <path d="M8 34c4 18 18 24 32 24s28-6 32-24z" fill="#E8A86A" />
      <path d="M10 38c16 6 44 6 60 0M14 46c14 5 38 5 52 0M20 53c12 3 28 3 40 0" stroke="#C9864A" strokeWidth="2.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function DayArt({ className }: P) {
  return (
    <svg viewBox="0 0 80 64" className={className} {...common}>
      <circle cx="40" cy="34" r="24" fill="#fff" stroke="#26B3A6" strokeWidth="4" />
      {[0, 90, 180, 270].map((r) => (
        <rect key={r} x="38.5" y="13" width="3" height="6" rx="1.5" fill="#26B3A6" transform={`rotate(${r} 40 34)`} />
      ))}
      <path d="M40 34V22M40 34l9 5" stroke="#2D3036" strokeWidth="3.4" strokeLinecap="round" />
      <circle cx="40" cy="34" r="3" fill="#FF8A3D" />
      <circle cx="68" cy="12" r="7" fill="#FFD54A" />
      <path d="M11 14a7 7 0 1 0 6-8 5.6 5.6 0 0 1-6 8z" fill="#FFB48F" />
    </svg>
  );
}

export function CareArt({ className }: P) {
  return (
    <svg viewBox="0 0 80 64" className={className} {...common}>
      <path d="M40 60S8 42 8 22a14 14 0 0 1 32-8 14 14 0 0 1 32 8c0 20-32 38-32 38z" fill="#FFB48F" />
      <g transform="translate(22 14) scale(.62)">
        <ellipse cx="35" cy="40" rx="20" ry="16.5" fill="#FFD54A" />
        <circle cx="24" cy="26" r="13" fill="#FFD54A" />
        <path d="M11.8 24.6 4 27.4l7.8 2.8z" fill="#FF8A3D" />
        <circle cx="19.5" cy="23.5" r="2.4" fill="#2D3036" />
        <path d="M33 38.5c6.5-4 13.5-1.5 15.5 4-5.5 3.4-12.4 2.6-15.5-4z" fill="#F2B705" />
      </g>
    </svg>
  );
}

/* ---------- Карта (заглушка, если не задан iframe 2GIS) ---------- */
export function MapArt({ className }: P) {
  return (
    <svg viewBox="0 0 400 260" className={className} preserveAspectRatio="xMidYMid slice" {...common}>
      <rect width="400" height="260" fill="#EAF7F4" />
      <path d="M0 70h400M0 170h400M90 0v260M240 0v260M330 0v260" stroke="#fff" strokeWidth="16" />
      <path d="M0 215 400 120" stroke="#FFF3C4" strokeWidth="14" />
      <rect x="110" y="88" width="110" height="64" rx="10" fill="#D3EFE9" />
      <rect x="260" y="10" width="54" height="42" rx="8" fill="#D3EFE9" />
      <rect x="10" y="190" width="64" height="56" rx="8" fill="#D3EFE9" />
      <circle cx="290" cy="215" r="26" fill="#C6EBC9" />
      <circle cx="36" cy="30" r="20" fill="#C6EBC9" />
      <path d="M165 152c0-26 20-46 35-46s35 20 35 46-35 52-35 52-35-26-35-52z" fill="#FF8A3D" transform="translate(-35 -78)" />
      <circle cx="165" cy="66" r="12" fill="#fff" />
    </svg>
  );
}
