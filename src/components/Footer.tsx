import React from 'react';

const legal = 'https://partner.maskbook.com/arweave/file-service/';

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
  </nav>
));
