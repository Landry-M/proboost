import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from "axios";

class LoadingScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    };

    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {

        setTimeout(() => {
            this._retrieveFirstConnectionOnStorage();
        }, 2000);

    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', }}>
                <View style={{ flex: 3, justifyContent: 'flex-end' }}>
                    <Image
                        source={require("../../Assets/Images/logo.jpeg")}
                        style={{ width: 300, height: 200, }}
                        resizeMode='center'
                    />
                </View>

                <View style={{ margin: 7, flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 14 }}>
                        App by
                    </Text>
                    <Text style={{ color: 'green', fontSize: 14.5, margin: 7 }}>
                        JULIEN
                    </Text>
                </View>
            </View>
        );
    }

    //verification si c'est la premiere fois que l'app est lancé
    _retrieveFirstConnectionOnStorage = async () => {
        try {
            const result = await AsyncStorage.getItem('isLoggedIn');
            console.log(result);
            this.props.navigation.navigate(result === 'true' ? 'Home' : 'IntroS');

        }
        catch (error) {
            this.props.navigation.navigate('IntroS');
        }
    }

    //manque de connexion internet
    _goToErrorConnexionPage() {
        this.props.navigation.navigate("NetError");
    }

}

export default LoadingScreen;