"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { gsap } from "gsap";

type AnimatedButtonProps = {
  ariaLabel?: string;
  children: ReactNode;
  href: string;
  rel?: string;
  target?: string;
  variant?: "primary" | "soft";
};

export function AnimatedButton({
  ariaLabel,
  children,
  href,
  rel,
  target,
  variant = "primary",
}: AnimatedButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      aria-label={ariaLabel}
      className={`animated-button animated-button-${variant}`}
      href={href}
      onPointerDown={() => {
        if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.to(ref.current, { duration: 0.16, scale: 0.985, y: 1 });
      }}
      onPointerEnter={() => {
        if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.to(ref.current, { duration: 0.42, ease: "elastic.out(1, 0.55)", scale: 1.025, y: -3 });
      }}
      onPointerLeave={() => {
        if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.to(ref.current, { duration: 0.32, ease: "power3.out", scale: 1, y: 0 });
      }}
      onPointerUp={() => {
        if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        gsap.to(ref.current, { duration: 0.22, ease: "power3.out", scale: 1.025, y: -3 });
      }}
      ref={ref}
      rel={rel}
      target={target}
    >
      {children}
    </a>
  );
}
