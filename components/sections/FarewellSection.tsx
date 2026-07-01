"use client";

import { InvitationPage } from "@/components/InvitationPage";
import { Icon } from "@/components/ui/Icon";
import { useInvitation } from "@/hooks/useInvitation";

export function FarewellSection() {
  const { babyName, fatherName, motherName } = useInvitation();

  return (
    <InvitationPage id="despedida" wash="goodbye" align="center" tone="page-farewell">
      <p className="page-eyebrow" data-reveal>
        <Icon name="heart" /> Te esperamos
      </p>
      <h2 className="page-heading" data-reveal>
        Gracias por acompañar esta espera
      </h2>
      <p className="farewell-sign" data-reveal>
        Con cariño,
        <br />
        {motherName}, {fatherName} &amp; {babyName}
      </p>
    </InvitationPage>
  );
}
