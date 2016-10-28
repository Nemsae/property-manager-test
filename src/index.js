import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Layout from './components/Layout';
import Home from './components/Home';
import TenantPage from './components/TenantPage';
import PropertyPage from './components/PropertyPage';

import './stores/PropertyStore';

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Home} />
      <Route path='tenants' component={TenantPage} />
      <Route path='properties' component={PropertyPage} />
    </Route>
  </Router>,
  document.getElementById('root')
);
