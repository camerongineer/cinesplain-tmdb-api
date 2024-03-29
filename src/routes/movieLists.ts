import express from "express";
import { getSubtractedDate } from "../utils/timeUtils";
import { getFormattedDate } from "../utils/formatUtils";
import { getTMDBResponse } from "./common";
import { convertMovie, MovieType } from "../types/movie";

const moviesListRouter = express.Router();
const threeMonthsAgoFormatted = getFormattedDate(getSubtractedDate(new Date(), 0, 3, 0));
const threeMonthsFromNowFormatted = getFormattedDate(getSubtractedDate(new Date(), 0, -3, 0));

moviesListRouter.get("/movies/search",
    async (request, response) => {
        try {
            const res = await getTMDBResponse(
                request,
                response,
                "search/movie",
                {
                    query: request.query.query,
                    sort_by: "popularity.desc"
                });
            const movieTypes: MovieType[] = res.data.results;
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched 'searched' movies",
                data: { ...res.data, results: movieTypes.map(movie => convertMovie(movie)) }
            });
        } catch (error) {
            console.error(error);
            response.status(404).send({
                code: "ERROR_MOVIES_SEARCH_FETCH",
                message: `Error finding movies with query "${request.query.query}"`
            });
        }
    });

moviesListRouter.get("/movies/discover",
    async (request, response) => {
        try {
            const res = await getTMDBResponse(
                request,
                response,
                "discover/movie",
                {
                    sort_by: "popularity.desc"
                });
            const movieTypes: MovieType[] = res.data.results;
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched 'discover' movies",
                data: { ...res.data, results: movieTypes.map(movie => convertMovie(movie)) }
            });
        } catch (error) {
            console.error(error);
            response.status(404).send({
                code: "ERROR_DISCOVER_MOVIES_FETCH",
                message: `Error fetching 'discover' movies"`
            });
        }
    });

moviesListRouter.get("/movies/now_playing",
    async (request, response) => {
        try {
            const res = await getTMDBResponse(
                request,
                response,
                "movie/now_playing",
                {
                    sort_by: "popularity.desc"
                });
            const movieTypes: MovieType[] = res.data.results;
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched 'now playing' movies",
                data: { ...res.data, results: movieTypes.map(movie => convertMovie(movie)) }
            });
        } catch (error) {
            console.error(error);
            response.status(404).send({
                code: "ERROR_NOW_PLAYING_MOVIES_FETCH",
                message: `Error fetching 'now playing' movies"`
            });
        }
    });

moviesListRouter.get("/movies/upcoming",
    async (request, response) => {
        try {
            const res = await getTMDBResponse(
                request,
                response,
                "discover/movie",
                {
                    "primary_release_date.gte": getFormattedDate(new Date()),
                    "primary_release_date.lte": threeMonthsFromNowFormatted,
                    sort_by: "popularity.desc"
                });
            const movieTypes: MovieType[] = res.data.results;
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched 'upcoming' movies",
                data: { ...res.data, results: movieTypes.map(movie => convertMovie(movie)) }
            });
        } catch (error) {
            console.error(error);
            response.status(404).send({
                code: "ERROR_UPCOMING_MOVIES_FETCH",
                message: `Error fetching 'upcoming' movies"`
            });
        }
    });

moviesListRouter.get("/movies/classics",
    async (request, response) => {
        try {
            const res = await getTMDBResponse(
                request,
                response,
                "discover/movie",
                {
                    sort_by: "vote_average.desc",
                    "vote_count.gte": 1000,
                    without_genres: "99,10755"
                });
            const movieTypes: MovieType[] = res.data.results;
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched 'classics' movies",
                data: { ...res.data, results: movieTypes.map(movie => convertMovie(movie)) }
            });
        } catch (error) {
            console.error(error);
            response.status(404).send({
                code: "ERROR_CLASSIC_MOVIES_FETCH",
                message: `Error fetching 'classic' movies"`
            });
        }
    });

