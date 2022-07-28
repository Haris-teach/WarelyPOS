import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import NavigationExperimental from 'react-native-deprecated-custom-components';
import Home from "./home";


var _navigator = null;
const App = (props) => {




    // const renderScene = (route, navigator) => {
    //     _navigator = navigator;
    //     let Component = route.component;
    //     return <View style={{ flex: 1 }}><StatusBar backgroundColor="lightblue" /><Component route={route} navigator={navigator} {...route.passProps} /></View>
    // }

    console.log("printer data===", props.br, props.Empty, props.Key)
    return (
        <Home br={props.br} Id={props.Key} Empty={props.Empty} />
    );

}

export default App;