"use client";

import { useInvitation } from "@/hooks/useInvitation";
import { padTimeValue } from "@/utils/countdown/padTimeValue";
import { useCountdown } from "../hooks/useCountdown";

export function CountdownTimer() {
  const { birthDateTime } = useInvitation();
  const timeLeft = useCountdown(birthDateTime);

  return (
    <div className="countdown-grid" aria-live="polite" data-reveal data-drift="1.15">
      <div className="countdown-item">
        <strong>{timeLeft?.days ?? "--"}</strong>
        <span>Días</span>
      </div>
      <div className="countdown-item">
        <strong>{timeLeft ? padTimeValue(timeLeft.hours) : "--"}</strong>
        <span>Horas</span>
      </div>
      <div className="countdown-item">
        <strong>{timeLeft ? padTimeValue(timeLeft.minutes) : "--"}</strong>
        <span>Minutos</span>
      </div>
      <div className="countdown-item">
        <strong>{timeLeft ? padTimeValue(timeLeft.seconds) : "--"}</strong>
        <span>Segundos</span>
      </div>
    </div>
  );
}