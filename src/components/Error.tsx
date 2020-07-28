import classNames from 'classnames';
import React from 'react';
import { useLocation, useHistory } from 'react-router';
import { box } from './common.scss';
import locals from './Error.scss';

const Error: React.FC = () => {
  const history = useHistory();
  const location = useLocation<any>();
  const type = location.state?.type;
  const message = location.state?.message;
  const onClick = () => {
    const key = location.state?.key;
    if (type === 'network') {
      history.push('/downloading', { key });
    }
  };
  return (
    <section className={classNames(box, locals.error)} onClick={onClick}>
      Error: Cannot {type} file.
      <br />
      {message}
    </section>
  );
};

export default Error;
