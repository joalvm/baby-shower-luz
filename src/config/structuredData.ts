import type { Invitation } from "@/config/invitation";
import { getAbsoluteUrl, siteConfig } from "@/config/site";

export function getInvitationEventJsonLd(invitation: Invitation) {
  const [latitude, longitude] = invitation.locationCoordinates
    .split(",")
    .map((value) => Number(value.trim()));

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `My Baby Shower de ${invitation.babyName}`,
    description: siteConfig.description,
    startDate: invitation.eventDateTime,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    // Google flags Event markup without a location as invalid — include the
    // venue as a Place with its address and geo coordinates.
    location: {
      "@type": "Place",
      name: invitation.address,
      address: invitation.address,
      ...(Number.isFinite(latitude) && Number.isFinite(longitude)
        ? { geo: { "@type": "GeoCoordinates", latitude, longitude } }
        : {}),
    },
    organizer: {
      "@type": "Person",
      name: `${invitation.fatherName} y ${invitation.motherName}`,
    },
    image: [getAbsoluteUrl("/meta/og-invitation.png")],
    url: siteConfig.url,
  };
}
