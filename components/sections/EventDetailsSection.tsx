"use client";

import { EventDateGrid } from "@/components/EventDateGrid";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { useInvitation } from "@/hooks/useInvitation";

export function EventDetailsSection() {
  const { mapsUrl } = useInvitation();

  return (
    <section className="segment segment-event" data-section id="evento">
      <div className="segment-inner event-inner">
        <p className="script-kicker" data-reveal>
          Información del evento
        </p>
        <EventDateGrid />
        <div data-reveal>
          <AnimatedButton href={mapsUrl} rel="noreferrer" target="_blank">
            Ver mapa
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}