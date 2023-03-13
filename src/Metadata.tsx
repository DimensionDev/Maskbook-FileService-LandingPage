import React, { useContext } from 'react';
import { box } from './components/common.scss';
import { recoverFile } from './utils/recoverFile';

export interface Metadata {
  name: string;
  size: number;
  link: string;
  provider: string;
  mime: string;
  signed: [string, string];
  createdAt: string;
}

const Metadata = React.createContext<Metadata | undefined>(undefined);

export const MetadataProvider: React.FC = ({ children }) => {
  const [value, setValue] = React.useState<Metadata>();
  React.useEffect(() => {
    const query = new URLSearchParams(location.search);
    const url = query.get('url');
    if (url) {
      recoverFile(url).then(setValue);
    } else {
      const element = document.getElementById('metadata');
      const payload = element!.textContent!.trim();
      element?.remove();
      setValue(JSON.parse(payload));
    }
  }, []);
  if (value === undefined) {
    return (
      <section className={box}>
        <span> ⌛ processing...</span>
      </section>
    );
  }
  return <Metadata.Provider value={value} children={children} />;
};

export const useMetadata = () => useContext(Metadata)!;
