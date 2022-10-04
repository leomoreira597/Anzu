import React from "react";
import { Text, View, SafeAreaView, ImageBackground, StyleSheet } from "react-native";
import { StatusBar } from 'expo-status-bar';
import TodayImage from "./assets/imgs/today.jpg";
import moment from "moment";
import "moment/locale/pt-br";
import Task from "./src/components/Task";
import CommonStyles from "./src/CommonStyles";




export default class TaskList extends React.Component {
  render() {
  
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
    return (
      <View style={styles.container}>
        <ImageBackground source={TodayImage} style={styles.background}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle  }>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskContainer}>
          <Task desc="Comprar Livro" estimateAt={new Date()} doneAt={new Date()}/>
        </View>
        <StatusBar style="light" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 3
  },
  taskContainer: {
    flex: 7
  },
  titleBar: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 50,
    color: CommonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 20
  },
  subTitle: {
    color: CommonStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30
  }
})