import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import CustomActivityIndicator from "../components/generic/CustomActivityIndicator";
const { height, width } = Dimensions.get('screen');
import { useDispatch, useSelector } from 'react-redux';
import { Call, Loc_ID, SaleClose, SetCloseSale, SetSel, SetSelect, Stf_ID } from '../Redux/Reducers/mainReducer';

const Loader = ({ navigation }) => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);


  setTimeout(async () => {
    try {
      let userID = await AsyncStorage.getItem('uid');
      let branch = await AsyncStorage.getItem('branch');


      if (userID != null) {
        dispatch(Loc_ID(branch));
        dispatch(Stf_ID(userID));
        navigation.navigate('Dinning');
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }, 3000);


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
      <CustomActivityIndicator />
    </View>
  );

}


export default Loader;