import React from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from './src/screens/Auth';
import TaskList from './src/screens/TaskList';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from './src/components/Menu';
import AuthOrApp from './src/screens/AuthOrApp';
import Icon from "react-native-vector-icons/FontAwesome5";


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
    const name = props.route.params.name
    const id = props.route.params.id
    return (
        <Drawer.Navigator screenOptions={{
            drawerActiveTintColor: '#008',
            drawerInactiveTintColor: '#004',
            headerShown: false,
            drawerLabelStyle: {
                fontWeight: 'normal',
                fontSize: 16,
                marginLeft: -25,
            },
        }}
            drawerContent={(props) => <Menu {...props} email={email} name={name} />} >

            <Drawer.Screen name='today' options={{ title: 'Hoje', drawerIcon: ({color}) => (
                    <Icon name="clock" size={22} color={color}/>
                ) }}>
                {props => <TaskList {...props} title="Hoje" daysAhead={0} idHeader={id}/>}
            </Drawer.Screen>
            <Drawer.Screen name='Tomorrow' options={{ title: 'Amanhã', drawerIcon: ({color}) => (
                    <Icon name="calendar" size={22} color={color}/>
                ) }}>
                {props => <TaskList {...props} title="Amanhã" daysAhead={1} idHeader={id}/>}
            </Drawer.Screen>
            <Drawer.Screen name='Week' options={{ title: 'Semana', drawerIcon: ({color}) => (
                    <Icon name="calendar-plus" size={22} color={color}/>
                ) }}>
                {props => <TaskList {...props} title="Semana" daysAhead={7} idHeader={id}/>}
            </Drawer.Screen>
            <Drawer.Screen name="Month" options={{ title: 'Mês', drawerIcon: ({color}) => (
                    <Icon name="calendar-alt" size={22} color={color}/>
                )
              }}>
                {props => <TaskList {...props} title='Mês' daysAhead={30} idHeader={id}/>}
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