type Collection = {
    id: number;
    name: string;
    posterPath: string;
    backdropPath: string;
};

type CollectionType = {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
};

const convertCollection = (collectionType: CollectionType | undefined): Collection | null => {
    if (!collectionType) return null;
    return {
        id: collectionType.id,
        name: collectionType.name,
        posterPath: collectionType.poster_path,
        backdropPath: collectionType.backdrop_path
    };
};

export { Collection, CollectionType, convertCollection };