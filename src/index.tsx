import React, { createContext, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { Main } from "./navigation/Main";
import { store } from "./store";

export const ThemeContext = createContext({
    isDarkMode: false,
    toggleDarkMode: () => {},
});

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => setIsDarkMode((prevState) => !prevState);
    return (
        <Provider store={store}>
            <StatusBar style="auto" />
            <NavigationContainer>
                <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
                    <Main />
                </ThemeContext.Provider>
            </NavigationContainer>
        </Provider>
    );
}
