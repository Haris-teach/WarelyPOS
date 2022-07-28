import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import AmountConfirm from "../authntication/AmountConfirm";
import Loader from '../authntication/Loader';
import Login from '../authntication/Login';
import Pin from "../authntication/Pin";
import Anc from '../screens/AddNewCustumor';
import CloseSale from '../screens/closeSale';
import EditTime from "../screens/EditTime";
import Dinning from "../screens/MainDashboard";
import Reciept from '../screens/Reciept';
import Salehistory from '../screens/Salehistory';
import Setting from '../screens/Setting';
import Shift from '../screens/Shift';
import SubTakeway from '../screens/Dinning/SubTakeway';
import Takeway from '../screens/Takeway';
import EscPos from "../Printer/escpos";
import Home from "../Printer/home";

const Stack = createStackNavigator();

const StackNavi = () => {
  return (

    <Stack.Navigator initialRouteName="Loader">

      <Stack.Screen
        name="Escpos"
        component={EscPos}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Loader"
        component={Loader}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Add Customer"
        component={Anc}
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