moviesListRouter.get("/movies/most_loved",
    async (request, response) => {
        try {
            const res = await getTMDBResponse(
                request,
                response,
                "discover/movie",
                {
                    "primary_release_date.gte": threeMonthsAgoFormatted,
                    sort_by: "vote_average.desc",
                    "vote_count.gte": 20,
                    without_genres: "99,10755"
                });
            const movieTypes: MovieType[] = res.data.results;
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched 'most loved' movies",
                data: { ...res.data, results: movieTypes.map(movie => convertMovie(movie)) }
            });
        } catch (error) {
            console.error(error);
            response.status(404).send({
                code: "ERROR_MOST_LOVED_MOVIES_FETCH",
                message: `Error fetching 'most loved' movies"`
            });
        }
    });

moviesListRouter.get("/movies/most_hated",
    async (request, response) => {
        try {
            const res = await getTMDBResponse(
                request,
                response,
                "discover/movie",
                {
                    "primary_release_date.gte": threeMonthsAgoFormatted,
                    sort_by: "vote_average.asc",
                    "vote_count.gte": 20,
                    without_genres: "99,10755"
                });
            const movieTypes: MovieType[] = res.data.results;
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched 'most hated' movies",
                data: { ...res.data, results: movieTypes.map(movie => convertMovie(movie)) }
            });
        } catch (error) {
            console.error(error);
            response.status(404).send({
                code: "ERROR_MOST_HATED_MOVIES_FETCH",
                message: `Error fetching 'most hated' movies"`
            });
        }
    });

moviesListRouter.get("/movies/home_page_lists",
    async (request, response) => {
        try {
            const nowPlayingMoviesRes = await getTMDBResponse(
                request,
                response,
                "movie/now_playing",
                {
                    sort_by: "popularity.desc"
                });
            const upcomingMoviesRes = await getTMDBResponse(
                request,
                response,
                "discover/movie",
                {
                    "primary_release_date.gte": getFormattedDate(new Date()),
                    "primary_release_date.lte": threeMonthsFromNowFormatted,
                    sort_by: "popularity.desc"
                });
            const lovedMoviesRes = await getTMDBResponse(
                request,
                response,
                "discover/movie",
                {
                    "primary_release_date.gte": threeMonthsAgoFormatted,
                    sort_by: "vote_average.desc",
                    "vote_count.gte": 20,
                    without_genres: "99,10755"
                });
            const hatedMoviesRes = await getTMDBResponse(
                request,
                response,
                "discover/movie",
                {
                    "primary_release_date.gte": threeMonthsAgoFormatted,
                    sort_by: "vote_average.asc",
                    "vote_count.gte": 20,
                    without_genres: "99,10755"
                });
            const classicMoviesRes = await getTMDBResponse(
                request,
                response,
                "discover/movie",
                {
                    sort_by: "vote_average.desc",
                    "vote_count.gte": 1000,
                    without_genres: "99,10755"
                });
            const nowPlayingMovieTypes: MovieType[] = nowPlayingMoviesRes.data.results;
            const upcomingMovieTypes: MovieType[] = upcomingMoviesRes.data.results;
            const lovedMovieTypes: MovieType[] = lovedMoviesRes.data.results;
            const hatedMovieTypes: MovieType[] = hatedMoviesRes.data.results;
            const classicMovieTypes: MovieType[] = classicMoviesRes.data.results;
            const data = {
                recentMovies: nowPlayingMovieTypes.map(movie => convertMovie(movie)),
                upcomingMovies: upcomingMovieTypes.map(movie => convertMovie(movie)),
                lovedMovies: lovedMovieTypes.map(movie => convertMovie(movie)),
                hatedMovies: hatedMovieTypes.map(movie => convertMovie(movie)),
                classicMovies: classicMovieTypes.map(movie => convertMovie(movie))
            };
            response.send({
                code: "SUCCESS",
                message: "Successfully fetched home page lists",
                data: { results: data }
            });
        } catch (error) {
            console.error(error);
            response.status(404).send({
                code: "ERROR_HOME_PAGE_LISTS_FETCH",
                message: "Error fetching home page lists"
            });
        }
    });

export default moviesListRouter;