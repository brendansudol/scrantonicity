import Tippy from '@tippyjs/react'
import React from 'react'
import {
  FiLink as LinkIcon,
  FiTwitter as TwitterIcon,
  FiMoreHorizontal as ShareIcon
} from 'react-icons/fi'
import { Box, Flex, IconButton, Text, useColorMode } from 'theme-ui'

export const Share = React.memo(() => {
  const [mode] = useColorMode()
  const theme = mode === 'dark' ? '' : 'light'

  return (
    <Box>
      <Tippy
        theme={theme}
        trigger="click"
        interactive={true}
        interactiveBorder={30}
        content={<ShareInner />}
      >
        <IconButton variant="iconSm">
          <ShareIcon size={16} />
        </IconButton>
      </Tippy>
    </Box>
  )
})

const ShareInner = () => (
  <Box>
    <Text>Share...</Text>
    <Flex>
      <IconButton mr={1} variant="iconSm">
        <TwitterIcon size={14} />
      </IconButton>
      <IconButton variant="iconSm">
        <LinkIcon size={14} />
      </IconButton>
    </Flex>
  </Box>
)
