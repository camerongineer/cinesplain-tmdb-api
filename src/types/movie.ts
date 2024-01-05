import { Collection, CollectionType, convertCollection } from "./collection";
import Genre from "./genre";
import { Image, ImageType, convertImage } from "./image";
import { ProductionCompany, ProductionCompanyType, convertProductionCompany } from "./productionCompany";
import { ProductionCountry, ProductionCountryType, convertProductionCountry } from "./productionCountry";
import { SpokenLanguage, SpokenLanguageType, convertSpokenLanguage } from "./spokenLanguage";
import { Video, VideoType, convertVideo } from "./video";

type Movie = {
    adult: boolean;
    backdropPath: string;
    belongsToCollection: Collection | null;
    budget: number | null;
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
    mediaType: string;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string | null;
    productionCompanies: ProductionCompany[] | null;
    productionCountries: ProductionCountry[] | null;
    releaseDate: string;
    revenue: number | null;
    runtime: number | null;
    spokenLanguages: SpokenLanguage[] | null;
    status: string | null;
    tagline: string | null;
    title: string;
    video: boolean;
    videos: {
        results: Video[] | null
    };
    voteAverage: number;
    voteCount: number;
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

const convertMovie = (movie: MovieType): Movie => {
    return {
        adult: movie.adult,
        backdropPath: movie.backdrop_path,
        belongsToCollection: convertCollection(movie.belongs_to_collection),
        budget: movie.budget ?? null,
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
        mediaType: movie.media_type ?? "movie",
        originalLanguage: movie.original_language,
        originalTitle: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        posterPath: movie.poster_path ?? null,
        productionCompanies: movie.production_companies?.map(convertProductionCompany) ?? null,
        productionCountries: movie.production_countries?.map(convertProductionCountry) ?? null,
        releaseDate: movie.release_date,
        revenue: movie.revenue ?? null,
        runtime: movie.runtime ?? null,
        spokenLanguages: movie.spoken_languages?.map(convertSpokenLanguage) ?? null,
        status: movie.status || null,
        tagline: movie.tagline || null,
        title: movie.title,
        video: movie.video,
        videos: {
            results: movie.videos?.results.map(convertVideo) ?? null
        },
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count
    };
};

export { Movie, MovieType, convertMovie };