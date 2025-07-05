import { useState } from "react";
import { useApi } from "../hooks/useApi.ts";


function Bonjour() {
    const [prenom, setPrenom] = useState('')
    const { isLoading, response, callback } = useApi()

    const onBonjourClick = async () => {
        await callback({ method: 'POST', resource: '/bonjour', body: { prenom } })
    }

    return (
        <>
            <h2>Bonjour !</h2>

            <label htmlFor="prenom">Entre ici ton prénom :</label>
            <input id="prenom" type="text" onChange={e => setPrenom(e.target.value)}/>
            <button onClick={onBonjourClick}>Envoyer</button>

            {isLoading && <p>Loading...</p>}
            {!isLoading && response && <p>{response.message}</p>}
        </>
    )
}

export default Bonjour