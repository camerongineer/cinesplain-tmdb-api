type Credits = {
    id: number
    cast: Credit[]
    crew: Credit[]
}

type CreditsType = {
    id: number
    cast: CreditType[]
    crew: CreditType[]
}

type CreditType = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
};

type Credit = {
    adult: boolean;
    gender: number;
    id: number;
    knownForDepartment: string;
    name: string;
    originalName: string;
    popularity: number;
    profilePath: string | null;
    castId: number;
    character: string;
    creditId: string;
    order: number;
};

const convertCredit = (creditType: CreditType): Credit => {
    return {
        adult: creditType.adult,
        gender: creditType.gender,
        id: creditType.id,
        knownForDepartment: creditType.known_for_department,
        name: creditType.name,
        originalName: creditType.original_name,
        popularity: creditType.popularity,
        profilePath: creditType.profile_path ?? null,
        castId: creditType.cast_id,
        character: creditType.character,
        creditId: creditType.credit_id,
        order: creditType.order
    };
};

export { Credits, CreditsType, Credit, CreditType, convertCredit };
