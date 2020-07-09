import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Download from './Download';
import Downloaded from './Downloaded';
import Downloading from './Downloading';
import Error from './Error';
import FileInfo from './FileInfo';
import Footer from './Footer';
import Header from './Header';
import locals from './index.scss';
import Password from './Password';

const Entry: React.FC = () => (
  <main className={locals.container}>
    <Header />
    <section className={locals.box}>
      <FileInfo />
      <Switch>
        <Route path='/password' component={Password} />
        <Route path='/download' component={Download} />
        <Route path='/downloading' component={Downloading} />
        <Route path='/downloaded' component={Downloaded} />
        <Route path='/error' component={Error} />
        <Redirect to='/password' />
      </Switch>
    </section>
    <Footer />
  </main>
);

export default Entry;
