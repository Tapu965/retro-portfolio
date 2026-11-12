import { ComputerIcon } from './icons';
import { useClock } from '../hooks/useClock';

interface Props {
  onStartClick?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Taskbar({ onStartClick, soundEnabled, onToggleSound }: Props) {
  const time = useClock();

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-40 flex h-12 items-stretch gap-1.5 border-t-2 border-window-border bg-window-header px-2 py-1 shadow-[0_-4px_12px_rgba(0,0,0,0.6)]"
      role="toolbar"
      aria-label="Taskbar"
    >
      {/* Start button */}
      <button
        type="button"
        onClick={onStartClick}
        className={[
          'flex items-center gap-2 px-3 font-pixel text-[10px] tracking-wider text-phosphor',
          'border-2 border-phosphor-dim bg-desktop',
          'shadow-[inset_1px_1px_0_#b5ffe0,inset_-1px_-1px_0_#1e5148]',
          'hover:bg-window hover:text-phosphor-bright',
          'active:shadow-[inset_-1px_-1px_0_#b5ffe0,inset_1px_1px_0_#1e5148]',
          'transition-colors duration-75',
        ].join(' ')}
        aria-label="Start menu"
      >
        <div className="h-5 w-5">
          <ComputerIcon />
        </div>
        <span className="hidden sm:inline">START</span>
      </button>

      {/* Divider */}
      <div className="w-px bg-phosphor-dim/40" />

      {/* Window tabs placeholder — Day 5 fills this */}
      <div className="flex flex-1 items-center gap-1.5 overflow-hidden">
        <div className="truncate font-mono text-xs text-phosphor-dim">
          {/* empty for now */}
        </div>
      </div>

      {/* System tray */}
      <div className="flex items-center gap-2 border-l border-phosphor-dim/40 pl-3 pr-1">
        {/* Sound toggle */}
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          className="flex h-7 w-7 items-center justify-center rounded border border-phosphor-dim/60 text-phosphor hover:border-phosphor hover:text-phosphor-bright"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>

        {/* Clock */}
        <div className="min-w-[64px] border border-phosphor-dim/60 bg-desktop px-2 py-1 text-center font-mono text-xs text-phosphor-bright shadow-[inset_1px_1px_0_#1e5148]">
          {time}
        </div>
      </div>
    </div>
  );
}
