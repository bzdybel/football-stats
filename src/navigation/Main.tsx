import React, { useEffect, useCallback, useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { List } from "../screens/List";
import { Details } from "../screens/Details";
import { LeagueType } from "../store/reducers/general";
import {
    GET_ALL_LEAGUES_INFORMATION,
    API_URL,
} from "../store/constants/actionTypes";
import { Form } from "react-bootstrap";
import { ThemeContext } from "../index";

export const api = axios.create();

export type MainStackParams = {
    Leagues: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();

export const Main = () => {
    const dispatch = useDispatch();
    const { leagues } = useSelector((state: any) => state.general);
    const { toggleDarkMode, isDarkMode } = useContext(ThemeContext);

    const fetchLeagueInformation = useCallback(async () => {
        api.get(`${API_URL}/leagues`).then(function (response) {
            saveData(response.data);
        });
    }, []);

    const saveData = (data: LeagueType[]) =>
        dispatch({ type: GET_ALL_LEAGUES_INFORMATION, payload: data });

    useEffect(() => {
        fetchLeagueInformation();
    }, [fetchLeagueInformation]);

    return (
        <MainStack.Navigator>
            <MainStack.Screen
                options={{
                    title: "Leagues",
                    headerTitleStyle: { color: isDarkMode ? "#FFF" : "" },
                    headerStyle: {
                        backgroundColor: isDarkMode ? "#0d1117" : "#FFF",
                        borderBottomColor: isDarkMode ? "#30363d" : "",
                    },
                    headerRight: () => (
                        <Form>
                            <Form.Check
                                onChange={toggleDarkMode}
                                type="switch"
                                id="custom-switch"
                                checked={isDarkMode}
                            />
                        </Form>
                    ),
                }}
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
                            headerTitleStyle: {
                                color: isDarkMode ? "#FFF" : "",
                            },
                            headerStyle: {
                                backgroundColor: isDarkMode
                                    ? "#0d1117"
                                    : "#FFF",
                                borderBottomColor: isDarkMode ? "#30363d" : "",
                            },
                            cardStyle: {
                                backgroundColor: isDarkMode
                                    ? "#0d1117"
                                    : "#FFF",
                            },
                            headerRight: () => (
                                <Form>
                                    <Form.Check
                                        onChange={toggleDarkMode}
                                        type="switch"
                                        id="custom-switch"
                                        checked={isDarkMode}
                                    />
                                </Form>
                            ),
                        }}
                    />
                );
            })}
        </MainStack.Navigator>
    );
};
