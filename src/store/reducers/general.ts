import {
    GET_ALL_LEAGUES_INFORMATION,
    ADD_LEAGUE_TO_FAVOURITE,
    REMOVE_LEAGUE_FROM_FAVOURITE,
    SHOW_FAVOURITES,
    SHOW_ALL,
    SET_LEAGUES,
} from "../constants/constants";

export type LeagueType = {
    abbr: string;
    id: string;
    logos: { light: string; dark: string };
    name: string;
    slug: string;
};
export interface GeneralStateType {
    originalLeagues: LeagueType[];
    leagues: LeagueType[];
    favouriteLeagues: LeagueType[];
}

export const initialState: GeneralStateType = {
    originalLeagues: [],
    leagues: [],
    favouriteLeagues: [],
};

export default (
    state = initialState,
    action: {
        type: string;
        payload: any;
    }
) => {
    switch (action.type) {
        case GET_ALL_LEAGUES_INFORMATION:
            return {
                ...state,
                leagues: action.payload.data,
                originalLeagues: action.payload.data,
            };
        case ADD_LEAGUE_TO_FAVOURITE:
            return {
                ...state,
                favouriteLeagues: [
                    ...state.favouriteLeagues,
                    state.leagues.find((e) => e.id === action.payload.id),
                ],
            };
        case REMOVE_LEAGUE_FROM_FAVOURITE:
            return {
                ...state,
                favouriteLeagues: [
                    ...state.favouriteLeagues.filter(
                        (e) => e.id !== action.payload.id
                    ),
                ],
            };
        case SHOW_FAVOURITES:
            return {
                ...state,
                leagues:
                    action.payload.length > 0
                        ? [...state.favouriteLeagues].filter(
                              (e: LeagueType) =>
                                  e.name
                                      .toLowerCase()
                                      .includes(
                                          action.payload?.toLowerCase()
                                      ) ||
                                  e.abbr
                                      .toLowerCase()
                                      .includes(action.payload?.toLowerCase())
                          )
                        : [...state.favouriteLeagues],
            };
        case SHOW_ALL:
            return {
                ...state,
                leagues:
                    action.payload.length > 0
                        ? [...state.originalLeagues].filter(
                              (e: LeagueType) =>
                                  e.name
                                      .toLowerCase()
                                      .includes(
                                          action.payload?.toLowerCase()
                                      ) ||
                                  e.abbr
                                      .toLowerCase()
                                      .includes(action.payload?.toLowerCase())
                          )
                        : [...state.originalLeagues],
            };
        case SET_LEAGUES:
            return {
                ...state,
                leagues: action.payload,
            };
        default:
            return state;
    }
};
