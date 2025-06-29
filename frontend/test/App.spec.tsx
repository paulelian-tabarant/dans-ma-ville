import {describe, expect, it} from "vitest";
import {render, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {server} from './mocks/server'
import {http, HttpResponse} from "msw";
import App from "../src/App";

describe('App', () => {
    it("doit envoyer le nom saisi", async () => {
        const prenom = "Jean"
        server.use(http.post('bonjour', () => {
            return new HttpResponse({message: `Bonjour, ${prenom} !`})
        }))

        const {getByLabelText, getByRole, getByText} = render(<App></App>)

        const champPrenom = getByLabelText("Entre ici ton prénom :")
        const user = userEvent.setup()
        await user.type(champPrenom, prenom)

        await user.click(getByRole('submit', {name: 'Envoyer'}))

        await waitFor(() => {
            expect(getByText("Bonjour, Jean !")).toBeDefined()
        })
    });

    it("doit afficher le nom de l'utilisateur après l'avoir renseigné dans le champ de texte", () => {
        expect(false).toBeTruthy()
    });
});