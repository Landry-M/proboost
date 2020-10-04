import React, { Component } from 'react';
import { View, StyleSheet, Button, Text, Alert, ActivityIndicator } from "react-native";
import { TextInput, Title } from "react-native-paper";
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        };
        this.username = undefined;
        this.password = undefined;
        this.email = undefined;
        this.phone = undefined;
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', margin: 10 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>
                        Créer votre compte
                    </Text>
                </View>

                <View style={{ flex: 2, justifyContent: 'flex-start' }}>

                    <TextInput
                        label="username"
                        value={this.username}
                        onChangeText={text => this._setUsername(text)}
                        style={styles.textinput}
                    />
                    <TextInput
                        label="Email"
                        value={this.email}
                        onChangeText={text => this._setEmail(text)}
                        style={styles.textinput}
                    />
                    <TextInput
                        label="Phone"
                        value={this.phone}
                        onChangeText={text => this._setPhone(text)}
                        style={styles.textinput}
                    />
                    <TextInput
                        label="Password"
                        value={this.password}
                        onChangeText={text => this._setPassword(text)}
                        style={styles.textinput}
                    />

                    <Button
                        mode="contained"
                        title='Créer le compte'
                        onPress={() => this._onRegister()}
                    >

                    </Button>
                </View>
                {this._displayActivityIndicator()}
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

    //
    _setUsername(text) {
        this.username = text
    }

    //
    _setPassword(text) {
        this.password = text
    }

    //
    _setEmail(text) {
        this.email = text
    }

    //
    _setPhone(text) {
        this.phone = text
    }

    //
    _onRegister = async () => {

        if ((this.username != undefined) && (this.password != undefined) && (this.email != undefined) && (this.phone != undefined)) {
            this.setState({ isLoading: true });

            console.log('register');

            fetch('http://192.168.43.87/proboostapi/routes/register.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.username,
                    email: this.email,
                    phone: this.phone,
                    password: this.password
                })
            }).then(res => res.json()).then(ress => {
                console.log(ress);
                this.setState({ isLoading: false });
                AsyncStorage.setItem('isLoggedIn', 'true');
            }).catch(err => console.log(err));
            // const url = "";

            // await Axios.post("http://192.168.43.87/proboostapi/routes/login.php",
            //     {
            //         headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }
            //     },
            //     {
            //         username: this.username,
            //         email: this.email,
            //         phone: this.phone,
            //         password: this.password
            //     }

            // ).then(response => {
            //     console.log(response.data);
            //     //this.setState({ isLoading: false });
            // }).catch(err => {
            //     console.log(err);
            //     // this.setState({ isLoading: false });
            // });
        } else {
            Alert.alert('Alerte', 'Une erreur est survenue lors de la création de votre compte',
                [
                    {
                        text: 'ok',
                        style: 'default'
                    }
                ]);
        }
    }
}

const styles = StyleSheet.create(
    {
        textinput: {
            marginBottom: 10,
            margin: 7,
        },
        loading_indicator: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 100,
            bottom: 0,
            marginTop: 150
        },
    }
);

export default RegisterScreen;