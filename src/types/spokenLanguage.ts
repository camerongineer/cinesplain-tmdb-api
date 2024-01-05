type SpokenLanguage = {
    englishName: string;
    iso6391: string;
    name: string;
};

type SpokenLanguageType = {
    "english_name": string;
    "iso_639_1": string;
    "name": string;
};

const convertSpokenLanguage = (languageType: SpokenLanguageType): SpokenLanguage => {
    return {
        englishName: languageType.english_name,
        iso6391: languageType.iso_639_1,
        name: languageType.name
    };
};

export { SpokenLanguage, SpokenLanguageType, convertSpokenLanguage };
