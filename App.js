import React from 'react';
import DrawerNavigate from './src/Navigation/DrawerNavi';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'react-native'
import StackNavi from './src/Navigation/Stacknavigation';
const Drawer = createDrawerNavigator();
import { store } from './src/Redux/store';
import { Provider } from 'react-redux';


const App = () => {
  return (

    <Provider store={store}>

      <NavigationContainer>
        <StatusBar backgroundColor="red" barStyle="white" />
        <Drawer.Navigator drawerContent={props => <DrawerNavigate {...props} />} drawerStyle={{
          backgroundColor: 'white',
          width: "23%",
        }}>
          <Drawer.Screen name="HomeDrawer" component={StackNavi} options={{
            swipeEnabled: false
          }} />
        </Drawer.Navigator>
      </NavigationContainer>

    </Provider>
  );
}

export default App;