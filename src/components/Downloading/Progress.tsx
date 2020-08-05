import { formatFileSize } from '@dimensiondev/kit';
import React from 'react';
import { useMetadata } from '../../Metadata';
import locals from './Progress.scss';

interface Props {
  startedAt: number;
  fileSize: number;
  receivedSize: number;
}

export const Progress: React.FC<Props> = (props) => {
  const meta = useMetadata()!;
  let { startedAt, fileSize: size, receivedSize: loaded } = props;
  size = size === 0 ? meta.size : size;
  const width = (loaded / size) * 100;
  const elapsed = (Date.now() - startedAt) / 1000;
  const remaining = (size - loaded) / (elapsed ? loaded / elapsed : 0);
  return (
    <section className={locals.progress}>
      <p className={locals.meta}>
        <span>{formatDuration(remaining)}</span>
        <span>
          {formatFileSize(loaded)}
          {' of '}
          {size === 0 ? 'Unknown Size' : formatFileSize(size)}
        </span>
      </p>
      <p className={locals.bar}>
        <span style={{ width: `${width}%` }} />
      </p>
    </section>
  );
};

const formatDuration = (value: number) => {
  if (!Number.isFinite(value)) {
    return 'Estimating time...';
  } else if (value < 60) {
    return `${value.toFixed(0)}s remaining`;
  }
  return `${Math.trunc(value / 60)}m ${(value % 60).toFixed(0)}s remaining`;
};
