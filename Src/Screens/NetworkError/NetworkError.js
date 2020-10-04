import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';

class NetworkError extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.main_container}>

                <View style={{ flex: 2, marginTop: 100 }}>
                    <Image
                        source={require('../../Assets/Images/internet.png')}
                        style={styles.image_style}
                    />
                    <Text style={styles.text}>Oups! Erreur de connexion réseau</Text>
                </View>

                <View style={{ flex: 2, marginTop: 200, width: 200 }}>
                    <Button
                        title='Réesayer'
                        color='#0E88F0'
                        onPress={() => this._relaunchApp()}
                    />
                </View>

                <View style={{ margin: 7, flex: 2, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 14 }}>
                        App by
                    </Text>
                    <Text style={{ color: 'green', fontSize: 14.5, margin: 7 }}>
                        HEAVEN TECH & AKATECH-243
                    </Text>
                </View>

            </View>
        );
    }

    //appuie sur le bouton reessayer
    _relaunchApp() {
        this.props.navigation.navigate('LoadingScreen');
    }
}

const styles = StyleSheet.create(
    {
        main_container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            backgroundColor: 'white'
        },
        image_style: {
            height: 200,
            width: 200,
        },
        text: {
            fontSize: 18,

        }
    }
);

export default NetworkError;