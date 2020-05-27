import React, { useReducer, useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider, Reducers, Stores, Actions } from './context';

import Home from './pages/home';
import About from './pages/about';
import Analyze from './pages/analyze';

const Routes = () => ([
  { component: Home, path: '/' },
  { component: Analyze, path: '/analyze' },
  { component: About, path: '/about' },
])

function App() {
  const [store, dispatch] = useReducer(Reducers, Stores)

  const loadPages = async () => {
    let key = 'https://www.tokopedia.com/-pages'
    let pages = await localStorage.getItem(key)

    if (pages) {
      dispatch({ type: Actions.UPDATE_PAGES, payload: { pages: JSON.parse(pages) } })
    }
  }

  useEffect(() => {
    loadPages()
  }, [])

  return (
    <Provider value={{ store, dispatch }}>
      <CssBaseline>
        <HashRouter
          basename="/"
        >
          <Switch>
            {Routes().map((route, index) => <Route exact key={index} component={route.component} path={route.path} />)}
          </Switch>
        </HashRouter>
      </CssBaseline>
    </Provider>
  );
}

export default App;
