import React, { useCallback, useEffect, useState } from 'react'
import { Box, Button, Flex, Text } from 'rebass'
import { Label, Input } from '@rebass/forms'

export const SearchPage = React.memo(() => {
  const [data, setData] = useState(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/the-office.min.json`)
      .then(response => response.json())
      .then(setData)
  }, [])

  const handleQueryChange = useCallback(e => setQuery(e.target.value), [])

  function handleSearch() {
    setResults(getResults(data, query))
  }

  if (!data) return null

  return (
    <Box sx={{ mx: 'auto', p: 3, maxWidth: 512, fontFamily: 'athelas, serif' }}>
      <Flex mx={-2} mb={3}>
        <Box width={3 / 4} px={2}>
          <Label htmlFor="query" className="hide">
            Query
          </Label>
          <Input id="query" name="query" onChange={handleQueryChange} />
        </Box>
        <Box width={1 / 4} px={2} ml="auto">
          <Button bg="tomato" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Flex>
      <ResultList results={results} />
    </Box>
  )
})

const ResultList = React.memo(({ results }) => {
  if (results == null) return null

  return (
    <Box>
      <Text mb={1}>
        {results.length} result{results.length !== 1 ? 's' : ''}
      </Text>
      {results.map(({ season, episode, title, scene }, i) => (
        <Box key={i} mb={3} p={2} bg="#f8f8f8" sx={{ borderRadius: 5 }}>
          <Text mb={2} fontWeight="bold" fontSize={20}>
            Season {season} Episode {episode} "{title}"
          </Text>
          {scene.map((line, j) => (
            <Box key={j} mb={2}>
              <Text fontWeight="bold">{line.speaker}</Text>
              <Text>{line.line}</Text>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
})

function getResults(data, query) {
  const matches = []
  const re = new RegExp(query, 'i')

  for (const datum of data) {
    const { id: episodeId, scenes, ...rest } = datum
    for (const [sceneId, scene] of scenes.entries()) {
      const sceneLines = scene.map(d => d.line)
      const containsQuery = sceneLines.some(line => line.match(re) != null)
      if (containsQuery) {
        matches.push({ ...rest, episodeId, sceneId, scene })
      }
    }
  }

  return matches
}
