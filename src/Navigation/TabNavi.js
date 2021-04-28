import React from 'react';
import { Image, View } from 'react-native';
import Takeway from '../screens/Takeway';
import Delivery from '../screens/Delivery';
import Pickup from '../screens/Pickup';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
    return (

        <Tab.Navigator tabBarOptions={{
            labelStyle: { fontSize: 12, color: 'white' },
            tabStyle: { width: 150, marginLeft: 20 },
            style: { backgroundColor: 'red', width: "100%", height: 35 },
            tabBarIcon: () => (
                <Image source={require('../assets/menu.jpg')} resizeMode="contain" style={{ width: 25, height: 25 }} />
            )
        }
        }>


            <Tab.Screen
                name="Takeway"
                component={Takeway}
            />

            <Tab.Screen
                name="Delivery"
                component={Delivery}
            />

            <Tab.Screen
                name="Pickup"
                component={Pickup}
            />
        </Tab.Navigator >

    );
}

export default MyTabs;