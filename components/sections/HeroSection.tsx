"use client";

import { useInvitation } from "@/hooks/useInvitation";

export function HeroSection() {
  const { babyName } = useInvitation();

  return (
    <section className="segment segment-hero" data-section id="inicio">
      <div className="segment-inner hero-inner">
        <p className="script-kicker" data-reveal>
          Baby Shower
        </p>
        <h1 data-reveal>{babyName}</h1>
        <p className="lead-copy" data-reveal>
          Una tarde para celebrar la dulce espera en un bosque encantado de acuarela.
        </p>
      </div>
    </section>
  );
}