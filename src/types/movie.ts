import { Collection, CollectionType, convertCollection } from "./collection";
import Genre from "./genre";
import { Image, ImageType, convertImage } from "./image";
import { ProductionCompany, ProductionCompanyType, convertProductionCompany } from "./productionCompany";
import { ProductionCountry, ProductionCountryType, convertProductionCountry } from "./productionCountry";
import { SpokenLanguage, SpokenLanguageType, convertSpokenLanguage } from "./spokenLanguage";
import { Video, VideoType, convertVideo } from "./video";

type Movie = {
    actors: string | null;
    adult: boolean;
    awards: string | null;
    backdropPath: string;
    belongsToCollection: Collection | null;
    boxOffice: string | null;
    budget: number | null;
    director: string | null;
    genres: Genre[] | null;
    genreIds: number[] | null;
    homepage: string | null;
    id: string;
    images: {
        backdrops: Image[] | null,
        logos: Image[] | null,
        posters: Image[] | null
    }
    imdbId: string | null;
    imdbRating: number | null;
    metaScore: number | null;
    mediaType: string;
    originalLanguage: string;
    originalTitle: string;
    overview: string | null;
    popularity: number;
    posterPath: string | null;
    productionCompanies: ProductionCompany[] | null;
    productionCountries: ProductionCountry[] | null;
    rated: string | null;
    releaseDate: string | null;
    revenue: number | null;
    rottenTomatoesScore: number | null;
    runtime: number | null;
    spokenLanguages: SpokenLanguage[] | null;
    status: string | null;
    tagline: string | null;
    title: string;
    video: boolean;
    videos: {
        results: Video[] | null
    };
    voteAverage: number | null;
    voteCount: number;
    writer: string | null;
};

type MovieType = {
    adult: boolean
    backdrop_path: string
    belongs_to_collection?: CollectionType,
    budget?: number,
    genres?: Genre[]
    genre_ids?: number[],
    homepage?: string,
    id: number,
    images?: {
        backdrops: ImageType[],
        logos: ImageType[],
        posters: ImageType[]
    }
    imdb_id?: string,
    media_type?: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path?: string,
    production_companies?: ProductionCompanyType[],
    production_countries?: ProductionCountryType[],
    release_date: string,
    revenue?: number,
    runtime?: number,
    spoken_languages?: SpokenLanguageType[],
    status?: string,
    tagline?: string,
    title: string,
    video: boolean,
    videos?: {
        results: VideoType[]
    }
    vote_average: number,
    vote_count: number
}

type OmdbMovieInfo = {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: {
        Source: string;
        Value: string;
    }[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
};

const convertMovie = (movie: MovieType, omdbInfo?: OmdbMovieInfo): Movie => {
    let rottenTomatoesScore = null;
    if (omdbInfo && omdbInfo.Ratings) {
        let rating = omdbInfo.Ratings.find(rating => rating.Source === "Rotten Tomatoes");
        if (rating) {
            rottenTomatoesScore = Number(rating.Value.replace("%", ""));
        }
    }
    return {
        actors: omdbInfo?.Actors && omdbInfo.Actors !== "N/A" ? omdbInfo.Actors : null,
        adult: movie.adult,
        awards: omdbInfo?.Awards && omdbInfo.Awards !== "N/A" ? omdbInfo.Awards : null,
        backdropPath: movie.backdrop_path,
        belongsToCollection: convertCollection(movie.belongs_to_collection),
        boxOffice: omdbInfo?.BoxOffice && omdbInfo.BoxOffice !== "N/A" ? omdbInfo.BoxOffice : null,
        budget: movie.budget || null,
        director: omdbInfo?.Director && omdbInfo.Director !== "N/A" ? omdbInfo.Director : null,
        genres: movie.genres ?? null,
        genreIds: movie.genre_ids ?? null,
        homepage: movie.homepage ?? null,
        id: movie.id.toString(),
        images: {
            backdrops: movie.images?.backdrops.map(convertImage) ?? null,
            logos: movie.images?.logos.map(convertImage) ?? null,
            posters: movie.images?.posters.map(convertImage) ?? null
        },
        imdbId: movie.imdb_id ?? null,
        imdbRating: omdbInfo?.imdbRating && omdbInfo.imdbRating !== "N/A"
            ? Math.floor(Number(omdbInfo.imdbRating) * 10)
            : null,
        metaScore: omdbInfo?.Metascore && omdbInfo.Metascore !== "N/A" ? Number(omdbInfo.Metascore) : null,
        mediaType: movie.media_type ?? "movie",
        originalLanguage: movie.original_language,
        originalTitle: movie.original_title,
        overview: movie.overview || null,
        popularity: movie.popularity,
        posterPath: movie.poster_path ?? null,
        productionCompanies: movie.production_companies?.map(convertProductionCompany) ?? null,
        productionCountries: movie.production_countries?.map(convertProductionCountry) ?? null,
        rated: omdbInfo?.Rated && omdbInfo.Rated !== "N/A" ? omdbInfo.Rated : null,
        releaseDate: movie.release_date || null,
        revenue: movie.revenue || null,
        rottenTomatoesScore: rottenTomatoesScore,
        runtime: movie.runtime || null,
        spokenLanguages: movie.spoken_languages?.map(convertSpokenLanguage) ?? null,
        status: movie.status || null,
        tagline: movie.tagline || null,
        title: movie.title,
        video: movie.video,
        videos: {
            results: movie.videos?.results.map(convertVideo) ?? null
        },
        voteAverage: movie.vote_average > 0 ? Math.floor(movie.vote_average * 10) : null,
        voteCount: movie.vote_count,
        writer: omdbInfo?.Writer && omdbInfo.Writer !== "N/A" ? omdbInfo.Writer : null
    };
};

export { Movie, MovieType, OmdbMovieInfo, convertMovie };