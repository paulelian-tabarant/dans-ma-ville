import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { cleanup, render, type RenderResult, waitFor } from "@testing-library/react";
import { userEvent, type UserEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";
import Bonjour from "@/components/Bonjour.tsx";

import type { BonjourRequestBody, BonjourResponseBody } from "@/api/bonjour.resource.ts";

describe('Bonjour', () => {
  const bonjourApiUrl = import.meta.env.VITE_API_URL as string + '/bonjour'

  let requestBodySpy: BonjourRequestBody

  let composant: RenderResult
  let user: UserEvent

  beforeAll(() => {
    server.listen()
  })

  afterEach(() => {
    server.resetHandlers()
    cleanup()
  })

  afterAll(() => {
    server.close()
  })

  it("doit envoyer le prénom saisi", async () => {
    stubPostBonjour()

    composant = render(<Bonjour/>)
    user = userEvent.setup()

    await saisirPrenom('Jean')
    await cliquerSurEnvoyer();

    await waitFor(() => {
      expect(requestBodySpy).toEqual({ prenom: "Jean" })
    })
  });

  it('doit afficher la réponse', async () => {
    stubPostBonjour({ message: 'Bonjour, Jacky !' })

    composant = render(<Bonjour/>)
    user = userEvent.setup()

    await saisirPrenom('Jacky')
    await cliquerSurEnvoyer();

    expect(composant.getByText('Bonjour, Jacky !')).toBeDefined()
  });

  function stubPostBonjour(reponse?: BonjourResponseBody) {
    server.use(http.post(bonjourApiUrl, async ({ request }) => {
      requestBodySpy = await request.clone().json() as BonjourRequestBody

      if (reponse) {
        return HttpResponse.json(reponse)
      }
    }))
  }

  async function saisirPrenom(prenom: string) {
    const champPrenom = composant.getByLabelText("Entre ici ton prénom :")
    await user.type(champPrenom, prenom)
  }

  async function cliquerSurEnvoyer() {
    const boutonEnvoyer = composant.getByRole('button', { name: 'Envoyer' });
    await user.click(boutonEnvoyer)
  }
});