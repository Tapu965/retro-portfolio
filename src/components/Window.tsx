import { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';
import type { WindowState } from '../types/window';
import { useWindowStore } from '../store/useWindowStore';
import WindowHeader from './WindowHeader';

interface Props {
  window: WindowState;
  isFocused: boolean;
  zIndex: number;
  children: React.ReactNode;
}

export default function Window({ window: w, isFocused, zIndex, children }: Props) {
  const { focus, close, minimize, toggleMaximize, move, resize } = useWindowStore();
  const rndRef = useRef<Rnd>(null);

  const [dragging, setDragging] = useState(false);
  const lastFocusRef = useRef(0);

  const handleFocus = () => {
    const now = Date.now();
    if (now - lastFocusRef.current < 100) return;
    lastFocusRef.current = now;
    focus(w.id);
  };

  // 🔑 Critical: sync Rnd internal state with store when width/height/pos change (maximize/restore)
  useEffect(() => {
    if (!rndRef.current) return;
    rndRef.current.updateSize({ width: w.width, height: w.height });
    rndRef.current.updatePosition({ x: w.x, y: w.y });
  }, [w.width, w.height, w.x, w.y]);

  // Mobile: full-screen, no drag
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return (
      <div
        className="absolute inset-0 flex flex-col"
        style={{ zIndex }}
        onClick={handleFocus}
      >
        <div className="flex h-full flex-col border-2 border-window-border bg-window shadow-window">
          <WindowHeader
            title={w.title}
            isFocused={isFocused}
            isMaximized={false}
            onMinimize={() => minimize(w.id)}
            onClose={() => close(w.id)}
            onToggleMaximize={() => {}}
            onMouseDown={() => {}}
            onTouchStart={() => {}}
          />
          <div className="flex-1 overflow-auto bg-[#021012]">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <Rnd
      ref={rndRef}
      key={`${w.id}-${w.isMaximized}`} // ← reset internal state on maximize toggle
      size={{ width: w.width, height: w.height }}
      position={{ x: w.x, y: w.y }}
      minWidth={320}
      minHeight={200}
      bounds="#desktop-root" // ← reliable bounds (needs id on Desktop root)
      dragHandleClassName="rnd-drag-handle"
      disableDragging={w.isMaximized}
      enableResizing={!w.isMaximized}
      onDragStart={() => {
        setDragging(true);
        handleFocus();
      }}
      onDragStop={(_e, d) => {
        setDragging(false);
        move(w.id, d.x, d.y);
      }}
      onResizeStart={handleFocus}
      onResizeStop={(_e, _dir, ref, _delta, pos) => {
        resize(
          w.id,
          parseInt(ref.style.width, 10),
          parseInt(ref.style.height, 10),
          pos.x,
          pos.y
        );
      }}
      onMouseDown={handleFocus}
      onTouchStart={handleFocus}
      style={{ zIndex }} // ← use prop, not hardcoded 100
      resizeHandleStyles={{
        bottomRight: { width: 16, height: 16, right: 0, bottom: 0 },
      }}
      resizeHandleClasses={{
        bottomRight: 'rnd-resize-handle',
      }}
    >
      <div
        className={[
          'flex h-full flex-col border-2 bg-window',
          isFocused
            ? 'border-phosphor shadow-[0_0_20px_rgba(126,240,212,0.4),4px_4px_0_#051010,6px_6px_0_rgba(0,0,0,0.6)]'
            : 'border-window-border/60 shadow-[4px_4px_0_#051010]',
        ].join(' ')}
      >
        <WindowHeader
          title={w.title}
          isFocused={isFocused}
          isMaximized={w.isMaximized}
          onMinimize={() => minimize(w.id)}
          onClose={() => close(w.id)}
          onToggleMaximize={() => toggleMaximize(w.id)}
          onMouseDown={() => {}}
          onTouchStart={() => {}}
        />
        <div className="flex-1 overflow-auto bg-[#021012]">{children}</div>
      </div>
    </Rnd>
  );
}
