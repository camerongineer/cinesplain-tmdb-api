import axios from "axios";
import express, { Request, Response } from "express";
import { BASE_URL } from "../index";
import { getSubtractedDate } from "../utils/timeUtils";
import { getFormattedDate } from "../utils/formatUtils";

const moviesListRouter = express.Router();
const sixMonthsAgoFormatted = getFormattedDate(getSubtractedDate(new Date(), 0, 6, 0));

moviesListRouter.get("/movies/search", async (request: Request, response: Response) => {
    const page = request.query.page ?? 1;
    const query = request.query.query;
    try {
        const res = await axios.get(`${BASE_URL}search/movie?query=${query}&sort_by=popularity.desc&page=${page}&include_adult=false&language=en`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        response.send(res.data);
    } catch (err) {
        console.log(err);
    }
});

moviesListRouter.get("/movies/now_playing", async (request: Request, response: Response) => {
    const page = request.query.page ?? 1;
    try {
        const res = await axios.get(`${BASE_URL}movie/now_playing?language=en-US&page=${page}`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        response.send(res.data);
    } catch (err) {
        console.log(err);
    }
});

moviesListRouter.get("/movies/upcoming", async (request: Request, response: Response) => {
    const page = request.query.page ?? 1;
    try {
        const res = await axios.get(`${BASE_URL}discover/movie?sort_by=popularity.desc&page=${page}&include_adult=false&language=en&primary_release_date.gte=${getFormattedDate(new Date())}`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        response.send(res.data);
    } catch (err) {
        console.log(err);
    }
});

moviesListRouter.get("/movies/classics", async (request: Request, response: Response) => {
    const page = request.query.page ?? 1;
    try {
        const res = await axios.get(`${BASE_URL}discover/movie?include_adult=false&language=en-US&with_original_language=en&page=${page}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=1000`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        response.send(res.data);
    } catch (err) {
        console.log(err);
    }
});

moviesListRouter.get("/movies/most_loved", async (request: Request, response: Response) => {
    const page = request.query.page ?? 1;
    try {
        const res = await axios.get(`${BASE_URL}discover/movie?include_adult=false&language=en-US&with_original_language=en&page=${page}&sort_by=vote_average.desc&primary_release_date.gte=${sixMonthsAgoFormatted}&without_genres=99,10755&vote_count.gte=20`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        response.send(res.data);
    } catch (err) {
        console.log(err);
    }
});


moviesListRouter.get("/movies/most_hated", async (request: Request, response: Response) => {
    const page = request.query.page ?? 1;
    try {
        const res = await axios.get(`${BASE_URL}discover/movie?include_adult=false&language=en-US&with_original_language=en&page=${page}&sort_by=vote_average.asc&primary_release_date.gte=${sixMonthsAgoFormatted}&without_genres=99,10755&vote_count.gte=20`, {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        response.send(res.data);
    } catch (err) {
        console.log(err);
    }
});

export default moviesListRouter;