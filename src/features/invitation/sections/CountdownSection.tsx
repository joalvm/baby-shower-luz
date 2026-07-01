"use client";

import { CountdownTimer } from "@/features/invitation/components/CountdownTimer";
import { InvitationPage } from "@/features/invitation/components/InvitationPage";
import { useInvitation } from "@/features/invitation/hooks/useInvitation";

export function CountdownSection() {
  const { babyName } = useInvitation();

  return (
    <InvitationPage id="cuenta" wash="opening" align="center" tone="page-countdown">
      <p className="page-eyebrow" data-reveal>
        Falta muy poco
      </p>
      <h2 className="page-heading" data-reveal>
        Pronto conoceremos a {babyName}
      </h2>
      <CountdownTimer />
    </InvitationPage>
  );
}
