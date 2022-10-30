import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './src/screens/Auth';
import TaskList from './src/screens/TaskList';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from './src/components/Menu';
import AuthOrApp from './src/screens/AuthOrApp';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const menuConfig = {
    labelStyle: {
        fontWeight: 'normal',
        fontSize: 100,
    },
    activeTintColor: '#080',
    headerShown: false,
}

const DrawerNavigator = props => {
    const email = props.route.params.email
    return (
        <Drawer.Navigator screenOptions={{
            drawerActiveTintColor: '#080',
            headerShown: false,
            drawerLabelStyle: {
                fontWeight: 'normal',
                fontSize: 16,
            },
        }}
            drawerContent={(props) => <Menu {...props} email={email} />} >

            <Drawer.Screen name='today' options={{ title: 'Hoje' }}>
                {props => <TaskList {...props} title="Hoje" daysAhead={0} />}
            </Drawer.Screen>
            <Drawer.Screen name='Tomorrow' options={{ title: 'Amanhã' }}>
                {props => <TaskList {...props} title="Amanhã" daysAhead={1} />}
            </Drawer.Screen>
            <Drawer.Screen name='Week' options={{ title: 'Semana' }}>
                {props => <TaskList {...props} title="Semana" daysAhead={7} />}
            </Drawer.Screen>
            <Drawer.Screen name="Month" options={{ title: 'Mês' }}>
                {props => <TaskList {...props} title='Mês' daysAhead={30} />}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
}


const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AuthOrApp" component={AuthOrApp} />
            <Stack.Screen name="Auth" component={Auth} />
            <Stack.Screen name="Home" component={DrawerNavigator} />
        </Stack.Navigator>
    );
};

const Navigator = () => {
    return (
        <NavigationContainer>
            <AuthNavigator />
        </NavigationContainer>
    );
}

export default Navigator