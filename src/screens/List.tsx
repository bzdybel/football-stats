import React, { useMemo, useState, useCallback } from "react";
import {
    StyleSheet,
    FlatList,
    TouchableHighlight,
    Text,
    TextInput,
    View,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { ListItem, ListSeparator } from "../components/List";
import { MainStackParams } from "../navigation/Main";
import { LeagueType } from "../store/reducers/general";
import {
    SHOW_FAVOURITES,
    SHOW_ALL,
    SET_LEAGUES,
} from "../store/constants/actionTypes";

type Props = {
    navigation: StackNavigationProp<MainStackParams, "Leagues">;
};

export const List = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const { leagues, originalLeagues, favouriteLeagues } = useSelector(
        (state: any) => state.general
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
        const leaguesCopy = [...leagues].filter(
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
            style={styles.container}
            data={screens}
            keyExtractor={(item) => item.title}
            renderItem={({ item }) => (
                <ListItem
                    title={item.title}
                    subtitle={item.subtitle}
                    image={item.image}
                    onPress={() =>
                        navigation.navigate(item.target, { id: item.id })
                    }
                    id={item.id}
                />
            )}
            ItemSeparatorComponent={ListSeparator}
            ListHeaderComponent={
                <View style={[styles.row]}>
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#800080"
                        style={[
                            styles.button,
                            isEnabled ? styles.enabled : styles.disabled,
                        ]}
                        onPress={toggleSwitch}
                    >
                        <Text
                            style={[
                                styles.text,
                                isEnabled
                                    ? styles.enabledText
                                    : styles.disabledText,
                            ]}
                        >
                            {"Show favourites"}
                        </Text>
                    </TouchableHighlight>
                    <TextInput
                        style={styles.input}
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
        backgroundColor: "#eef0f3",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        elevation: 3,
        border: "2px solid #800080",
        marginLeft: 15,
        width: 200,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
    },
    enabled: {
        backgroundColor: "#800080",
    },
    disabled: {
        backgroundColor: "transparent",
    },
    enabledText: {
        color: "white",
    },
    disabledText: {
        color: "black",
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    row: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
});
