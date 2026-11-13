import { useWindowStore } from '../store/useWindowStore';
import Window from './Window';

interface Props {
  /** Registry mapping appKey → renderable node */
  appRegistry: Record<string, React.ReactNode>;
}

export default function WindowManager({ appRegistry }: Props) {
  const windows = useWindowStore((s) => s.windows);

  // Sort by array order (later = higher z)
  const visible = windows.filter((w) => !w.isMinimized);
  const topId = visible[visible.length - 1]?.id;

  return (
    <>
      {visible.map((w, idx) => (
        <div key={w.id} className="contents" style={{ zIndex: 10 + idx * 10 }}>
          <Window window={w} isFocused={w.id === topId} zIndex={10 + idx * 10}>
            {appRegistry[w.appKey] ?? (
              <div className="flex h-full w-full items-center justify-center font-mono text-phosphor-dim">
                [{w.appKey}] — content coming Day 6
              </div>
            )}
          </Window>
        </div>
      ))}
    </>
  );
}
