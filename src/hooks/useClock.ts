import { useEffect, useState } from 'react';

/**
 * Returns a live clock string, updating every 30s.
 * Format: "8:30 PM"
 */
export function useClock() {
  const format = () =>
    new Date().toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  const [time, setTime] = useState(format);

  useEffect(() => {
    const tick = () => setTime(format());
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}
