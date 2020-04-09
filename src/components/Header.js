import classNames from "classnames"
import React, { useCallback, useState } from "react"
import { IoMdHelpCircle as HelpIcon } from "react-icons/io"
import { Link as RRLink, useLocation } from "react-router-dom"
import { Box, Flex, IconButton, Image, Link, NavLink, Text } from "theme-ui"
import { getActiveTab, routesWithTabs } from "../routes"
import { ColorModeButton } from "./ColorModeButton"

import { Modal } from "./Modal"

const FALLBACK_TAB_INDEX = 0

export const Header = React.memo(() => {
  const { pathname } = useLocation()
  const activeTab = getActiveTab(pathname) ?? FALLBACK_TAB_INDEX

  const [isModalOpen, setIsModalOpen] = useState(false)
  const handleOpenModal = useCallback(() => setIsModalOpen(true), [])
  const handleCloseModal = useCallback(() => setIsModalOpen(false), [])

  return (
    <Box as="header" mb={4}>
      <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
        <Flex mb={3} sx={{ alignItems: "center" }}>
          <Image
            mr={1}
            src={`${process.env.PUBLIC_URL}/logo.png`}
            variant="avatar"
          />
          <Link
            variant="buttonLink"
            sx={{ px: 1, py: 0, fontSize: 4 }}
            as={RRLink}
            to={"/"}
          >
            Scrantonicity
          </Link>
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
            as={RRLink}
            to={tab.href}
            className={classNames({ active: i === activeTab })}
          >
            <Text variant="smScreen">{tab.labelShort}</Text>
            <Text variant="lgScreen">{tab.labelLong}</Text>
          </NavLink>
        ))}
      </Flex>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Box p={1}>
          Scrantonicity is a little website dedicated to{" "}
          <strong>The Office</strong>. Read full episode scripts, search your
          favorite lines, and share the scenes you love the most.
        </Box>
      </Modal>
    </Box>
  )
})
