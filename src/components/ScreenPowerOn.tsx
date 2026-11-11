import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * Wraps content with a CRT power-on animation:
 * 1. Horizontal white line
 * 2. Expands vertically
 * 3. Flashes bright
 * 4. Fades to content
 */
export default function ScreenPowerOn({ children }: Props) {
  return (
    <motion.div
      className="relative h-full w-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* The expanding bright line (overlay) */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 top-1/2 z-[100] bg-white"
        initial={{ height: '2px', opacity: 1 }}
        animate={{
          height: ['2px', '2px', '100%', '100%'],
          opacity: [1, 1, 0.9, 0],
        }}
        transition={{
          duration: 1.1,
          times: [0, 0.35, 0.7, 1],
          ease: 'easeInOut',
        }}
        style={{
          transform: 'translateY(-50%)',
          boxShadow: '0 0 40px 10px rgba(255,255,255,0.9)',
        }}
      />

      {/* Faint white flash */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[99] bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.6, 0] }}
        transition={{ duration: 1.1, times: [0, 0.5, 0.7, 1] }}
      />

      {/* Actual content */}
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.8 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}