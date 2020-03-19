import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { EpisodePage } from './components/EpisodePage'
import { RandomPage } from './components/RandomPage'
import { SearchPage } from './components/SearchPage'

import './index.css'

const Root = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/episode/01-01">Scripts</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/random">Random</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/episode/:id?" component={EpisodePage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/random" component={RandomPage} />
      </Switch>
    </div>
  </Router>
)

render(<Root />, document.getElementById('root'))
