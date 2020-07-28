import { useEffect } from 'react';

export function useMessage(onMessage: (event: MessageEvent) => void) {
  let broadcast: BroadcastChannel | undefined;
  if (typeof BroadcastChannel !== 'undefined') {
    broadcast = new BroadcastChannel('arweave');
  }
  useEffect(() => {
    broadcast?.addEventListener('message', onMessage);
    window.addEventListener('message', onMessage);
    return () => {
      broadcast?.removeEventListener('message', onMessage);
      window.removeEventListener('message', onMessage);
    };
  }, []);
}

export function useTimeout(callback: () => void, ms: number) {
  useEffect(() => {
    const id = setTimeout(callback, ms);
    return () => {
      clearTimeout(id);
    };
  }, []);
}
