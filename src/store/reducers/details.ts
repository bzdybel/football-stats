import {
    GET_LEAGUE_DETAILS,
    GET_SEASONS,
    GET_STANDINGS,
} from "../constants/actionTypes";

export type LeagueType = {
    abbr: string;
    id: string;
    logos: { light: string; dark: string };
    name: string;
    slug: string;
};
export type Stat = {
    abbreviation: LeagueType["abbr"];
    description: string;
    displayName: string;
    displayValue: string;
    name: string;
    shortDisplayName: string;
    type: string;
    value: number;
};
export type StandingType = {
    team: {
        abbreviation: LeagueType["abbr"];
        displayName: string;
        id: LeagueType["id"];
        isActive: boolean;
        location: string;
        logos: { href: string }[];
        name: string;
        shortDisplayName: string;
        uid: string;
    };
    stats: Stat[];
};
export interface DetailsStateType {
    leagueDetails: LeagueType | {};
    seasons: [];
    standings: StandingType[];
}

export const initialState: DetailsStateType = {
    leagueDetails: {},
    seasons: [],
    standings: [],
};

export default (
    state = initialState,
    action: {
        type: string;
        payload: any;
    }
) => {
    switch (action.type) {
        case GET_LEAGUE_DETAILS:
            return {
                ...state,
                leagueDetails: action.payload,
            };
        case GET_SEASONS:
            return {
                ...state,
                seasons: action.payload,
            };
        case GET_STANDINGS:
            return {
                ...state,
                standings: action.payload,
            };
        default:
            return state;
    }
};
