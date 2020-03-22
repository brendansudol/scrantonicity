import React, { useCallback, useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { useHistory, useLocation } from 'react-router-dom'
import { Box, Button, Flex, Input, Text } from 'theme-ui'

const MAX_RESULTS = 100

export const Search = React.memo(() => {
  const history = useHistory()
  const queryParams = useQuery()
  const query = queryParams.get('q') ?? ''

  const [corpus, setCorpus] = useState(null)
  const [results, setResults] = useState(null)

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/the-office.min.json`)
      .then(response => response.json())
      .then(data => setCorpus(parseData(data)))
  }, [])

  useEffect(
    () => {
      if (!corpus || !query) return
      setResults(getResults(corpus, query))
    },
    [corpus, query]
  )

  const handleSearch = useCallback(
    q => history.push({ search: new URLSearchParams({ q }).toString() }),
    [history]
  )

  return (
    <Box>
      <Searchbox initialValue={query} onSubmit={handleSearch} />
      <ResultList query={query} results={results} />
    </Box>
  )
})

const Searchbox = React.memo(({ initialValue, onSubmit }) => {
  const [query, setQuery] = useState(initialValue)
  const handleChange = useCallback(e => setQuery(e.target.value), [])
  const handleSubmit = useCallback(
    e => {
      e.preventDefault()
      onSubmit(query)
    },
    [query, onSubmit]
  )

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <Flex mx={-2} mb={3} sx={{ alignItems: 'center' }}>
        <Box px={2} sx={{ flex: '1 1 auto' }}>
          <Input
            id="query"
            name="query"
            value={query}
            onChange={handleChange}
          />
        </Box>
        <Box px={2}>
          <Button onClick={() => onSubmit(query)}>Search</Button>
        </Box>
      </Flex>
    </Box>
  )
})

const ResultList = React.memo(({ query, results }) => {
  if (results == null) return null
  const ct = results.length

  return (
    <Box>
      <Text mb={1} sx="heading">
        {ct === MAX_RESULTS ? `${ct}+` : ct} result{ct !== 1 ? 's' : ''}
      </Text>
      {results.map(({ season, episode, title, sceneData }, i) => (
        <Box key={i} mb={3} p={2} bg="#f8f8f8" sx={{ borderRadius: 5 }}>
          <Text mb={2} sx={{ fontWeight: 'bold', fontSize: 18 }}>
            Season {season} Episode {episode} "{title}"
          </Text>
          {sceneData.map((line, j) => (
            <Box key={j} mb={2}>
              <Text variant="heading">{line.speaker}</Text>
              <Highlighter
                searchWords={[cleanQuery(query)]}
                autoEscape={true}
                textToHighlight={line.line}
              />
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  )
})

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function parseData(data) {
  const entries = []

  for (const datum of data) {
    const { id: episodeId, scenes, ...rest } = datum
    for (const [sceneId, sceneData] of scenes.entries()) {
      const sceneLines = sceneData.map(d => cleanText(d.line))
      entries.push({ episodeId, sceneId, sceneData, sceneLines, ...rest })
    }
  }

  return entries
}

function cleanText(text) {
  return text
    .replace(/\[.+\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function cleanQuery(query) {
  return query
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .trim()
}

function getResults(corpus, query) {
  const matches = []
  const re = new RegExp(cleanQuery(query), 'i')

  for (const entry of corpus) {
    const matchedLines = []
    for (const [idx, line] of entry.sceneLines.entries()) {
      if (line.match(re) != null) matchedLines.push(idx)
    }
    if (matchedLines.length > 0) {
      matches.push({ ...entry, matchedLines })
      if (matches.length === MAX_RESULTS) return matches
    }
  }

  return matches
}
