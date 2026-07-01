import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "calendar"
  | "pin"
  | "clock"
  | "heart"
  | "whatsapp"
  | "sparkle"
  | "chevron-down";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
};

const paths: Record<IconName, ReactNode> = {
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="3" />
      <path d="M3.5 9.5h17" />
      <path d="M8 3v3.5M16 3v3.5" />
      <path d="M8.5 14h.01M12 14h.01M15.5 14h.01" strokeLinecap="round" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21c4.2-4.2 6.5-7.5 6.5-11a6.5 6.5 0 0 0-13 0c0 3.5 2.3 6.8 6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" strokeLinecap="round" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.4-9.2-8.6C1.3 8.3 2.7 5 6 5c2 0 3.2 1.2 4 2.4C10.8 6.2 12 5 14 5c3.3 0 4.7 3.3 3.2 6.4C19 15.6 12 20 12 20Z" />
  ),
  whatsapp: (
    <>
      <path d="M4 20l1.3-4a8 8 0 1 1 3 3L4 20Z" />
      <path
        d="M9 9.2c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.6c.1.2 0 .4-.1.6l-.4.5c-.2.2-.3.4-.1.7.4.7 1.2 1.6 2.2 2 .3.1.5.1.7-.1l.5-.6c.2-.2.4-.2.6-.1l1.5.7c.3.1.4.3.4.5 0 .8-.6 1.5-1.3 1.6-.6.1-1.3.2-3-.5-2.4-1-3.9-3.5-4-3.7-.1-.2-1-1.3-1-2.5s.6-1.7.8-1.9Z"
        strokeWidth="0"
        fill="currentColor"
      />
    </>
  ),
  sparkle: (
    <path d="M12 3c.4 3.6 1.4 4.6 5 5-3.6.4-4.6 1.4-5 5-.4-3.6-1.4-4.6-5-5 3.6-.4 4.6-1.4 5-5Z" />
  ),
  "chevron-down": <path d="M6 9.5 12 15l6-5.5" strokeLinecap="round" strokeLinejoin="round" />,
};

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
