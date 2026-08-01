interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="shieldGrad" x1="50" y1="0" x2="50" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E3A8A" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id="heartGrad" x1="25" y1="20" x2="75" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F43F5E" />
          <stop offset="1" stopColor="#BE123C" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer Hexagon/Shield Base */}
      <path d="M50 6 L88 22 C88 65 50 94 50 94 C50 94 12 65 12 22 Z" fill="url(#shieldGrad)" />
      
      {/* Inner Metallic Border */}
      <path d="M50 10 L84 24 C84 62 50 89 50 89 C50 89 16 62 16 24 Z" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      
      {/* Heart Core */}
      <path d="M50 72 C50 72 26 50 26 34 C26 23 35 15 44 15 C48 15 50 18 50 18 C50 18 52 15 56 15 C65 15 74 23 74 34 C74 50 50 72 50 72 Z" fill="url(#heartGrad)" filter="url(#glow)" />
      
      {/* Digital Predictive Pulse Line */}
      <path d="M 18 45 L 34 45 L 42 22 L 56 68 L 65 45 L 82 45" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Predictive Data Nodes */}
      <circle cx="34" cy="45" r="2.5" fill="#FFFFFF" />
      <circle cx="42" cy="22" r="2.5" fill="#FFFFFF" />
      <circle cx="56" cy="68" r="2.5" fill="#FFFFFF" />
      <circle cx="65" cy="45" r="2.5" fill="#FFFFFF" />
    </svg>
  );
}
