"use client";

import { EventDateGrid } from "@/features/invitation/components/EventDateGrid";
import { InvitationPage } from "@/features/invitation/components/InvitationPage";
import { useInvitation } from "@/features/invitation/hooks/useInvitation";
import { AnimatedButton } from "@/shared/ui/AnimatedButton";
import { Icon } from "@/shared/ui/Icon";

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
