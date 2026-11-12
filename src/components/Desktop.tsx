import { useState } from 'react';
import { motion } from 'framer-motion';
import DesktopIcon from './DesktopIcon';
import Taskbar from './Taskbar';
import { DESKTOP_ICONS } from '../data/icons';
import type { AppKey } from '../types/icon';

export default function Desktop() {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  const handleOpen = (appKey: AppKey) => {
    // TODO Day 5: windowStore.open(appKey)
    const label = DESKTOP_ICONS.find((i) => i.appKey === appKey)?.label ?? appKey;
    setToast(`opening ${label}...`);

    // auto-dismiss toast
    window.setTimeout(() => setToast(null), 1400);
  };

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden bg-desktop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
    >
      {/* Subtle desktop wallpaper pattern */}
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

      {/* Toast (temporary — Day 5 replaces this with real windows) */}
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute bottom-16 left-1/2 z-50 -translate-x-1/2 rounded border-2 border-phosphor bg-window px-4 py-2 font-mono text-sm text-phosphor-bright shadow-[0_4px_0_#051010]"
        >
          {toast}
        </motion.div>
      )}

      {/* Taskbar */}
      <Taskbar
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((s) => !s)}
      />
    </motion.div>
  );
}
