import React from 'react'
import { Box, Divider, Text } from 'theme-ui'

export const Footer = React.memo(() => {
  return (
    <Box as="footer" mt={4}>
      <Divider />
      <Text>Footer...</Text>
    </Box>
  )
})
