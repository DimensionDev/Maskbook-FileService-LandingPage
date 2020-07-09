export function detectAudioSupport(url: string) {
  return new Promise<boolean>((resolve) => {
    const reject = () => resolve(false);
    const audio = document.createElement('audio');
    audio.addEventListener('error', reject);
    audio.addEventListener('abort', reject);
    audio.addEventListener('loadedmetadata', () => {
      resolve(true);
    });
    audio.src = url;
  });
}

export function detectVideoSupport(url: string) {
  return new Promise<boolean>((resolve) => {
    const reject = () => resolve(false);
    const video = document.createElement('audio');
    video.addEventListener('error', reject);
    video.addEventListener('abort', reject);
    video.addEventListener('loadedmetadata', () => {
      resolve(true);
    });
    video.src = url;
  });
}

export function detectImageSupport(url: string) {
  return new Promise<boolean>((resolve) => {
    const element = document.createElement('img');
    element.addEventListener('load', () => {
      resolve(true);
    });
    element.addEventListener('error', () => {
      resolve(false);
    });
    element.src = url;
  });
}
