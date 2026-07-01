import { formatEventDateParts } from "@/utils/date/formatEventDateParts";
import { normalizeLimaDateTime } from "@/utils/date/normalizeLimaDateTime";

function buildInvitationConfig() {
  const babyName = process.env.BABY_NAME ?? "Amber Eileen";
  const birthDate = process.env.BABY_BIRTHDATE ?? "2026-08-10";
  const eventDateTime = process.env.EVENT_DATETIME ?? "2026-07-18T18:00:00";
  const fatherName = process.env.FATHER_NAME ?? "Luis";
  const motherName = process.env.MOTHER_NAME ?? "Aurora";
  const sisterName = process.env.SISTER_NAME ?? "Mía Hellen";
  const address =
    process.env.ADDRESS ?? "Villa Hermosa MZ. M LT. 09 - Calle las Begonias";
  const coordinates = process.env.ADDRESS_COORDINATES ?? "-5.173020,-80.690175";
  const normalizedEventDateTime = normalizeLimaDateTime(eventDateTime);
  const birthDateTime = normalizeLimaDateTime(birthDate);

  return {
    address,
    babyName,
    birthDateTime,
    eventDateTime: normalizedEventDateTime,
    eventDateParts: formatEventDateParts(normalizedEventDateTime),
    fatherName,
    locationCoordinates: coordinates,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      coordinates,
    )}`,
    motherName,
    rsvpUrl: `https://wa.me/?text=${encodeURIComponent(
      `Confirmo mi asistencia al Baby Shower de ${babyName}.`,
    )}`,
    sisterName,
  };
}

export type Invitation = ReturnType<typeof buildInvitationConfig>;

export function getInvitationConfig(): Invitation {
  return buildInvitationConfig();
}
