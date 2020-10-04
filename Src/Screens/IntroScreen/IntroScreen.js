import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import AppIntroSlider from "react-native-app-intro-slider";


const slides = [
    {
        key: '1',
        title: 'EXPLOREZ',
        text: 'Découvrez des projets qui vous ressemble',
        image: require('../../Assets/Images/globe.png'),
        backgroundColor: '#59b2ab',
    },
    {
        key: '2',
        title: 'DISCUTEZ',
        text: 'Joigner les autres et discutez',
        image: require('../../Assets/Images/partenaire.png'),
        backgroundColor: '#febe29',
    },
    {
        key: '3',
        title: 'COLLABOREZ',
        text: 'Travaillez ensemble sur des projets',
        image: require('../../Assets/Images/accueil.png'),
        backgroundColor: '#22bcb5',
    }
];


class IntroScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: () => null
        }
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    //
    _renderItem = ({ item }) => {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 20 }}>{item.title}</Text>
                <Image source={item.image} style={{ resizeMode: "center", height: "73%", width: "100%" }} />
                <Text style={styles.text}>{item.text}</Text>
            </View>
        );
    }

    render() {
        return (
            <>
                <AppIntroSlider renderItem={this._renderItem} data={slides} onDone={this._onDone}
                    activeDotStyle={{
                        backgroundColor: 'black'
                    }}
                    doneLabel='suivant'
                    showNextButton={false}
                    style={{ backgroundColor: 'gray' }}
                />
            </>
        );
    }


    //
    _onDone = () => {
        //alert('boom');
        this.props.navigation.navigate('LoginS');
    }
}

const styles = StyleSheet.create({

});

export default IntroScreen
    ;
