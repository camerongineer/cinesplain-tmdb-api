import axios from "axios";
import { Request, Response } from "express";
import { BASE_URL, OMDB_BASE_URL } from "../index";

export const getTMDBResponse = async (request: Request, response: Response, endpoint: string, params: any) => {
    return await axios.get(`${BASE_URL}${endpoint}`, {
        params: {
            page: request.query.page,
            include_adult: false,
            language: "en-US",
            with_original_language: "en",
            ...params
        },
        headers: {
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    });
};

export const getOMDBResponse = async (request: Request, response: Response, imdbId: string | undefined) => {
    return await axios.get(`${OMDB_BASE_URL}?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`);
};