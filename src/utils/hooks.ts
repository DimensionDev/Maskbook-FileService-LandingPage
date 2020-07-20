interface Metadata {
  name: string;
  size: number;
  link: string;
  keyHash: string;
  createdAt: string;
  mime: string;
}

export function useMetadata() {
  const element = document.getElementById('metadata');
  const payload = element?.textContent?.trim();
  return JSON.parse(payload!) as Metadata;
}
