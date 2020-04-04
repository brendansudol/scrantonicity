import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { useHistory, useParams } from 'react-router-dom'
import { Box, Card, Select } from 'theme-ui'
import { Loading } from '../components/Loading'
import { SceneLines } from '../components/SceneLines'
import { Share } from '../components/Share'
import { ScrollToTopButton } from '../components/ScrollToTopButton'
import { AppContext } from '../context'
import { useHash } from '../hooks'

export const Episode = React.memo(() => {
  const { data } = useContext(AppContext)
  const episodeData = data?.episodeData

  const history = useHistory()
  const hash = useHash()
  const { id } = useParams()
  const episodeId = id ?? ''

  useEffect(
    () => {
      if (episodeData == null || hash === '') return
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    },
    [episodeData, hash]
  )

  const episode = useMemo(
    () => {
      if (episodeData == null || episodeId == null) return
      return episodeData.find(d => d.id === episodeId)
    },
    [episodeData, episodeId]
  )

  const episodeOptions = useMemo(
    () => {
      if (episodeData == null) return []
      return episodeData.map(d => ({
        value: d.id,
        label: `${d.season}-${d.episode} ${d.title}`
      }))
    },
    [episodeData]
  )

  const handleEpisodeChange = useCallback(
    e => history.push(`/episode/${e.target.value}`),
    [history]
  )

  if (!episodeData) return <Loading />

  return (
    <Box>
      <Helmet>
        <title>Scantonicity :: Read episode scripts</title>
      </Helmet>
      <Box mb={3}>
        <Select
          name="episode"
          value={episodeId}
          onChange={handleEpisodeChange}
          autoFocus={true}
        >
          <option value="">Select an episode</option>
          {episodeOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
      </Box>
      {episode != null && (
        <Box>
          {episode.scenes.map((scene, i) => {
            const sceneId = `scene-${i + 1}`
            const borderColor = hash === sceneId ? 'darken' : undefined
            return (
              <Box key={sceneId} id={sceneId} py={1}>
                <Card mb={2} sx={{ position: 'relative', borderColor }}>
                  <Box m={1} sx={{ position: 'absolute', top: 0, right: 0 }}>
                    <Share
                      hash={sceneId}
                      message={getShareMessage(episode, scene)}
                    />
                  </Box>
                  <SceneLines scene={scene} />
                </Card>
              </Box>
            )
          })}
        </Box>
      )}
      <ScrollToTopButton />
    </Box>
  )
})

// TODO: make message sound more gooder
function getShareMessage(episodeData, _scene) {
  const { season, episode, title } = episodeData
  return `The Office - "${title}" (S${season}, E${episode}), via Scrantonicity`
}
