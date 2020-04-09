import React, { useCallback, useMemo } from "react"
import { IoMdMoon as Moon, IoMdSunny as Sunny } from "react-icons/io"
import { IconButton, useColorMode } from "theme-ui"

export const ColorModeButton = React.memo(() => {
  const [mode, setMode] = useColorMode()
  const Icon = useMemo(() => (mode === "default" ? Moon : Sunny), [mode])
  const handleClick = useCallback(
    () => setMode((prev) => (prev === "default" ? "dark" : "default")),
    [setMode]
  )

  return (
    <IconButton onClick={handleClick}>
      <Icon size={18} />
    </IconButton>
  )
})
