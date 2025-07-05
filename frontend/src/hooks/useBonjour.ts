import { useCallback, useState } from "react";

interface BonjourResponseBody {
    message: string
}

export function useBonjour() {
    const apiUrl = 'http://localhost:8000'

    const [isLoading, setIsLoading] = useState(false)
    const [response, setResponse] = useState<BonjourResponseBody>()

    const postBonjour = useCallback(async (prenom: string) => {
        setIsLoading(true)


        const response = await fetch(`${apiUrl}/bonjour`, {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({ prenom: prenom })
        })
        setResponse(await response.json())

        setIsLoading(false)
    }, [])

    return { isLoading, response, postBonjour }
}