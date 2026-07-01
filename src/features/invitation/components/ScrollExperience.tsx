"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { withBasePath } from "@/utils/assets/withBasePath";
import "@/utils/gsap/registerGsap";

type ScrollExperienceProps = {
  children: ReactNode;
};

export function ScrollExperience({ children }: ScrollExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Low-end / touch devices choke on continuous scrub + infinite tweens and
      // smooth-scroll hijacking. Detect them and drop to a lean path: cheap
      // transform/opacity reveals over native scroll, no perpetual animation.
      const nav = navigator as Navigator & { deviceMemory?: number };
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const weakCpu = (nav.hardwareConcurrency ?? 8) <= 6;
      const weakMem = (nav.deviceMemory ?? 8) <= 4;
      const liteMode = coarse && (weakCpu || weakMem);

      // Wire the hero scroll cue (and any [data-scroll-to]) to jump to its target.
      const cueCleanups: Array<() => void> = [];
      const wireScrollCues = (scrollTo: (target: string) => void) => {
        gsap.utils.toArray<HTMLElement>("[data-scroll-to]").forEach((el) => {
          const target = el.dataset.scrollTo;
          if (!target) return;
          const handler = () => scrollTo(target);
          el.addEventListener("click", handler);
          cueCleanups.push(() => el.removeEventListener("click", handler));
        });
      };

      // Content reveal — transform + opacity only (compositor-friendly, no
      // blur/paint work). Used on every path so cards never stay hidden.
      const buildReveals = () => {
        gsap.utils.toArray<HTMLElement>("[data-section]").forEach((section) => {
          const items = section.querySelectorAll<HTMLElement>("[data-reveal]");
          if (!items.length) return;

          gsap.fromTo(
            items,
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });
      };

      // Re-measure trigger positions once the intro curtain releases the scroll.
      const onIntroOpen = () => ScrollTrigger.refresh();
      window.addEventListener("intro:open", onIntroOpen);
      const baseCleanup = () => {
        window.removeEventListener("intro:open", onIntroOpen);
        cueCleanups.forEach((fn) => fn());
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };

      if (reduceMotion) {
        gsap.set("[data-reveal]", { autoAlpha: 1, y: 0 });
        wireScrollCues((target) =>
          document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
        return baseCleanup;
      }

      if (liteMode) {
        // Native scroll (no Lenis) + reveals only. No scrub, no idle loops.
        buildReveals();
        wireScrollCues((target) =>
          document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
        ScrollTrigger.refresh();
        return baseCleanup;
      }

      // ---- Full experience (capable devices) -------------------------------
      const lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        touchMultiplier: 1.1,
        wheelMultiplier: 0.9,
      });
      const tick = (time: number) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Ambient scenery breathes very slightly through the scroll.
      if (ambientRef.current) {
        gsap.fromTo(
          ambientRef.current,
          { yPercent: -1.5, scale: 1.01 },
          {
            ease: "none",
            yPercent: 1.5,
            scale: 1.03,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
            },
          },
        );
      }

      buildReveals();

      // Subtle layered drift: sprites and washes move at their own depth.
      gsap.utils.toArray<HTMLElement>("[data-drift]").forEach((item) => {
        const depth = Number(item.dataset.drift ?? 1);
        if (!depth) return;

        gsap.fromTo(
          item,
          { yPercent: 6 * depth },
          {
            yPercent: -6 * depth,
            ease: "none",
            scrollTrigger: {
              trigger: item.closest("[data-section]") ?? item,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.1,
            },
          },
        );
      });

      // Gentle idle bob for floating decorations.
      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((item, index) => {
        const amp = Number(item.dataset.float ?? 0);
        if (!amp) return;

        gsap.to(item, {
          y: -amp,
          rotation: index % 2 === 0 ? 2.5 : -2.5,
          duration: 3.4 + (index % 4) * 0.6,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.35,
        });
      });

      // Hero title — letters rise in on load (transform + opacity only).
      const heroLetters = gsap.utils.toArray<HTMLElement>("[data-hero-title] .hero-letter");
      if (heroLetters.length) {
        gsap.from(heroLetters, {
          autoAlpha: 0,
          yPercent: 60,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.05,
          delay: 0.2,
        });
      }

      // Hanging family photos swing from their tack as if blown by the breeze.
      // One combined tween per card (rotation + drift) instead of two timers.
      gsap.utils.toArray<HTMLElement>("[data-sway]").forEach((card, index) => {
        const amp = 4.5 + index * 0.8;
        gsap.set(card, { transformOrigin: "top center" });
        gsap.fromTo(
          card,
          { rotation: -amp, xPercent: index % 2 === 0 ? -2 : 2 },
          {
            rotation: amp,
            xPercent: index % 2 === 0 ? 2 : -2,
            ease: "sine.inOut",
            duration: 2.6 + index * 0.45,
            repeat: -1,
            yoyo: true,
            delay: index * 0.4,
          },
        );
      });

      // Each card's scene breathes with a slow zoom, but only while the card is
      // on screen — offscreen cards pause so we never run 9 infinite tweens at
      // once. Stays above the cover threshold so no white edge is exposed.
      gsap.utils.toArray<HTMLElement>(".invite-wash-img").forEach((img, index) => {
        const tween = gsap.fromTo(
          img,
          { scale: 1.09 },
          {
            scale: 1.045,
            transformOrigin: "center center",
            duration: 5 + (index % 3) * 0.8,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            paused: true,
          },
        );
        ScrollTrigger.create({
          trigger: img.closest("[data-section]") ?? img,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? tween.play() : tween.pause()),
        });
      });

      // Hero cue scrolls smoothly to the next page through Lenis.
      wireScrollCues((target) => lenis.scrollTo(target, { duration: 1.1 }));

      ScrollTrigger.refresh();

      return () => {
        baseCleanup();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    },
    { scope: rootRef },
  );

  return (
    <div className="landing-shell" ref={rootRef}>
      <div className="ambient" aria-hidden="true">
        {/* blurred bleed fills the letterbox bands when the full panorama is shown */}
        <div className="ambient-bleed">
          <Image
            src={withBasePath("/assets/optimized/backgrounds/background.webp")}
            alt=""
            fill
            sizes="100vw"
            className="ambient-bleed-img"
          />
        </div>
        <div className="ambient-wash" ref={ambientRef}>
          <Image
            src={withBasePath("/assets/optimized/backgrounds/background.webp")}
            alt=""
            fill
            priority
            sizes="100vw"
            className="ambient-img"
          />
        </div>
        <div className="ambient-vignette" />
      </div>
      {children}
    </div>
  );
}
