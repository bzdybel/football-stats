import React, {
    useEffect,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { List } from "../screens/List";
import { Details } from "../screens/Details";
import { Loader } from "../screens/Loader";
import { LeagueType, GeneralStateType } from "../store/reducers/general";
import {
    GET_ALL_LEAGUES_INFORMATION,
    API_URL,
} from "../store/constants/constants";
import { ThemeContext } from "../index";
import { COLORS } from "../store/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export const api = axios.create();

export type MainStackParams = {
    Leagues: undefined;
};

const MainStack = createStackNavigator<MainStackParams>();

export const Main = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const dispatch = useDispatch();
    const { leagues } = useSelector(
        (state: { general: GeneralStateType }) => state.general
    );
    const { toggleDarkMode, isDarkMode } = useContext(ThemeContext);

    const fetchLeagueInformation = useCallback(async () => {
        setIsLoading(true);
        api.get(`${API_URL}/leagues`).then(function (response) {
            saveData(response.data);
        });
    }, []);

    const saveData = (data: LeagueType[]) => {
        setIsLoading(false);
        dispatch({ type: GET_ALL_LEAGUES_INFORMATION, payload: data });
    };

    useEffect(() => {
        fetchLeagueInformation();
    }, [fetchLeagueInformation]);

    const switchMode = useMemo(() => {
        return (
            <View
                style={{
                    minWidth: 20,
                    minHeight: 32,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                }}
            >   
                {isDarkMode ? (
                    <FontAwesome5
                        onPress={() => toggleDarkMode()}
                        name="lightbulb"
                        size={32}
                        color={COLORS.yellow}
                    />
                ) : (
                    <Ionicons
                        onPress={() => toggleDarkMode()}
                        name="moon"
                        size={32}
                        color={COLORS.darkPrimary}
                    />
                )}
            </View>
        );
    }, [isDarkMode]);
    return (
        <MainStack.Navigator>
            <MainStack.Screen
                options={{
                    title: "Leagues",
                    headerTitleStyle: {
                        color: isDarkMode ? COLORS.whiteSmoke : COLORS.black,
                    },
                    headerStyle: {
                        backgroundColor: isDarkMode
                            ? COLORS.darkPrimary
                            : COLORS.whiteSmoke,
                        borderBottomColor: isDarkMode
                            ? COLORS.border
                            : COLORS.border,
                    },
                    headerRight: () => switchMode,
                }}
                name="Leagues"
                component={isLoading ? Loader : List}
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
                                color: isDarkMode
                                    ? COLORS.whiteSmoke
                                    : COLORS.black,
                            },
                            headerStyle: {
                                backgroundColor: isDarkMode
                                    ? COLORS.darkPrimary
                                    : COLORS.whiteSmoke,
                                borderBottomColor: isDarkMode
                                    ? COLORS.border
                                    : COLORS.border,
                            },
                            cardStyle: {
                                backgroundColor: isDarkMode
                                    ? COLORS.darkPrimary
                                    : COLORS.whiteSmoke,
                            },
                            headerRight: () => switchMode,
                        }}
                    />
                );
            })}
        </MainStack.Navigator>
    );
};
