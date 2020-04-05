import React from "react"
import { Link as RRLink } from "react-router-dom"
import { Box, Divider, Link } from "theme-ui"
import { routesWithTabs } from "../routes"

export const Footer = React.memo(() => {
  return (
    <Box as="footer" mt={4}>
      <Divider />
      <Box mx={-2} sx={{ display: [null, "flex"], alignItems: "baseline" }}>
        <Link variant="buttonLink" sx={{ fontSize: 3 }} as={RRLink} to="/">
          Scrantonicity
        </Link>
        <Box sx={{ display: [null, "flex"], alignItems: "baseline" }}>
          {routesWithTabs.map(({ tab }, i) => (
            <Link
              key={i}
              variant="buttonLink"
              sx={{ fontSize: 1 }}
              as={RRLink}
              to={tab.href}
            >
              {tab.labelShort}
            </Link>
          ))}
        </Box>
        <Box sx={{ mx: "auto" }} />
        <Link
          variant="buttonLink"
          sx={{ fontSize: 1 }}
          target="_blank"
          href="https://twitter.com/brensudol"
        >
          Made by @brensudol
        </Link>
      </Box>
    </Box>
  )
})
