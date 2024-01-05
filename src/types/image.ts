type Image = {
    aspectRatio: number;
    height: number;
    iso6391: string;
    filePath: string;
    voteAverage: number;
    voteCount: number;
    width: number;
};

type ImageType = {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
};

const convertImage = (imageType: ImageType): Image => {
    return {
        aspectRatio: imageType.aspect_ratio,
        height: imageType.height,
        iso6391: imageType.iso_639_1,
        filePath: imageType.file_path,
        voteAverage: imageType.vote_average,
        voteCount: imageType.vote_count,
        width: imageType.width,
    };
};

export { Image, ImageType, convertImage };
