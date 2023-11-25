import express from "express";
import { getSubtractedDate } from "../utils/timeUtils";
import { getFormattedDate } from "../utils/formatUtils";
import { handleRoute } from "./common";

const moviesListRouter = express.Router();
const sixMonthsAgoFormatted = getFormattedDate(getSubtractedDate(new Date(), 0, 6, 0));

moviesListRouter.get("/movies/search", (request, response) => {
    handleRoute(request, response, 'search/movie', { query: request.query.query, sort_by: 'popularity.desc' });
});

moviesListRouter.get("/movies/now_playing", (request, response) => {
    handleRoute(request, response, 'movie/now_playing', {});
});

moviesListRouter.get("/movies/upcoming", (request, response) => {
    handleRoute(request, response, 'discover/movie', { sort_by: 'popularity.desc', "primary_release_date.gte": getFormattedDate(new Date()) });
});

moviesListRouter.get("/movies/classics", (request, response) => {
    handleRoute(request, response, 'discover/movie', { sort_by: 'vote_average.desc', without_genres: "99,10755", "vote_count.gte": 1000 });
});

moviesListRouter.get("/movies/most_loved", (request, response) => {
    handleRoute(request, response, 'discover/movie', { sort_by: 'vote_average.desc', "primary_release_date.gte": sixMonthsAgoFormatted , without_genres: "99,10755", "vote_count.gte": 20 });
});

moviesListRouter.get("/movies/most_hated", (request, response) => {
    handleRoute(request, response, 'discover/movie', { sort_by: 'vote_average.asc', "primary_release_date.gte": sixMonthsAgoFormatted, without_genres: "99,10755", "vote_count.gte": 20 });
});

export default moviesListRouter;