"use client";

import { InvitationPage } from "@/features/invitation/components/InvitationPage";
import { useInvitation } from "@/features/invitation/hooks/useInvitation";
import { AnimatedButton } from "@/shared/ui/AnimatedButton";
import { Icon } from "@/shared/ui/Icon";

export function RsvpSection() {
  const { babyName, rsvpUrl } = useInvitation();

  return (
    <InvitationPage id="confirmar" wash="rsvp" align="center" tone="page-rsvp" next="#despedida">
      <p className="page-eyebrow" data-reveal>
        Confirma tu asistencia
      </p>
      <h2 className="page-heading" data-reveal>
        Tu presencia hará este día más dulce
      </h2>
      <p className="page-body" data-reveal>
        Cuéntanos si nos acompañarás en la bienvenida de {babyName}.
      </p>
      <div className="page-actions" data-reveal>
        <AnimatedButton href={rsvpUrl} rel="noreferrer" target="_blank" ariaLabel="Confirmar asistencia por WhatsApp">
          <Icon name="whatsapp" /> Confirmar mi asistencia
        </AnimatedButton>
      </div>
    </InvitationPage>
  );
}
