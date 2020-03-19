import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { Box, Text } from 'rebass'
import { Label, Select } from '@rebass/forms'

export const EpisodePage = React.memo(() => {
  const [data, setData] = useState(null)

  const history = useHistory()
  const location = useLocation()
  const { id } = useParams()

  const episodeId = id ?? ''
  const hash = location.hash.slice(1)

  useEffect(() => {
    function maybeScrollToScene() {
      if (!hash) return
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }

    fetch(`${process.env.PUBLIC_URL}/data/the-office.min.json`)
      .then(response => response.json())
      .then(setData)
      .then(maybeScrollToScene)

    // eslint-disable-next-line
  }, [])

  const handleChange = useCallback(
    e => history.push(`/episode/${e.target.value}`),
    [history]
  )

  const episode = useMemo(
    () => {
      if (data == null || episodeId == null) return
      return data.find(d => d.id === episodeId)
    },
    [data, episodeId]
  )

  if (!data) return 'Loading...'

  return (
    <Box sx={{ mx: 'auto', p: 3, maxWidth: 512, fontFamily: 'athelas, serif' }}>
      <Box mb={3}>
        <Label htmlFor="episode">Episode</Label>
        <Select
          id="episode"
          name="episode"
          onChange={handleChange}
          value={episodeId}
        >
          <option value="">---</option>
          {data.map((d, i) => (
            <option key={i} value={d.id}>
              {d.season}.{d.episode} {d.title}
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
              <Box key={sceneId} id={sceneId} py={2}>
                <Box
                  sx={{ mb: 2, p: 2, bg: '#f8f8f8', borderRadius: 5, border }}
                >
                  {scene.map((line, j) => (
                    <Box key={j} mb={2}>
                      <Text fontWeight="bold">{line.speaker}</Text>
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
