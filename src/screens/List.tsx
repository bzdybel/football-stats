import React, { useMemo, useState, useContext } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from "../components/List";
import { MainStackParams } from "../navigation/Main";
import { LeagueType, GeneralStateType } from "../store/reducers/general";
import {
    SHOW_FAVOURITES,
    SHOW_ALL,
    SET_LEAGUES,
} from "../store/constants/constants";
import { ListGroup, Col, Row, Button, Form } from "react-bootstrap";
import { ThemeContext } from "../index";
import { COLORS } from "../store/constants/colors";
import { Entypo } from "@expo/vector-icons";

type Props = {
    navigation: StackNavigationProp<MainStackParams, "Leagues">;
};
type League = {
    title: LeagueType["name"];
    subtitle: LeagueType["abbr"];
    target: LeagueType["slug"];
    image: LeagueType["logos"];
    id: LeagueType["id"];
};

export const List = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const { isDarkMode } = useContext(ThemeContext);

    const { leagues, originalLeagues, favouriteLeagues } = useSelector(
        (state: { general: GeneralStateType }) => state.general
    );
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [filterValue, onFilterChange] = useState<string>("");

    const toggleSwitch = () => {
        isEnabled
            ? dispatch({ type: SHOW_ALL, payload: filterValue })
            : dispatch({ type: SHOW_FAVOURITES, payload: filterValue });
        setIsEnabled((previousState) => !previousState);
    };
    const onChangeText = (text: string) => {
        onFilterChange(text);
        const correctLeague = isEnabled
            ? [...favouriteLeagues]
            : [...originalLeagues];

        const leaguesCopy = correctLeague.filter(
            (e: LeagueType) =>
                e.name.toLowerCase().includes(text.toLowerCase()) ||
                e.abbr.toLowerCase().includes(text.toLowerCase())
        );

        dispatch({
            type: SET_LEAGUES,
            payload:
                text.length > 0
                    ? leaguesCopy
                    : isEnabled
                    ? favouriteLeagues
                    : originalLeagues,
        });
    };

    const screens = useMemo(
        () =>
            leagues.map((e: LeagueType) => {
                return {
                    title: e.name,
                    subtitle: e.abbr,
                    target: e.slug,
                    image: e.logos,
                    id: e.id,
                };
            }),
        [leagues]
    );

    return (
        <>
            <div
                style={{ background: isDarkMode ? COLORS.black : COLORS.white }}
            >
                <Row className="d-flex p-3 align-items-center">
                    <Col xs={6}>
                        <Button
                            className="w-100"
                            onClick={toggleSwitch}
                            variant={`${
                                isDarkMode
                                    ? isEnabled
                                        ? "dark"
                                        : "outline-dark"
                                    : isEnabled
                                    ? "warning"
                                    : "outline-warning"
                            }`}
                            style={{
                                color: isDarkMode ? COLORS.whiteSmoke : "",
                            }}
                        >
                            {"Show favourites"}
                        </Button>
                    </Col>
                    <Col className="ms-n6 align-items-center" xs={6}>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    style={{
                                        background: isDarkMode
                                            ? COLORS.darkSecondary
                                            : "",
                                        borderColor: isDarkMode
                                            ? COLORS.border
                                            : "",
                                    }}
                                    type="text"
                                    placeholder="Search by name"
                                    value={filterValue}
                                    onChange={(e) =>
                                        onChangeText(e.target.value)
                                    }
                                />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </div>
            <ListGroup
                className="h-100"
                bsPrefix={isDarkMode ? "list-group-custom" : ""}
            >
                {screens.length > 0 ? (
                    screens.map((item: League) => {
                        return (
                            <ListGroup.Item
                                key={item.id}
                                className="p-3"
                                bsPrefix={`pointer ${
                                    isDarkMode
                                        ? "list-group-item-black"
                                        : "list-group-item-white"
                                }`}
                                onClick={() =>
                                    //@ts-ignore
                                    navigation.navigate(item.target, {
                                        id: item.id,
                                    })
                                }
                            >
                                <ListItem
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    image={item.image}
                                    id={item.id}
                                />
                            </ListGroup.Item>
                        );
                    })
                ) : (
                    <Col
                        style={{ maxHeight: "15rem" }}
                        className="w-100 d-flex flex-direction-column align-items-center justify-content-center"
                    >
                        <Row>
                            <Entypo
                                name="traffic-cone"
                                size={86}
                                color={COLORS.yellow}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            />
                            <h1 className="d-flex justify-content-center">
                                There is no data here
                            </h1>
                        </Row>
                    </Col>
                )}
            </ListGroup>
        </>
    );
};
