import { useEffect, useState } from 'react';
import Screen from './components/Screen';
import BootScreen from './components/BootScreen';

const BOOT_KEY = 'retro-os:hasBooted';

export default function App() {
  const [hasBooted, setHasBooted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Read session storage once on mount
  useEffect(() => {
    const stored = sessionStorage.getItem(BOOT_KEY);
    if (stored === '1') {
      setHasBooted(true);
    }
    setIsReady(true);
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem(BOOT_KEY, '1');
    setHasBooted(true);
  };

  if (!isReady) {
    // Avoid a flash of BootScreen for returning visitors
    return <Screen>{null}</Screen>;
  }

  return (
    <Screen>
      {hasBooted ? (
        // Day 4 will replace this with <Desktop />
        <div className="flex h-full w-full items-center justify-center">
          <div className="text-center animate-flicker">
            <h1 className="font-pixel text-3xl text-phosphor drop-shadow-[0_0_10px_#7ef0d4] mb-6">
              DESKTOP
            </h1>
            <p className="font-mono text-xl text-phosphor-dim">
              boot complete — day 4 builds the real desktop
            </p>
          </div>
        </div>
      ) : (
        <BootScreen onComplete={handleBootComplete} />
      )}
    </Screen>
  );
}