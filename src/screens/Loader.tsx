import React from "react";
import { COLORS } from "../store/constants/colors";
import { Container } from "react-bootstrap";
import { ActivityIndicator } from "react-native";
export const Loader = () => {
    return (
        <Container className="h-100 d-flex align-items-center justify-content-center text-warning">
            <ActivityIndicator size="large" color={COLORS.yellow} />
        </Container>
    );
};
