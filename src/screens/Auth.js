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

export default class Auth extends React.Component{

    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        stageNew: false
    }

    singinOrSingup = () => {
        if(this.state.stageNew){
            Alert.alert("Sucesso", "Criar a conta")
        }

    }

    render(){
        return(
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>
                    Anzu
                </Text>
                <View style={styles.formContainer}>
                    <Text style={styles.info}>
                        {this.state.stageNew ? "Crie a sua conta" : "Informe seus dados"}
                    </Text>
                    {this.state.stageNew &&
                         <TextInput placeholder="Nome" value={this.state.name} style={styles.input} 
                         onChangeText={name => this.setState({ name })} />
                    }
                    <TextInput placeholder="E-mail" value={this.state.email} style={styles.input} 
                    onChangeText={email => this.setState({ email })} />
                    <TextInput placeholder="Senha" secureTextEntry={true} value={this.state.password} style={styles.input} 
                    onChangeText={password => this.setState({ password })} />
                    {this.state.stageNew &&
                        <TextInput placeholder="Confirme a senha" secureTextEntry={true} value={this.state.confirmPassword} style={styles.input} 
                        onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                    }
                    <TouchableOpacity >
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? "Registrar" : "Entrar"}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{padding: 10}} onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                        <Text style={styles.buttonText}>
                            {this.state.stageNew ? "Já tem uma conta? Entre aqui" : "Ainda não é cadastrado? Cadastre-se aqui"}
                        </Text>
                </TouchableOpacity>
                <StatusBar style="light" />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        width: '100%',
        alignItems: "center",
        justifyContent:"center"
    },
    title:{
        color: CommonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10
    },
    input: {
        marginTop: 10,
        backgroundColor: "#FFF",
        padding: Platform.OS == 'ios' ? 15 : 10
    },
    formContainer:{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        padding: 20,
        width: "90%"
    },
    button:{
        backgroundColor: "#080",
        marginTop: 10,
        padding: 10,
        alignItems: "center"
    },
    buttonText:{
        color: "#FFF",
        fontSize: 20
    },
    info:{
        color: "#FFF",
        fontSize: 20,
        textAlign: "center",
        marginBottom: 10
    },

})