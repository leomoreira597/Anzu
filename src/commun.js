import { Alert, Platform } from "react-native";

const server =  "http://10.0.2.2:8080" 

function showError(err){
    Alert.alert('Ops! ocorreu um problema!', `Mensagem: ${err}`)
}

function showSucess(msg){
    Alert.alert('Sucesso!', msg)
}

export {server, showError, showSucess}