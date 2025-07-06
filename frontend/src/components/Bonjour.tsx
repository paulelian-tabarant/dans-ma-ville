import { useState } from "react";
import { useApi } from "../hooks/useApi.ts";
import type { BonjourRequestBody, BonjourResponseBody } from "../hooks/useBonjour.ts";


function Bonjour() {
    const [prenom, setPrenom] = useState('')
    const { isLoading, response, appel } = useApi<BonjourRequestBody, BonjourResponseBody>()

    const onBonjourClick = async () => {
        await appel({ method: 'POST', resource: '/bonjour', body: { prenom } })
    }

    return (
        <>
            <h2>Bonjour !</h2>

            <div>
                <label htmlFor="prenom">Entre ici ton prénom :</label>
                <input id="prenom" type="text" onChange={e => setPrenom(e.target.value)}/>
            </div>
            <button onClick={onBonjourClick}>Envoyer</button>

            {isLoading && <p>Loading...</p>}
            {!isLoading && response && <p>{response.message}</p>}
        </>
    )
}

export default Bonjour