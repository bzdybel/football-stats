import React, {
    useState,
    useCallback,
    useLayoutEffect,
    useContext,
} from "react";
import {
    ImageBackground,
    StyleSheet,
    View,
    Text,
    ScrollView,
} from "react-native";
import axios from "axios";
import {
    GET_LEAGUE_DETAILS,
    GET_SEASONS,
    GET_STANDINGS,
    API_URL,
} from "../store/constants/constants";
import { LeagueType } from "../store/reducers/general";
import {
    StandingType,
    SeasonType,
    DetailsStateType,
} from "../store/reducers/details";
import { useSelector, useDispatch } from "react-redux";
import StandingsList from "../components/Standings";
import { ThemeContext } from "../index";
import { COLORS } from "../store/constants/colors";
import { Loader } from "../screens/Loader";
import SelectDropdown from "react-native-select-dropdown";

export const api = axios.create();

type Props = {
    route: {
        params: {
            id: string;
        };
        key: string;
        name: string;
        path?: any;
    };
};
type Season = {
    name: string;
    desc: string;
    abbreviation: string;
    seasons: [];
};
type Standings = {
    name: string;
    abbreviation: string;
    seasonDisplay: string;
    season: number;
    standings: StandingType[];
};

export const Details = ({ route }: Props) => {
    const dispatch = useDispatch();
    const { isDarkMode } = useContext(ThemeContext);
    const { leagueDetails, seasons, standings } = useSelector(
        (state: { details: DetailsStateType }) => state.details
    );

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingLeagues, setIsLoadingLeagues] = useState<boolean>(false);

    const fetchAvailableSeasons = useCallback(async () => {
        setIsLoading(true);
        api.get(`${API_URL}/leagues/${route.params.id}/seasons`).then(function (
            response
        ) {
            saveSeasons(response.data.data);
        });
    }, []);

    const fetchLeagueDetails = useCallback(async () => {
        setIsLoading(true);
        api.get(`${API_URL}/leagues/${route.params.id}`).then(function (
            response
        ) {
            saveData(response.data.data);
        });
    }, []);

    const fetchStandings = useCallback(async (season: number) => {
        setIsLoadingLeagues(true);
        api.get(
            `${API_URL}/leagues/${route.params.id}/standings?season=${season}&sort=asc`
        ).then(function (response) {
            saveStandings(response.data.data);
        });
    }, []);

    const saveData = (data: LeagueType[] | null) => {
        dispatch({ type: GET_LEAGUE_DETAILS, payload: data });
        setIsLoading(false);
    };

    const saveSeasons = (data: Season) => {
        dispatch({ type: GET_SEASONS, payload: data.seasons });
        setIsLoading(false);
    };

    const saveStandings = (data: Standings | { standings: {} }) => {
        dispatch({ type: GET_STANDINGS, payload: data.standings });
        setIsLoadingLeagues(false);
    };

    const onSelectSeason = (season: { year: number }) => {
        fetchStandings(season.year);
    };

    useLayoutEffect(() => {
        fetchLeagueDetails();
        fetchAvailableSeasons();
        return () => {
            saveData(null);
            saveStandings({ standings: {} });
        };
    }, [fetchLeagueDetails, fetchAvailableSeasons]);

    return (
        <View style={[styles.detailsContainer]}>
            {isLoading ? (
                <Loader />
            ) : (
                <ImageBackground
                    source={{
                        uri: isDarkMode
                            ? leagueDetails?.logos?.dark
                            : leagueDetails?.logos?.light,
                    }}
                    resizeMode="contain"
                    style={{ height: "100%", width: "100%" }}
                >
                    <View style={[styles.container]}>
                        <View style={[styles.titleWrapper]}>
                            <Text style={[styles.badge]}>
                                {leagueDetails?.name}
                            </Text>
                        </View>
                        <View style={[styles.dropdownWrapper]}>
                            <View style={styles.selectWrapper}>
                                <SelectDropdown
                                    data={seasons}
                                    onSelect={(selectedItem) =>
                                        onSelectSeason(selectedItem)
                                    }
                                    buttonTextAfterSelection={(selectedItem) =>
                                        selectedItem.displayName
                                    }
                                    rowTextForSelection={(item) =>
                                        item.displayName
                                    }
                                    dropdownStyle={styles.dropdown}
                                    buttonStyle={
                                        isDarkMode
                                            ? styles.darkButton
                                            : styles.buttonStyle
                                    }
                                    rowStyle={styles.rowStyle}
                                    rowTextStyle={styles.rowTextStyle}
                                    buttonTextStyle={styles.buttonTextStyle}
                                />

                                {standings.length ? (
                                    <View style={[styles.leagueList]}>
                                        <ScrollView
                                            style={{
                                                width: "100%",
                                                flex: 1,
                                            }}
                                            contentContainerStyle={{
                                                alignItems: "center",
                                            }}
                                        >
                                            <StandingsList
                                                isLoading={isLoadingLeagues}
                                                standings={standings}
                                            />
                                        </ScrollView>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    detailsContainer: {
        margin: 0,
        padding: 0,
        height: "100%",
        width: "100%",
    },
    container: {
        backgroundColor: COLORS.darkSecondary,
        width: "100%",
        height: "100%",
        margin: 0,
    },
    titleWrapper: {
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    badge: {
        backgroundColor: COLORS.yellow,
        borderRadius: 20,
        color: COLORS.white,
        padding: 16,
    },
    dropdownWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 3,
        width: "100%",
    },
    leagueList: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
        maxHeight: "100%",
    },
    dropdown: {
        paddingVertical: 10,
        minWidth: 320,
    },
    darkButton: {
        minWidth: 320,
        borderRadius: 10,
        backgroundColor: COLORS.darkPrimary,
        borderColor: COLORS.darkSecondary,
        borderWidth: 3,
        marginBottom: 16,
    },
    buttonStyle: {
        minWidth: 320,
        borderRadius: 10,
        backgroundColor: "transparent",
        borderColor: COLORS.white,
        borderWidth: 3,
        marginBottom: 16,
    },
    rowStyle: {
        padding: 10,
        flex: 1,
        justifyContent: "flex-start",
        minWidth: "100%",
    },
    selectWrapper: {
        flex: 1,
        alignItems: "center",
        width: "100%",
    },
    rowTextStyle: {
        textAlign: "left",
    },
    buttonTextStyle: {
        color: COLORS.yellow,
    },
});
