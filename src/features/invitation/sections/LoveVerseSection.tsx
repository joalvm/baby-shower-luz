import { InvitationPage } from "@/features/invitation/components/InvitationPage";

export function LoveVerseSection() {
  return (
    <InvitationPage id="promesa" wash="rsvp" align="center" tone="page-verse" next="#familia">
      <blockquote className="verse-text" data-reveal>
        El amor se multiplica y en la familia habrá una nueva sonrisa iluminando
        nuestras vidas
      </blockquote>
    </InvitationPage>
  );
}
