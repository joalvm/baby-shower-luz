import type { Invitation } from "@/config/invitation";
import { getAbsoluteUrl, siteConfig } from "@/config/site";

export function getInvitationEventJsonLd(invitation: Invitation) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `My Baby Shower de ${invitation.babyName}`,
    description: siteConfig.description,
    startDate: invitation.eventDateTime,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    image: [getAbsoluteUrl("/meta/og-invitation.png")],
    url: siteConfig.url,
  };
}
