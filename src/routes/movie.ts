import express from "express";
import { handleRoute } from "./common";
import axios from "axios";
import { BASE_URL } from "../index";
import Video from "../types/video";

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

movieRouter.get("/movie/:id/credits",
    async (request, response) => {
        const movieId = request.params.id;
        await handleRoute(
            request,
            response,
            `movie/${movieId}/credits`,
            {
                language: "en"
            });
    });

movieRouter.get("/movie/:id/trailers",
    async (request, response) => {
        const movieId = request.params.id;
        try {
            const res = await axios.get(`${BASE_URL}/movie/${movieId}`, {
                params: {
                    append_to_response: "videos"
                },
                headers: {
                    Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                }
            });
            const trailers: Video[] = res.data.videos.results.filter(
                (video: Video) => video.type === "Trailer" || video.type === "Teaser").sort((a: Video, b: Video) => {
                const aIsOfficial = a.official && a.name.toLowerCase().includes("trailer");
                const bIsOfficial = b.official && b.name.toLowerCase().includes("trailer");
                if (a.type === "Teaser" && b.type !== "Teaser") {
                    return 1;
                } else if (b.type === "Teaser" && a.type !== "Teaser") {
                    return -1;
                } else {
                    return (aIsOfficial === bIsOfficial) ? 0 : aIsOfficial ? -1 : 1;
                }
            });
            response.send(trailers);
        } catch (err) {
            console.log(err);
        }
    });

export default movieRouter;