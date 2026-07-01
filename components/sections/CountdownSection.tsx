"use client";

import { CountdownTimer } from "@/components/CountdownTimer";
import { useInvitation } from "@/hooks/useInvitation";

export function CountdownSection() {
  const { babyName } = useInvitation();

  return (
    <section className="segment segment-countdown" data-section id="cuenta">
      <div className="segment-inner countdown-inner">
        <p className="script-kicker" data-reveal>
          ¿Cuánto falta?
        </p>
        <h2 data-reveal>Muy pronto conoceremos a {babyName}</h2>
        <CountdownTimer />
      </div>
    </section>
  );
}