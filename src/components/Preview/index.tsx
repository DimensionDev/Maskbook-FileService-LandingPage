import React from 'react';
import ReactDOM from 'react-dom';
import Window from './Window';
import locals from './Window.scss';

interface Props {
  blob: Blob;
  name: string;
  hidden: boolean;
  onClose(): void;
}

const Preview: React.FC<Props> = (props) => {
  const ref = React.useRef(document.createElement('main'));
  ref.current.className = locals.portal;
  ref.current.hidden = props.hidden;
  React.useEffect(() => {
    document.body.appendChild(ref.current);
    return () => {
      document.body.removeChild(ref.current);
    };
  }, []);
  return ReactDOM.createPortal(
    <Window blob={props.blob} name={props.name} onClose={props.onClose} />,
    ref.current,
  );
};

export default Preview;
