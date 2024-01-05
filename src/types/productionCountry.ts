type ProductionCountry = {
    iso31661: string;
    name: string;
};

type ProductionCountryType = {
    "iso_3166_1": string;
    "name": string;
};

const convertProductionCountry = (countryType: ProductionCountryType): ProductionCountry => {
    return {
        iso31661: countryType.iso_3166_1,
        name: countryType.name
    };
};

export { ProductionCountry, ProductionCountryType, convertProductionCountry };
