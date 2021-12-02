import React, { useMemo, useState, useContext } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { ListItem, ListSeparator } from "../components/List";
import { MainStackParams } from "../navigation/Main";
import { LeagueType, GeneralStateType } from "../store/reducers/general";
import {
    SHOW_FAVOURITES,
    SHOW_ALL,
    SET_LEAGUES,
} from "../store/constants/constants";
import { ThemeContext } from "../index";
import { COLORS } from "../store/constants/colors";
import { Entypo } from "@expo/vector-icons";
import {
    StyleSheet,
    FlatList,
    TouchableHighlight,
    Text,
    TextInput,
    View,
} from "react-native";

type Props = {
    navigation: StackNavigationProp<MainStackParams, "Leagues">;
};

export const List = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const { isDarkMode } = useContext(ThemeContext);

    const { leagues, originalLeagues, favouriteLeagues } = useSelector(
        (state: { general: GeneralStateType }) => state.general
    );
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [filterValue, onFilterChange] = useState<string>("");

    const toggleSwitch = () => {
        isEnabled
            ? dispatch({ type: SHOW_ALL, payload: filterValue })
            : dispatch({ type: SHOW_FAVOURITES, payload: filterValue });
        setIsEnabled((previousState) => !previousState);
    };
    const onChangeText = (text: string) => {
        onFilterChange(text);
        const correctLeague = isEnabled
            ? [...favouriteLeagues]
            : [...originalLeagues];

        const leaguesCopy = correctLeague.filter(
            (e: LeagueType) =>
                e.name.toLowerCase().includes(text.toLowerCase()) ||
                e.abbr.toLowerCase().includes(text.toLowerCase())
        );

        dispatch({
            type: SET_LEAGUES,
            payload:
                text.length > 0
                    ? leaguesCopy
                    : isEnabled
                    ? favouriteLeagues
                    : originalLeagues,
        });
    };

    const screens = useMemo(
        () =>
            leagues.map((e: LeagueType) => {
                return {
                    title: e.name,
                    subtitle: e.abbr,
                    target: e.slug,
                    image: e.logos,
                    id: e.id,
                };
            }),
        [leagues]
    );

    return (
        <FlatList
            style={isDarkMode ? styles.containerDark : styles.container}
            data={screens}
            keyExtractor={(item) => item.title}
            ListEmptyComponent={
                <View style={[styles.empty]}>
                    <Entypo
                        name="traffic-cone"
                        size={86}
                        color={COLORS.yellow}
                    />
                    <Text
                        style={{
                            fontSize: 34,
                            color: isDarkMode ? COLORS.white : COLORS.black,
                        }}
                    >
                        There is no data here
                    </Text>
                </View>
            }
            renderItem={({ item }) => (
                <ListItem
                    title={item.title}
                    subtitle={item.subtitle}
                    image={item.image}
                    onPress={() =>
                        //@ts-ignore
                        navigation.navigate(item.target, {
                            id: item.id,
                        })
                    }
                    id={item.id}
                />
            )}
            ItemSeparatorComponent={ListSeparator}
            ListHeaderComponent={
                <View
                    style={[
                        styles.baseRow,
                        isDarkMode ? styles.rowDark : styles.row,
                    ]}
                >
                    <TouchableHighlight
                        activeOpacity={0.6}
                        style={[
                            styles.button,
                            isDarkMode
                                ? isEnabled
                                    ? styles.outlineDark
                                    : styles.dark
                                : isEnabled
                                ? styles.warning
                                : styles.outlineWarning,
                        ]}
                        onPress={toggleSwitch}
                    >
                        <Text
                            style={[
                                styles.text,
                                isDarkMode
                                    ? styles.enabledText
                                    : styles.disabledText,
                            ]}
                        >
                            {"Show favourites"}
                        </Text>
                    </TouchableHighlight>
                    <TextInput
                        style={[
                            styles.inputBase,
                            isDarkMode ? styles.inputDark : styles.input,
                        ]}
                        onChangeText={(e) => onChangeText(e)}
                        value={filterValue}
                    />
                </View>
            }
            ListFooterComponent={ListSeparator}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.whiteSmoke,
    },
    containerDark: { flex: 1, backgroundColor: COLORS.darkPrimary },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        elevation: 3,
        marginLeft: 15,
        width: "45%",
    },
    inputBase: {
        width: "45%",
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
    },
    enabledText: {
        color: COLORS.white,
    },
    disabledText: {
        color: COLORS.black,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: COLORS.white,
        borderColor: COLORS.yellow,
        color: COLORS.black,
    },
    inputDark: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 15,
        backgroundColor: COLORS.darkSecondary,
        borderColor: COLORS.border,
        color: COLORS.white,
    },
    baseRow: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: StyleSheet.hairlineWidth,
        padding: 10,
        width: "100%",
    },
    row: {
        borderBottomColor: COLORS.border,
        backgroundColor: COLORS.white,
    },
    rowDark: {
        backgroundColor: COLORS.darkSecondary,
        borderColor: COLORS.border,
    },
    dark: {
        backgroundColor: COLORS.darkPrimary,
        borderColor: COLORS.border,
        padding: 3,
        borderWidth: 2,
    },
    outlineDark: {
        backgroundColor: COLORS.darkSecondary,
        borderColor: COLORS.border,
        padding: 3,
        borderWidth: 2,
    },
    warning: {
        padding: 3,
        backgroundColor: COLORS.yellow,
    },
    outlineWarning: {
        padding: 3,
        borderWidth: 2,
        borderColor: COLORS.yellow,
        backgroundColor: COLORS.white,
    },
    empty: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
});
