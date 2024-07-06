import { useEffect, useRef } from 'react';

const requestWakeLock = async () => {
  try {
    const wakeLock = await navigator.wakeLock.request('screen');

    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock was released');
    });
    console.log('Wake Lock is active');

    return wakeLock;
  } catch {
    console.error('Wake Lock request failed');
  }
};

\

export const useWakeLock = () => {
  const wakeLock = useRef<WakeLockSentinel | undefined>();

  useEffect(() => {
    requestWakeLock().then((wl) => {
      wakeLock.current = wl;
    });

    return () => {
      if (wakeLock.current) {
        wakeLock.current.release();
        wakeLock.current = undefined;
      }
    };
  }, []);
};
