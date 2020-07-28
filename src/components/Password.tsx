import classNames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router';
import usePromise from 'react-use-promise';
import { Metadata, useMetadata } from '../Metadata';
import {
  base64ToUint8Array,
  encodeText,
  useMessage,
  useTimeout,
} from '../utils';
import { box, button } from './common.scss';
import locals from './Password.scss';

const INPUT_NAME = 'file-key';
const MESSAGE_TRYING = 'Trying to retrieve automatically...';
const MESSAGE_FAILED = 'File Key incorrect, try another';

const Password: React.FC = () => {
  const meta = useMetadata();
  const history = useHistory();
  const [error, setError] = React.useState(MESSAGE_TRYING);
  const [userKey, setUserKey] = React.useState(location.hash.slice(1));
  usePromise(async () => {
    const key = encodeText(userKey);
    if (meta.signed === null) {
      history.push('/download');
    } else if (userKey.length === 0) {
      return;
    } else if (await verify(meta, key)) {
      history.push('/downloading', { key });
    } else {
      setError(MESSAGE_FAILED);
    }
  }, [userKey]);
  useMessage((event) => setUserKey(String(event.data)));
  useTimeout(() => setError(`${MESSAGE_TRYING} Not Found.`), 20 * 1000);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const element = event.currentTarget.elements.namedItem(INPUT_NAME);
    if (element instanceof HTMLInputElement) {
      setUserKey(element.value);
    }
  };

  return (
    <form className={classNames(box, locals.form)} onSubmit={onSubmit}>
      <label>
        <input
          name={INPUT_NAME}
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

async function verify(meta: Metadata, fileKey: Uint8Array) {
  const [signed, keyData] = meta.signed.map(base64ToUint8Array);
  const algo: HmacImportParams = { name: 'HMAC', hash: { name: 'SHA-256' } };
  const usages: KeyUsage[] = ['sign', 'verify'];
  const key = await crypto.subtle.importKey('raw', keyData, algo, true, usages);
  return crypto.subtle.verify(algo, key, signed, fileKey);
}

export default Password;
