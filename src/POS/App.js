import React from 'react';
import {Text} from 'react-native';
import {Provider} from 'react-redux';
import Login from './src/authntication/Login';
import Pin from './src/authntication/Pin';
import EditTime from './src/screens/EditTime';
import Dinning from './src/screens/MainDashboard';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import {store} from './src/Redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Loader">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Pin"
            component={Pin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="EditTime"
            component={EditTime}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Dinning"
            component={Dinning}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
