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
import todayImage from "../../assets/imgs/today.jpg";
import tomorrowImage from "../../assets/imgs/tomorrow.jpg";
import weekImage from "../../assets/imgs/week.jpg";
import monthImage from "../../assets/imgs/month.jpg";
import moment from "moment";
import "moment/locale/pt-br";
import Task from "../components/Task";
import CommonStyles from "../CommonStyles";
import Icon from "react-native-vector-icons/FontAwesome";
import AddTask from "../screens/AddTask";
import AsyncStorage from "@react-native-async-storage/async-storage";
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


  }

  loadTask = () => {
    const maxDate = moment().add({ days: this.props.daysAhead }).format('YYYY-MM-DD 23:59:59')
    axios.get(`http://10.0.2.2:8080/task/taskUser/1/${maxDate}`)
      .then(res => {
        this.setState({ tasks: res.data }, this.filterTasks)
      })
      .catch(e => {
        Alert.alert("Erro!!", "Verifique sua conexão com a internet ou tente novamente mais tarde")
      })
  }


  toggleFilter = () => {
    this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
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

  toggleTask = taskId => {
    axios.put(`${server}/task/doneAt/${taskId}`)
      .then(resp => {
        this.loadTask()
      })
      .catch(e => {
        Alert.alert("Erro ao Concluir", "Verifique sua conexão com a internet ou tente novamente mais tarde")
      })
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
      userId: 1
    })
      .then(res => {
        Alert.alert("Sucesso!!", "Tarefa cadastrada com sucesso!!!")
        this.setState({ showAddTASK: false }, this.loadTask)
      })
      .catch(e => {
        Alert.alert("Erro ao cadastrar", "Verifique sua conexão com a internet ou tente novamente mais tarde")
      })
  }

  deleteTask = id => {
    axios.delete(`${server}/task/deleteTask/${id}`)
      .then(resp => {
        this.loadTask()
      })
      .catch(e => {
        Alert.alert("Erro ao excluir!", "Verifique sua conexão com a internet e tente novamente mais tarde")
      })
  }


  getImage = () => {
    switch (this.props.daysAhead) {
      case 0: return todayImage
      case 1: return tomorrowImage
      case 7: return weekImage
      default: return monthImage
    }
  }

  getColor = () => {
    switch (this.props.daysAhead) {
      case 0: return CommonStyles.colors.today
      case 1: return CommonStyles.colors.tomorrow
      case 7: return CommonStyles.colors.week
      default: return CommonStyles.colors.month
    }
  }

  render() {
    const { fontLoaded } = this.state
    const today = moment().locale('pt-br').format('dddd, D [de] MMMM')
    return (
      <View style={styles.container}>
        <AddTask isVisible={this.state.showAddTASK}
          onCancel={() => this.setState({ showAddTASK: false })}
          onSave={this.addTask} />

        <ImageBackground source={this.getImage()} style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="bars"
                size={20} color={CommonStyles.colors.secondary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.toggleFilter}>
              <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'}
                size={20} color={CommonStyles.colors.secondary} />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.subTitle}>{today}</Text>
          </View>
        </ImageBackground>
        <View style={styles.taskContainer}>
          <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => <Task {...item} toggleTask={this.toggleTask} onDelete={this.deleteTask} />} />
        </View>
        <TouchableOpacity style={[
          styles.addButton,
          {
            backgroundColor: this.getColor()
          }]} activeOpacity={0.7} onPress={() => this.setState({ showAddTASK: true })}>
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
    justifyContent: 'space-between',
    marginTop: 40,
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