import React from "react";
import { Text, View, SafeAreaView, 
  ImageBackground, StyleSheet, FlatList, TouchableOpacity, Platform } from "react-native";
import { StatusBar } from 'expo-status-bar';
import TodayImage from "./assets/imgs/today.jpg";
import moment from "moment";
import "moment/locale/pt-br";
import Task from "./src/components/Task";
import CommonStyles from "./src/CommonStyles";
import Icon from "react-native-vector-icons/FontAwesome";




export default class TaskList extends React.Component {

  state ={

    showDoneTasks: true,

    tasks: [{
      id: Math.random(),
      desc: 'Comprar Livro de React',
      estimateAt: new Date(),
      doneAt: new Date()
    },
    {
      id: Math.random(),
      desc: 'Ler Livro de React',
      estimateAt: new Date(),
      doneAt: null
    }]
  }

  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks })
  }

  toggleTask = taskId => {
    const tasks = [...this.state.tasks]
    tasks.forEach(task => {
      if(task.id === taskId){
        task.doneAt = task.doneAt ? null : new Date()
      }
    })
    
    this.setState({ tasks })
    
  }

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
    return (
      <View style={styles.container}>
        <ImageBackground source={TodayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
              size={20} color={CommonStyles.colors.secondary}/>
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskContainer}>
          <FlatList data={this.state.tasks} keyExtractor={item => `${item.id}`}
            renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} /> } />
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
  },
  iconBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    justifyContent: 'flex-end',
    marginTop: 40
  }
})