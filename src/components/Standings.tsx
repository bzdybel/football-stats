import React, { useMemo, useContext } from "react";
import { StandingType, Stat } from "../store/reducers/details";
import { Accordion, Container } from "react-bootstrap";
import { ThemeContext } from "../index";
import { COLORS } from "../store/constants/colors";
import StandingBody from "./StandingBody";
import StandingHeader from "./StandingHeader";
import { ActivityIndicator } from "react-native";
import { Loader } from "../screens/Loader";

export default function StandingsList({
    standings,
    isLoading,
}: {
    standings: StandingType[];
    isLoading: boolean;
}) {
    const { isDarkMode } = useContext(ThemeContext);

    const screens = useMemo(
        () =>
            standings?.map((e: StandingType) => {
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
    return isLoading ? (
        <Loader />
    ) : (
        <Accordion style={{ width: "90%" }}>
            {screens.map((item) => {
                return (
                    <Accordion.Item
                        style={{
                            background: isDarkMode ? COLORS.darkSecondary : "",
                        }}
                        eventKey={item.id}
                        key={item.id}
                    >
                        <Accordion.Header
                            bsPrefix={`${
                                isDarkMode ? "accordion-custom-dark" : ""
                            }`}
                        >
                            <StandingHeader item={item} />
                        </Accordion.Header>
                        <Accordion.Body>
                            <StandingBody stats={item.stats} />
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
}
