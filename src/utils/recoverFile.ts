import { Metadata } from '../Metadata';

const METADATA_OPEN_TAG = '<script type="text/json" id="metadata">';
const PREVIEW_ORIGIN =
  'https://2uhlk62ro3ctby7mehzurppjwc7tjuezhzthbjabmm2v6jtrnsba.arweave.net/';

export async function recoverFile(url: string): Promise<Metadata> {
  const html = await fetch(url).then((r) => r.text());
  const start = html.indexOf(METADATA_OPEN_TAG) + METADATA_OPEN_TAG.length;
  const end = html.indexOf('</script>', start);
  const payload = html.slice(start, end);
  const metadata = JSON.parse(payload) as Metadata;
  // Use page origin with confidence.
  const origin = process.env.PREVIEW ? PREVIEW_ORIGIN : location.origin;
  return {
    ...metadata,
    link: origin + metadata.link.split('/').pop(),
  };
}
