import express from "express";
import axios from "axios";
import { getSubtractedDate } from "../utils/timeUtils";
import { getFormattedDate } from "../utils/formatUtils";
import { handleRoute } from "./common";
import { BASE_URL } from "../index";

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
            "discover/movie",
            {
                include_adult: false,
                language: "en-US",
                sort_by: "popularity.desc"
            });
    });

moviesListRouter.get("/movies/top_200_titles",
    async (request, response) => {
        try {
            const popularMovieTitles: string[] = [];
            for (let page = 1; page <= 10; page++) {
                const res = await axios.get(`${BASE_URL}discover/movie`, {
                    params: {
                        include_adult: false,
                        language: "en-US",
                        page: page,
                        sort_by: "popularity.desc"
                    },
                    headers: {
                        Authorization: `Bearer ${process.env.TMDB_API_KEY}`
                    }
                });
                if (res !== null) {
                    const popularMoviesArray = res.data["results"];
                    popularMoviesArray.forEach((resObj: any) => popularMovieTitles.push(resObj["title"]));
                }
            }
            response.send(popularMovieTitles);
        } catch (err) {
            console.log(err);
        }
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