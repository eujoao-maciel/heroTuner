export const ProgressBar = ({ litSegments } : { litSegments: number }) => {
  return (
    <svg
      id="tuneProgress"
      className="w-full max-w-[240px] h-auto"
      viewBox="0 0 240 26"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="frame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#555" />
          <stop offset="50%" stop-color="#1d1d1d" />
          <stop offset="100%" stop-color="#000" />
        </linearGradient>

        <linearGradient id="slot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#151515" />
          <stop offset="100%" stop-color="#050505" />
        </linearGradient>

        <linearGradient id="activeGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#7cff6a" />
          <stop offset="50%" stop-color="#2fff29" />
          <stop offset="100%" stop-color="#11b800" />
        </linearGradient>

        <filter id="greenGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x="0"
        y="0"
        width="240"
        height="26"
        rx="4"
        fill="url(#frame)"
        stroke="#666"
        stroke-width="1"
      />

      <rect x="4" y="3" width="44" height="20" rx="2" fill="url(#slot)" />
      <rect x="51" y="3" width="44" height="20" rx="2" fill="url(#slot)" />
      <rect x="98" y="3" width="44" height="20" rx="2" fill="url(#slot)" />
      <rect x="145" y="3" width="44" height="20" rx="2" fill="url(#slot)" />
      <rect x="192" y="3" width="44" height="20" rx="2" fill="url(#slot)" />

      <rect
        className="seg"
        x="4"
        y="3"
        width="44"
        height="20"
        rx="2"
        fill="url(#activeGreen)"
        filter="url(#greenGlow)"
        opacity={litSegments >= 1 ? 1 : 0}
      />

      <rect
        className="seg"
        x="51"
        y="3"
        width="44"
        height="20"
        rx="2"
        fill="url(#activeGreen)"
        filter="url(#greenGlow)"
        opacity={litSegments >= 2 ? 1 : 0}
      />

      <rect
        className="seg"
        x="98"
        y="3"
        width="44"
        height="20"
        rx="2"
        fill="url(#activeGreen)"
        filter="url(#greenGlow)"
        opacity={litSegments >= 3 ? 1 : 0}
      />

      <rect
        className="seg"
        x="145"
        y="3"
        width="44"
        height="20"
        rx="2"
        fill="url(#activeGreen)"
        filter="url(#greenGlow)"
        opacity={litSegments >= 4 ? 1 : 0}
      />

      <rect
        className="seg"
        x="192"
        y="3"
        width="44"
        height="20"
        rx="2"
        fill="url(#activeGreen)"
        filter="url(#greenGlow)"
        opacity={litSegments >= 5 ? 1 : 0}
      />
    </svg>
  );
};
