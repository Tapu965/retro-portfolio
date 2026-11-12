import { useEffect, useState } from 'react';
import Screen from './components/Screen';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop';

const BOOT_KEY = 'retro-os:hasBooted';

export default function App() {
  const [hasBooted, setHasBooted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(BOOT_KEY) === '1') {
      setHasBooted(true);
    }
    setIsReady(true);
  }, []);

  const handleBootComplete = () => {
    sessionStorage.setItem(BOOT_KEY, '1');
    setHasBooted(true);
  };

  if (!isReady) return <Screen>{null}</Screen>;

  return (
    <Screen>
      {hasBooted ? <Desktop /> : <BootScreen onComplete={handleBootComplete} />}
    </Screen>
  );
}
