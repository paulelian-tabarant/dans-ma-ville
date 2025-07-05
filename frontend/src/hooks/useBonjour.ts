import { useCallback, useState } from "react";

interface BonjourResponseBody {
    message: string
}

export interface BonjourRequestBody {
    prenom: string
}

export function useBonjour() {
    const apiUrl = 'http://localhost:8000'

    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState<BonjourResponseBody>()

    const postBonjour = useCallback(async (body: BonjourRequestBody) => {
        setIsLoading(true)

        const response = await fetch(`${apiUrl}/bonjour/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })

        setResponse(await response.json())
        setIsLoading(false)
    }, [])

    return { isLoading, response, postBonjour }
}