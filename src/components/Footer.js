import React from "react"
import { Box, Divider, Link } from "theme-ui"

export const Footer = React.memo(() => {
  return (
    <Box as="footer" mt={4}>
      <Divider />
      <Box mx={-2} sx={{ display: [null, "flex"], alignItems: "baseline" }}>
        <Link variant="buttonLink" mr={2} sx={{ fontSize: 4 }} href="#!">
          Link
        </Link>
        <Box sx={{ display: [null, "flex"], alignItems: "baseline" }}>
          <Link variant="buttonLink" href="#!">
            Link
          </Link>
          <Link variant="buttonLink" href="#!">
            Link
          </Link>
        </Box>
        <Box sx={{ mx: "auto" }} />
        <Link variant="buttonLink" href="#!">
          Link
        </Link>
      </Box>
    </Box>
  )
})
