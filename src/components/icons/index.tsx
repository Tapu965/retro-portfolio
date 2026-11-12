interface IconProps {
  className?: string;
}

const base = 'w-full h-full';

/** 📄 ReadMe.txt — a classic notepad */
export function ReadMeIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${base} ${className}`}
      shapeRendering="crispEdges"
    >
      <rect
        x="6"
        y="3"
        width="20"
        height="26"
        fill="#b5ffe8"
        stroke="#0a2a2a"
        strokeWidth="1.5"
      />
      <line x1="9" y1="9" x2="23" y2="9" stroke="#2a7a6a" strokeWidth="1" />
      <line x1="9" y1="13" x2="23" y2="13" stroke="#2a7a6a" strokeWidth="1" />
      <line x1="9" y1="17" x2="20" y2="17" stroke="#2a7a6a" strokeWidth="1" />
      <line x1="9" y1="21" x2="23" y2="21" stroke="#2a7a6a" strokeWidth="1" />
      <rect
        x="20"
        y="22"
        width="8"
        height="8"
        fill="#f5b842"
        stroke="#0a2a2a"
        strokeWidth="1"
      />
    </svg>
  );
}

/** 👤 About.exe — a person silhouette */
export function AboutIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${base} ${className}`}
      shapeRendering="crispEdges"
    >
      <rect
        x="3"
        y="3"
        width="26"
        height="26"
        fill="#0c2222"
        stroke="#55bbaa"
        strokeWidth="1.5"
      />
      <circle cx="16" cy="12" r="4" fill="#7ef0d4" />
      <path d="M8 24 Q8 18 16 18 Q24 18 24 24" fill="#7ef0d4" stroke="none" />
    </svg>
  );
}

/** 📁 Projects.folder — the classic yellow folder */
export function ProjectsIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${base} ${className}`}
      shapeRendering="crispEdges"
    >
      <path
        d="M3 8 L13 8 L15 11 L29 11 L29 27 L3 27 Z"
        fill="#f5b842"
        stroke="#0a2a2a"
        strokeWidth="1.5"
      />
      <path d="M3 14 L29 14" stroke="#0a2a2a" strokeWidth="1" />
      <line x1="6" y1="18" x2="14" y2="18" stroke="#0a2a2a" strokeWidth="1" />
      <line x1="6" y1="21" x2="12" y2="21" stroke="#0a2a2a" strokeWidth="1" />
    </svg>
  );
}

/** ⚙️ Skills.sys — a gear */
export function SkillsIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${base} ${className}`}
      shapeRendering="crispEdges"
    >
      <rect
        x="3"
        y="3"
        width="26"
        height="26"
        fill="#0c2222"
        stroke="#55bbaa"
        strokeWidth="1.5"
      />
      <g fill="#7ef0d4">
        <rect x="14" y="6" width="4" height="4" />
        <rect x="14" y="22" width="4" height="4" />
        <rect x="6" y="14" width="4" height="4" />
        <rect x="22" y="14" width="4" height="4" />
        <rect x="8" y="8" width="3" height="3" />
        <rect x="21" y="8" width="3" height="3" />
        <rect x="8" y="21" width="3" height="3" />
        <rect x="21" y="21" width="3" height="3" />
      </g>
      <circle cx="16" cy="16" r="6" fill="#0c2222" stroke="#7ef0d4" strokeWidth="2" />
      <circle cx="16" cy="16" r="2" fill="#7ef0d4" />
    </svg>
  );
}

/** ✉️ Contact.bat — an envelope */
export function ContactIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${base} ${className}`}
      shapeRendering="crispEdges"
    >
      <rect
        x="3"
        y="8"
        width="26"
        height="18"
        fill="#b5ffe8"
        stroke="#0a2a2a"
        strokeWidth="1.5"
      />
      <path d="M3 8 L16 18 L29 8" fill="none" stroke="#0a2a2a" strokeWidth="1.5" />
      <path d="M3 26 L13 18" stroke="#0a2a2a" strokeWidth="1" />
      <path d="M29 26 L19 18" stroke="#0a2a2a" strokeWidth="1" />
    </svg>
  );
}

/** 📃 Resume.pdf — a document with a red PDF ribbon */
export function ResumeIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${base} ${className}`}
      shapeRendering="crispEdges"
    >
      <rect
        x="6"
        y="3"
        width="20"
        height="26"
        fill="#b5ffe8"
        stroke="#0a2a2a"
        strokeWidth="1.5"
      />
      <path d="M20 3 L26 9 L20 9 Z" fill="#f5b842" stroke="#0a2a2a" strokeWidth="1" />
      <rect x="9" y="21" width="14" height="6" fill="#ff5f5f" />
      <text
        x="16"
        y="25.5"
        fontSize="4"
        fontFamily="monospace"
        fontWeight="bold"
        fill="#fff"
        textAnchor="middle"
      >
        PDF
      </text>
      <line x1="9" y1="13" x2="22" y2="13" stroke="#2a7a6a" strokeWidth="1" />
      <line x1="9" y1="16" x2="22" y2="16" stroke="#2a7a6a" strokeWidth="1" />
    </svg>
  );
}

/** 🖥️ Computer icon for taskbar/start */
export function ComputerIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${base} ${className}`}
      shapeRendering="crispEdges"
    >
      <rect
        x="3"
        y="5"
        width="26"
        height="18"
        fill="#0c2222"
        stroke="#7ef0d4"
        strokeWidth="1.5"
      />
      <rect
        x="6"
        y="8"
        width="20"
        height="12"
        fill="#021012"
        stroke="#55bbaa"
        strokeWidth="1"
      />
      <rect x="11" y="23" width="10" height="3" fill="#7ef0d4" />
      <rect x="8" y="26" width="16" height="2" fill="#7ef0d4" />
    </svg>
  );
}
