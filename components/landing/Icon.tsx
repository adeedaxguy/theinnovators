import type { ReactElement, SVGProps } from "react";

export function Icon({ name }: { name: string }) {
  const common: SVGProps<SVGSVGElement> = {
    className: "ui-icon",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons: Record<string, ReactElement> = {
    award: (
      <svg {...common}>
        <circle cx="12" cy="8" r="5" />
        <path d="M8.5 12.2 7 22l5-3 5 3-1.5-9.8" />
      </svg>
    ),
    briefcase: (
      <svg {...common}>
        <path d="M9 7V5.6A1.6 1.6 0 0 1 10.6 4h2.8A1.6 1.6 0 0 1 15 5.6V7" />
        <rect x="4" y="7" width="16" height="12" rx="2" />
        <path d="M4 12h16M10 12v1.5h4V12" />
      </svg>
    ),
    building: (
      <svg {...common}>
        <path d="M4 21h16M6 21V6l8-3v18M14 8h4v13" />
        <path d="M9 9h1M9 13h1M9 17h1M17 12h1M17 16h1" />
      </svg>
    ),
    chevronLeft: (
      <svg {...common}>
        <path d="m15 6-6 6 6 6" />
      </svg>
    ),
    chevronRight: (
      <svg {...common}>
        <path d="m9 6 6 6-6 6" />
      </svg>
    ),
    globe: (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.5 2.7 3.7 5.7 3.7 9S14.5 18.3 12 21c-2.5-2.7-3.7-5.7-3.7-9S9.5 5.7 12 3Z" />
      </svg>
    ),
    leaf: (
      <svg {...common}>
        <path d="M4 20c8 0 15-6 16-16-10 1-16 7-16 16Z" />
        <path d="M4 20c3-5 7-8 12-10" />
      </svg>
    ),
    letters: (
      <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true">
        <text x="2.5" y="15.5" fill="currentColor" fontFamily="Arial, Helvetica, sans-serif" fontSize="8.2" fontWeight="800">
          Abc
        </text>
      </svg>
    ),
    receipt: (
      <svg {...common}>
        <path d="M6 3h12v18l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2L6 21V3Z" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    ),
    rocket: (
      <svg {...common}>
        <path d="M5 15c-1.2 1-1.8 2.4-2 4 1.6-.2 3-.8 4-2" />
        <path d="M9 15 6 12c2.2-4.7 6-7.8 12-9-.8 6-4.3 9.8-9 12Z" />
        <circle cx="14" cy="8" r="1.6" />
        <path d="M8 16c2.4.4 4.4-.1 6-1.7" />
      </svg>
    ),
    sprout: (
      <svg {...common}>
        <path d="M12 21V11" />
        <path d="M12 12C8 7 5 7 3 8c1 5 5 6 9 4Z" />
        <path d="M12 12c4-6 7-6 9-5-1 5-5 7-9 5Z" />
      </svg>
    ),
    university: (
      <svg {...common}>
        <path d="M4 10h16M6 10v9M10 10v9M14 10v9M18 10v9M3 21h18" />
        <path d="M12 3 4 7v3h16V7l-8-4Z" />
      </svg>
    ),
    video: (
      <svg {...common}>
        <rect x="4" y="6" width="12" height="12" rx="2" />
        <path d="m16 10 5-3v10l-5-3" />
      </svg>
    ),
    wallet: (
      <svg {...common}>
        <path d="M4 7h15a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12" />
        <path d="M16 12h5" />
        <circle cx="17" cy="14" r="0.8" />
      </svg>
    ),
  };

  return icons[name] || icons.chevronRight;
}
