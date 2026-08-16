export function AnubisSilhouette({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Anubis, guardian of the underworld"
    >
      <defs>
        <linearGradient id="anubis-body" x1="160" y1="40" x2="160" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2b3047" />
          <stop offset="1" stopColor="#11131f" />
        </linearGradient>
        <linearGradient id="anubis-gold" x1="110" y1="70" x2="210" y2="360" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f2d98c" />
          <stop offset="1" stopColor="#b3892a" />
        </linearGradient>
        <radialGradient id="anubis-glow" cx="0.5" cy="0.5" r="0.5">
          <stop stopColor="#d9b24a" stopOpacity="0.35" />
          <stop offset="1" stopColor="#d9b24a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="160" cy="200" r="170" fill="url(#anubis-glow)" />

      {/* pedestal */}
      <ellipse cx="160" cy="400" rx="118" ry="14" fill="#d9b24a" opacity="0.14" />
      <rect x="80" y="358" width="160" height="32" rx="7" fill="#151a2b" stroke="url(#anubis-gold)" strokeWidth="2" />
      <rect x="102" y="344" width="116" height="14" rx="4" fill="#2b3047" />

      {/* feet + legs */}
      <rect x="112" y="326" width="38" height="14" rx="5" fill="#232a3e" />
      <rect x="170" y="326" width="38" height="14" rx="5" fill="#232a3e" />
      <rect x="122" y="258" width="21" height="84" rx="10" fill="url(#anubis-body)" />
      <rect x="177" y="258" width="21" height="84" rx="10" fill="url(#anubis-body)" />

      {/* kilt */}
      <path d="M113 252 L207 252 L199 300 L160 314 L121 300 Z" fill="#2b3047" />
      <rect x="106" y="246" width="108" height="11" rx="4" fill="url(#anubis-gold)" />

      {/* torso */}
      <path d="M128 142 C 128 200, 114 246, 118 252 L202 252 C 206 246, 192 200, 192 142 Z" fill="url(#anubis-body)" />

      {/* crossed arms */}
      <path
        d="M128 166 C 150 186, 152 202, 160 214 C 168 202, 170 186, 192 166 C 180 178, 174 192, 168 204 C 156 200, 138 182, 128 166 Z"
        fill="#20263a"
      />
      <rect x="140" y="184" width="9" height="40" rx="4" fill="url(#anubis-gold)" transform="rotate(38 144 204)" />
      <rect x="171" y="184" width="9" height="40" rx="4" fill="url(#anubis-gold)" transform="rotate(-38 176 204)" />

      {/* ankh on chest */}
      <g stroke="url(#anubis-gold)" strokeWidth="5" fill="none">
        <ellipse cx="160" cy="224" rx="9" ry="10" />
        <path d="M160 234 L160 250" />
        <path d="M150 242 L170 242" />
      </g>

      {/* broad collar */}
      <path d="M119 148 L201 148 L190 124 L160 116 L130 124 Z" fill="url(#anubis-gold)" />
      <path d="M124 146 C 142 134, 178 134, 196 146 L191 126 C 174 115, 146 115, 129 126 Z" fill="#8a6a1e" />

      {/* headband */}
      <rect x="132" y="74" width="56" height="9" rx="3" fill="url(#anubis-gold)" />

      {/* ears */}
      <path d="M129 78 L116 22 L145 62 Z" fill="url(#anubis-body)" />
      <path d="M191 78 L204 22 L175 62 Z" fill="url(#anubis-body)" />
      <path d="M127 76 L121 36 L140 62 Z" fill="#1a1f30" />
      <path d="M193 76 L199 36 L180 62 Z" fill="#1a1f30" />

      {/* skull */}
      <ellipse cx="160" cy="94" rx="33" ry="29" fill="url(#anubis-body)" />

      {/* snout */}
      <path
        d="M132 98 C 132 118, 143 128, 160 128 C 177 128, 188 118, 188 98 L188 104 C 188 121, 176 132, 160 132 C 144 132, 132 121, 132 104 Z"
        fill="#20263a"
      />
      <ellipse cx="160" cy="124" rx="9" ry="6" fill="#0c0f1c" />

      {/* glowing eyes */}
      <ellipse cx="144" cy="94" rx="5" ry="2.4" fill="#f2d98c" filter="url(#anubis-eyes)" />
      <ellipse cx="176" cy="94" rx="5" ry="2.4" fill="#f2d98c" filter="url(#anubis-eyes)" />
      <filter id="anubis-eyes" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.4" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </svg>
  );
}
