import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Box, Label, Select, Text } from 'theme-ui'
import { Loading } from '../components/Loading'
import { AppContext } from '../context'

export const Episode = React.memo(() => {
  const { data } = useContext(AppContext)
  const episodeData = data?.episodeData

  const history = useHistory()
  const location = useLocation()
  const { id } = useParams()
  const episodeId = id ?? ''
  const hash = location.hash.slice(1)

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
      <Box mb={3}>
        <Label htmlFor="episode">Episode</Label>
        <Select name="episode" value={episodeId} onChange={handleEpisodeChange}>
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
            const border = hash === sceneId ? '2px solid #e4e4e4' : undefined
            return (
              <Box key={sceneId} id={sceneId} py={1}>
                <Box
                  sx={{ mb: 2, p: 2, bg: '#f8f8f8', borderRadius: 5, border }}
                >
                  {scene.map((line, j) => (
                    <Box key={j} mb={2}>
                      <Text variant="heading">{line.speaker}</Text>
                      <Text>{line.line}</Text>
                    </Box>
                  ))}
                </Box>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
})
