import React, { useContext } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { headerStats } from "../store/constants/constants";
import { ThemeContext } from "../index";
import { StandingType } from "../store/reducers/details";
import { Stat } from "./StandingBody";
import { COLORS } from "../store/constants/colors";

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
        <View style={[styles.container]}>
            <View style={{ flex: 1 }}>
                <Image
                    style={{ width: "5rem", height: "5rem" }}
                    source={{ uri: item.image }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <Text
                    style={[
                        isDarkMode ? styles.titleTextDark : styles.titleText,
                    ]}
                >
                    {item.title}
                </Text>
                <Text
                    style={[
                        isDarkMode
                            ? styles.secondTitleTextDark
                            : styles.secondTitleText,
                    ]}
                >
                    {item.subtitle}
                </Text>
            </View>
            <View style={{ flex: 5 }}>
                <View style={[styles.row]}>
                    {headerStats.map((name) => {
                        return (
                            <View
                                style={{ marginLeft: "1rem" }}
                                key={`${item.id}-${name}`}
                            >
                                <Text
                                    style={[
                                        isDarkMode
                                            ? styles.titleTextDark
                                            : styles.titleText,
                                    ]}
                                >
                                    {name}
                                </Text>
                                <Text
                                    style={[
                                        isDarkMode
                                            ? styles.secondTitleTextDark
                                            : styles.secondTitleText,
                                    ]}
                                >
                                    {
                                        item.stats.find(
                                            (e: {
                                                name: string;
                                                value: string;
                                            }) => e.name == name
                                        )?.value
                                    }
                                </Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        borderRadius: 10,
    },
    row: {
        flex: 1,
        padding: "1rem",
        flexWrap: "wrap",
        flexDirection: "row-reverse",
        alignItems: "center",
    },
    titleText: {
        fontWeight: "bold",
        color: COLORS.darkSecondary,
    },
    titleTextDark: {
        fontWeight: "bold",
        color: COLORS.white,
    },
    secondTitleTextDark: {
        color: COLORS.whiteSmoke,
    },
    secondTitleText: {
        color: COLORS.darkPrimary,
    },
});
