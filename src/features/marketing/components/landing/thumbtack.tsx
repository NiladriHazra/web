interface ThumbTackProps {
  id: string;
  className?: string;
}

export function Thumbtack({ id, className }: ThumbTackProps) {
  return (
    <span className={className}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <defs>
          <radialGradient id={`${id}-head`} cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#a1a1aa" />
            <stop offset="35%" stopColor="#71717a" />
            <stop offset="70%" stopColor="#52525b" />
            <stop offset="100%" stopColor="#3f3f46" />
          </radialGradient>
          <radialGradient id={`${id}-rim`} cx="50%" cy="50%" r="50%">
            <stop offset="80%" stopColor="#3f3f46" />
            <stop offset="100%" stopColor="#27272a" />
          </radialGradient>
          <filter id={`${id}-shadow`} x="-30%" y="-10%" width="160%" height="160%">
            <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>

        <circle cx="11" cy="11" r="7.5" fill={`url(#${id}-rim)`} filter={`url(#${id}-shadow)`} />
        <circle cx="11" cy="11" r="6.5" fill={`url(#${id}-head)`} />
        <circle cx="11" cy="11" r="5.5" fill={`url(#${id}-head)`} stroke="#52525b" strokeWidth="0.3" />

        <ellipse cx="9.2" cy="8.8" rx="2.8" ry="1.8" fill="rgba(255,255,255,0.12)" />
        <ellipse cx="8.5" cy="8.2" rx="1.5" ry="0.9" fill="rgba(255,255,255,0.18)" />

        <circle cx="11" cy="11" r="1.8" fill="#27272a" />
        <circle cx="11" cy="11" r="1.2" fill="#1c1c1e" />
        <ellipse cx="10.6" cy="10.6" rx="0.4" ry="0.3" fill="rgba(255,255,255,0.2)" />

        <path
          d="M 4.5 11 A 6.5 6.5 0 0 1 6 7"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
