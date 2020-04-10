import React from "react"
import { matchPath, Redirect } from "react-router-dom"
import { Episode } from "./pages/Episode"
import { Random } from "./pages/Random"
import { Search } from "./pages/Search"

// eslint-disable-next-line
const Home = () => <Redirect to="/episode" />

export const routes = [
  {
    path: "/",
    exact: true,
    component: Episode,
  },
  {
    path: "/episode/:id?",
    exact: true,
    component: Episode,
    tab: {
      labelShort: "Episodes",
      labelLong: "Episode scripts",
      href: "/episode",
    },
  },
  {
    path: "/search",
    exact: true,
    component: Search,
    tab: {
      labelShort: "Search",
      labelLong: "Search favorite lines",
      href: "/search",
    },
  },
  {
    path: "/random",
    exact: true,
    component: Random,
    tab: {
      labelShort: "Random",
      labelLong: "Random scene",
      href: "/random",
    },
  },
]

// TODO: clean this tab business up / make more intuitive
export const routesWithTabs = routes.filter((route) => route.tab != null)

export function getActiveTab(path) {
  const paths = routesWithTabs.map((route) => route.path)
  const match = matchPath(path, paths)
  if (match == null) return undefined
  const matchIdx = paths.findIndex((path) => path === match.path)
  return matchIdx >= 0 ? matchIdx : undefined
}
