// import { ActionType, createReducer } from 'typesafe-actions';
// import actions from '../../index';

// export type GeneralActionsType = ActionType<typeof actions>;

// const generalReducer = createReducer<GeneralStateType, GeneralActionsType>(
//   initialState,
// );

// export default generalReducer;

import { GET_ALL_LEAGUES_INFORMATION } from '../constants/actionTypes';

export type LeagueType = {
  abbr: string;
  id: string;
  logos: { light: string; dark: string };
  name: string;
  slug: string;
};
export interface GeneralStateType {
  leagues: LeagueType[];
}

export const initialState: GeneralStateType = {
  leagues: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LEAGUES_INFORMATION:
      return {
        ...state,
        leagues: action.payload.data,
      };
    default:
      return state;
  }
};
