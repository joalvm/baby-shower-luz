"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useAmbientAudio } from "@/features/invitation/hooks/useAmbientAudio";
import { withBasePath } from "@/utils/assets/withBasePath";

/**
 * Opening beat: a sealed envelope over a soft blush scrim. Tapping the seal
 * unlocks audio (autoplay needs the gesture) and dissolves the envelope to
 * reveal the invitation underneath.
 */
export function IntroCurtain() {
  const { start } = useAmbientAudio();
  const scrimRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLButtonElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const openingRef = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [dismissed, setDismissed] = useState(false);

  // Lock scroll while the curtain is up; release + kill any running tween on unmount.
  useEffect(() => {
    const root = document.documentElement;
    // The curtain always opens on the hero, so don't let the browser restore a
    // mid-page scroll position from the previous visit — otherwise tapping the
    // seal drops the reader onto whatever card they left off on.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    root.classList.add("intro-locked");
    return () => {
      root.classList.remove("intro-locked");
      tlRef.current?.kill();
    };
  }, []);

  const finish = useCallback(() => {
    setDismissed(true);
    document.documentElement.classList.remove("intro-locked");
    // Snap to the hero before the page becomes scrollable again (the lock's
    // overflow:hidden pins any restored offset until now).
    window.scrollTo(0, 0);
    // Let ScrollExperience recompute trigger positions now the page can scroll.
    window.dispatchEvent(new CustomEvent("intro:open"));
  }, []);

  const open = useCallback(() => {
    if (openingRef.current) return;
    openingRef.current = true;

    // Fire audio synchronously inside the gesture handler (autoplay policy).
    start();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      finish();
      return;
    }

    tlRef.current = gsap
      .timeline({ onComplete: finish })
      .to(sealRef.current, { scale: 0.82, duration: 0.12, yoyo: true, repeat: 1, ease: "power2.inOut" })
      .to(hintRef.current, { autoAlpha: 0, y: 8, duration: 0.4, ease: "power1.out" }, "<")
      .to(
        envelopeRef.current,
        { scale: 1.4, yPercent: -6, autoAlpha: 0, duration: 0.85, ease: "power2.inOut" },
        "-=0.05",
      )
      .to(scrimRef.current, { autoAlpha: 0, duration: 0.6, ease: "power1.out" }, "-=0.55");
  }, [start, finish]);

  if (dismissed) return null;

  return (
    <div className="intro-scrim" ref={scrimRef} role="dialog" aria-modal="true" aria-label="Invitación">
      <div className="intro-inner">
        <div className="intro-envelope" ref={envelopeRef}>
          <Image
            src={withBasePath("/assets/optimized/sprites/envelope.webp")}
            alt="Un sobre sellado con lacre dorado"
            width={1399}
            height={1124}
            priority
            className="intro-envelope-img"
            draggable={false}
          />
          <button
            type="button"
            ref={sealRef}
            className="intro-seal"
            onClick={open}
            aria-label="Abrir la invitación"
          >
            <span className="intro-seal-ring" aria-hidden="true" />
          </button>
        </div>
        <div className="intro-hint" ref={hintRef}>
          <p className="intro-hint-title">Toca el sello para abrir</p>
          <p className="intro-hint-sub">Contiene sonido para una mejor experiencia</p>
        </div>
      </div>
    </div>
  );
}
