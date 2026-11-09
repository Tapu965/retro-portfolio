export default function App() {
  return (
    <div className="h-full w-full bg-desktop flex items-center justify-center animate-flicker">
      <div className="text-center">
        <h1 className="font-pixel text-3xl text-phosphor mb-6 drop-shadow-[0_0_10px_#7ef0d4]">
          RETRO OS
        </h1>
        <p className="font-mono text-xl text-phosphor-dim">Day 1 — scaffold complete</p>
        <p className="font-mono text-lg text-phosphor-dim mt-2">
          next: CRTOverlay → BootScreen
        </p>
      </div>
    </div>
  );
}
