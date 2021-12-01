import React from "react";
import { COLORS } from "../store/constants/colors";
import { ActivityIndicator, View, StyleSheet } from "react-native";

export const Loader = () => {
    return (
        <View style={[styles.container]}>
            <ActivityIndicator size="large" color={COLORS.yellow} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});
