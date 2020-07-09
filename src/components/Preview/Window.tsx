import React from 'react';
import classNames from 'classnames';
import useObjectURL from 'use-object-url';

import { button } from '../common.scss';
import locals from './Window.scss';
import Frame from './Frame';

interface Props {
  blob: Blob;
  name: string;
  onClose(): void;
}

const Preview: React.FC<Props> = (props) => {
  const href = useObjectURL(props.blob);
  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        props.onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);
  const isMedia = props.blob.type !== 'text/plain';
  return (
    <main className={locals.window}>
      <section
        className={classNames(locals.frame, { [locals.media]: isMedia })}
      >
        <Frame blob={props.blob} />
      </section>
      <section className={locals.buttons}>
        <button className={button} onClick={props.onClose}>
          Close
        </button>
        <a
          className={classNames(button, locals['open-in-new-tab'])}
          href={href!}
          target='_blank'
        >
          Open in new tab
        </a>
        <a className={button} href={href!} download={props.name}>
          Save File
        </a>
      </section>
    </main>
  );
};

export default Preview;
