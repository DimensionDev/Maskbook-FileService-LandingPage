import { Attachment } from '@dimensiondev/common-protocols';
import classNames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router';
import { base64ToUint8Array, bufferEqual, useMetadata } from '../utils';
import { box, button } from './common.scss';
import locals from './Password.scss';

const Password: React.FC = () => {
  const metadata = useMetadata();
  const history = useHistory();
  const [input, onInput] = React.useState('');
  const [error, setError] = React.useState(
    'Trying to retrieve automatically...',
  );
  React.useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash.length !== 0) {
      const key = new TextEncoder().encode(String(hash));
      isKey(metadata.keyHash, key).then(() =>
        history.replace('/download', { key }),
      );
    }

    const onMessage = async (event: MessageEvent) => {
      const key = base64ToUint8Array(String(event.data));
      if (await isKey(metadata.keyHash, key)) {
        history.replace('/downloading', { key });
      } else {
        setError('File Key incorrect, try another');
      }
    };
    window.addEventListener('message', onMessage);
    const removeListener = () => {
      setError('Trying to retrieve automatically... Not Found.');
      window.removeEventListener('message', onMessage);
    };
    const timeoutId = setTimeout(removeListener, 20 * 1000);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('message', onMessage);
    };
  }, []);
  if (metadata.keyHash === undefined || metadata.keyHash === null) {
    history.replace('/download');
  }
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const key = new TextEncoder().encode(input);
    if (await isKey(metadata.keyHash, key)) {
      history.replace('/downloading', { key });
    } else {
      setError('File Key incorrect, try another');
    }
  };
  return (
    <form className={classNames(box, locals.form)} onSubmit={onSubmit}>
      <label>
        <input
          value={input}
          onChange={(event) => onInput(event.currentTarget.value)}
          type='text'
          placeholder='Input File Key here...'
          spellCheck={false}
          autoCapitalize='off'
          autoComplete='off'
          autoCorrect='off'
          autoSave='off'
          autoFocus={true}
        />
        <p data-incorrect={error.includes('incorrect')}>{error}</p>
      </label>
      <button className={button} type='submit'>
        Decrypt &amp; Download
      </button>
    </form>
  );
};

async function isKey(keyHash: string, key: Uint8Array) {
  const expected = base64ToUint8Array(keyHash);
  const hash = await Attachment.checksum(key);
  return bufferEqual(expected, hash);
}

export default Password;
