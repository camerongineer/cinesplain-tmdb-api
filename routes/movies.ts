import axios from "axios";
import express, { Request, Response } from "express";
import { BASE_URL } from "../index";

const moviesListRouter = express.Router();

moviesListRouter.get("/movies/now_playing/:page?", async (request: Request, response: Response) => {
    const page = request.params.page ?? 1;
    try {
        const res = await axios.get(`${BASE_URL}movie/now_playing?language=en-US&page=${page}`, {
            headers: {
                "Authorization": `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        response.send(res.data);
    } catch (err) {
        console.log(err);
    }
});

export default moviesListRouter;