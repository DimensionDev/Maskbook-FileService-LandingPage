import React from 'react';
import { useMetadata } from '../Metadata';
import { getProviderName } from '../utils';

export default () => {
  const metadata = useMetadata();
  const providerName = getProviderName(metadata.provider);
  return (
    <h1>
      Mask File Service
      <span>Over {providerName} Blockchain Solutions</span>
    </h1>
  );
};
