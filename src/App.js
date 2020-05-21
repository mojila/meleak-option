import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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
        <BrowserRouter>
          <Switch>
            {Routes().map((route) => <Route exact component={route.component} path={route.path} />)}
          </Switch>
        </BrowserRouter>
      </CssBaseline>
    </React.Fragment>
  );
}

export default App;
