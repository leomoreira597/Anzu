import React from "react";
import { 
    ImageBackground, 
    Text, 
    StyleSheet, 
    View, 
    TextInput, 
    TouchableOpacity,
    Platform 
} from "react-native";
import backgroundImage from "../../assets/imgs/login.jpg";
import CommonStyles from "../CommonStyles";
import { StatusBar } from 'expo-status-bar';


export default function AuthDois(){
    return(
        <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>
                    Anzu
                </Text>
                <View style={styles.formContainer}>
                    <TextInput placeholder="E-mail" value={this.state.email} style={styles.input} 
                    onChangeText={email => this.setState({ email })} />
                    <TextInput placeholder="Senha" value={this.state.password} style={styles.input} 
                    onChangeText={password => this.setState({ password })} />
                    <TouchableOpacity>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                Entrar
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <StatusBar style="light" />
            </ImageBackground>
    );
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
    }
})