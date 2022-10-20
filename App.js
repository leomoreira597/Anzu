import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './src/screens/Auth';
import TaskList from './src/screens/TaskList';

const Stack = createNativeStackNavigator();


export default function App(props) {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Auth" screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="Auth">
                    {props => (
                        <Auth {...props} avancar="TaskList" />
                    )}
                </Stack.Screen>
                <Stack.Screen name="TaskList" component={TaskList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}