import React from 'react';
import locals from './index.scss';

const legal = 'https://legal.maskbook.com/arweave/file-service/';
const repo = `https://github.com/DimensionDev/Maskbook-FileService-LandingPage/tree/${process.env.COMMIT_HASH}`;

export default React.memo(() => (
  <nav>
    <b>
      Maskbook
      <span> - </span>
      <i>Make Privacy Protected Again</i>
    </b>
    <a href={legal} target='_blank'>
      Legal Documents (Privacy, Copyright, etc)
    </a>
    <a className={locals.hidden} href={repo}>
      Generated on {process.env.COMMIT_DATE}
    </a>
  </nav>
));
