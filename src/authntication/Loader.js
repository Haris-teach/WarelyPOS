import React, {Component} from 'react';
import {Text, View, ActivityIndicator, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('screen');
export default class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }
  componentDidMount = () => {
    setTimeout(async () => {
      try {
        let userID = await AsyncStorage.getItem('uid');

        if (userID != null) {
          this.props.navigation.navigate('Dinning');
        } else {
          this.props.navigation.navigate('Login');
        }
      } catch (error) {
        console.log('Something went wrong', error);
      }
    }, 3000);
  };
  render() {
    return (
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          width: width,
          justifyContent: 'center',
          alignItems: 'center',
          height: height,
        }}>
        <Text>Loading..</Text>
      </View>
    );
  }
}
