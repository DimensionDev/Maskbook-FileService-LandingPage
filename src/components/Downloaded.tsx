import {
  detectAudioSupport,
  detectImageSupport,
  detectVideoSupport,
} from '@dimensiondev/kit';
import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router';
import usePromise from 'react-use-promise';
import useObjectURL from 'use-object-url';
import { box, button } from './common.scss';
import locals from './Downloaded.scss';
import Preview from './Preview';

const allowedTypes = ['text/plain', 'application/pdf'];

const Downloaded: React.FC = () => {
  const location = useLocation<{ name: string; blob: Blob }>();
  const { name, blob } = location.state;
  const href = useObjectURL(blob);
  const [preview, setPreview] = React.useState(false);
  const [previewable] = usePromise(async () => {
    const type = blob.type;
    if (href === null) {
      return false;
    } else if (allowedTypes.includes(type)) {
      return true;
    } else if (/^audio/.test(type)) {
      return detectAudioSupport(href);
    } else if (/^video/.test(type)) {
      return detectVideoSupport(href);
    } else if (/^image/.test(type)) {
      return detectImageSupport(href);
    }
    return false;
  }, [href]);
  return (
    <section className={box}>
      <section className={locals.buttons}>
        <a
          className={classNames(button, locals.saving)}
          href={href!}
          download={name}
        >
          Save File
        </a>
        <button
          onClick={() => setPreview(true)}
          className={classNames(button, locals.preview)}
          disabled={!previewable}
        >
          Preview
        </button>
        <Preview
          blob={blob}
          name={name}
          hidden={!preview}
          onClose={() => setPreview(false)}
        />
      </section>
    </section>
  );
};

export default Downloaded;
