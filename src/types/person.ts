import { convertImage, Image, ImageType } from "./image";
import { CastMember, CastMemberType, convertCastMember } from "./castMember";
import { convertCrewMember, CrewMember, CrewMemberType } from "./crewMember";

type Person = {
    adult: boolean;
    alsoKnownAs: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdbId: string;
    knownForDepartment: string;
    name: string;
    placeOfBirth: string | null;
    popularity: number;
    profilePath: string | null;
    images: {
        profiles: Image[] | null;
    };
    movieCredits: {
        cast: CastMember[] | null;
        crew: CrewMember[] | null;
    };
};

type PersonType = {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string | null;
    popularity: number;
    profile_path: string | null;
    images: {
        profiles: ImageType[];
    };
    movie_credits: {
        cast: CastMemberType[];
        crew: CrewMemberType[];
    };
};

const convertPerson = (personType: PersonType): Person => {
    return {
        adult: personType.adult,
        alsoKnownAs: personType.also_known_as,
        biography: personType.biography,
        birthday: personType.birthday,
        deathday: personType.deathday ?? null,
        gender: personType.gender,
        homepage: personType.homepage ?? null,
        id: personType.id,
        imdbId: personType.imdb_id,
        knownForDepartment: personType.known_for_department,
        name: personType.name,
        placeOfBirth: personType.place_of_birth ?? null,
        popularity: personType.popularity,
        profilePath: personType.profile_path ?? null,
        images: {
            profiles: personType.images.profiles.length ? personType.images.profiles.map(convertImage) : null
        },
        movieCredits: {
            cast: personType.movie_credits.cast.length ? personType.movie_credits.cast.map(convertCastMember) : null,
            crew: personType.movie_credits.crew.length ? personType.movie_credits.crew.map(convertCrewMember) : null
        }
    };
};

export { Person, PersonType, convertPerson };