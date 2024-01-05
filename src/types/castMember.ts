type CastMember = {
    adult: boolean;
    backdropPath: string | null;
    genreIds: number[];
    id: number;
    originalLanguage: string;
    originalTitle: string;
    overview: string;
    popularity: number;
    posterPath: string | null;
    releaseDate: string;
    title: string;
    video: boolean;
    voteAverage: number;
    voteCount: number;
    character: string;
    creditId: string;
    order: number;
};

type CastMemberType = {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string | null;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    character: string;
    credit_id: string;
    order: number;
};

const convertCastMember = (castMemberType: CastMemberType): CastMember => {
    return {
        adult: castMemberType.adult,
        backdropPath: castMemberType.backdrop_path ?? null,
        genreIds: castMemberType.genre_ids,
        id: castMemberType.id,
        originalLanguage: castMemberType.original_language,
        originalTitle: castMemberType.original_title,
        overview: castMemberType.overview,
        popularity: castMemberType.popularity,
        posterPath: castMemberType.poster_path ?? null,
        releaseDate: castMemberType.release_date,
        title: castMemberType.title,
        video: castMemberType.video,
        voteAverage: castMemberType.vote_average,
        voteCount: castMemberType.vote_count,
        character: castMemberType.character,
        creditId: castMemberType.credit_id,
        order: castMemberType.order,
    };
};

export { CastMember, CastMemberType, convertCastMember };