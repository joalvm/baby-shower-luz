import { getInvitationConfig } from "@/config/invitation";
import { ScrollExperience } from "@/features/invitation/components/ScrollExperience";
import { InvitationProvider } from "@/features/invitation/providers/InvitationProvider";
import { CountdownSection } from "@/features/invitation/sections/CountdownSection";
import { EventDetailsSection } from "@/features/invitation/sections/EventDetailsSection";
import { FamilySection } from "@/features/invitation/sections/FamilySection";
import { FarewellSection } from "@/features/invitation/sections/FarewellSection";
import { HeroSection } from "@/features/invitation/sections/HeroSection";
import { RsvpSection } from "@/features/invitation/sections/RsvpSection";

export default function Home() {
  const invitation = getInvitationConfig();

  return (
    <InvitationProvider value={invitation}>
      <ScrollExperience>
        <main className="landing-main">
          <HeroSection />
          <FamilySection />
          <CountdownSection />
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
