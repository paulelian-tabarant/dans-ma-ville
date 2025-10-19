import { useCallback, useState } from "react";

interface AppelApi<Q> {
  method: 'POST',
  resource: `/${string}`,
  body?: Q
}

interface UseApiResult<Q, R> {
  isLoading: boolean,
  response: R | undefined,
  httpCall: (appel: AppelApi<Q>) => Promise<void>,
}

export const BASE_API_URL = '/api'


export function useApi<Q, R>(): UseApiResult<Q, R> {
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<R>()

  const appel = useCallback(async (endpoint: AppelApi<Q>) => {
    setIsLoading(true)

    const { method, resource, body } = endpoint

    const response = await fetch(`${BASE_API_URL}${resource}/`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    setResponse(await response.json() as R)
    setIsLoading(false)
  }, [])

  return { isLoading, response, httpCall: appel }
}