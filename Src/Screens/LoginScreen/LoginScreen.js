import React, { Component } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, Button, TouchableOpacity, ActivityIndicator, ToastAndroid } from 'react-native';
import { TextInput } from "react-native-paper";
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';

class LoginScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            username: undefined,
            password: undefined,
        };

    }

    render() {
        return (

            <View style={{ flex: 1, padding: 10, justifyContent: 'center' }}>

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18 }}>Login</Text>
                </View>

                <View style={{ flex: 2, justifyContent: 'flex-start' }}>
                    <TextInput
                        label="username"
                        returnKeyType="next"
                        value={this.username}
                        onChangeText={text => this._CheckUsername(text)}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        textContentType="emailAddress"
                        keyboardType="email-address"
                    />

                    <TextInput
                        label="Password"
                        returnKeyType="done"
                        value={this.password}
                        onChangeText={text => this._CheckPasswd(text)}
                        secureTextEntry
                        style={{ marginBottom: 10 }}
                    />

                    <Button
                        mode="contained"
                        title='Login'
                        onPress={() => this._onLoginPressed()}
                    >

                    </Button>

                    <View style={{ marginTop: 60 }}>
                        <Text style={styles.label}>Vous n’avez pas de compte? </Text>
                        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => this.props.navigation.navigate('Register')}>
                            <Text style={{ color: 'blue' }}>Créer un compte</Text>
                        </TouchableOpacity>
                    </View>

                    {this._displayActivityIndicator()}
                </View>

            </View>

        );
    }

    // activity indicator
    _displayActivityIndicator() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_indicator}>
                    <ActivityIndicator size="large" color="green" />
                </View>
            )
        }
    }

    //_check username
    _CheckUsername(text) {
        this.state.username = text;
    }

    //check passwd
    _CheckPasswd(text) {
        this.state.password = text;
    }

    //Loading indicator
    _displayLoad() {
        if (this.state.isLoading == true) {
            return (
                <View style={styles.loading_indicator}>
                    <ActivityIndicator size='large' color='yellow' />
                </View>
            );
        }
    }

    //Login
    _onLoginPressed = async (userName, passwd) => {

        if ((this.state.password != undefined) && (this.state.username != undefined)) {

            //console.log(this.state.isLoading);
            //const url = "http://192.168.43.11/cita/API/cita_enterprise/Agents/Auth/login.php";
            //console.log(this.username + " " + this.password);
            this.setState({ isLoading: true });

            await fetch('http://192.168.43.87/proboostapi/routes/login.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            }).then(res => res.json()).then(ress => {
                console.log(ress);
                this.setState({ isLoading: false });
                if (ress.result != false) {
                    this._storeData()
                    this.props.navigation.navigate('Home');
                } else {
                    this.setState({ isLoading: false });
                    ToastAndroid.showWithGravity('Coordonnées de connexion incorect', ToastAndroid.LONG, ToastAndroid.BOTTOM);

                }

            }).catch(err => console.log(err));
        } else {
            ToastAndroid.showWithGravity('Veuillez remplir tout les champs', ToastAndroid.LONG, ToastAndroid.BOTTOM);
            //this.setState({ isLoading: false })
        }
    }

    //_storeData
    _storeData = async () => {
        try {
            await AsyncStorage.setItem(
                'isLoggedIn',
                'true'
            );
        } catch (error) {
            // Error saving data
        }
    };

}


const styles = StyleSheet.create({
    main_view: {
        flex: 1,
        flexDirection: 'column',
        margin: 10
    },
    sub_view1: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    sub_view2: {
        flex: 1,

    },
    sub_View3: {
        flex: 1,
        flexDirection: 'column-reverse',
        alignItems: 'flex-end',
        margin: 15

    },
    textInput: {

        borderRadius: 5,
        backgroundColor: 'white',
        height: 40,
        width: 370,
        marginBottom: 15
    },
    loading_indicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        marginTop: 150
    },
    text: {
        color: 'white'
    }
});


export default LoginScreen;