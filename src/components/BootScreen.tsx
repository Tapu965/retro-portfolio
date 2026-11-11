import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScreenPowerOn from './ScreenPowerOn';
import { useBootSequence } from '../hooks/useBootSequence';
import type { BootLine } from '../hooks/useBootSequence';
import { useSound } from '../hooks/useSound';

interface Props {
  onComplete: () => void;
}

const BOOT_LINES: BootLine[] = [
  { text: 'RETRO BIOS v2.1   (C) 1994-2026', pause: 200, instant: true },
  { text: '', pause: 100, instant: true },
  { text: 'CPU: Pentium (R) 133 MHz', pause: 80, instant: true },
  { text: 'Memory test: 640K OK', pause: 300, instant: false, speed: 22 },
  { text: '', pause: 80, instant: true },
  { text: 'Detecting IDE drives...', pause: 220, instant: false, speed: 14 },
  { text: '  Primary Master   : RETRO-HDD 512MB', pause: 100, instant: true },
  { text: '  Primary Slave    : None', pause: 100, instant: true },
  { text: '  Secondary Master : CD-ROM 4x', pause: 200, instant: true },
  { text: '', pause: 100, instant: true },
  { text: 'Loading kernel from C:\\SYSTEM\\...', pause: 200, instant: false, speed: 12 },
  { text: '  [OK] drivers.sys', pause: 80, instant: true },
  { text: '  [OK] crt.sys', pause: 80, instant: true },
  { text: '  [OK] portfolio.sys', pause: 200, instant: true },
  { text: '', pause: 100, instant: true },
  { text: 'C:\\> loading portfolio.exe...', pause: 300, instant: false, speed: 20 },
];

export default function BootScreen({ onComplete }: Props) {
  const [skipped, setSkipped] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const { bootChime, beep } = useSound();
  const chimePlayed = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Play boot chime on first user interaction (browsers block autoplay)
  useEffect(() => {
    const playOnce = () => {
      if (!chimePlayed.current) {
        chimePlayed.current = true;
        bootChime();
      }
    };
    // Try immediately (works if user has interacted before)
    playOnce();
    // Fallback: any interaction triggers it
    window.addEventListener('keydown', playOnce, { once: true });
    window.addEventListener('click', playOnce, { once: true });
    return () => {
      window.removeEventListener('keydown', playOnce);
      window.removeEventListener('click', playOnce);
    };
  }, [bootChime]);

  // Auto-scroll as lines appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  const { printed, currentText, done } = useBootSequence({
    lines: BOOT_LINES,
    skip: skipped,
    onComplete: () => {
      // Small extra beat before firing onComplete
      setTimeout(() => {
        setShowProgress(true);
      }, 200);
    },
  });

  // Fake loading progress once text is done
  useEffect(() => {
    if (!showProgress) return;
    let p = 0;
    const interval = window.setInterval(() => {
      p += Math.random() * 8 + 3;
      if (p >= 100) {
        p = 100;
        window.clearInterval(interval);
        beep({ frequency: 1046.5, duration: 80, volume: 0.05 }); // C6 "done"
        setTimeout(onComplete, 400);
      }
      setProgress(Math.floor(p));
    }, 90);
    return () => window.clearInterval(interval);
  }, [showProgress, onComplete, beep]);

  // Skip on any key or click
  useEffect(() => {
    const skip = () => setSkipped(true);
    window.addEventListener('keydown', skip);
    window.addEventListener('click', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('click', skip);
    };
  }, []);

  return (
    <ScreenPowerOn>
      <div className="relative flex h-full w-full flex-col bg-[#021012] p-6 sm:p-10 font-mono text-phosphor">
        {/* BIOS text area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-hidden whitespace-pre-wrap text-sm sm:text-base leading-relaxed drop-shadow-[0_0_4px_#7ef0d4]"
        >
          {printed.map((line, i) => (
            <div key={i}>{line || '\u00A0'}</div>
          ))}
          {/* Currently typing line */}
          {currentText && (
            <div>
              {currentText}
              <span className="inline-block w-2 animate-pulse bg-phosphor align-middle">
                &nbsp;
              </span>
            </div>
          )}

          {/* Progress section */}
          <AnimatePresence>
            {showProgress && !done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4"
              >
                <div>
                  Loading desktop&nbsp;
                  <span className="text-phosphor-bright">
                    [{String(progress).padStart(3, ' ')}%]
                  </span>
                </div>
                {/* ASCII progress bar */}
                <div className="mt-1 text-phosphor-bright">
                  [
                  {Array.from({ length: 40 }).map((_, i) => (
                    <span key={i}>
                      {i < Math.round((progress / 100) * 40) ? '█' : '·'}
                    </span>
                  ))}
                  ]
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer hint */}
        <div className="mt-4 flex items-center justify-between border-t border-phosphor-dim/40 pt-3 text-xs text-phosphor-dim">
          <span className="animate-pulse">press any key to skip</span>
          <span>RETRO—OS / 2026</span>
        </div>

        {/* Custom blinking cursor at bottom (only if we haven't started progress) */}
        {!showProgress && !done && (
          <div className="absolute bottom-16 left-6 sm:left-10 text-phosphor">
            <span className="inline-block h-4 w-2 animate-pulse bg-phosphor" />
          </div>
        )}
      </div>
    </ScreenPowerOn>
  );
}