export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getTimeLeft(targetDate: string): TimeLeft {
  const diff = Math.max(new Date(targetDate).getTime() - Date.now(), 0);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}
