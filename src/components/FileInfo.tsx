import React from 'react';
import { formatFileSize, useMetadata } from '../utils';
import locals from './FileInfo.scss';

export default React.memo(() => {
  const metedata = useMetadata();
  return (
    <section className={locals.info}>
      <i className={locals.icon} />
      <p className={locals.name}>
        {`${metedata?.name} (${formatFileSize(metedata?.size)})`}
      </p>
    </section>
  );
});
