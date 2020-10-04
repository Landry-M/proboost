import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, ToastAndroid, Image, TouchableOpacity, Button } from 'react-native';
import { TextInput, Title } from "react-native-paper";

class HomeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            title: undefined,
            description: undefined,
            auteur: undefined,
            date_deb: undefined,
            date_fin: undefined,
        };
    }

    render() {
        return (
            <View style={{ flex: 1, margin: 7 }}>
                <TextInput
                    label="Titre"
                    value={this.username}
                    onChangeText={text => this._setTitle(text)}
                    style={styles.textinput}
                />
                <TextInput
                    label="Auteur"
                    value={this.username}
                    onChangeText={text => this._setAuteur(text)}
                    style={styles.textinput}
                />
                <TextInput
                    label="Description"
                    value={this.username}
                    onChangeText={text => this._setDesc(text)}
                    style={styles.textinput}
                    multiline={true}
                />
                <TextInput
                    label="Date de debut"
                    value={this.username}
                    onChangeText={text => this._setDate_deb(text)}
                    style={styles.textinput}
                    multiline={true}
                />
                <TextInput
                    label="Date de fin"
                    value={this.username}
                    onChangeText={text => this._setDate_fin(text)}
                    style={styles.textinput}
                    multiline={true}
                />
                <Button
                    mode="contained"
                    title='Soumettre'
                    onPress={() => this._onSubmit()}
                >

                </Button>

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
    _setTitle(text) {
        this.state.title = text;
    }

    _setAuteur(text) {
        this.state.auteur = text;
    }

    _setDesc(text) {
        this.state.description = text;
    }

    _setDate_deb(text) {
        this.state.date_deb = text;
    }

    _setDate_fin(text) {
        this.state.date_fin = text;
    }

    //
    _onSubmit = async () => {

        if ((this.state.title != undefined) && (this.state.description != undefined)) {

            this.setState({ isLoading: true });

            await fetch('http://192.168.43.87/proboostapi/routes/addProject.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: this.state.title,
                    auteur: this.state.auteur,
                    description: this.state.description,
                    date_deb: this.state.date_deb,
                    date_fin: this.state.date_fin,
                })
            }).then(res => res.json()).then(ress => {
                console.log(ress);
                this.setState({ isLoading: false });
                if (ress.result != false) {
                    alert('projet ajouté avec succes');
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

export default HomeScreen;