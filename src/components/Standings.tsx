import React, { useMemo, useContext } from "react";
import { StandingType, Stat } from "../store/reducers/details";
import { ThemeContext } from "../index";
import { COLORS } from "../store/constants/colors";
import StandingBody from "./StandingBody";
import StandingHeader from "./StandingHeader";
import { Loader } from "../screens/Loader";
import { List } from "react-native-paper";

export default function StandingsList({
    standings,
    isLoading,
}: {
    standings: StandingType[];
    isLoading: boolean;
}) {
    const { isDarkMode } = useContext(ThemeContext);

    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);

    const screens = useMemo(
        () =>
            standings?.map((e: StandingType) => {
                return {
                    title: e.team.name,
                    image: e.team.logos[0].href,
                    subtitle: e.team.location,
                    id: e.team.id,
                    stats: e.stats.map((e: Stat) => {
                        return {
                            name: e.displayName,
                            value: e.displayValue,
                        };
                    }),
                };
            }),
        [standings]
    );
    return isLoading ? (
        <Loader />
    ) : (
        <List.Section style={{ width: "90%", borderRadius: 10 }}>
            {screens.map((item) => {
                return (
                    <List.Accordion
                        onPress={handlePress}
                        style={{
                            borderBottomColor: COLORS.border,
                            borderBottomWidth: 3,
                            backgroundColor: isDarkMode
                                ? COLORS.darkPrimary
                                : "",
                        }}
                        title={<StandingHeader item={item} />}
                    >
                        <StandingBody stats={item.stats} />
                    </List.Accordion>
                );
            })}
        </List.Section>
    );
}
