import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import TodayImage from "../../assets/imgs/today.jpg";
import moment from "moment";
import "moment/locale/pt-br";
import Task from "../components/Task";
import CommonStyles from "../CommonStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import AddTask from "../screens/AddTask";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from 'expo-font';
import axios from "axios";
import { server, showError } from "../commun";


const initialState = {
  showDoneTasks: true,

  showAddTASK: false,

  visibleTasks: [],

  fontLoaded: false,

  tasks: []
}

export default class TaskList extends React.Component {

  state = {
    ...initialState
  }

  componentDidMount = async () => {
    const stateString = await AsyncStorage.getItem('tasksState')
    const savedState = JSON.parse(stateString) || initialState
    this.setState({ showDoneTasks: savedState.showDoneTasks }, this.filterTasks)
    this.loadTask()
    await Font.loadAsync({
      Lato: require("../../assets/fonts/Lato.ttf")
    });
    this.setState({ fontLoaded: true });
    
  }

  loadTask = () => {
        const maxDate = moment().format('YYYY-MM-DD')
        axios.get(`http://10.0.2.2:8080/task/taskUser/4/${maxDate}`)
        .then(res =>{
          this.setState({ tasks: res.data }, this.filterTasks)
        })
        .catch(e => {
          Alert.alert('Opps', e)
        })
  }


  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
  }

  toggleTask = taskId => {
    const tasks = [...this.state.tasks]
    tasks.forEach(task => {
      if (task.id === taskId) {
        task.doneAt = task.doneAt ? null : new Date()
      }
    })

    this.setState({ tasks }, this.filterTasks)
  }

  filterTasks = () => {
    let visibleTasks = null
    if (this.state.showDoneTasks) {
      visibleTasks = [...this.state.tasks]
    }
    else {
      const pending = task => task.doneAt === null
      visibleTasks = this.state.tasks.filter(pending)
    }
    this.setState({ visibleTasks })
    AsyncStorage.setItem('tasksState', JSON.stringify({
      showDoneTasks: this.state.showDoneTasks
    }))
  }

  //tentar dar mais uma revisada

  addTask = newTask => {
    if (!newTask.descr || !newTask.descr.trim()) {
      Alert.alert('Dados Invalidos', 'Descrição não informada !!')
      return
    }
    
    axios.post(`${server}/task`, {
      descr: newTask.descr,
      estimateAt: newTask.date,
      userId: 4
    })
    .then(res =>{
      Alert.alert("Sucesso!!", "Tarefa cadastrada com sucesso!!!")
      this.setState({showAddTASK: false }, this.loadTask)
    })
    .catch(e =>{
      showError(e)
    })
  }

  deleteTask = id => {
    const tasks = this.state.tasks.filter(task => task.id !== id)
    this.setState({ tasks }, this.filterTasks)
  }

  render() {
    const { fontLoaded } = this.state
    const today = moment().locale('pt-br').format('dddd, D [de] MMMM')
    return (
      <View style={styles.container}>
        <AddTask isVisible={this.state.showAddTASK}
          onCancel={() => this.setState({ showAddTASK: false })}
          onSave={this.addTask} />

        <ImageBackground source={TodayImage} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20} color={CommonStyles.colors.secondary} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>Hoje</Text>
            <Text style={styles.subTitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskContainer}>
          <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} />} />
        </View>
        <TouchableOpacity style={styles.addButton} activeOpacity={0.7} onPress={() => this.setState({ showAddTASK: true })}>
          <Icon name="plus" size={20} color={CommonStyles.colors.secondary} />
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
    fontFamily: 'Lato',
    fontSize: 50,
    color: CommonStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 20
  },
  subTitle: {
    fontFamily: 'Lato',
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
    bottom: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: CommonStyles.colors.today,
    justifyContent: "center",
    alignItems: "center"
  }
})