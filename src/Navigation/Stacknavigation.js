import * as React from "react";
import Pin from "../authntication/Pin";
import AmountConfirm from "../authntication/AmountConfirm";
import Login from '../authntication/Login'
import { createStackNavigator } from "@react-navigation/stack";
import EditTime from "../screens/EditTime";
import Dinning from "../screens/MainDashboard";
import Salehistory from '../screens/Salehistory';
import Shift from '../screens/Shift';
import Setting from '../screens/Setting';
import SubTakeway from '../screens/SubTakeway';
import Takeway from '../screens/Takeway';
import Reciept from '../screens/Reciept';
import CloseSale from '../screens/closeSale';




const Stack = createStackNavigator();

const StackNavi = () => {
  return (

    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Shift"
        component={Shift}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="closeSale"
        component={CloseSale}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Dinning"
        component={Dinning}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Re"
        component={Reciept}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Takeway"
        component={Takeway}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="SubTake"
        component={SubTakeway}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Sale History"
        component={Salehistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Pin"
        component={Pin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AmountConfirm"
        component={AmountConfirm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditTime"
        component={EditTime}
        options={{ headerShown: false }}
      />



    </Stack.Navigator>

  );
}

export default StackNavi;
