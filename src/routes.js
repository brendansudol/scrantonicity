import React from 'react'
import { matchPath, Redirect } from 'react-router-dom'
import { Episode } from './pages/Episode'
import { Random } from './pages/Random'
import { Search } from './pages/Search'

const Root = () => <Redirect to="/episode/01-01" />

export const routes = [
  {
    path: '/',
    exact: true,
    component: Root
  },
  {
    path: '/episode/:id?',
    exact: true,
    component: Episode,
    tab: {
      label: 'Episode scripts',
      href: '/episode/01-01'
    }
  },
  {
    path: '/search',
    exact: true,
    component: Search,
    tab: {
      label: 'Search for quotes',
      href: '/search'
    }
  },
  {
    path: '/random',
    exact: true,
    component: Random,
    tab: {
      label: 'Random scene',
      href: '/random'
    }
  }
]

// TODO: clean this tab business up / make more intuitive
export const routesWithTabs = routes.filter(route => route.tab != null)

export function getActiveTab(path) {
  const paths = routesWithTabs.map(route => route.path)
  const match = matchPath(path, paths)
  if (match == null) return undefined
  const matchIdx = paths.findIndex(path => path === match.path)
  return matchIdx >= 0 ? matchIdx : undefined
}
