import classNames from 'classnames';
import React from 'react';
import { useHistory } from 'react-router';
import { box, button } from './common.scss';
import locals from './Download.scss';

const Download: React.FC = () => {
  const history = useHistory();
  const onStart = () => {
    history.push('/downloading', history.location.state);
  };
  return (
    <section className={box}>
      <button className={classNames(button, locals.download)} onClick={onStart}>
        Download
      </button>
    </section>
  );
};

export default Download;
