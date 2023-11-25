import express from "express";
import { getSubtractedDate } from "../utils/timeUtils";
import { getFormattedDate } from "../utils/formatUtils";
import { handleRoute } from "./common";

const moviesListRouter = express.Router();
const sixMonthsAgoFormatted = getFormattedDate(getSubtractedDate(new Date(), 0, 6, 0));

moviesListRouter.get("/movies/search",
    async (request, response) => {
        await handleRoute(
            request,
            response,
            "search/movie",
            {
                include_adult: false,
                language: "en-US",
                query: request.query.query,
                sort_by: "popularity.desc"
            });
    });

moviesListRouter.get("/movies/discover",
    async (request, response) => {
        await handleRoute(
            request,
            response,
            "search/movie",
            {
                include_adult: false,
                language: "en-US",
                sort_by: "popularity.desc"
            });
    });

moviesListRouter.get("/movies/now_playing",
    async (request, response) => {
        await handleRoute(
            request,
            response,
            "movie/now_playing",
            {
                include_adult: false,
                language: "en-US",
                sort_by: "popularity.desc"
            });
    });

moviesListRouter.get("/movies/upcoming", async (request, response) => {
    await handleRoute(
        request,
        response,
        "discover/movie",
        {
            include_adult: false,
            language: "en-US",
            "primary_release_date.gte": getFormattedDate(new Date()),
            sort_by: "popularity.desc"
        });
});

moviesListRouter.get("/movies/classics",
    async (request, response) => {
        await handleRoute(
            request,
            response,
            "discover/movie",
            {
                include_adult: false,
                language: "en-US",
                origin_language: "en",
                sort_by: "vote_average.desc",
                "vote_count.gte": 1000,
                without_genres: "99,10755"
            });
    });

moviesListRouter.get("/movies/most_loved",
    async (request, response) => {
        await handleRoute(request,
            response,
            "discover/movie",
            {
                include_adult: false,
                language: "en-US",
                "primary_release_date.gte": sixMonthsAgoFormatted,
                sort_by: "vote_average.desc",
                "vote_count.gte": 20,
                with_original_language: "en",
                without_genres: "99,10755"
            });
    });

moviesListRouter.get("/movies/most_hated",
    async (request, response) => {
        await handleRoute(
            request,
            response,
            "discover/movie",
            {
                include_adult: false,
                language: "en-US",
                "primary_release_date.gte": sixMonthsAgoFormatted,
                sort_by: "vote_average.asc",
                "vote_count.gte": 20,
                with_original_language: "en",
                without_genres: "99,10755"
            });
    });

export default moviesListRouter;