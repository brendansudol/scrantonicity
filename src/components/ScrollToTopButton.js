import React, { useCallback, useEffect, useState } from "react"
import { FiArrowUpCircle } from "react-icons/fi"
import { useWindowScroll } from "react-use"
import { Box, IconButton } from "theme-ui"

const VISIBILITY_THRESHOLD_PX = 1000

export const ScrollToTopButton = React.memo(() => {
  const [isVisible, setIsVisible] = useState(false)
  const { y } = useWindowScroll()

  useEffect(() => {
    if (y < VISIBILITY_THRESHOLD_PX && isVisible) setIsVisible(false)
    else if (y >= VISIBILITY_THRESHOLD_PX && !isVisible) setIsVisible(true)
  }, [isVisible, y])

  const handleScrollToTop = useCallback(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    []
  )

  if (!isVisible) return null

  return (
    <Box m={2} sx={{ position: "fixed", bottom: 0, right: 0 }}>
      <IconButton onClick={handleScrollToTop} sx={{ width: 30, height: 30 }}>
        <FiArrowUpCircle size={24} />
      </IconButton>
    </Box>
  )
})
