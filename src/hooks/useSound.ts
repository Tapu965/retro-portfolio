import { useCallback, useRef } from 'react';

type BeepOptions = {
  frequency?: number;
  duration?: number; // ms
  volume?: number;   // 0..1
  type?: OscillatorType;
};

/**
 * Small Web Audio utility — synthesizes retro beeps on demand.
 * No audio files. Safe to call before user gesture in Chrome (it just plays silent).
 */
export function useSound() {
  const ctxRef = useRef<AudioContext | null>(null);

  const getCtx = () => {
    if (!ctxRef.current) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      ctxRef.current = new AC();
    }
    // Resume if suspended (browsers require a gesture)
    if (ctxRef.current.state === 'suspended') {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  };

  const beep = useCallback(
    ({
      frequency = 440,
      duration = 60,
      volume = 0.06,
      type = 'square',
    }: BeepOptions = {}) => {
      try {
        const ctx = getCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);

        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.0001,
          ctx.currentTime + duration / 1000
        );

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration / 1000);
      } catch {
        /* silent fail — audio is cosmetic */
      }
    },
    []
  );

  /** Classic 3-note boot chime — call once at boot start */
  const bootChime = useCallback(() => {
    beep({ frequency: 523.25, duration: 120, volume: 0.05 }); // C5
    setTimeout(() => beep({ frequency: 659.25, duration: 120, volume: 0.05 }), 130); // E5
    setTimeout(() => beep({ frequency: 783.99, duration: 180, volume: 0.05 }), 260); // G5
  }, [beep]);

  /** Short click for UI feedback (used Day 4+) */
  const click = useCallback(
    () => beep({ frequency: 880, duration: 25, volume: 0.03 }),
    [beep]
  );

  return { beep, bootChime, click };
}