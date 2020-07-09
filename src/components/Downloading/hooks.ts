import usePromise from 'react-use-promise';

interface DownloadOptions {
  link: RequestInfo;
  onFileSize(size: number): void;
  onReceivedSize(size: number): void;
  onStartedAt(time: number): void;
  onChunk(chunk: Uint8Array): Promise<void>;
  onNetworkError(error: Error): void;
}

export const useDownload = (options: DownloadOptions, deps: any[]) => {
  usePromise(async () => {
    options.onStartedAt(Date.now());
    try {
      const response = await fetch(options.link);
      if (response.status !== 200) {
        options.onNetworkError(new Error('Network error.'));
        return;
      }
      const length = response.headers.get('Content-Length');
      const fileSize = Number.parseInt(length ?? '0', 10);
      options.onFileSize(fileSize);
      if (response.body === null) {
        return;
      }
      const chunks: Uint8Array[] = [];
      const reader = response.body.getReader();
      let offset = 0;
      while (true) {
        let result = await reader.read();
        if (result.done) {
          break;
        }
        chunks.push(result.value);
        offset += result.value.length;
        options.onReceivedSize(offset);
      }
      await options.onChunk(await concat(chunks));
    } catch (error) {
      console.log(error);
      options.onNetworkError(error);
    }
  }, deps);
};

function concat(chunks: Uint8Array[]): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('error', reject);
    reader.addEventListener('load', () => {
      // @ts-expect-error
      resolve(new Uint8Array(reader.result));
    });
    reader.readAsArrayBuffer(new Blob(chunks));
  });
}
