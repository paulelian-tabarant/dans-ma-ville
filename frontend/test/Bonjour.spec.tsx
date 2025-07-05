import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { render, type RenderResult, waitFor } from "@testing-library/react";
import { userEvent, type UserEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";
import Bonjour from "../src/components/Bonjour.tsx";
import type { BonjourRequestBody, BonjourResponseBody } from "../src/hooks/useBonjour.ts";

describe('Bonjour', () => {
    const endpointUrl = 'http://localhost:8000/bonjour/'
    let requestBody: BonjourRequestBody

    beforeAll(() => {
        server.listen()
    })

    afterEach(() => {
        server.resetHandlers()
    })

    afterAll(() => {
        server.close()
    })

    it("doit envoyer le nom saisi", async () => {
        const prenom = "Jean"

        stubAppelApi(endpointUrl, { message: 'Bonjour, Jean !' })

        const composant: RenderResult = render(<Bonjour/>)

        const user = userEvent.setup()
        await saisirPrenom(user, composant, 'Jean')
        await cliquerSurEnvoyer(user, composant);

        await waitFor(() => {
            expect(requestBody).toEqual({ prenom })
        })
    });

    function stubAppelApi(url: string, reponse: BonjourResponseBody) {
        server.use(http.post(url, async ({ request }) => {
            requestBody = await request.clone().json()
            return HttpResponse.json(reponse)
        }))
    }

    async function saisirPrenom(user: UserEvent, composant: RenderResult, prenom: string) {
        const champPrenom = composant.getByLabelText("Entre ici ton prénom :")
        await user.type(champPrenom, prenom)
    }

    async function cliquerSurEnvoyer(user: UserEvent, composant: RenderResult) {
        const boutonEnvoyer = composant.getByRole('button', { name: 'Envoyer' });
        await user.click(boutonEnvoyer)
    }
});