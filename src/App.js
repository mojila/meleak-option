import React, { useReducer, useEffect } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider, Reducers, Stores, Actions } from './context';

import Home from './pages/home';
import About from './pages/about';
import Analyze from './pages/analyze';
import DetailAnalyze from './pages/analyze/_index';

const Routes = () => ([
  { component: Home, path: '/' },
  { component: Analyze, path: '/analyze' },
  { component: DetailAnalyze, path: '/analyze/:index' },
  { component: About, path: '/about' },
])

function App() {
  const [store, dispatch] = useReducer(Reducers, Stores)

  const loadPages = async () => {
    let active = localStorage.getItem('meleak-active')
    if (active) {
      await dispatch({ type: Actions.UPDATE_ACTIVE, payload: { active: active } })
      // load info
      let infoKey = `${active}-info`
      let info = localStorage.getItem(infoKey)

      if (info) {
        dispatch({ type: Actions.UPDATE_INFO, payload: { info: JSON.parse(info) } })
      }

      // load pages
      let pagesKey = `${active}-pages`
      let pages = localStorage.getItem(pagesKey)

      if (pages) {
        await dispatch({ type: Actions.UPDATE_PAGES, payload: { pages: JSON.parse(pages) } })
        let pagesJSON = JSON.parse(pages)
        let pageLeaks = []
        let pageScripts = []
        let memoryLeaks = pagesJSON.map((d) => {
          let leaksKey = `${d}-leak`
          let scriptsKey = `${d}-scripts`
          let leaks = localStorage.getItem(leaksKey)
          let scripts = localStorage.getItem(scriptsKey)

          if (scripts) {
            pageScripts.push({
              page: d,
              scripts: JSON.parse(scripts)
            })
          }

          if (leaks) {
            pageLeaks.push({
              page: d,
              leaks: JSON.parse(leaks)
            })
            return JSON.parse(leaks)
          }

          return []
        }).filter((x) => x).flat()
        await dispatch({ type: Actions.UPDATE_LEAKS, payload: { leaks: memoryLeaks } })
        await dispatch({ type: Actions.UPDATE_PAGE_LEAKS, payload: { page_leaks: pageLeaks } })
        await dispatch({ type: Actions.UPDATE_PAGE_SCRIPTS, payload: { page_scripts: pageScripts } })
      }
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
