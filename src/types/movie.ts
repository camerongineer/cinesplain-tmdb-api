import Collection from "./collection";
import Genre from "./genre";
import ProductionCompany from "./productionCompany";
import ProductionCountry from "./productionCountry";
import SpokenLanguage from "./spokenLanguage";
import Video from "./video";
import Image from "./image";

type Movie = {
    "adult": boolean
    "backdrop_path": string
    "belongs_to_collection"?: Collection[],
    "budget"?: number,
    "genres"?: Genre[]
    "genre_ids"?: number[],
    "homepage"?: string,
    "id": number,
    "images"?: {
        "backdrops": Image[],
        "logos": Image[],
        "posters": Image[]
    }
    "imdb_id"?: string,
    "original_language": string,
    "original_title": string,
    "overview": string,
    "popularity": number,
    "poster_path": string,
    "production_companies"?: ProductionCompany[],
    "production_countries"?: ProductionCountry[],
    "release_date": string,
    "revenue"?: number,
    "runtime"?: number,
    "spoken_languages": SpokenLanguage[],
    "status": string,
    "tagline": string,
    "title": string,
    "video": boolean,
    "videos"?: {
        results: Video[]
    }
    "vote_average": number,
    "vote_count": number
}

export default Movie;