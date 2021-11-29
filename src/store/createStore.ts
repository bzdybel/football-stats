import { combineReducers, createStore } from "redux";
import general from "./reducers/general";
import details from "./reducers/details";

export const store = createStore(
    combineReducers({
        general: general || (() => null),
        details: details || (() => null),
    })
);
