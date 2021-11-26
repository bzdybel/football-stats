import React, { useEffect, useCallback, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { List } from "../screens/List";
import { Details } from "../screens/Details";
import { LeagueType } from "../store/reducers/general";
import { GET_ALL_LEAGUES_INFORMATION } from "../store/constants/actionTypes";

export const api = axios.create();

export type MainStackParams = {
    Leagues: undefined;
    TextDemo: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();

export const Main = () => {
    const dispatch = useDispatch();

    const { leagues } = useSelector((state: any) => state.general);

    const fetchLeagueInformation = useCallback(async () => {
        api.get("https://api-football-standings.azharimm.site/leagues").then(
            function (response) {
                saveData(response.data);
            }
        );
    }, []);

    const saveData = (data: LeagueType[]) =>
        dispatch({ type: GET_ALL_LEAGUES_INFORMATION, payload: data });

    useEffect(() => {
        fetchLeagueInformation();
    }, [fetchLeagueInformation]);

    return (
        <MainStack.Navigator>
            <MainStack.Screen
                options={{ title: "Leagues" }}
                name="Leagues"
                component={List}
            />
            {leagues.map((e: LeagueType) => {
                return (
                    <MainStack.Screen
                        key={e.id}
                        name={e.slug as keyof MainStackParams}
                        component={Details}
                        options={{
                            headerTitle: e.name,
                        }}
                    />
                );
            })}
        </MainStack.Navigator>
    );
};
