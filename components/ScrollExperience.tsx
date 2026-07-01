"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "@/utils/gsap/registerGsap";

type ScrollExperienceProps = {
  children: ReactNode;
};

export function ScrollExperience({ children }: ScrollExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let lenis: Lenis | undefined;
      const tick = (time: number) => lenis?.raf(time * 1000);

      if (!reduceMotion) {
        lenis = new Lenis({
          lerp: 0.075,
          smoothWheel: true,
          touchMultiplier: 1.08,
          wheelMultiplier: 0.86,
        });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

      if (!reduceMotion && backgroundRef.current) {
        gsap.fromTo(
          backgroundRef.current,
          { scale: 1.07, yPercent: -9 },
          {
            ease: "none",
            scale: 1.13,
            scrollTrigger: {
              end: "bottom bottom",
              scrub: 1.15,
              start: "top top",
              trigger: rootRef.current,
            },
            yPercent: 9,
          },
        );
      }

      if (!reduceMotion) {
        gsap.utils.toArray<HTMLElement>("[data-section]").forEach((section) => {
          const revealItems = section.querySelectorAll<HTMLElement>("[data-reveal]");

          if (!revealItems.length) {
            return;
          }

          gsap.fromTo(
            revealItems,
            { autoAlpha: 0, filter: "blur(10px)", y: 38 },
            {
              autoAlpha: 1,
              duration: 1,
              ease: "power3.out",
              filter: "blur(0px)",
              stagger: 0.08,
              scrollTrigger: {
                end: "top 24%",
                scrub: 0.65,
                start: "top 72%",
                trigger: section,
              },
              y: 0,
            },
          );

          gsap.to(revealItems, {
            autoAlpha: 0.34,
            ease: "power2.inOut",
            filter: "blur(8px)",
            scrollTrigger: {
              end: "bottom top",
              scrub: 0.8,
              start: "bottom 42%",
              trigger: section,
            },
            stagger: 0.04,
            y: -28,
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((item) => {
          const depth = Number(item.dataset.drift ?? 1);

          gsap.fromTo(
            item,
            { y: 34 * depth },
            {
              ease: "none",
              scrollTrigger: {
                end: "bottom top",
                scrub: 1.1,
                start: "top bottom",
                trigger: item.closest("[data-section]") ?? rootRef.current,
              },
              y: -34 * depth,
            },
          );
        });
      }

      ScrollTrigger.refresh();

      return () => {
        gsap.ticker.remove(tick);
        lenis?.destroy();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: rootRef },
  );

  return (
    <div className="landing-shell" ref={rootRef}>
      <div className="single-watercolor-bg" ref={backgroundRef} aria-hidden="true">
        <Image
          src="/assets/optimized/story/hero-wash.webp"
          alt=""
          fill
          priority
          sizes="110vw"
          className="single-watercolor-img"
        />
      </div>
      <div className="paper-grain" aria-hidden="true" />
      {children}
    </div>
  );
}