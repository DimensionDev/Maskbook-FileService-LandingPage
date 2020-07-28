import ready from 'domready';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';

import Entry from './components';
import 'normalize.css/normalize.css';
import './upgrade.css';
import locals from './base.scss';
import { MetadataProvider } from './Metadata';

ready(() => {
  const entry = (
    <MetadataProvider>
      <MemoryRouter>
        <Entry />
      </MemoryRouter>
    </MetadataProvider>
  );

  const container = document.createElement('main');
  container.className = locals.container;
  ReactDOM.render(entry, container, () => {
    document.body = document.createElement('body');
    document.body.appendChild(container);
  });
});
