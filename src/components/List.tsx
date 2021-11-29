import React, { useCallback, useMemo } from "react";
import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
    ADD_LEAGUE_TO_FAVOURITE,
    REMOVE_LEAGUE_FROM_FAVOURITE,
} from "../store/constants/actionTypes";
import { Text } from "./Text";
import { LeagueType } from "../store/reducers/general";

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "rgb(255, 255, 255)",
    },
    titleText: {
        fontWeight: "bold",
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: "#eef0f3",
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

type ListItemProps = {
    title: LeagueType["name"];
    subtitle: LeagueType["abbr"];
    image: LeagueType["logos"];
    id: LeagueType["id"];
    onPress: () => void;
};

export const ListItem = ({
    title,
    subtitle,
    onPress = () => null,
    image,
    id,
}: ListItemProps) => {
    const dispatch = useDispatch();
    const rowStyles = [styles.row];
    const { favouriteLeagues } = useSelector((state: any) => state.general);

    const addToFavourites = useCallback((id: LeagueType["id"]) => {
        dispatch({ type: ADD_LEAGUE_TO_FAVOURITE, payload: { id } });
    }, []);

    const removeFromFavourites = useCallback((id: LeagueType["id"]) => {
        dispatch({ type: REMOVE_LEAGUE_FROM_FAVOURITE, payload: { id } });
    }, []);

    const isCurrentElementFavourite = useMemo(() => {
        return favouriteLeagues.some((league: LeagueType) => league.id === id);
    }, [favouriteLeagues, id]);

    return (
        <TouchableHighlight activeOpacity={0.6} onPress={onPress}>
            <View style={rowStyles}>
                <Image style={[styles.image]} source={{ uri: image.light }} />
                <View style={[styles.wrapper]}>
                    <Text style={[styles.titleText]}>{title}</Text>
                    <Text>{subtitle}</Text>
                </View>
                {isCurrentElementFavourite ? (
                    <Ionicons
                        name="heart-sharp"
                        size={24}
                        color="#fb3958"
                        onPress={() => removeFromFavourites(id)}
                    />
                ) : (
                    <Ionicons
                        onPress={() => addToFavourites(id)}
                        name="heart-outline"
                        size={24}
                        color="#606060"
                    />
                )}
            </View>
        </TouchableHighlight>
    );
};

export const ListSeparator = () => <View style={styles.separator} />;
