import { useContext } from "react"
import { __RouterContext as RouterContext, useLocation } from "react-router"

export function useRouter() {
  return useContext(RouterContext)
}

export function useHash() {
  const location = useLocation()
  return location.hash.slice(1)
}

export function useQuery() {
  const location = useLocation()
  return new URLSearchParams(location.search)
}
