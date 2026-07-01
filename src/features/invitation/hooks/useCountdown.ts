"use client";

import { useEffect, useState } from "react";
import type { TimeLeft } from "@/utils/countdown/getTimeLeft";
import { getTimeLeft } from "@/utils/countdown/getTimeLeft";

export function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(targetDate));
    tick();

    const interval = window.setInterval(tick, 1000);

    return () => window.clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}
