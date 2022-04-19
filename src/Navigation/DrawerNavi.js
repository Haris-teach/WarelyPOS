import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Drawer, Text} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import {Call, SetSale_his, SetSel} from '../Redux/Reducers/mainReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Close_print} from '../utils/urls';
import APIHandler from '../utils/APIHandler';
import RNPrint from 'react-native-print';

const DrawerNavigate = (props, route) => {
  const dispatch = useDispatch();
  const {s_id} = useSelector(state => state.root.main);
  const [item, setItem] = useState([]);
  return (
    <DrawerContentScrollView {...props}>
      {console.log('----Staf_ID---', s_id)}
      <Drawer.Section style={styles.drawerSection}>
        <DrawerItem
          icon={() => (
            <Image
              source={require('../assets/Logo.jpg')}
              style={{
                alignItems: 'center',
                width: wp('16%'),
                height: hp('10%'),
              }}
              resizeMode="contain"
            />
          )}
          label={'1'}
        />
        <DrawerItem
          // icon={() => (
          //     <Image source={require('../assest/icons/location.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
          // )}
          label={Lable1}
          onPress={() => {
            props.navigation.navigate('Dinning');
            dispatch(SetSel(4));
          }}
        />
        <DrawerItem
          // icon={() => (
          //     <Image source={require('../assest/icons/pay.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
          // )}
          label={Lable2}
          onPress={() => {
            props.navigation.navigate('Sale History');
            dispatch(SetSale_his(4));
          }}
        />
        <DrawerItem
          // icon={() => (
          //     <Image source={require('../assest/icons/pay.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
          // )}
          label={Lable3}
          onPress={() => {
            props.navigation.navigate('Shift');
          }}
        />

        <DrawerItem
          // icon={() => (
          //     <Image source={require('../assest/icons/stats.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
          // )}
          label={Lable4}
          onPress={() => {
            props.navigation.navigate('Setting');
          }}
        />
        <DrawerItem
          // icon={() => (
          //     <Image source={require('../assest/icons/stats.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
          // )}
          label={Lable6}
          onPress={() => {
            AsyncStorage.clear().then(
              () => props.navigation.closeDrawer(),
              printRemotePDF(),
              // props.navigation.navigate('Login'),
            );
          }}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
};
const callClosePrintAPI = s_id => {
  let param = {
    stf_id: s_id,
  };

  APIHandler.hitApi(Close_print, 'POST').then(response => {
    // setItem(response);
    console.log(' Response ' + response);
  });
};
const printRemotePDF = async () => {
  await RNPrint.print({
    filePath: 'http://warly2.sapphost.com/public/invocie/1621424287.pdf',
  });
};
const Lable1 = () => {
  return (
    <View style={styles.boxStyle}>
      <Text
        style={{fontSize: wp('1.2%'), alignSelf: 'center', fontWeight: 'bold'}}>
        HOME
      </Text>
    </View>
  );
};

const Lable2 = () => {
  return (
    <View style={styles.boxStyle}>
      <Text
        style={{fontSize: wp('1.2%'), alignSelf: 'center', fontWeight: 'bold'}}>
        SALE HISTORY
      </Text>
    </View>
  );
};

const Lable3 = () => {
  return (
    <View style={styles.boxStyle}>
      <Text
        style={{fontSize: wp('1.2%'), alignSelf: 'center', fontWeight: 'bold'}}>
        SHIFT
      </Text>
    </View>
  );
};

const Lable4 = () => {
  return (
    <View style={styles.boxStyle}>
      <Text
        style={{fontSize: wp('1.2%'), alignSelf: 'center', fontWeight: 'bold'}}>
        SETTING
      </Text>
    </View>
  );
};

const Lable6 = () => {
  return (
    <View
      style={{
        borderRadius: 2,
        width: wp('20%'),
        height: hp('5%'),
        alignSelf: 'center',
        marginTop: -13,
        backgroundColor: 'red',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: wp('1.2%'),
          color: 'white',
          alignSelf: 'center',
          fontWeight: 'bold',
        }}>
        CLOSE SALE
      </Text>
    </View>
  );
};
export default DrawerNavigate;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  drawerSection: {
    marginTop: 2,
    marginLeft: '10%',
    alignSelf: 'center',
  },
  boxStyle: {
    borderWidth: 2,
    borderRadius: 6,
    width: wp('15%'),
    height: hp('5%'),
    justifyContent: 'center',
    marginTop: -13,
    alignSelf: 'center',
  },
});
