import React, { createContext, useEffect, useState } from 'react'

export const AppContext = createContext()

const { Provider } = AppContext

export const AppProvider = React.memo(({ children }) => {
  const [data, setData] = useState(undefined)

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/the-office.min.json`)
      .then(response => response.json())
      .then(episodeData => {
        const sceneData = getSceneData(episodeData)
        setData({ episodeData, sceneData })
      })
  }, [])

  return <Provider value={{ data }}>{children}</Provider>
})

function getSceneData(episodeData) {
  const entries = []
  for (const datum of episodeData) {
    const { id: episodeId, scenes, ...rest } = datum
    for (const [sceneId, sceneData] of scenes.entries()) {
      const sceneLines = sceneData.map(d => sanitize(d.line))
      entries.push({ episodeId, sceneId, sceneData, sceneLines, ...rest })
    }
  }
  return entries
}

function sanitize(text) {
  return text
    .replace(/\[.+\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}
