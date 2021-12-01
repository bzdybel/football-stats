import React, { useContext } from "react";
import { headerStats } from "../store/constants/constants";
import { ThemeContext } from "../index";
import { Text, StyleSheet, View } from "react-native";
import { COLORS } from "../store/constants/colors";

export type Stat = {
    name: string;
    value: string;
};

export default function StandingBody({ stats }: { stats: Stat[] }) {
    const { isDarkMode } = useContext(ThemeContext);

    return (
        <View
            style={[
                styles.container,
                isDarkMode ? styles.wrapperDark : styles.wrapperWhite,
            ]}
        >
            {stats
                .filter((elem: Stat) => !headerStats.includes(elem.name))
                .map((e: Stat) => {
                    return (
                        <View
                            key={`${e.name}-${e.value}`}
                            style={{ padding: "1rem" }}
                        >
                            <Text
                                style={[
                                    isDarkMode
                                        ? styles.titleTextDark
                                        : styles.titleText,
                                ]}
                            >
                                {e.name}
                            </Text>
                            <Text
                                style={[
                                    isDarkMode
                                        ? styles.secondTitleTextDark
                                        : styles.secondTitleText,
                                ]}
                            >
                                {e?.value?.length > 0 ? e.value : "-"}
                            </Text>
                        </View>
                    );
                })}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        padding: 3,
        flexWrap: "wrap",
        flexDirection: "row",
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
    wrapperDark: { backgroundColor: COLORS.black },
    wrapperWhite: {
        backgroundColor: COLORS.white,
        opacity: 0.8,
    },
});
