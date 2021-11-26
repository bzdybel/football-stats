import React from "react";
import { StyleSheet, View, Alert } from "react-native";

import colors from "../constants/colors";
import { Text } from "../components/Text";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 10,
    },
});

export const TextDemo = () => (
    <View style={styles.container}>
        <Text type="header">This is a header</Text>
        <Text type="subheader">This is a subheader</Text>
        <Text>This is normal text</Text>
    </View>
);
