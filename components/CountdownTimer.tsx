"use client";

import { useInvitation } from "@/hooks/useInvitation";
import { padTimeValue } from "@/utils/countdown/padTimeValue";
import { useCountdown } from "../hooks/useCountdown";

export function CountdownTimer() {
  const { birthDateTime } = useInvitation();
  const timeLeft = useCountdown(birthDateTime);

  const units = [
    { label: "Días", value: timeLeft ? String(timeLeft.days) : "--" },
    { label: "Horas", value: timeLeft ? padTimeValue(timeLeft.hours) : "--" },
    { label: "Min", value: timeLeft ? padTimeValue(timeLeft.minutes) : "--" },
    { label: "Seg", value: timeLeft ? padTimeValue(timeLeft.seconds) : "--" },
  ];

  return (
    <div className="countdown" aria-live="polite" data-reveal>
      {units.map((unit, index) => (
        <div className="countdown-group" key={unit.label}>
          <div className="countdown-unit">
            <strong>{unit.value}</strong>
            <span>{unit.label}</span>
          </div>
          {index < units.length - 1 ? (
            <i className="countdown-colon" aria-hidden="true">
              :
            </i>
          ) : null}
        </div>
      ))}
    </div>
  );
}
