import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import Highlighter from 'react-highlight-words'
import { useHistory } from 'react-router-dom'
import { Box, Button, Flex, Input, Message, Text } from 'theme-ui'
import { Loading } from '../components/Loading'
import { ScrollToTopButton } from '../components/ScrollToTopButton'
import { AppContext } from '../context'
import { useHash, useQuery } from '../hooks'
import { sanitizeText, wait } from '../utils'

const MAX_RESULTS = 100

export const Search = React.memo(() => {
  const { data } = useContext(AppContext)
  const corpus = data?.sceneData

  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState(null)

  const history = useHistory()
  const hash = useHash()
  const queryParams = useQuery()
  const query = queryParams.get('q') ?? ''

  useEffect(
    () => {
      if (corpus == null || query === '') return
      setIsLoading(true)
      wait(500).then(() => {
        setResults(getResults(corpus, query))
        setIsLoading(false)
      })
    },
    [corpus, query]
  )

  useEffect(
    () => {
      if (results == null || hash === '') return
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    },
    [results, hash]
  )

  const handleSearch = useCallback(
    q => history.push({ search: new URLSearchParams({ q }).toString() }),
    [history]
  )

  return (
    <Box>
      <Helmet>
        <title>Scantonicity :: Search for favorite quotes</title>
      </Helmet>
      <SearchForm initialValue={query} onSubmit={handleSearch} />
      <ResultList query={query} isLoading={isLoading} results={results} />
      <ScrollToTopButton />
    </Box>
  )
})

const SearchForm = React.memo(({ initialValue, onSubmit }) => {
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
    <Box mb={4} as="form" onSubmit={handleSubmit}>
      <Flex mx={-1} sx={{ alignItems: 'center' }}>
        <Box px={1} sx={{ flex: '1 1 auto' }}>
          <Input
            id="query"
            name="query"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
            autoFocus={true}
          />
        </Box>
        <Box px={1}>
          <Button onClick={() => onSubmit(query)}>Search</Button>
        </Box>
      </Flex>
    </Box>
  )
})

const ResultList = React.memo(({ query, isLoading, results }) => {
  if (isLoading) return <Loading />
  if (results == null || query === '') return null

  const ct = results.length
  const highlighterQuery = normalizeQueryForHighlighter(query)

  if (ct === 0) {
    return (
      <Message variant="danger">
        <strong>Sorry!</strong> No results for <em>{query}</em>
      </Message>
    )
  }

  return (
    <Box>
      <Text mb={1}>
        {ct === MAX_RESULTS ? `${ct}+` : ct} result{ct !== 1 ? 's' : ''}
      </Text>
      {results.map(({ season, episode, title, sceneData }, i) => {
        const resultId = `result-${i + 1}`
        return (
          <Box key={resultId} id={resultId} py={1}>
            <Box sx={{ mb: 2, p: 2, bg: '#f8f8f8', borderRadius: 5 }}>
              <Text mb={3} sx={{ fontWeight: 'bold', fontSize: 16 }}>
                "{title}" (Season {season} Episode {episode})
              </Text>
              {sceneData.map((line, j) => (
                <Box key={j} mb={j !== sceneData.length - 1 ? 3 : undefined}>
                  <Text variant="caps" sx={{ fontSize: 12 }}>
                    {line.speaker}
                  </Text>
                  <Highlighter
                    searchWords={[highlighterQuery]}
                    textToHighlight={line.line}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )
      })}
    </Box>
  )
})

function getResults(corpus, query) {
  const matches = []
  const re = new RegExp(sanitizeText(query))

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

function normalizeQueryForHighlighter(query) {
  const words = sanitizeText(query).split(' ')
  return new RegExp(`${words.join('[\\s.?…,–]+')}`)
}
