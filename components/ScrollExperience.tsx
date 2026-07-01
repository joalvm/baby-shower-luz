"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { Sprite } from "@/components/ui/Sprite";
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

      if (reduceMotion) {
        gsap.set("[data-reveal]", { autoAlpha: 1, y: 0, filter: "none" });
        wireScrollCues((target) =>
          document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
        return () => cueCleanups.forEach((fn) => fn());
      }

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

      // Ambient watercolor breathes very slightly through the scroll.
      if (ambientRef.current) {
        gsap.fromTo(
          ambientRef.current,
          { yPercent: -4, scale: 1.05 },
          {
            ease: "none",
            yPercent: 4,
            scale: 1.12,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.2,
            },
          },
        );
      }

      // Per-page content reveal.
      gsap.utils.toArray<HTMLElement>("[data-section]").forEach((section) => {
        const items = section.querySelectorAll<HTMLElement>("[data-reveal]");
        if (!items.length) return;

        gsap.fromTo(
          items,
          { autoAlpha: 0, y: 26, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: section,
              start: "top 68%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

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

      // Hero title — letters rise in on load.
      const heroLetters = gsap.utils.toArray<HTMLElement>("[data-hero-title] .hero-letter");
      if (heroLetters.length) {
        gsap.from(heroLetters, {
          autoAlpha: 0,
          yPercent: 60,
          filter: "blur(8px)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.05,
          delay: 0.2,
        });
      }

      // Hanging family photos swing from their tack as if blown by the breeze.
      gsap.utils.toArray<HTMLElement>("[data-sway]").forEach((card, index) => {
        const amp = 4.5 + index * 0.8;
        gsap.set(card, { transformOrigin: "top center" });
        gsap.fromTo(
          card,
          { rotation: -amp },
          {
            rotation: amp,
            ease: "sine.inOut",
            duration: 2.2 + index * 0.45,
            repeat: -1,
            yoyo: true,
            delay: index * 0.5,
          },
        );
        // a slower gust drifts the whole card side to side a touch
        gsap.to(card, {
          xPercent: index % 2 === 0 ? 3 : -3,
          ease: "sine.inOut",
          duration: 3.6 + index * 0.4,
          repeat: -1,
          yoyo: true,
          delay: index * 0.3,
        });
      });

      // Each invitation card breathes with a very slight zoom in / out.
      gsap.utils.toArray<HTMLElement>(".invite-card").forEach((card, index) => {
        gsap.to(card, {
          scale: 1.014,
          transformOrigin: "center center",
          duration: 4.2 + (index % 3) * 0.7,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.4,
        });
      });

      // Hero cue scrolls smoothly to the next page through Lenis.
      wireScrollCues((target) => lenis.scrollTo(target, { duration: 1.1 }));

      ScrollTrigger.refresh();

      return () => {
        cueCleanups.forEach((fn) => fn());
        gsap.ticker.remove(tick);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: rootRef },
  );

  return (
    <div className="landing-shell" ref={rootRef}>
      <div className="ambient" aria-hidden="true">
        <div className="ambient-wash" ref={ambientRef}>
          <Image
            src="/assets/backgrounds/watercolor.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="ambient-img"
          />
        </div>
        <div className="ambient-vignette" />
        <div className="ambient-decor">
          <Sprite name="butterfly" width="7rem" float={16} drift={1.4} style={{ top: "10%", left: "6%" }} />
          <Sprite name="flower-open" width="9rem" float={10} drift={0.8} style={{ top: "34%", left: "3%" }} opacity={0.9} />
          <Sprite name="shrub" width="16rem" float={0} drift={0.5} style={{ bottom: "-2%", left: "-3%" }} opacity={0.85} />
          <Sprite name="butterfly" width="5.5rem" float={20} drift={1.7} style={{ top: "22%", right: "7%" }} />
          <Sprite name="flower-closed" width="6.5rem" float={12} drift={1} style={{ top: "56%", right: "4%" }} opacity={0.9} />
          <Sprite name="shrub" width="15rem" float={0} drift={0.5} style={{ bottom: "-3%", right: "-4%", transform: "scaleX(-1)" }} opacity={0.85} />
        </div>
      </div>
      {children}
    </div>
  );
}
