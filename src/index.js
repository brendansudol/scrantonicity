import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container, ThemeProvider } from 'theme-ui'
import { Header } from './components/Header'
import { AppProvider } from './context'
import { routes } from './routes'
import { theme } from './theme'
import './index.css'

const Root = () => (
  <AppProvider>
    <ThemeProvider theme={theme}>
      <Router>
        <Container p={2} sx={{ fontFamily: 'athelas, georgia, serif' }}>
          <Header />
          <Switch>
            {routes.map(({ exact, path, component }, i) => (
              <Route key={i} {...{ exact, path, component }} />
            ))}
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  </AppProvider>
)

render(<Root />, document.getElementById('root'))
