import React from 'react'
import { Platform, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
//import { Gravatar } from 'react-native-gravatar'
import CommonStyles from '../CommonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from '@react-navigation/native';


export default props => {

    const logout = () => {
        delete axios.defaults.headers.common['Authorization']
        AsyncStorage.removeItem('userData')
        props.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {
                        name: 'Auth',
                    },
                ],
            })
        )
    }

    return (
        <DrawerContentScrollView>
            <View style={styles.header}>
                <Text>Anzu</Text>
                {/* <Gravatar style={styles.avatar}
                    options={{
                        email: props.email,
                        secure: true
                    }} /> */}
                <View style={styles.userInfo}>
                    <Text style={styles.name}>
                        {props.name}
                    </Text>
                    <Text>
                        {props.email}
                    </Text>
                </View>
                <TouchableOpacity onPress={logout}>
                    <View style={styles.logoutIcon}>
                        <Icon name='sign-out' size={30} color='#800' />
                        <View style={styles.logOut}>
                            <Text style={styles.logOutText}>Sair</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        borderBottomWidth: 1,
        borderColor: '#DDD'
    },
    title: {
        color: '#000',
        fontSize: 30,
        paddingTop: 70,
        padding: 10
    },
    avatar: {
        width: 60,
        height: 60,
        borderWidth: 3,
        borderRadius: 30,
        margin: 10,
        backgroundColor: '#222'
    },
    userInfo: {
        marginLeft: 10,
    },
    name: {
        fontSize: 20,
        color: CommonStyles.colors.mainText,
        marginBottom: 5,
    },
    logoutIcon: {
        marginLeft: 5,
        marginBottom: 5,
        flexDirection: "row"
    },
    logOut: {
        justifyContent: "center",
        marginLeft: 5
    },
    logOutText: {
        color: '#800',
        fontSize: 15
    }
})
