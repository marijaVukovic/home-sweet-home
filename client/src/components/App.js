import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './dashboard/Dashboard';
import SignIn from './auth/SignIn';
import CheckIn from './check-in/CheckIn';
import Routes from '../lib/routes';

const App = () => (
  <div className='app-wrapper'>
    <HashRouter>
      <Switch>
        <Route exact path={Routes.Home} component={CheckIn} />
        <Route exact path={Routes.SignIn} component={SignIn} />
        <PrivateRoute exact path={Routes.Guests} component={Dashboard} />
        <Route component={() => 'Page not found'} />
      </Switch>
    </HashRouter>
  </div>
);

export default App;
