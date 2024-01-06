import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import movieListRoutes from "./routes/movieLists";
import movieRoutes from "./routes/movie";
import peopleRouter from "./routes/people";

dotenv.config();

export const BASE_URL = "https://api.themoviedb.org/3/";
export const PORT = process.env.PORT || 5000;

const allowedOrigins = [
    process.env.ALLOWED_ORIGIN_1 ?? "",
    process.env.ALLOWED_ORIGIN_2 ?? "",
    process.env.ALLOWED_ORIGIN_3 ?? "",
    process.env.ALLOWED_ORIGIN_4 ?? "",
]

const corsOptions: cors.CorsOptions = {
    origin: allowedOrigins,
    methods: "GET",
    optionsSuccessStatus: 204
};

const index = express();
index.use(express.json());
index.use(cors(corsOptions));

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
index.use(movieRoutes);
index.use(peopleRouter);