import { useState } from "react";
import { useApi } from "../hooks/useApi.ts";
import type { BonjourRequestBody, BonjourResponseBody } from "../hooks/useBonjour.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Alert, AlertDescription } from "@/components/ui/alert.tsx";


function Bonjour() {
    const [prenom, setPrenom] = useState('')
    const { isLoading, response, appel } = useApi<BonjourRequestBody, BonjourResponseBody>()

    const onBonjourClick = async () => {
        await appel({ method: 'POST', resource: '/bonjour', body: { prenom } })
    }

    return (
        <>
            <h2>Bonjour !</h2>

            <label htmlFor="prenom">Entre ici ton prénom :</label>
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <Input id="prenom" type="text" onChange={e => setPrenom(e.target.value)}/>
                    <Button onClick={onBonjourClick}>Envoyer</Button>
                </div>

                {isLoading && <p>Loading...</p>}
                {!isLoading && response && <Alert><AlertDescription>{response.message}</AlertDescription></Alert>}
            </div>
        </>
    )
}

export default Bonjour