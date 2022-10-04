import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CommonStyles from "../CommonStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFonts } from 'expo-font';
import moment from 'moment';
import "moment/locale/pt-br";

interface TaskProps {
    desc: string
    estimateAt: Date
    doneAt?: Date
}

export default function Task(props: TaskProps) {

    const doneOrNotStyle = props.doneAt != null ? {
        textDecorationLine: 'line-through'
    } : {}

    const [fontsLoaded] = useFonts({
        'Lato': require('../../assets/fonts/Lato.ttf'),
      });

      const date = props.doneAt ? props.doneAt : props.estimateAt
      const formattedDate = moment(props.estimateAt).locale('pt-br').format('ddd, D [de] MMMM')

    return (
        <View style={styles.container}>
            <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
            </View>
            {/* <Text>{props.doneAt + ""}</Text> */}
        </View>
    );
}

function getCheckView(doneAt){

    if(doneAt != null){
        return (
            <View style={styles.done}>
                <Icon name="check" size={15} color='#FFF' />
            </View>
        )
    }
    else{
        return (
            <View style={styles.pending}>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#555"
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        fontFamily: 'Lato',
        color: CommonStyles.colors.mainText,
        fontSize: 15
    },
    date: {
        fontFamily: 'Lato',
        color: CommonStyles.colors.subText,
        fontSize: 12
    }
})