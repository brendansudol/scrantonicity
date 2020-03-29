import React, { useCallback } from 'react'
import { IoMdSunny } from 'react-icons/io'
import { Box, IconButton, useColorMode } from 'theme-ui'

export const ColorModeToggle = React.memo(() => {
  // eslint-disable-next-line no-unused-vars
  const [_, setColorMode] = useColorMode()

  const handleClick = useCallback(
    () => setColorMode(prev => (prev === 'default' ? 'dark' : 'default')),
    [setColorMode]
  )

  return (
    <Box m={2} sx={{ position: 'fixed', top: 0, right: 0 }}>
      <IconButton onClick={handleClick}>
        <IoMdSunny size={24} />
      </IconButton>
    </Box>
  )
})
