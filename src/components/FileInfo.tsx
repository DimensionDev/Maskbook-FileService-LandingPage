import React from 'react';
import { useMetadata } from '../Metadata';
import { formatFileSize } from '../utils';
import locals from './FileInfo.scss';

export default React.memo(() => {
  const meta = useMetadata();
  return (
    <section className={locals.info}>
      <i className={locals.icon} />
      <p className={locals.name}>{meta.name}</p>
      <p className={locals.meta}>
        <span>{formatFileSize(meta.size)}</span>
        <span>&nbsp;&nbsp;</span>
        <span>{formatDateTime(meta.createdAt)}</span>
      </p>
    </section>
  );
});

function formatDateTime(input?: string) {
  if (input === undefined) {
    return null;
  }
  const pad = (value: number) => value.toString(10).padStart(2, '0');
  const value = new Date(input);
  const date = [value.getFullYear(), value.getMonth() + 1, value.getDate()]
    .map(pad)
    .join('-');
  const time = [value.getHours(), value.getMinutes(), value.getSeconds()]
    .map(pad)
    .join(':');
  return `${date} ${time}`;
}
