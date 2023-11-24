import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieListRoutes from "./routes/movies";

dotenv.config();

export const BASE_URL = "https://api.themoviedb.org/3/";
export const PORT = process.env.PORT || 5000;

const index = express();
index.use(express.json());
index.use(cors());
index.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

index.get("/status", (request: Request, response: Response) => {
    const status = {
        "Status": "Running"
    };
    response.send(status);
});

index.use(movieListRoutes);