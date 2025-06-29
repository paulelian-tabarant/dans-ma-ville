import {describe, expect, it, vi} from "vitest";
import {render, waitFor} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {http, HttpResponse} from "msw";
import App from "../src/App";
import {server} from "./mocks/server";

describe('App', () => {
    it("doit envoyer le nom saisi", async () => {
        const prenom = "Jean"
        const requestSpy = vi.fn()
        server.use(http.post('bonjour', ({request}) => {
            requestSpy(request.json())
            return new HttpResponse({message: `Bonjour, ${prenom} !`})
        }))

        const {getByLabelText, getByRole} = render(<App/>)

        const champPrenom = getByLabelText("Entre ici ton prénom :")
        const user = userEvent.setup()
        await user.type(champPrenom, prenom)

        await user.click(getByRole('submit', {name: 'Envoyer'}))

        await waitFor(() => {
            expect(requestSpy).toHaveBeenCalledWith({prenom})
        })
    });

    it("doit afficher le nom de l'utilisateur après l'avoir renseigné dans le champ de texte", () => {
        expect(false).toBeTruthy()
    });
});