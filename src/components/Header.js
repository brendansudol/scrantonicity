import classNames from 'classnames'
import React from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { Box, Flex, Heading, NavLink } from 'theme-ui'
import { routes } from '../routes'

export const Header = React.memo(() => {
  const { pathname } = useLocation()
  const activeTab = getActiveTab(pathname) ?? 0

  return (
    <Box>
      <Heading>Hello</Heading>
      <Flex as="nav" mb={3}>
        {routes.map(({ tab }, i) => (
          <NavLink
            key={i}
            p={1}
            as={Link}
            to={tab.href}
            className={classNames({ active: i === activeTab })}
          >
            {tab.label}
          </NavLink>
        ))}
      </Flex>
    </Box>
  )
})

function getActiveTab(path, routeData = routes) {
  const allPaths = routeData.map(route => route.path)
  const match = matchPath(path, allPaths)
  const matchIdx = allPaths.findIndex(path => path === match.path)
  return matchIdx >= 0 ? matchIdx : undefined
}
