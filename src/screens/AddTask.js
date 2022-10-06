import React from "react";
import { Modal, View, StyleSheet, TouchableWithoutFeedback, 
    Text, TouchableOpacity, TextInput } from "react-native";
import CommonStyles from "../CommonStyles";

const initialState = { desc: '' }

export default class AddTask extends React.Component{

    state = {
        ...initialState
    }

    render(){
        return(
            <Modal transparent={true} visible={this.props.isVisible}
                onRequestClose={this.props.onCancel} animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.overlay}>

                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.container}>
                    <Text style={styles.header}>
                        Nova Tarefa
                    </Text>
                    <TextInput style={styles.input} placeholder="Informe a descrição..."
                        value={this.state.desc} onChangeText={desc => this.setState({ desc })}/>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.overlay}>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    container: {
        backgroundColor: "#FFF"
    },
    header: {
        backgroundColor: CommonStyles.colors.today,
        color: CommonStyles.colors.secondary,
        textAlign: "center",
        padding: 15,
        fontSize: 18
    },
    buttons: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: CommonStyles.colors.today
    },
    input: {
        height: 40,
        margin: 15,
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,
        paddingLeft: 10,
        paddingRight:10
    }
})