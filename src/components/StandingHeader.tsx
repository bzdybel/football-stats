import React, { useContext } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Text } from "react-native";
import { headerStats } from "../store/constants/constants";
import { ThemeContext } from "../index";
import { StandingType } from "../store/reducers/details";
import { Stat } from "./StandingBody";

type Prop = {
    title: StandingType["team"]["name"];
    image: StandingType["team"]["logos"][0]["href"];
    subtitle: StandingType["team"]["location"];
    id: StandingType["team"]["id"];
    stats: Stat[];
};

export default function StandingHeader({ item }: { item: Prop }) {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <Row className="w-100">
            <Col xs={4} md={2} lg={2}>
                <Image style={{ width: "5rem" }} src={item.image} />
            </Col>
            <Col xs={8} md={4} lg={4}>
                <h5
                    className={`${isDarkMode ? "text-secondary" : "text-dark"}`}
                >
                    {item.title}
                </h5>
                <h6
                    className={`${
                        isDarkMode ? "text-light" : "text-secondary"
                    }`}
                >
                    {item.subtitle}
                </h6>
            </Col>
            <Col xs={12} md={6} lg={6}>
                <Row className="d-flex p-3">
                    {headerStats.map((name) => {
                        return (
                            <Col key={`${item.id}-${name}`}>
                                <Text>
                                    <div
                                        className={`${
                                            isDarkMode
                                                ? "text-secondary"
                                                : "text-dark"
                                        }`}
                                    >
                                        {name}
                                    </div>
                                </Text>
                                <Text>
                                    <div
                                        className={`${
                                            isDarkMode
                                                ? "text-light"
                                                : "text-secondary"
                                        }`}
                                    >
                                        {
                                            item.stats.find(
                                                (e: {
                                                    name: string;
                                                    value: string;
                                                }) => e.name == name
                                            )?.value
                                        }
                                    </div>
                                </Text>
                            </Col>
                        );
                    })}
                </Row>
            </Col>
        </Row>
    );
}
