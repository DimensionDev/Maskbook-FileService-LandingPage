import React from 'react';
import usePromise from 'react-use-promise';
import useObjectURL from 'use-object-url';

interface Props {
  blob: Blob;
}

const Frame: React.FC<Props> = ({ blob }) => {
  const href = useObjectURL(blob);
  if (href === null) {
    return null;
  } else if (blob.type === 'text/plain') {
    return <TextFrame blob={blob} />;
  } else if (blob.type === 'text/html') {
    return <iframe src={href} />;
  } else if (blob.type === 'application/pdf') {
    return <object type='application/pdf' data={href} />;
  } else if (/^image/.test(blob.type)) {
    return <img src={href} />;
  } else if (/^audio/.test(blob.type)) {
    return <audio src={href} controls />;
  } else if (/^video/.test(blob.type)) {
    return <video src={href} controls />;
  }
  return null;
};

const TextFrame: React.FC<Props> = ({ blob }) => {
  const [text] = usePromise(
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('error', reject);
      reader.addEventListener('load', () => {
        // @ts-expect-error
        const result: string = reader.result;
        const lines = result.split(/\n/g).slice(0, 100);
        resolve(lines.join('\n'));
      });
      reader.readAsText(blob);
    }),
    [],
  );
  return (
    <pre>
      {text}
      <br />
      <br />
      <b>... Please save this file ...</b>
    </pre>
  );
};

export default Frame;
