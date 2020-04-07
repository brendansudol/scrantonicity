import { sampleSize } from "lodash-es"
import React, { useMemo } from "react"
import { Link as RRLink } from "react-router-dom"
import { Box, Card, Image, Link, useColorMode } from "theme-ui"

const NUM_SUGGESTIONS = 3

export const EpisodeEmptyState = React.memo(({ allEpisodes }) => {
  const [mode] = useColorMode()

  const suggestions = useMemo(() => {
    const episodes = sampleSize(allEpisodes, NUM_SUGGESTIONS)
    return episodes.map(({ id, title, season, episode }) => ({
      id,
      title: `${title} (S${season}, E${episode})`,
    }))
  }, [allEpisodes])

  return (
    <Box>
      <Card>
        <Box mr={2} sx={{ display: "inline" }}>
          Select an episode and the full episode script will show up here. A few
          suggestions:
        </Box>
        {suggestions.map(({ id, title }) => (
          <Link
            key={id}
            mr={2}
            sx={{ display: "inline-block", textDecoration: "underline" }}
            as={RRLink}
            to={`/episode/${id}`}
          >
            {title}
          </Link>
        ))}
      </Card>
      {mode === "default" && (
        <Box py={5} sx={{ textAlign: "center" }}>
          <Image
            sx={{ width: 100 }}
            src={`${process.env.PUBLIC_URL}/stars.gif`}
          />
        </Box>
      )}
    </Box>
  )
})
