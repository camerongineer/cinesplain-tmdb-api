type CrewMember = {
    adult: boolean;
    gender: number;
    id: number;
    knownForDepartment: string;
    name: string;
    originalName: string;
    popularity: number;
    profilePath: string | null;
    creditId: string;
    department: string;
    job: string;
};

type CrewMemberType = {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
};

const convertCrewMember = (crewMemberType: CrewMemberType): CrewMember => {
    return {
        adult: crewMemberType.adult,
        gender: crewMemberType.gender,
        id: crewMemberType.id,
        knownForDepartment: crewMemberType.known_for_department,
        name: crewMemberType.name,
        originalName: crewMemberType.original_name,
        popularity: crewMemberType.popularity,
        profilePath: crewMemberType.profile_path ?? null,
        creditId: crewMemberType.credit_id,
        department: crewMemberType.department,
        job: crewMemberType.job
    };
};

export { CrewMember, CrewMemberType, convertCrewMember };