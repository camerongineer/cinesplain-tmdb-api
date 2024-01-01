import express from "express";
import { handleRoute } from "./common";

const peopleRouter = express.Router();

peopleRouter.get("/person/:id",
    async (request, response) => {
        const personId = request.params.id;
        await handleRoute(
            request,
            response,
            `person/${personId}`,
            {
                append_to_response: "images,movie_credits",
            }
        );
    });

export default peopleRouter;