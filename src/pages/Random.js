import React, { useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { Box, Button, Card, Text } from "theme-ui"
import { Loading } from "../components/Loading"
import { SceneLines } from "../components/SceneLines"
import { AppContext } from "../context"

export const Random = React.memo(() => {
  const { data } = useContext(AppContext)
  const episodeData = data?.episodeData
  const [scene, setScene] = useState(null)

  useEffect(() => {
    if (episodeData == null) return
    setScene(getRandomScene(episodeData))
  }, [episodeData])

  function handleRefresh() {
    setScene(getRandomScene(episodeData))
  }

  if (!scene) return <Loading />

  const { season, episode, title, sceneLines } = scene

  return (
    <Box>
      <Helmet>
        <title>Scantonicity :: Random scene</title>
      </Helmet>
      <Card mb={3}>
        <Box mb={3}>
          <SceneLines scene={sceneLines} />
        </Box>
        <Text sx={{ fontStyle: "italic", fontSize: 14 }}>
          "{title}" (S{season}, E{episode})
        </Text>
      </Card>
      <Button
        sx={{ px: 2, py: 1, bg: "tomato", fontSize: 12, fontWeight: "bold" }}
        onClick={handleRefresh}
      >
        Refresh
      </Button>
    </Box>
  )
})

function getRandomScene(episodeData) {
  const randomEpisode = sample(episodeData)
  const { season, episode, title, scenes } = randomEpisode
  const randomScene = sample(scenes)
  return { season, episode, title, sceneLines: randomScene }
}

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
