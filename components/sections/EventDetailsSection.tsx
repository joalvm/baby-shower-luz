"use client";

import { EventDateGrid } from "@/components/EventDateGrid";
import { InvitationPage } from "@/components/InvitationPage";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Icon } from "@/components/ui/Icon";
import { useInvitation } from "@/hooks/useInvitation";

export function EventDetailsSection() {
  const { mapsUrl } = useInvitation();

  return (
    <InvitationPage id="evento" wash="details" align="center" tone="page-event">
      <p className="page-eyebrow" data-reveal>
        Los detalles
      </p>
      <h2 className="page-heading" data-reveal>
        Agenda la fecha
      </h2>
      <EventDateGrid />
      <div className="page-actions" data-reveal>
        <AnimatedButton href={mapsUrl} rel="noreferrer" target="_blank" ariaLabel="Ver ubicación en el mapa">
          <Icon name="pin" /> Ver ubicación
        </AnimatedButton>
      </div>
    </InvitationPage>
  );
}
