import React, { useMemo, useState, useContext } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { ListItem } from "../components/List";
import { MainStackParams } from "../navigation/Main";
import { LeagueType } from "../store/reducers/general";
import {
    SHOW_FAVOURITES,
    SHOW_ALL,
    SET_LEAGUES,
} from "../store/constants/actionTypes";
import { ListGroup, Col, Row, Button, Form } from "react-bootstrap";
import { ThemeContext } from "../index";

type Props = {
    navigation: StackNavigationProp<MainStackParams, "Leagues">;
};

export const List = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const { isDarkMode } = useContext(ThemeContext);

    const { leagues, originalLeagues, favouriteLeagues } = useSelector(
        (state: any) => state.general
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
            <div style={{ background: isDarkMode ? "#010409" : "" }}>
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
                                    ? "info"
                                    : "outline-info"
                            }`}
                            style={{ color: isDarkMode ? "#FFF" : "" }}
                        >
                            {"Show favourites"}
                        </Button>
                    </Col>
                    <Col className="ms-n6 align-items-center" xs={6}>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    style={{
                                        background: isDarkMode ? "#010409" : "",
                                        borderColor: isDarkMode
                                            ? "#30363d"
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
                style={{
                    height: "100%",
                    backgroundColor: isDarkMode ? "#0d1117" : "",
                    borderColor: isDarkMode ? "#30363d" : "",
                }}
            >
                {screens.map((item: any) => {
                    return (
                        <ListGroup.Item
                            key={item.id}
                            style={{
                                cursor: "pointer",
                                backgroundColor: isDarkMode ? "#0d1117" : "",
                                borderColor: isDarkMode ? "#30363d" : "",
                            }}
                            onClick={() =>
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
                })}
            </ListGroup>
        </>
    );
};
