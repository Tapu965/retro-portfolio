import { useEffect, useRef, useState } from 'react';

export type BootLine = {
  text: string;
  /** Delay AFTER printing this line finishes (ms) */
  pause?: number;
  /** Print letter-by-letter or instantly */
  instant?: boolean;
  /** ms per character for typed lines */
  speed?: number;
};

export type UseBootSequenceOptions = {
  lines: BootLine[];
  /** Called after all lines printed */
  onComplete?: () => void;
  /** When true, sequence stops */
  skip?: boolean;
};

export function useBootSequence({
  lines,
  onComplete,
  skip = false,
}: UseBootSequenceOptions) {
  const [printed, setPrinted] = useState<string[]>([]);
  const [currentText, setCurrentText] = useState('');
  const [done, setDone] = useState(false);

  const timeouts = useRef<number[]>([]);
  const cancelled = useRef(false);

  // Clear all pending timers
  const clearTimers = () => {
    timeouts.current.forEach((t) => window.clearTimeout(t));
    timeouts.current = [];
  };

  useEffect(() => {
    if (skip) {
      cancelled.current = true;
      clearTimers();
      setPrinted(lines.map((l) => l.text));
      setCurrentText('');
      setDone(true);
      onComplete?.();
      return;
    }

    cancelled.current = false;
    setPrinted([]);
    setCurrentText('');
    setDone(false);

    let elapsed = 300; // initial delay before first line

    lines.forEach((line, index) => {
      const speed = line.instant ? 0 : (line.speed ?? 18);
      const typingDuration = line.instant ? 0 : line.text.length * speed;

      // Start typing this line
      const startT = window.setTimeout(() => {
        if (cancelled.current) return;
        if (line.instant) {
          setPrinted((prev) => [...prev, line.text]);
        } else {
          // Type char by char
          for (let i = 1; i <= line.text.length; i++) {
            const charT = window.setTimeout(() => {
              if (cancelled.current) return;
              setCurrentText(line.text.slice(0, i));
            }, i * speed);
            timeouts.current.push(charT);
          }
          // After typing finishes, move to printed
          const finishT = window.setTimeout(() => {
            if (cancelled.current) return;
            setCurrentText('');
            setPrinted((prev) => [...prev, line.text]);
          }, typingDuration + 10);
          timeouts.current.push(finishT);
        }
      }, elapsed);

      timeouts.current.push(startT);
      elapsed += typingDuration + (line.pause ?? 100);

      // Last line → complete
      if (index === lines.length - 1) {
        const completeT = window.setTimeout(() => {
          if (cancelled.current) return;
          setDone(true);
          onComplete?.();
        }, elapsed + 200);
        timeouts.current.push(completeT);
      }
    });

    return () => {
      cancelled.current = true;
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  return { printed, currentText, done };
}
