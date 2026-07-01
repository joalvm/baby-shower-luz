import { getInvitationConfig } from "../config/invitation";
import { InvitationProvider } from "../providers/InvitationProvider";
import { ScrollExperience } from "../components/ScrollExperience";
import { CountdownSection } from "../components/sections/CountdownSection";
import { EventDetailsSection } from "../components/sections/EventDetailsSection";
import { FamilySection } from "../components/sections/FamilySection";
import { FarewellSection } from "../components/sections/FarewellSection";
import { HeroSection } from "../components/sections/HeroSection";
import { RsvpSection } from "../components/sections/RsvpSection";

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
