import axios from "axios";
import express, { Request, Response } from "express";
import { BASE_URL } from "../index";
import { getFormattedDate } from "../utils/formatUtils";
import { getSubtractedDate } from "../utils/timeUtils";

const moviesListRouter = express.Router();
const sixMonthsAgoFormatted = getFormattedDate(getSubtractedDate(new Date(), 0, 6, 0));

moviesListRouter.get("/movies/now_playing/:page?", async (request: Request, response: Response) => {
    const page = request.params.page ?? 1;
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

moviesListRouter.get("/movies/most_loved/:page?", async (request: Request, response: Response) => {
    const page = request.params.page ?? 1;
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


moviesListRouter.get("/movies/most_hated/:page?", async (request: Request, response: Response) => {
    const page = request.params.page ?? 1;
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