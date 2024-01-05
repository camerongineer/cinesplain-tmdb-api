type Video = {
    iso6391: string;
    iso31661: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    publishedAt: string;
    id: string;
};

type VideoType = {
    "iso_639_1": string;
    "iso_3166_1": string;
    "name": string;
    "key": string;
    "site": string;
    "size": number;
    "type": string;
    "official": boolean;
    "published_at": string;
    "id": string;
};

const convertVideo = (videoType: VideoType): Video => {
    return {
        iso6391: videoType.iso_639_1,
        iso31661: videoType.iso_3166_1,
        name: videoType.name,
        key: videoType.key,
        site: videoType.site,
        size: videoType.size,
        type: videoType.type,
        official: videoType.official,
        publishedAt: videoType.published_at,
        id: videoType.id
    };
};

export { Video, VideoType, convertVideo };
