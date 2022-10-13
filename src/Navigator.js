import React from "react";
import { createAppContainer, createSwitchNavigator } from "@react-navigation/native"
import Auth from "./screens/Auth";
import TaskList from "./screens/TaskList";


const MainRoutes = {
    Auth: {
        name: "Auth",
        screen: Auth
    },
    Home: {
        name: "Home",
        screen: TaskList
    }
}