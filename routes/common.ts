import { Request, Response } from "express";
import axios from "axios";
import { BASE_URL } from "../index";

export const handleRoute = async (request: Request, response: Response, endpoint: string, params: any) => {
    try {
        const res = await axios.get(`${BASE_URL}${endpoint}`, {
            params: {
                ...params,
            },
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_KEY}`
            }
        });
        response.send(res.data);
    } catch (err) {
        console.log(err);
    }
};