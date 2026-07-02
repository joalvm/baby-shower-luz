import { InvitationPage } from "@/features/invitation/components/InvitationPage";

export function BlessingSection() {
  return (
    <InvitationPage id="bendicion" wash="final" align="center" tone="page-blessing" next="#evento">
      <blockquote className="verse-text verse-on-scene" data-reveal>
        Los hijos son un regalo del Señor; los frutos del vientre son nuestra
        recompensa.
      </blockquote>
      <cite className="verse-cite" data-reveal>
        Salmo 127:3
      </cite>
    </InvitationPage>
  );
}
