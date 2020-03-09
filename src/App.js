import React, { useEffect, useState } from 'react'

const App = React.memo(() => {
  const [data, setData] = useState(null)
  const [scene, setScene] = useState(null)

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/the-office.min.json`)
      .then(response => response.json())
      .then(data => {
        setData(data)
        setScene(getRandomScene(data))
      })
  }, [])

  function handleRefresh() {
    setScene(getRandomScene(data))
  }

  if (!scene) return null

  return (
    <div style={{ maxWidth: 600, margin: '1rem auto' }}>
      <div>
        <button onClick={handleRefresh}>refresh</button>
      </div>
      <code>{JSON.stringify(scene, null, 2)}</code>
    </div>
  )
})

function getRandomScene(data) {
  const randomEpisode = sample(data)
  const { season, episode, title, scenes } = randomEpisode
  const randomScene = sample(scenes)
  return { season, episode, title, scene: randomScene }
}

function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default App
