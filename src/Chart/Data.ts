export const SELECT_COUNTRY = "SELECT_COUNTRY";
export const BACK_COUNTRY = "BACK_COUNTRY";

export interface IRawData {
    city?: string;
    country?: string;
    population: number;
    key?: string;
}

export const rawData: IRawData[] = [
    {
        city: "New York City",
        country: "US",
        population: 8175133
    },
    {
        city: "Denver",
        country: "US",
        population: 600158
    },
    {
        city: "Dallas",
        country: "US",
        population: 1197816
    },
    {
        city: "Portland",
        country: "US",
        population: 583776
    },
    {
        city: "Manchester",
        country: "UK",
        population: 2553379
    },
    {
        city: "London",
        country: "UK",
        population: 9787426
    },
    {
        city: "Nottingham",
        country: "UK",
        population: 729997
    },
    {
        city: "Salvador",
        country: "BR",
        population: 2480790
    },
    {
        city: "BR",
        country: "BR",
        population: 2480790
    },
    {
        city: "Rio de Janeiro",
        country: "BR",
        population: 5940224
    },
    {
        city: "Fortaleza",
        country: "BR",
        population: 2315116
    }
];

export const selectCountry = (payload: unknown) => {
    return {
        type: SELECT_COUNTRY,
        payload
    };
};

export const backCountry = () => {
    return {
        type: BACK_COUNTRY
    };
};

/**
 * @param {City[]} cities
 * @param {string} group_key
 * @returns {ChartConfigItem[]}
 */
function convertToConfig(cities: IRawData[], group_keys: string[]): IRawData[] {
    const config = cities.reduce((prev, city: IRawData) => {
        const key = group_keys.reduce((prev, k, i, a) => {
            if (prev === "N/A") {
                return prev;
            } else if (k in city) {
                return prev + city[k];
            } else {
                return "N/A";
            }
        }, "");

        if (!prev.has(key)) {
            prev.set(key, {
                ...city,
                key
            });
        } else {
            const place = prev.get(key);
            prev.set(key, {
                ...place,
                population: place.population + city.population
            });
        }
        return prev;
    }, new Map<string, IRawData>());

    return [...config.values()];
}

export const initialState = {
    data: convertToConfig(rawData, ["country"]),
    mode: "country",
    country: null
};
