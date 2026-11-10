import Screen from './components/Screen';

export default function App() {
  return (
    <Screen>
      {/* Placeholder — Day 3 will replace this with BootScreen → Desktop */}
      <div className="flex h-full w-full items-center justify-center">
        <div className="text-center animate-flicker">
          <h1 className="font-pixel text-3xl text-phosphor drop-shadow-[0_0_10px_#7ef0d4] mb-6">
            RETRO OS
          </h1>
          <p className="font-mono text-xl text-phosphor-dim">
            Day 2 — CRT shell ready
          </p>
          <p className="font-mono text-base text-phosphor-dim/70 mt-2">
            next: boot sequence
          </p>
        </div>
      </div>
    </Screen>
  );
}