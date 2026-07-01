import { getInvitationConfig } from "@/config/invitation";
import { getInvitationEventJsonLd } from "@/config/structuredData";
import { ScrollExperience } from "@/features/invitation/components/ScrollExperience";
import { InvitationProvider } from "@/features/invitation/providers/InvitationProvider";
import { ArrivalSection } from "@/features/invitation/sections/ArrivalSection";
import { BlessingSection } from "@/features/invitation/sections/BlessingSection";
import { CountdownSection } from "@/features/invitation/sections/CountdownSection";
import { EventDetailsSection } from "@/features/invitation/sections/EventDetailsSection";
import { FamilySection } from "@/features/invitation/sections/FamilySection";
import { FarewellSection } from "@/features/invitation/sections/FarewellSection";
import { HeroSection } from "@/features/invitation/sections/HeroSection";
import { LoveVerseSection } from "@/features/invitation/sections/LoveVerseSection";
import { RsvpSection } from "@/features/invitation/sections/RsvpSection";

export default function Home() {
  const invitation = getInvitationConfig();
  const eventJsonLd = getInvitationEventJsonLd(invitation);

  return (
    <InvitationProvider value={invitation}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(eventJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ScrollExperience>
        <main className="landing-main">
          <HeroSection />
          <LoveVerseSection />
          <FamilySection />
          <ArrivalSection />
          <CountdownSection />
          <BlessingSection />
          <EventDetailsSection />
          <RsvpSection />
          <FarewellSection />
        </main>
        <footer className="site-credit">
          Diseñado con cariño por <span>Alejandro Vilchez</span>
        </footer>
      </ScrollExperience>
    </InvitationProvider>
  );
}
