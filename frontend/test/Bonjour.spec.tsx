import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import { render, type RenderResult, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";
import Bonjour from "../src/components/Bonjour.tsx";
import type { BonjourRequestBody } from "../src/hooks/useBonjour.ts";

describe('Bonjour', () => {
    const endpointUrl = 'http://localhost:8000/bonjour/'

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

        let requestBody: BonjourRequestBody
        server.use(http.post(endpointUrl, async ({ request }) => {
            requestBody = await request.clone().json()
            return HttpResponse.json({ message: `Bonjour, ${prenom} !` })
        }))

        const composant: RenderResult = render(<Bonjour/>)

        const champPrenom = composant.getByLabelText("Entre ici ton prénom :")
        const user = userEvent.setup()
        await user.type(champPrenom, prenom)

        await user.click(composant.getByRole('button', { name: 'Envoyer' }))

        await waitFor(() => {
            expect(requestBody).toEqual({ prenom })
        })
    });

    it("doit afficher le nom de l'utilisateur après l'avoir renseigné dans le champ de texte", () => {
        expect(false).toBeTruthy()
    });
});