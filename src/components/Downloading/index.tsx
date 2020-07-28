import { Attachment } from '@dimensiondev/common-protocols';
import classNames from 'classnames';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { useMetadata } from '../../Metadata';
import { box, button } from '../common.scss';
import { useDownload } from './hooks';
import locals from './index.scss';
import { Progress } from './Progress';

const Downloading: React.FC = () => {
  const metadata = useMetadata();
  const history = useHistory();
  const location = useLocation<{ key: Uint8Array | undefined }>();
  const [startedAt, onStartedAt] = React.useState(0);
  const [fileSize, onFileSize] = React.useState(0);
  const [receivedSize, onReceivedSize] = React.useState(0);
  useDownload(
    {
      link: metadata.link,
      onFileSize,
      onReceivedSize,
      onStartedAt,
      async onChunk(encoded) {
        const key = location.state?.key;
        try {
          const input = await Attachment.decode(key, encoded);
          history.push('/downloaded', {
            name: metadata.name,
            blob: new Blob([input.block], { type: input.mime }),
          });
        } catch {
          history.push('/error', {
            type: 'save',
            message: 'Decyption failed.',
            key,
          });
        }
      },
      onNetworkError(error) {
        history.push('/error', {
          type: 'download',
          message: error.message,
          key: location.state?.key,
        });
      },
    },
    [],
  );
  return (
    <section className={box}>
      <Progress
        startedAt={startedAt}
        fileSize={fileSize}
        receivedSize={receivedSize}
      />
      <a className={classNames(button, locals.downloading)}>Downloading...</a>
    </section>
  );
};

export default Downloading;
