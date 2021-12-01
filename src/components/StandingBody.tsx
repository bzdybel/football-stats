import React, { useContext } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { Text } from "react-native";
import { headerStats } from "../store/constants/constants";
import { ThemeContext } from "../index";

export type Stat = {
    name: string;
    value: string;
};

export default function StandingBody({ stats }: { stats: Stat[] }) {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <Row className="d-flex p-3">
            {stats
                .filter((elem: Stat) => !headerStats.includes(elem.name))
                .map((e: Stat) => {
                    return (
                        <Col
                            key={`${e.name}-${e.value}`}
                            className="pb-3"
                            xs={6}
                            md={4}
                            lg={2}
                        >
                            <Text>
                                <div
                                    className={`${
                                        isDarkMode
                                            ? "text-secondary"
                                            : "text-dark"
                                    }`}
                                >
                                    {e.name}
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
                                    {e?.value?.length > 0 ? e.value : "-"}
                                </div>
                            </Text>
                        </Col>
                    );
                })}
        </Row>
    );
}
