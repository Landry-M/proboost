import React from 'react';

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack"
import { createBottomTabNavigator, createTabNavigator } from "react-navigation-tabs";

//ecrans
import HomeScreen from "../Screens/HomeScreen/HomeScreen";
import LoginScreen from "../Screens/LoginScreen/LoginScreen";
import IntroScreen from "../Screens/IntroScreen/IntroScreen";
import NetworkErrorScreen from "../Screens/NetworkError/NetworkError";
import LoadingScreen from "../Screens/LoadingScreen/LoadingScreen";
import RegisterScreen from "../Screens/RegisterScreen/RegisterScreen";
import DetailScreen from '../Screens/DetailScreen/DetailScreen';
import AddProjectScreen from '../Screens/AddProjectScreen/AddProject';

import Icon from 'react-native-vector-icons/FontAwesome';

//stack intro
const stackNavigatorForIntro = createStackNavigator({
    Intro: {
        screen: IntroScreen
    }
});

//stack login
const stackNavigatorForAuth = createStackNavigator({
    Login: {
        screen: LoginScreen
    },
    Register: {
        screen: RegisterScreen,
        navigationOptions: {
            title: 'Créer un compte'
        }
    }
});

//stack for home
const stackNavigationForHome = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: "Accueil"
        }
    },
    Detail: {
        screen: DetailScreen,
        navigationOptions: {
            title: 'Details'
        }
    }
});

// tab for app
const tabNavForApp = createBottomTabNavigator(
    {
        Home: {
            screen: stackNavigationForHome,
            navigationOptions: {
                tabBarLabel: "Accueil",
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="home" color={tintColor} size={20} />
                )
            }
        },
        Project: {
            screen: AddProjectScreen,
            navigationOptions: {
                tabBarLabel: "Ajouter projet",
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="user" color={tintColor} size={20} />
                )
            }
        },
    }, {

    tabBarOptions: {
        activeTintColor: 'red',
        inactiveTintColor: 'grey',
        style: {
            backgroudColor: 'white',
            borderTopWidth: 0,
        }
    }
}
);

const AppNav = createAppContainer(createSwitchNavigator(
    {
        IntroS: {
            screen: stackNavigatorForIntro
        },
        NetError: {
            screen: NetworkErrorScreen
        },
        LoadingS: {
            screen: LoadingScreen
        },
        LoginS: {
            screen: stackNavigatorForAuth
        },
        //test
        Register: {
            screen: RegisterScreen
        },
        Home: {
            screen: tabNavForApp
        }
    },
    {
        initialRouteName: "LoadingS"
    }
));

export default AppNav;