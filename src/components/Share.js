import Tippy from "@tippyjs/react"
import React, { useCallback, useMemo, useState } from "react"
import {
  FiLink as LinkIcon,
  FiTwitter as TwitterIcon,
  FiMoreHorizontal as ShareIcon,
} from "react-icons/fi"
import { IoIosClose as CloseIcon } from "react-icons/io"
import { useHistory, useLocation } from "react-router-dom"
import { Box, Flex, IconButton, Text, useColorMode } from "theme-ui"

export const Share = React.memo(({ hash, message }) => {
  const [mode] = useColorMode()
  const theme = mode === "dark" ? "" : "light"

  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const handleHidePopover = useCallback(() => setIsPopoverVisible(false), [])
  const handleShowPopover = useCallback(() => setIsPopoverVisible(true), [])

  const { pathname, search } = useLocation()
  const history = useHistory()

  const handleLinkClick = useCallback(() => {
    history.push({ hash, search })
    handleHidePopover()
  }, [history, hash, handleHidePopover, search])

  const tweetUrl = useMemo(() => {
    const url = `${window.location.origin}${pathname}#${hash}`
    const params = `text=${encode(message)}&url=${encode(url)}`
    return `https://twitter.com/intent/tweet?${params}`
  }, [hash, message, pathname])

  return (
    <Box>
      <Tippy
        theme={theme}
        interactive={true}
        visible={isPopoverVisible}
        onClickOutside={handleHidePopover}
        content={
          <PopoverContent
            tweetUrl={tweetUrl}
            onLinkClick={handleLinkClick}
            onClose={handleHidePopover}
          />
        }
      >
        <IconButton variant="iconSm" onClick={handleShowPopover}>
          <ShareIcon size={16} />
        </IconButton>
      </Tippy>
    </Box>
  )
})

const PopoverContent = React.memo(({ tweetUrl, onLinkClick, onClose }) => {
  return (
    <Box p={1} sx={{ width: 150 }}>
      <IconButton
        variant="iconSm"
        sx={{ m: 1, position: "absolute", top: 0, right: 0 }}
        onClick={onClose}
      >
        <CloseIcon size={16} />
      </IconButton>
      <Text mb={2} sx={{ fontWeight: "bold", textAlign: "center" }}>
        Share via:
      </Text>
      <Flex>
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <IconButton onClick={onLinkClick}>
            <LinkIcon size={16} />
          </IconButton>
          <Text sx={{ fontSize: 12 }}>Permalink</Text>
        </Box>
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <IconButton as="a" target="_blank" href={tweetUrl}>
            <TwitterIcon size={16} />
          </IconButton>
          <Text sx={{ fontSize: 12 }}>Twitter</Text>
        </Box>
      </Flex>
    </Box>
  )
})

const encode = (txt) => encodeURIComponent(txt)
