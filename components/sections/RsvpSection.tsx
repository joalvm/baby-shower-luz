"use client";

import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useInvitation } from "@/hooks/useInvitation";

export function RsvpSection() {
  const { babyName, rsvpUrl } = useInvitation();

  return (
    <section className="segment segment-rsvp" data-section id="confirmar">
      <div className="segment-inner rsvp-inner">
        <p className="script-kicker" data-reveal>
          Confirmar asistencia
        </p>
        <h2 data-reveal>Tu presencia hará más dulce este día</h2>
        <p className="body-copy" data-reveal>
          Avísanos si acompañarás a la familia en la bienvenida de {babyName}.
        </p>
        <div data-reveal>
          <AnimatedButton href={rsvpUrl} rel="noreferrer" target="_blank" variant="soft">
            Confirmar asistencia
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}