import { Episode } from './pages/Episode'
import { Random } from './pages/Random'
import { Search } from './pages/Search'

export const routes = [
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
