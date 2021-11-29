import React from "react";
import { StyleSheet, Text as RNText, StyleProp, TextStyle } from "react-native";

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    },
    headerText: {
        fontWeight: "600",
        fontSize: 32,
        marginBottom: 12,
    },
    subHeaderText: {
        fontSize: 20,
        marginBottom: 12,
        marginTop: -12,
    },
});

type TextProps = {
    type?: "header" | "subheader";
    children: string;
    style?: StyleProp<TextStyle>[];
};

export const Text = ({ type, children, style = [] }: TextProps) => {
    let textStyles: StyleProp<TextStyle>[] = [styles.text];

    if (type === "header") {
        textStyles.push(styles.headerText);
    } else if (type === "subheader") {
        textStyles.push(styles.subHeaderText);
    }

    textStyles = [...textStyles, ...style];

    return <RNText style={textStyles}>{children}</RNText>;
};
