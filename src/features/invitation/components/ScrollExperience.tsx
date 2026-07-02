"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
            { autoAlpha: 0, y: 46, scale: 0.94 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.95,
              ease: "power3.out",
              stagger: 0.13,
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                // Touch: reveal once and leave it — reversing on snap-back re-runs
                // the tween every time you page up, which stutters on weak GPUs.
                toggleActions: coarse ? "play none none none" : "play none none reverse",
              },
            },
          );
        });
      };

      // Mark the card that currently covers the viewport centre as active. The
      // scroll cue is shown via CSS only on `.is-active`, so the cue of a card
      // that scrolled up disappears instead of staying lit. Cheap (class toggle,
      // no scrub), so it runs on every path — touch and desktop alike.
      const wireActiveState = () => {
        gsap.utils.toArray<HTMLElement>("[data-section]").forEach((section) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            toggleClass: { targets: section, className: "is-active" },
          });
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
        wireActiveState();
        wireScrollCues((target) =>
          document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
        return baseCleanup;
      }

      if (liteMode) {
        // Native scroll (no Lenis) + reveals only. No scrub, no idle loops.
        buildReveals();
        wireActiveState();
        wireScrollCues((target) =>
          document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
        ScrollTrigger.refresh();
        return baseCleanup;
      }

      // ---- Full experience (capable devices) -------------------------------
      // Native scroll drives the CSS scroll-snap pager (TikTok-style). No Lenis
      // here: smooth-wheel hijacking fights `scroll-snap-type: mandatory` and
      // makes the snap feel rubbery. ScrollTrigger listens to native scroll.

      // Ambient scenery breathes very slightly through the scroll. Scrub tweens
      // recalc a transform on every scroll frame; on touch that fights the native
      // snap and adds scroll jank, so parallax is desktop-only.
      if (ambientRef.current && !coarse) {
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
      wireActiveState();

      // Subtle layered drift: sprites and washes move at their own depth.
      // Also scrub-linked, so desktop-only for the same scroll-cost reason.
      if (!coarse) {
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
      }

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
          { scale: 1.07 },
          {
            scale: 1.05,
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

      // Hero cue scrolls smoothly to the next page (snap catches the landing).
      wireScrollCues((target) =>
        document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );

      ScrollTrigger.refresh();

      return baseCleanup;
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
