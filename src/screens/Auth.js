import React from "react";
import {
    ImageBackground,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert
} from "react-native";
import backgroundImage from "../../assets/imgs/login.jpg";
import CommonStyles from "../CommonStyles";
import { StatusBar } from 'expo-status-bar';
import AuthInput from "../components/AuthInput";
import { server, showError,  showSucess} from "../commun";
import { CommonActions } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
//import * as SplashScreen from 'expo-splash-screen';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Auth(props) {

    const [name, setName] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [stageNew, setStageNew] = React.useState(false)
    // const [fontsLoaded] = useFonts({
    //     'Lato': require('../../assets/fonts/Lato.ttf'),
    //   });

    //   React.useEffect(() => {
    //     async function prepare() {
    //       await SplashScreen.preventAutoHideAsync();
    //     }
    //     prepare();
    //   }, []);
    
    
    //   const onLayoutRootView = React.useCallback(async () => {
    //     if (fontsLoaded) {
    //       await SplashScreen.hideAsync();
    //     }
    //   }, [fontsLoaded]);
    
    //   if (!fontsLoaded) {
    //     return null;
    //   }



    function singUp(){
            axios.post(`${server}/user`, {
                name: name,
                email: email,
                password: password
            })
            .then(resp => {
                Alert.alert('Sucesso!!', 'Usuario cadastrado com sucesso')
                setStageNew(false)
                setPassword('')
            })
            .catch(e => {
                console.warn(e)
            })
    }

     function singIn(){

        axios.post(`${server}/login`,{
            email: email,
            password: password
        })
        .then(resp =>{
            AsyncStorage.setItem('userData', JSON.stringify(resp.headers))
            axios.defaults.headers.common['Authorization'] = resp.headers.authorization
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Home',
                            params: resp.headers
                        },
                    ],
                })
            )
        })
        .catch(e =>{
            Alert.alert('Algo n??o deu certo!!', 'Revise seus dados, sua conex??o com a internet e tente novamente')
        })
    }


    function sinupOrsinIn(){
        if(stageNew){
            singUp()
        }
        else{
            singIn()
        }
    }

    function change(){
        if(stageNew){
            setStageNew(false)
        }
        else{
            setStageNew(true)
        }
    }

    const validations = []
    validations.push(email && email.includes('@'))
    validations.push(password && password.length >=6)

    if(stageNew){
        validations.push(name && name.trim().length >=3)
        validations.push(password === confirmPassword)
    }

    const validForm = validations.reduce((t, a) => t && a)

    return (
        <ImageBackground source={backgroundImage} style={styles.background}> 
        
            <Text style={styles.title}>
                Anzu
            </Text>
            <View style={styles.formContainer}>
                <Text style={styles.info}>
                    {stageNew ? "Crie a sua conta" : "Informe seus dados"}
                </Text>
                {stageNew &&
                    <AuthInput icon="user" placeholder="Nome" value={name} style={styles.input}
                        onChangeText={name => setName(name)} />
                }
                <AuthInput icon="at" placeholder="E-mail" value={email} style={styles.input}
                    onChangeText={email => setEmail(email)} keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoCompleteType='email' />
                <AuthInput icon="lock" placeholder="Senha" secureTextEntry={true} value={password} style={styles.input}
                    onChangeText={password => setPassword(password)} />
                {stageNew &&
                    <AuthInput icon="asterisk" placeholder="Confirme a senha" secureTextEntry={true} value={confirmPassword} style={styles.input}
                        onChangeText={confirmPassword => setConfirmPassword(confirmPassword)} />
                }
                <TouchableOpacity onPress={sinupOrsinIn} disabled={!validForm}>
                    <View style={[styles.button, validForm ? {} : {backgroundColor: '#AAA'}]}>
                        <Text style={styles.buttonText}>
                            {stageNew ? "Registrar" : "Entrar"}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ padding: 10 }} onPress={change}>
                <Text style={styles.buttonText}>
                    {stageNew ? "J?? tem uma conta? Entre aqui" : "Ainda n??o ?? cadastrado? Cadastre-se aqui"}
                </Text>
            </TouchableOpacity>
            <StatusBar style="light" />
        </ImageBackground>
    );


}



const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: CommonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10,
        //fontFamily: 'Lato'
    },
    input: {
        marginTop: 10,
        backgroundColor: "#FFF",
        padding: Platform.OS == 'ios' ? 15 : 10,
        //fontFamily: 'Lato'
    },
    formContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 20,
        width: "90%"
    },
    button: {
        backgroundColor: "#080",
        marginTop: 10,
        padding: 10,
        alignItems: "center",
        borderRadius: 20
        //fontFamily: 'Lato'
    },
    buttonText: {
        color: "#FFF",
        fontSize: 20,
        //fontFamily: 'Lato'
    },
    info: {
        color: "#FFF",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10,
        //fontFamily: 'Lato'
    },

})