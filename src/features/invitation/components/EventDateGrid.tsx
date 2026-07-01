"use client";

import { useInvitation } from "@/features/invitation/hooks/useInvitation";

export function EventDateGrid() {
  const { address, eventDateParts } = useInvitation();

  return (
    <div className="event-card" data-reveal>
      <div className="event-date" aria-label="Fecha del evento">
        <span className="event-day">{eventDateParts.day}</span>
        <span className="event-monthyear">
          {eventDateParts.month}
          <br />
          {eventDateParts.year}
        </span>
      </div>
      <p className="event-when">
        {eventDateParts.weekday} · {eventDateParts.time}
      </p>
      <p className="event-place">{address}</p>
    </div>
  );
}
