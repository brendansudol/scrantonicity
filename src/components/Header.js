import classNames from 'classnames'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, Flex, Heading, Image, NavLink } from 'theme-ui'
import { getActiveTab, routesWithTabs } from '../routes'

export const Header = React.memo(() => {
  const { pathname } = useLocation()
  const activeTab = getActiveTab(pathname) ?? 0

  return (
    <Box>
      <Flex mb={3} sx={{ alignItems: 'center' }}>
        <Image src={`${process.env.PUBLIC_URL}/logo.png`} variant="avatar" />
        <Heading ml={2}>Scrantonicity</Heading>
      </Flex>
      <Flex as="nav" mb={3}>
        {routesWithTabs.map(({ tab }, i) => (
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
