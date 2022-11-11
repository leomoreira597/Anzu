import React from 'react'
import { Platform, ScrollView, View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
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
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <ImageBackground source={require('../../assets/imgs/backDra.jpg')}
                    style={{ padding: 20, opacity: 0.3, height: 200}}>
                </ImageBackground>
                <View style={styles.infos}>
                    <Image
                        source={require('../../assets/imgs/avatar.png')}
                        style={styles.imageAvatar}
                    />
                    <Text style={styles.name}>
                        {props.name}
                    </Text>
                    <Text style={styles.email}>
                        {props.email}
                    </Text>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={styles.bottomDrawerMenu}>
                <TouchableOpacity onPress={logout}>
                    <View style={styles.logoutIcon}>
                        <Icon name='sign-out' size={30} color='#004' />
                        <View style={styles.logOut}>
                            <Text style={styles.logOutText}>Sair</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>

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
        color: "#004",
        marginBottom: 5,
    },
    email: {
        fontSize: 13,
        color: "#003",
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
        color: '#004',
        fontSize: 15
    },
    imageAvatar: {
        height: 80,
        width: 80,
        marginBottom: 10
    },
    bottomDrawerMenu: {
        borderTopColor: '#000',
        marginBottom: Platform.OS === 'ios' ? 40 : 30
    },
    infos:{
        position: 'absolute',
        marginTop: 40,
        marginLeft: 10
    }
})
