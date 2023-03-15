import React, { useContext, useEffect, useLayoutEffect } from 'react';
import { box } from './components/common.scss';
import { getProviderName } from './utils';
import { recoverFile } from './utils/recoverFile';

export interface Metadata {
  name: string;
  size: number;
  link: string;
  provider: 'ipfs' | 'arweave';
  mime: string;
  signed: [string, string] | string;
  createdAt: string;
}

const Metadata = React.createContext<Metadata | undefined>(undefined);

export const MetadataProvider: React.FC = ({ children }) => {
  const [value, setValue] = React.useState<Metadata>();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const url = query.get('url');
    if (url) {
      recoverFile(decodeURIComponent(url)).then(setValue);
    } else {
      const element = document.getElementById('metadata');
      const payload = element!.textContent!.trim();
      element?.remove();
      setValue(JSON.parse(payload));
    }
  }, []);

  useLayoutEffect(() => {
    if (!value?.provider) return;
    const name = getProviderName(value.provider);
    const title = `Mask File Service | ${name}`;
    if (title !== document.title) {
      document.title = title;
    }
  }, [value?.provider]);

  if (value === undefined) {
    return (
      <section className={box}>
        <h1> ⌛ processing... </h1>
      </section>
    );
  }
  return <Metadata.Provider value={value} children={children} />;
};

export const useMetadata = () => useContext(Metadata)!;
