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
import AddTask from "./src/screens/AddTask";




export default class TaskList extends React.Component {

  state ={

    showDoneTasks: true,

    showAddTASK: false,

    visibleTasks: [],

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

  componentDidMount = () => {
    this.filterTasks()
  }

    toggleFilter = () => {
      this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

  toggleTask = taskId => {
    const tasks = [...this.state.tasks]
    tasks.forEach(task => {
      if(task.id === taskId){
        task.doneAt = task.doneAt ? null : new Date()
      }
    })
    
    this.setState({ tasks }, this.filterTasks)
  }

  filterTasks = () => {
      let visibleTasks = null
      if(this.state.showDoneTasks) {
        visibleTasks = [...this.state.tasks]
      }
      else{
        const pending = task => task.doneAt === null
        visibleTasks = this.state.tasks.filter(pending)
      }
      this.setState({ visibleTasks })
  }

  render() {
    const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
    return (
      <View style={styles.container}>
        <AddTask isVisible={this.state.showAddTASK} onCancel={() => this.setState({ showAddTASK: false })}/>
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
          <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`}
            renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask} /> } />
        </View>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={() => this.setState({ showAddTASK: true })}>
            <Icon name="plus" size={20} color={CommonStyles.colors.secondary}/>
        </TouchableOpacity>
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
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom:30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: CommonStyles.colors.today,
    justifyContent: "center",
    alignItems: "center"
  }
})