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

export function bufferEqual(buf1: Uint8Array, buf2: Uint8Array) {
  if (buf1 === buf2) {
    return true;
  } else if (buf1.byteLength !== buf2.byteLength) {
    return false;
  }
  let i = buf1.byteLength;
  while (i--) {
    if (buf1[i] !== buf2[i]) {
      return false;
    }
  }
  return true;
}
function isApplePlatform() {
  return /^(Mac|iP)/.test(navigator.platform);
}
