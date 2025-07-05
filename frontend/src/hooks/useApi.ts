import { useCallback, useState } from "react";

interface AppelApi<Q> {
    method: 'POST',
    resource: `/${string}`,
    body?: Q
}

interface UseApiResult<Q, R> {
    isLoading: boolean,
    response: R | undefined,
    callback: (appel: AppelApi<Q>) => Promise<void>,
}

export function useApi<Q, R>(): UseApiResult<Q, R> {
    const apiUrl = 'http://localhost:8000'

    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState<R>()

    const callback = useCallback(async (appel: AppelApi<Q>) => {
        setIsLoading(true)

        const { method, resource, body } = appel

        const response = await fetch(`${apiUrl}${resource}/`, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        setResponse(await response.json())
        setIsLoading(false)
    }, [])

    return { isLoading, response, callback }
}