import React, { useEffect, useState } from 'react'
import { Box, Button, Text } from 'rebass'

const App = React.memo(() => {
  const [data, setData] = useState(null)
  const [scene, setScene] = useState(null)

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/the-office.min.json`)
      .then(response => response.json())
      .then(data => {
        setData(data)
        setScene(getRandomScene(data))
      })
  }, [])

  function handleRefresh() {
    setScene(getRandomScene(data))
  }

  if (!scene) return null

  const { season, episode, title, scene: lineData } = scene

  return (
    <Box sx={{ mx: 'auto', p: 3, maxWidth: 512, fontFamily: 'athelas, serif' }}>
      <Box mb={3}>
        <Box mb={3}>
          {lineData.map((datum, idx) => (
            <Box key={idx} mb={2}>
              <Text fontWeight="bold">{datum.speaker}</Text>
              <Text>{datum.line}</Text>
            </Box>
          ))}
        </Box>
        <Text fontStyle="italic" fontSize={14}>
          – {title} (Season {season}, Episode {episode})
        </Text>
      </Box>
      <Button
        sx={{ px: 2, py: 1, bg: 'tomato', fontSize: 12, fontWeight: 'bold' }}
        onClick={handleRefresh}
      >
        Primary
      </Button>
    </Box>
  )
})

function getRandomScene(data) {
  const randomEpisode = sample(data)
  const { season, episode, title, scenes } = randomEpisode
  const randomScene = sample(scenes)
  return { season, episode, title, scene: randomScene }
}

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default App
