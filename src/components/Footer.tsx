import React from 'react';
import locals from './index.scss';

const legal = 'https://legal.maskbook.com/arweave/file-service/';
const repo = `https://github.com/DimensionDev/Maskbook-FileService-LandingPage/tree/${process.env.COMMIT_HASH}`;

export default React.memo(() => (
  <nav>
    <a href={legal} target='_blank'>
      Legal Documents (Privacy, Copyright, etc)
    </a>
    <a className={locals.hidden} href={repo}>
      Generator version {process.env.COMMIT_DATE}
    </a>
  </nav>
));
