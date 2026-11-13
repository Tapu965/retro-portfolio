import { ComputerIcon } from './icons';
import { useClock } from '../hooks/useClock';
import { useWindowStore } from '../store/useWindowStore';

interface Props {
  onStartClick?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Taskbar({ onStartClick, soundEnabled, onToggleSound }: Props) {
  const time = useClock();
  const windows = useWindowStore((s) => s.windows);
  const taskbarClick = useWindowStore((s) => s.taskbarClick);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-50 flex h-12 items-stretch gap-1.5 border-t-2 border-window-border bg-window-header px-2 py-1 shadow-[0_-4px_12px_rgba(0,0,0,0.6)]"
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

      <div className="w-px bg-phosphor-dim/40" />

      {/* Window tabs */}
      <div className="flex flex-1 items-center gap-1 overflow-x-auto">
        {windows.map((w, idx) => {
          const isFocused = idx === windows.length - 1 && !w.isMinimized;
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => taskbarClick(w.id)}
              className={[
                'flex h-full max-w-[180px] items-center gap-1.5 truncate px-2 font-mono text-xs',
                'border-2 transition-colors duration-75',
                isFocused
                  ? 'border-phosphor bg-window text-phosphor-bright shadow-[inset_1px_1px_0_#b5ffe0]'
                  : w.isMinimized
                    ? 'border-phosphor-dim/40 bg-desktop/60 text-phosphor-dim'
                    : 'border-phosphor-dim bg-desktop text-phosphor',
                'hover:text-phosphor-bright',
              ].join(' ')}
              title={w.title}
            >
              <span
                className="h-2 w-2 shrink-0 bg-phosphor/80"
                style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
              />
              <span className="truncate">{w.title}</span>
            </button>
          );
        })}
      </div>

      {/* System tray */}
      <div className="flex items-center gap-2 border-l border-phosphor-dim/40 pl-3 pr-1">
        <button
          type="button"
          onClick={onToggleSound}
          aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
          className="flex h-7 w-7 items-center justify-center rounded border border-phosphor-dim/60 text-phosphor hover:border-phosphor hover:text-phosphor-bright"
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
        <div className="min-w-[64px] border border-phosphor-dim/60 bg-desktop px-2 py-1 text-center font-mono text-xs text-phosphor-bright shadow-[inset_1px_1px_0_#1e5148]">
          {time}
        </div>
      </div>
    </div>
  );
}
