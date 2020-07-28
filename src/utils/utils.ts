export function formatFileSize(input = 0, si = isApplePlatform()) {
  if (input === 0 || Number.isNaN(input)) {
    return '0 B';
  }
  let units = ['', 'K', 'M', 'G', 'T', 'P'];
  let base = si ? 1000 : 0x400;
  const n = Math.floor(Math.log(input) / Math.log(base));
  const value = input / Math.pow(base, n);
  const formatted = n === 0 ? value : value.toFixed(1);
  return `${formatted} ${units[n]}${si ? '' : 'i'}B`;
}

export function base64ToUint8Array(input: string) {
  const payload = atob(input);
  const block = new Uint8Array(payload.length);
  for (let i = 0; i < block.length; i++) {
    block[i] = payload.charCodeAt(i);
  }
  return block;
}

export function encodeText(input: string | undefined) {
  return new TextEncoder().encode(input);
}

function isApplePlatform() {
  return /^(Mac|iP)/.test(navigator.platform);
}
