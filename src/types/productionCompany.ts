type ProductionCompany = {
    id: number;
    logoPath: string;
    name: string;
    originCountry: string;
};

type ProductionCompanyType = {
    "id": number;
    "logo_path": string;
    "name": string;
    "origin_country": string;
};

const convertProductionCompany = (companyType: ProductionCompanyType): ProductionCompany => {
    return {
        id: companyType.id,
        logoPath: companyType.logo_path,
        name: companyType.name,
        originCountry: companyType.origin_country
    };
};

export { ProductionCompany, ProductionCompanyType, convertProductionCompany };
