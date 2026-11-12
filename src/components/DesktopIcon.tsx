import { useState } from 'react';
import type { IconDef } from '../types/icon';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface Props {
  icon: IconDef;
  onOpen: (appKey: IconDef['appKey']) => void;
}

export default function DesktopIcon({ icon, onOpen }: Props) {
  const [selected, setSelected] = useState(false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const { Icon, label } = icon;

  const handleActivate = () => {
    onOpen(icon.appKey);
    setSelected(false);
  };

  return (
    <button
      type="button"
      aria-label={`Open ${label}`}
      className={[
        'group flex w-20 flex-col items-center gap-1.5 rounded-md p-1.5 outline-none',
        'transition-all duration-100',
        selected ? 'bg-phosphor/15 ring-1 ring-phosphor/60' : 'hover:bg-phosphor/10',
        'focus-visible:bg-phosphor/15 focus-visible:ring-1 focus-visible:ring-phosphor',
      ].join(' ')}
      onClick={() => setSelected(true)}
      onDoubleClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleActivate();
        }
      }}
      onBlur={() => setSelected(false)}
    >
      {/* Icon tile */}
      <div
        className={[
          'h-14 w-14 rounded-md p-1.5',
          'border-2 border-window-border bg-window',
          'shadow-[inset_1px_1px_0_#b5ffe0,inset_-1px_-1px_0_#1e5148,0_2px_4px_rgba(0,0,0,0.5)]',
          'transition-transform duration-100',
          'group-hover:scale-[1.04] group-active:scale-95',
          selected ? 'ring-1 ring-phosphor shadow-glow' : '',
        ].join(' ')}
      >
        <Icon className="drop-shadow-[0_0_4px_#7ef0d4]" />
      </div>

      {/* Label */}
      <span
        className={[
          'w-full truncate rounded px-1 text-center font-mono text-[12px] leading-tight',
          'text-phosphor-bright',
          'bg-desktop-dark/70 border border-phosphor-dim/40',
          selected ? 'bg-phosphor text-desktop-dark border-phosphor' : '',
        ].join(' ')}
        style={{ textShadow: selected ? 'none' : '0 0 3px #7ef0d4' }}
      >
        {isMobile ? label.replace(/\..*$/, '') : label}
      </span>
    </button>
  );
}
