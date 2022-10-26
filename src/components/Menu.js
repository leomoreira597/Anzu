import React from 'react'
import { Platform, ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
//import { Gravatar } from 'react-native-gravatar'
import CommonStyles from '../CommonStyles';


export default props => {
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
                        {props.email}
                    </Text>
                </View>        
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
})
