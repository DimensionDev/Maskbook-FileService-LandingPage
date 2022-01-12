import React from 'react';
import locals from './index.scss';
import { useMetadata } from '../Metadata';

const legal = 'https://legal.mask.io/arweave/file-service/';
const repo = `https://github.com/DimensionDev/Maskbook-FileService-LandingPage/tree/${process.env.COMMIT_HASH}`;
const defaultPrivacyLink = 'https://legal.mask.io/maskbook/privacy-policy-browser.html';

export default React.memo(() => {
  const meta = useMetadata();
  const privacyLink = !meta.provider ? legal : meta.provider === 'arweave' ? legal : defaultPrivacyLink;
  return (
    <nav>
      <a href={privacyLink} target='_blank'>
        Legal Documents (Privacy, Copyright, etc)
      </a>
      <a className={locals.hidden} href={repo}>
        Generator version {process.env.COMMIT_DATE}
      </a>
    </nav>
  ))
};
