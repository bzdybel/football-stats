import React, {
    useState,
    useCallback,
    useLayoutEffect,
    useContext,
} from "react";
import { ImageBackground, ActivityIndicator } from "react-native";
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
import {
    Container,
    Col,
    Dropdown,
    DropdownButton,
    Badge,
} from "react-bootstrap";
import { ThemeContext } from "../index";
import { COLORS } from "../store/constants/colors";
import { Loader } from "../screens/Loader";

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
        <Container style={{ minWidth: "100%" }} className="m-0 p-0 h-100">
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
                    style={{ height: "100%" }}
                >
                    <Container
                        className="h-100 m-0"
                        style={{
                            background: COLORS.darkSecondary,
                            minWidth: "100%",
                        }}
                    >
                        <Col
                            className="d-flex align-items-center justify-content-center"
                            xs={12}
                        >
                            <h1 className="m-3 f">
                                <Badge pill bg="warning">
                                    {leagueDetails?.name}
                                </Badge>
                            </h1>
                        </Col>
                        <Col
                            className="d-flex align-items-center justify-content-center mb-3"
                            xs={12}
                        >
                            <DropdownButton
                                id="dropdown-item-button"
                                title="Dropdown button"
                                variant={`${
                                    isDarkMode ? "secondary" : "primary"
                                }`}
                            >
                                <Container
                                    style={{
                                        maxHeight: "30rem",
                                        overflow: "auto",
                                    }}
                                >
                                    {seasons.map((season: SeasonType) => {
                                        return (
                                            <Dropdown.Item
                                                value={season.year}
                                                onClick={(e) =>
                                                    onSelectSeason({
                                                        year: Number(
                                                            //@ts-ignore
                                                            e.target.value
                                                        ),
                                                    })
                                                }
                                                as="button"
                                                key={`${season.displayName}-${season.year}`}
                                            >
                                                {season.displayName}
                                            </Dropdown.Item>
                                        );
                                    })}
                                </Container>
                            </DropdownButton>
                        </Col>

                        {standings.length ? (
                            <Col
                                className="d-flex align-items-center justify-content-center"
                                xs={12}
                            >
                                <StandingsList
                                    isLoading={isLoadingLeagues}
                                    standings={standings}
                                />
                            </Col>
                        ) : null}
                    </Container>
                </ImageBackground>
            )}
        </Container>
    );
};
