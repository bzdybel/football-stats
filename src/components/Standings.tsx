import React, { useMemo } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { StandingType, Stat } from "../store/reducers/details";
import { Accordion } from "react-bootstrap";

export default function StandingsList({
    standings,
}: {
    standings: StandingType[];
}) {
    const headerStats = ["Wins", "Losses", "Draws", "Overall"];
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
    return (
        <Accordion style={{ width: "90%" }}>
            {screens.map((item) => {
                return (
                    <Accordion.Item eventKey={item.id}>
                        <Accordion.Header>
                            <Image
                                style={[styles.image]}
                                source={{ uri: item.image }}
                            />
                            <View style={[styles.wrapper]}>
                                <Text style={[styles.titleText]}>
                                    {item.title}
                                </Text>
                                <Text>{item.subtitle}</Text>
                            </View>
                            <View style={[styles.wrapper]}>
                                <View style={[styles.rowList]}>
                                    {headerStats.map((name) => {
                                        return (
                                            <View style={{ minWidth: 100 }}>
                                                <Text
                                                    style={[styles.titleText]}
                                                >
                                                    {name}
                                                </Text>
                                                <Text>
                                                    {
                                                        item.stats.find(
                                                            (e) =>
                                                                e.name == name
                                                        )?.value
                                                    }
                                                </Text>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View>
                        </Accordion.Header>
                        <Accordion.Body>
                            <View style={[styles.rowList]}>
                                {item.stats
                                    .filter(
                                        (elem) =>
                                            !headerStats.includes(elem.name)
                                    )
                                    .map((e) => {
                                        return (
                                            <View
                                                style={{
                                                    minWidth: 150,
                                                    margin: 10,
                                                }}
                                            >
                                                <Text
                                                    style={[styles.titleText]}
                                                >
                                                    {e.name}
                                                </Text>
                                                <Text>
                                                    {e?.value?.length > 0
                                                        ? e.value
                                                        : "-"}
                                                </Text>
                                            </View>
                                        );
                                    })}
                            </View>
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#eef0f3",
        maxHeight: "40rem",
        width: "95%",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        borderColor: "#800080",
        borderWidth: 2,
        marginLeft: 15,
        width: "45%",
        maxWidth: 200,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
    },
    enabled: {
        backgroundColor: "#800080",
    },
    disabled: {
        backgroundColor: "transparent",
    },
    enabledText: {
        color: "white",
    },
    disabledText: {
        color: "black",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: "45%",
        maxWidth: 200,
    },
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
    },
    rowList: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexWrap: "wrap",
    },
    titleText: {
        fontWeight: "bold",
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#000000c0",
    },
    image: {
        height: 50,
        width: 50,
        marginRight: 15,
    },
    wrapper: {
        minWidth: 300,
    },
});
