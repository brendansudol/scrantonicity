import React from 'react'
import { Box, Text } from 'theme-ui'

export const SceneLines = React.memo(({ scene }) => {
  return (
    <React.Fragment>
      {scene.map(({ line, speaker }, i) => (
        <Box key={i} mb={i !== scene.length - 1 ? 3 : undefined}>
          <Text variant="caps" sx={{ fontSize: 12 }}>
            {speaker}
          </Text>
          <Text>{line}</Text>
        </Box>
      ))}
    </React.Fragment>
  )
})
