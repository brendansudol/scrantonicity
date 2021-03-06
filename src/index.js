import React from "react"
import { render } from "react-dom"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import smoothScroll from "smoothscroll-polyfill"
import { Box, Container, ThemeProvider } from "theme-ui"
import { Analytics } from "./components/Analytics"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { AppProvider } from "./context"
import { routes } from "./routes"
import { theme } from "./theme"

import "tippy.js/dist/tippy.css"
import "tippy.js/themes/light.css"
import "./index.css"

smoothScroll.polyfill()

const Root = () => (
  <AppProvider>
    <ThemeProvider theme={theme}>
      <Router>
        <Box>
          <Container
            p={3}
            sx={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh",
            }}
          >
            <Header />
            <Box as="main" sx={{ width: "100%", flex: "1 1 auto" }}>
              <Switch>
                {routes.map(({ exact, path, component }, i) => (
                  <Route key={i} {...{ exact, path, component }} />
                ))}
              </Switch>
            </Box>
            <Footer />
          </Container>
          <Analytics />
        </Box>
      </Router>
    </ThemeProvider>
  </AppProvider>
)

render(<Root />, document.getElementById("root"))
