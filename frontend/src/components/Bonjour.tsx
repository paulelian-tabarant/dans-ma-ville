import { useState } from "react";
import { useBonjour } from "../hooks/useBonjour.ts";


function Bonjour() {
    const [prenom, setPrenom] = useState('')

    const { isLoading, response, postBonjour } = useBonjour()

    const onBonjourClick = async () => {
        await postBonjour(prenom)
    }

    return (
        <>
            <h2>Bonjour !</h2>

            <label htmlFor="prenom">Entre ici ton prénom :</label>
            <input name="prenom" type="text" onChange={e => setPrenom(e.target.value)}/>

            <button onClick={onBonjourClick}>Envoyer</button>
            {isLoading && <p>Loading...</p>}
            {!isLoading && response && <p>{response.message}</p>}
        </>
    )
}

export default Bonjour