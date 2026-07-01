"use client";

import { useInvitation } from "@/hooks/useInvitation";

export function EventDateGrid() {
  const { address, eventDateParts } = useInvitation();

  return (
    <div className="event-card" data-reveal data-drift="1.05">
      <div className="event-date-grid" aria-label="Fecha y hora del evento">
        <span>{eventDateParts.weekday}</span>
        <strong>{eventDateParts.day}</strong>
        <span>{eventDateParts.month}</span>
        <span>{eventDateParts.time}</span>
        <span aria-hidden="true" />
        <span>{eventDateParts.year}</span>
      </div>
      <p>{address}</p>
    </div>
  );
}