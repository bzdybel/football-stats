import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { Main } from "./navigation/Main";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App() {
    return (
        <Provider store={store}>
            <StatusBar style="auto" />
            <NavigationContainer>
                <Main />
            </NavigationContainer>
        </Provider>
    );
}
