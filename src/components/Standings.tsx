import React, { useMemo, useContext } from "react";
import { Text } from "react-native";
import { StandingType, Stat } from "../store/reducers/details";
import { Accordion } from "react-bootstrap";
import { Col, Row, Image } from "react-bootstrap";
import { ThemeContext } from "../index";

export default function StandingsList({
    standings,
}: {
    standings: StandingType[];
}) {
    const { isDarkMode } = useContext(ThemeContext);

    const headerStats = ["Wins", "Losses", "Draws", "Overall"];
    const screens = useMemo(
        () =>
            standings?.map((e: any) => {
                return {
                    title: e.team.name,
                    image: e.team.logos[0].href,
                    subtitle: e.team.location,
                    id: e.team.id,
                    stats: e.stats.map((e: Stat) => {
                        return {
                            name: e.displayName,
                            value: e.displayValue,
                        };
                    }),
                };
            }),
        [standings]
    );
    return (
        <Accordion style={{ width: "90%" }}>
            {screens.map((item) => {
                return (
                    <Accordion.Item
                        style={{ background: isDarkMode ? "#000000c0" : "" }}
                        eventKey={item.id}
                    >
                        <Accordion.Header
                            bsPrefix={`${
                                isDarkMode ? "accordion-custom-dark" : ""
                            }`}
                        >
                            <Row className="w-100">
                                <Col xs={4} md={2} lg={2}>
                                    <Image
                                        style={{ width: "5rem" }}
                                        src={item.image}
                                    />
                                </Col>
                                <Col xs={8} md={4} lg={4}>
                                    <h5
                                        className={`${
                                            isDarkMode
                                                ? "text-secondary"
                                                : "text-dark"
                                        }`}
                                    >
                                        {item.title}
                                    </h5>
                                    <h6
                                        className={`${
                                            isDarkMode
                                                ? "text-light"
                                                : "text-secondary"
                                        }`}
                                    >
                                        {item.subtitle}
                                    </h6>
                                </Col>
                                <Col xs={12} md={6} lg={6}>
                                    <Row className="d-flex p-3">
                                        {headerStats.map((name) => {
                                            return (
                                                <Col>
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
                                                                    }) =>
                                                                        e.name ==
                                                                        name
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
                        </Accordion.Header>
                        <Accordion.Body>
                            <Row className="d-flex p-3">
                                {item.stats
                                    .filter(
                                        (elem: {
                                            name: string;
                                            value: string;
                                        }) => !headerStats.includes(elem.name)
                                    )
                                    .map(
                                        (e: {
                                            name: string;
                                            value: string;
                                        }) => {
                                            return (
                                                <Col
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
                                                            {e?.value?.length >
                                                            0
                                                                ? e.value
                                                                : "-"}
                                                        </div>
                                                    </Text>
                                                </Col>
                                            );
                                        }
                                    )}
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
}
