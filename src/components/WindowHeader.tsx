interface Props {
  title: string;
  isFocused: boolean;
  isMaximized: boolean;
  onMinimize: () => void;
  onClose: () => void;
  onToggleMaximize: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

export default function WindowHeader({
  title,
  isFocused,
  isMaximized,
  onMinimize,
  onClose,
  onToggleMaximize,
  onMouseDown,
  onTouchStart,
}: Props) {
  return (
    <div
      className={[
        'rnd-drag-handle', // ← THE CRITICAL LINE
        'flex h-9 select-none items-center justify-between gap-2 px-2',
        'border-b-2 cursor-move',
        isFocused
          ? 'border-phosphor-dim bg-window-header'
          : 'border-bevel-dark bg-window-header/60',
      ].join(' ')}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      role="dialog"
      aria-label={`Window ${title}`}
    >
      {/* Title — pointer-events-none so text doesn't block drag */}
      <div className="pointer-events-none flex min-w-0 items-center gap-2">
        <div
          className="h-3 w-3 bg-phosphor/80"
          style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
        />
        <span
          className={[
            'truncate font-pixel text-[10px] tracking-wider',
            isFocused ? 'text-phosphor-bright' : 'text-phosphor-dim',
          ].join(' ')}
          style={{ textShadow: isFocused ? '0 0 6px #7ef0d4' : 'none' }}
        >
          {title}
        </span>
      </div>

      {/* Controls — each stops propagation */}
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          aria-label="Minimize window"
          className="flex h-6 w-6 items-center justify-center border border-phosphor-dim/60 bg-desktop font-mono text-xs text-phosphor hover:border-phosphor hover:bg-window hover:text-phosphor-bright active:shadow-[inset_1px_1px_0_#1e5148]"
        >
          _
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleMaximize();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          aria-label={isMaximized ? 'Restore window' : 'Maximize window'}
          className="flex h-6 w-6 items-center justify-center border border-phosphor-dim/60 bg-desktop font-mono text-xs text-phosphor hover:border-phosphor hover:bg-window hover:text-phosphor-bright active:shadow-[inset_1px_1px_0_#1e5148]"
        >
          {isMaximized ? '❐' : '□'}
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          onMouseDown={(e) => e.stopPropagation()}
          aria-label="Close window"
          className="flex h-6 w-6 items-center justify-center border border-danger/60 bg-desktop font-mono text-xs text-danger hover:border-danger hover:bg-danger hover:text-desktop active:shadow-[inset_1px_1px_0_#1e5148]"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
