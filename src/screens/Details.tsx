import React, { useState, useCallback, useLayoutEffect } from "react";
import {
    ImageBackground,
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
} from "react-native";
import axios from "axios";
import {
    GET_LEAGUE_DETAILS,
    GET_SEASONS,
    GET_STANDINGS,
} from "../store/constants/actionTypes";
import { LeagueType } from "../store/reducers/general";
import { StandingType } from "../store/reducers/details";
import { useSelector, useDispatch } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import StandingsList from "../components/Standings";
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
    const { leagueDetails, seasons, standings } = useSelector(
        (state: any) => state.details
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchAvailableSeasons = useCallback(async () => {
        setIsLoading(true);
        api.get(
            `https://api-football-standings.azharimm.site/leagues/${route.params.id}/seasons`
        ).then(function (response) {
            saveSeasons(response.data.data);
        });
    }, []);

    const fetchLeagueDetails = useCallback(async () => {
        setIsLoading(true);
        api.get(
            `https://api-football-standings.azharimm.site/leagues/${route.params.id}`
        ).then(function (response) {
            saveData(response.data.data);
        });
    }, []);

    const fetchStandings = useCallback(async (season: number) => {
        api.get(
            `https://api-football-standings.azharimm.site/leagues/${route.params.id}/standings?season=${season}&sort=asc`
        ).then(function (response) {
            saveStandings(response.data.data);
        });
    }, []);

    const saveData = (data: LeagueType[] | {}) => {
        dispatch({ type: GET_LEAGUE_DETAILS, payload: data });
        setIsLoading(false);
    };

    const saveSeasons = (data: Season) => {
        dispatch({ type: GET_SEASONS, payload: data.seasons });
        setIsLoading(false);
    };

    const saveStandings = (data: Standings | { standings: {} }) => {
        dispatch({ type: GET_STANDINGS, payload: data.standings });
    };

    const onSelectSeason = (season: { year: number }) => {
        fetchStandings(season.year);
    };

    useLayoutEffect(() => {
        fetchLeagueDetails();
        fetchAvailableSeasons();
        return () => {
            saveData({});
            saveStandings({ standings: {} });
        };
    }, [fetchLeagueDetails, fetchAvailableSeasons]);

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                {isLoading ? (
                    <View style={[styles.indicator, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#DAA520" />
                    </View>
                ) : (
                    <ImageBackground
                        source={{ uri: leagueDetails?.logos?.light }}
                        resizeMode="contain"
                        style={styles.image}
                    >
                        <View style={styles.containerWrapper}>
                            <Text style={styles.text}>
                                {leagueDetails.name}
                            </Text>
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
                                    buttonStyle={styles.buttonStyle}
                                    rowStyle={styles.rowStyle}
                                    rowTextStyle={styles.rowTextStyle}
                                    buttonTextStyle={styles.buttonTextStyle}
                                />

                                {standings.length ? (
                                    <StandingsList standings={standings} />
                                ) : null}
                            </View>
                        </View>
                    </ImageBackground>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
    },
    containerWrapper: {
        flex: 1,
        backgroundColor: "#000000c0",
        height: "100%",
    },
    image: {
        flex: 1,
        justifyContent: "flex-start",
    },

    text: {
        color: "#DAA520",
        fontSize: 24,
        lineHeight: 32,
        fontWeight: "bold",
        textAlign: "center",
        paddingTop: 10,
        marginBottom: 10,
    },
    dropdown: {
        paddingVertical: 10,
        minWidth: 320,
    },
    buttonStyle: {
        margin: "0 10rem",
        minWidth: 320,
        borderRadius: 10,
        backgroundColor: "transparent",
        borderColor: "#FFF",
        borderWidth: 3,
        marginBottom: "1rem",
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
    },
    rowTextStyle: {
        textAlign: "left",
    },
    buttonTextStyle: {
        color: "#DAA520",
    },
    indicator: {
        flex: 1,
        justifyContent: "center",
    },
    horizontal: {
        backgroundColor: "#000000c0",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
});
