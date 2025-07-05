import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { render, type RenderResult, waitFor } from "@testing-library/react";
import { userEvent, type UserEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";
import Bonjour from "../src/components/Bonjour.tsx";
import type { BonjourRequestBody, BonjourResponseBody } from "../src/hooks/useBonjour.ts";

describe('Bonjour', () => {
    const bonjourApiUrl = 'http://localhost:8000/bonjour/'
    let requestBodySpy: BonjourRequestBody

    let composant: RenderResult
    let user: UserEvent

    beforeAll(() => {
        server.listen()
    })

    afterEach(() => {
        server.resetHandlers()
    })

    afterAll(() => {
        server.close()
    })

    it("doit envoyer le prénom saisi", async () => {
        stubPostBonjour({ message: 'Bonjour, Jean !' })

        composant = render(<Bonjour/>)
        user = userEvent.setup()

        await saisirPrenom('Jean')
        await cliquerSurEnvoyer();

        await waitFor(() => {
            expect(requestBodySpy).toEqual({ prenom: "Jean" })
        })
    });

    function stubPostBonjour(reponse: BonjourResponseBody) {
        server.use(http.post(bonjourApiUrl, async ({ request }) => {
            requestBodySpy = await request.clone().json()
            return HttpResponse.json(reponse)
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