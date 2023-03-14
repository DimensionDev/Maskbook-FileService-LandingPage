import { Metadata } from '../Metadata';

const METADATA_OPEN_TAG = '<script type="text/json" id="metadata">';

export async function recoverFile(originUrl: string): Promise<Metadata> {
  const html = await fetch(originUrl).then((r) => r.text());
  const start = html.indexOf(METADATA_OPEN_TAG) + METADATA_OPEN_TAG.length;
  const end = html.indexOf('</script>', start);
  const payload = html.slice(start, end);
  const metadata = JSON.parse(payload) as Metadata;
  const url = new URL(originUrl);

  // IPFS
  if (url.hostname.includes('ipfs')) {
    const metadataLink = new URL(metadata.link);
    return {
      ...metadata,
      link: `${url.origin}${metadataLink.pathname}`,
    };
  }

  // Arweave
  return {
    ...metadata,
    link: `${url.origin}/${metadata.link.split('/').pop()}`,
  };
}
