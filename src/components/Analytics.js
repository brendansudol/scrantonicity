import React, { useEffect } from "react"
import ga from "react-ga"
import { useLocation } from "react-router"

ga.initialize("UA-37353161-21")

export const Analytics = React.memo(() => {
  usePageViews()
  return null
})

function usePageViews() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    ga.send(["pageview", `${pathname}${search}`])
  }, [pathname, search])
}
