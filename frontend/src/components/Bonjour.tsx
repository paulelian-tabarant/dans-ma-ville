import { type FormEvent, useState } from "react";
import { useApi } from "@/hooks/useApi.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Alert, AlertTitle } from "@/components/ui/alert.tsx";
import type { BonjourRequestBody, BonjourResponseBody } from "@/api/bonjour.resource.ts";
import { HandshakeIcon, Loader } from "lucide-react";

function Bonjour() {
  const [prenom, setPrenom] = useState('')
  const { isLoading, response, appel } = useApi<BonjourRequestBody, BonjourResponseBody>()

  const onBonjourClick = (e: FormEvent) => {
    void appel({ method: 'POST', resource: '/bonjour', body: { prenom } })
    e.preventDefault()
  }

  return (
    <>
      <h1>Bonjour !</h1>

      <form onSubmit={onBonjourClick} className="flex flex-col gap-2">
        <label htmlFor="prenom">Entre ici ton prénom :</label>
        <div className="flex gap-2">
          <Input id="prenom" type="text" onChange={e => {
            setPrenom(e.target.value);
          }}/>
          <Button type={"submit"}>Envoyer</Button>
        </div>

        {isLoading && <Loader/>}
        {!isLoading && response &&
                    <Alert>
                      <HandshakeIcon/>
                      <AlertTitle>{response.message}</AlertTitle>
                    </Alert>
        }
      </form>
    </>
  )
}

export default Bonjour