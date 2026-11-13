import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import WindowManager from './WindowManager';
import { DESKTOP_ICONS } from '../data/icons';
import { useWindowStore } from '../store/useWindowStore';
import type { AppKey } from '../types/icon';

export default function Desktop() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const open = useWindowStore((s) => s.open);
  const windows = useWindowStore((s) => s.windows);
  const close = useWindowStore((s) => s.close);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && windows.length > 0) {
        close(windows[windows.length - 1].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [windows, close]);

  const handleOpen = (appKey: AppKey) => {
    open({ appKey });
  };

  // Day 6 fills this. For now, every app shows a placeholder.
  const appRegistry: Record<string, React.ReactNode> = {};

  return (
    <motion.div
      id="desktop-root"
      className="relative h-full w-full overflow-hidden bg-desktop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Wallpaper */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(126,240,212,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 80%, rgba(126,240,212,0.05) 0%, transparent 40%)',
        }}
      />

      {/* Icon grid */}
      <div className="relative flex h-full w-full items-start content-start overflow-auto p-5 pb-16">
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {DESKTOP_ICONS.map((icon) => (
            <DesktopIcon key={icon.appKey} icon={icon} onOpen={handleOpen} />
          ))}
        </div>
      </div>

      {/* Windows */}
      <WindowManager appRegistry={appRegistry} />

      {/* Taskbar */}
      <Taskbar
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((s) => !s)}
      />
    </motion.div>
  );
}
