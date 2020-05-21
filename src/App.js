import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';

import Home from './pages/home';
import About from './pages/about';

const Routes = () => ([
  { component: Home, path: '/' },
  { component: About, path: '/about' },
])

function App() {
  return (
    <React.Fragment>
      <CssBaseline>
        <HashRouter
          basename="/"
        >
          <Switch>
            {Routes().map((route) => <Route exact component={route.component} path={route.path} />)}
          </Switch>
        </HashRouter>
      </CssBaseline>
    </React.Fragment>
  );
}

export default App;
