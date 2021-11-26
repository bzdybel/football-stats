import React, { useEffect, useCallback } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Text } from "../components/Text";
import axios from "axios";
import { GET_LEAGUE_DETAILS } from "../store/constants/actionTypes";
import { LeagueType } from "../store/reducers/general";
import { useDispatch } from "react-redux";

export const api = axios.create();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 10,
    },
});
type Props = {
    route: {
        params: {
            id: string;
        };
        key: string;
        name: string;
        path?: any;
    };
};
export const Details = ({ route }: Props) => {
    console.log(route);
    const dispatch = useDispatch();

    const fetchLeagueDetails = useCallback(async () => {
        api.get(
            `https://api-football-standings.azharimm.site/leagues/${route.params.id}`
        ).then(function (response) {
            saveData(response.data);
        });
    }, []);

    const saveData = (data: LeagueType[]) =>
        dispatch({ type: GET_LEAGUE_DETAILS, payload: data });

    useEffect(() => {
        fetchLeagueDetails();
    }, [fetchLeagueDetails]);

    return (
        <View style={styles.container}>
            <Text type="header">This is a header</Text>
            <Text type="subheader">This is a subheader</Text>
            <Text>This is normal text</Text>
        </View>
    );
};
