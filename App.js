import React from 'react';
import DrawerNavigate from './src/Navigation/DrawerNavi';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar, SafeAreaView, ScrollView, Text } from 'react-native'
import StackNavi from './src/Navigation/Stacknavigation';
const Drawer = createDrawerNavigator();
const App = () => {
  return (
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
  );
}

export default App;