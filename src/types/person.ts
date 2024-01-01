import Image from "./image";
import castMember from "./castMember";
import crewMember from "./crewMember";

type Person = {
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
        profiles: Image[]
    };
    movie_credits: {
        cast: castMember[]
        crew: crewMember[]
    };
}

export default Person;