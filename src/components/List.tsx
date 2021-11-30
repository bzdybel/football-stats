import React, { useCallback, useMemo, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
    ADD_LEAGUE_TO_FAVOURITE,
    REMOVE_LEAGUE_FROM_FAVOURITE,
} from "../store/constants/actionTypes";
import { LeagueType } from "../store/reducers/general";
import { Col, Row, Image } from "react-bootstrap";
import { ThemeContext } from "../index";

type ListItemProps = {
    title: LeagueType["name"];
    subtitle: LeagueType["abbr"];
    image: LeagueType["logos"];
    id: LeagueType["id"];
};

export const ListItem = ({ title, subtitle, image, id }: ListItemProps) => {
    const dispatch = useDispatch();
    const { favouriteLeagues } = useSelector((state: any) => state.general);
    const { isDarkMode } = useContext(ThemeContext);

    const addToFavourites = useCallback((id: LeagueType["id"]) => {
        dispatch({ type: ADD_LEAGUE_TO_FAVOURITE, payload: { id } });
    }, []);

    const removeFromFavourites = useCallback((id: LeagueType["id"]) => {
        dispatch({ type: REMOVE_LEAGUE_FROM_FAVOURITE, payload: { id } });
    }, []);

    const isCurrentElementFavourite = useMemo(() => {
        return favouriteLeagues.some((league: LeagueType) => league.id === id);
    }, [favouriteLeagues, id]);

    return (
        <Row xs={12} md={8} lg={4}>
            <Col xs={4} md={2} lg={1}>
                <Image
                    style={{ width: "5rem", minHeight: "5rem" }}
                    src={isDarkMode ? image.dark : image.light}
                />
            </Col>
            <Col xs={7} md={4} lg={3}>
                <h5
                    className={`${isDarkMode ? "text-secondary" : "text-dark"}`}
                >
                    {title}
                </h5>
                <h6
                    className={`${
                        isDarkMode ? "text-light" : "text-secondary"
                    }`}
                >
                    {subtitle}
                </h6>
            </Col>
            <Col className="d-flex align-items-center" xs={1}>
                {isCurrentElementFavourite ? (
                    <Ionicons
                        name="heart-sharp"
                        size={24}
                        color="#fb3958"
                        onPress={() => removeFromFavourites(id)}
                    />
                ) : (
                    <Ionicons
                        onPress={() => addToFavourites(id)}
                        name="heart-outline"
                        size={24}
                        color="#606060"
                    />
                )}
            </Col>
        </Row>
    );
};
