import React, { useCallback, useMemo, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
    ADD_LEAGUE_TO_FAVOURITE,
    REMOVE_LEAGUE_FROM_FAVOURITE,
} from "../store/constants/constants";
import { LeagueType, GeneralStateType } from "../store/reducers/general";
import { ThemeContext } from "../index";
import { COLORS } from "../store/constants/colors";
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from "react-native";

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
    image,
    id,
    onPress,
}: ListItemProps) => {
    const dispatch = useDispatch();
    const { favouriteLeagues } = useSelector(
        (state: { general: GeneralStateType }) => state.general
    );
    const { isDarkMode } = useContext(ThemeContext);

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
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.rowStyles]}>
                <Image
                    style={[styles.image]}
                    source={{ uri: isDarkMode ? image.dark : image.light }}
                />
                <View style={[styles.wrapper]}>
                    <Text
                        style={[
                            isDarkMode
                                ? styles.titleTextDark
                                : styles.titleText,
                        ]}
                    >
                        {title}
                    </Text>
                    <Text
                        style={[
                            isDarkMode
                                ? styles.secondTitleTextDark
                                : styles.secondTitleText,
                        ]}
                    >
                        {subtitle}
                    </Text>
                </View>
                {isCurrentElementFavourite ? (
                    <Ionicons
                        name="heart-sharp"
                        size={32}
                        color={COLORS.red}
                        onPress={() => removeFromFavourites(id)}
                    />
                ) : (
                    <Ionicons
                        onPress={() => addToFavourites(id)}
                        name="heart-outline"
                        size={32}
                        color={isDarkMode ? COLORS.red : COLORS.darkPrimary}
                    />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    rowStyles: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: "1rem",
        cursor: "pointer",
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
    image: {
        height: 75,
        width: 75,
        marginRight: 15,
    },
    wrapper: {
        minWidth: 300,
    },

    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: COLORS.border,
    },
});

export const ListSeparator = () => <View style={styles.separator} />;
