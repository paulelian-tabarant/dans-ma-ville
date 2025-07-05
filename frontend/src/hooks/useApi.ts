import { useCallback, useState } from "react";

interface AppelApi {
    method: 'POST',
    resource: `/${string}`,
    body?: unknown
}

interface UseApiResponse<T> {
    isLoading: boolean,
    response: T | undefined,
    callback: (appel: AppelApi) => Promise<void>,
}

export function useApi<T>(): UseApiResponse<T> {
    const apiUrl = 'http://localhost:8000'

    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState<T>()

    const callback = useCallback(async (appel: AppelApi) => {
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