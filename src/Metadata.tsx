import React, { useContext } from 'react';

export interface Metadata {
  name: string;
  size: number;
  link: string;
  mime: string;
  signed: [string, string];
  createdAt: string;
}

const Metadata = React.createContext<Metadata | undefined>(undefined);

export const MetadataProvider: React.FC = ({ children }) => {
  const [value, setValue] = React.useState<Metadata>();
  React.useEffect(() => {
    const element = document.getElementById('metadata');
    const payload = element!.textContent!.trim();
    element?.remove();
    setValue(JSON.parse(payload));
  }, []);
  if (value === undefined) {
    return null;
  }
  return <Metadata.Provider value={value} children={children} />;
};

export const useMetadata = () => useContext(Metadata)!;
