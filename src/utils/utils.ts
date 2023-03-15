export function base64ToUint8Array(input: string) {
  const payload = atob(input);
  const block = new Uint8Array(payload.length);
  for (let i = 0; i < block.length; i++) {
    block[i] = payload.charCodeAt(i);
  }
  return block;
}

const ProviderNameMap = {
  ipfs: 'IPFS',
  arweave: 'Arweave',
};

export function getProviderName(id: 'ipfs' | 'arweave') {
  return ProviderNameMap[id];
}
