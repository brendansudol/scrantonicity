import classNames from 'classnames'
import React, { useCallback, useState } from 'react'
import { IoMdHelpCircle as HelpIcon } from 'react-icons/io'
import { Link, useLocation } from 'react-router-dom'
import { Box, Flex, Heading, IconButton, Image, NavLink } from 'theme-ui'
import { getActiveTab, routesWithTabs } from '../routes'
import { ColorModeButton } from './ColorModeButton'

import { Modal } from './Modal'

export const Header = React.memo(() => {
  const { pathname } = useLocation()
  const activeTab = getActiveTab(pathname) ?? 0

  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = useCallback(() => setIsModalOpen(true), [])
  const handleCloseModal = useCallback(() => setIsModalOpen(false), [])

  return (
    <Box as="header" mb={4}>
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Flex mb={3} sx={{ alignItems: 'center' }}>
          <Image
            mr={2}
            src={`${process.env.PUBLIC_URL}/logo.png`}
            variant="avatar"
          />
          <Heading>Scrantonicity</Heading>
        </Flex>
        <Box>
          <IconButton mr={2} onClick={handleOpenModal}>
            <HelpIcon size={18} />
          </IconButton>
          <ColorModeButton />
        </Box>
      </Flex>
      <Flex as="nav">
        {routesWithTabs.map(({ tab }, i) => (
          <NavLink
            key={i}
            as={Link}
            to={tab.href}
            className={classNames({ active: i === activeTab })}
          >
            {tab.label}
          </NavLink>
        ))}
      </Flex>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Box>Stay tuned!</Box>
      </Modal>
    </Box>
  )
})
