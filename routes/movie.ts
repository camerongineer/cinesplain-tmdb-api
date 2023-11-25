import express from "express";
import { handleRoute } from "./common";

const movieRouter = express.Router();

movieRouter.get("/movie/:id",
    async (request, response) => {
        const movieId = request.params.id;
        await handleRoute(
            request,
            response,
            `movie/${movieId}`,
            {
                append_to_response: "videos,images",
                language: "en"
            });
    });

export default movieRouter;