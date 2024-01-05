import express from "express";
import { getTMDBResponse } from "./common";
import { MovieType, convertMovie } from "../types/movie";
import { convertCredit, CreditsType } from "../types/credits";
import { convertVideo, Video, VideoType } from "../types/video";
import { BASE_URL } from "../index";
import axios from "axios";

const movieRouter = express.Router();

movieRouter.get("/movie/:id",
    async (request, response) => {
        const movieId = request.params.id;
        try {
            const res = await getTMDBResponse(
                request,
                response,
                `movie/${movieId}`,
                {
                    append_to_response: "videos,images",
                    language: "en"
                });
            const movieType: MovieType = res.data;
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched movie",
                data: { results: convertMovie(movieType) }
            });
        } catch (error) {
            console.error(error)
            response.status(404).send({
                code: "ERROR_MOVIE_FETCH",
                message: `Error fetching movie id: ${movieId}`
            });
        }
    });

movieRouter.get("/movie/:id/credits",
    async (request, response) => {
        const movieId = request.params.id;
        try {
            const res = await getTMDBResponse(
                request,
                response,
                `movie/${movieId}/credits`,
                {
                    language: "en"
                });
            const credits: CreditsType = res.data;
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched credits",
                data: {
                    id: res.data.id,
                    results: {
                        cast: credits.cast.map(convertCredit),
                        crew: credits.crew.map(convertCredit)
                    }
                }
            });
        } catch (error) {
            console.error(error)
            response.status(404).send({
                code: "ERROR_MOVIE_CREDITS_FETCH",
                message: `Error fetching credits with movie id: ${movieId}`
            });
        }
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
            const trailerTypes: VideoType[] = res.data.videos.results;
            const trailers: Video[] = trailerTypes.map(convertVideo).filter(
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
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched movie trailers",
                data: { results: trailers }
            });
        } catch (error) {
            console.error(error)
            response.status(404).send({
                code: "ERROR_MOVIE_TRAILERS_FETCH",
                message: `Error fetching movie trailers with movie id: ${movieId}`
            });
        }
    });

movieRouter.get("/movie/:id/recommendations",
    async (request, response) => {
        const movieId = request.params.id;
        try {
            const res = await getTMDBResponse(
                request,
                response,
                `movie/${movieId}/recommendations`,
                {
                    language: "en"
                });
            const movieTypes: MovieType[] = res.data.results;
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched movie recommendations",
                data: { ...res.data, results: movieTypes.map(convertMovie) }
            });
        } catch (error) {
            console.error(error)
            response.status(404).send({
                code: "ERROR_MOVIE_RECOMMENDATIONS_FETCH",
                message: `Error fetching movie recommendations with movie id: ${movieId}`
            });
        }
    });

movieRouter.get("/movie/:id/similar",
    async (request, response) => {
        const movieId = request.params.id;
        try {
            const res = await getTMDBResponse(
                request,
                response,
                `movie/${movieId}/similar`,
                {
                    language: "en"
                });
            const movieTypes: MovieType[] = res.data.results;
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched similar movies",
                data: { ...res.data, results: movieTypes.map(convertMovie) }
            });
        } catch (error) {
            console.error(error)
            response.status(404).send({
                code: "ERROR_SIMILAR_MOVIES_FETCH",
                message: `Error fetching similar movies with movie id: ${movieId}`
            });
        }
    });

export default movieRouter;