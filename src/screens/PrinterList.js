import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import And from './AddNewDevice';
import APIHandler from '../utils/APIHandler';
import {Printer_list} from '../utils/urls';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Pl = () => {
  const [state, setState] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [printers, setPrinters] = useState([]);

  const callPrinterListAPI = () => {
    // let params = {
    //     Loc_id: loc_id,
    //     Cat_id: props.Cat_id,
    // };
    setLoading(true);
    APIHandler.hitApi(Printer_list, 'POST').then(response => {
      setPrinters(response);
      setLoading(false);
    });
  };
  useEffect(() => {
    // callPrinterListAPI();
  }, []);

  return (
    <View style={{flex: 1}}>
      {state == true ? (
        <>
          <Text
            style={{
              fontSize: wp('3%'),
              fontWeight: 'bold',
              marginTop: hp('1%'),
              color: 'grey',
            }}>
            Device
          </Text>

          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              style={styles.cyr}
              onPress={() => setState(false)}>
              <Image
                style={{
                  width: wp('1.7%'),
                  height: hp('3.1%'),
                  margin: wp('1%'),
                }}
                source={require('../assets/plus-white.png')}
              />
              <Text style={styles.cyrText}>Add New Printer</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginTop: hp('1%')}}>
            <View style={{marginRight: wp('22%')}}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: wp('1.5%'),
                  fontWeight: 'bold',
                }}>
                Name
              </Text>
            </View>

            <View style={{marginRight: wp('22%')}}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: wp('1.5%'),
                  fontWeight: 'bold',
                }}>
                Type
              </Text>
            </View>

            <View style={{marginRight: wp('5%')}}>
              <Text
                style={{
                  color: 'gray',
                  fontSize: wp('1.5%'),
                  fontWeight: 'bold',
                }}>
                Status
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              elevation: 5,
              width: wp('76.5%'),
              height: hp('9%'),
              marginTop: hp('1.2%'),
              flexDirection: 'row',
            }}>
            <View
              style={[
                styles.printerList,
                {borderRightColor: '#a9a9a9', borderRightWidth: 2},
              ]}>
              <Text style={styles.listText}>Printer 1</Text>
            </View>

            <View
              style={[
                styles.printerList,
                {borderRightColor: '#a9a9a9', borderRightWidth: 2},
              ]}>
              <Text style={styles.listText}>Cashier</Text>
            </View>

            <View style={styles.printerList}>
              <Text style={styles.listText}>Paired</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              elevation: 5,
              width: wp('76.5%'),
              height: hp('9%'),
              marginTop: hp('1.2%'),
              flexDirection: 'row',
            }}>
            <View
              style={[
                styles.printerList,
                {borderRightColor: '#a9a9a9', borderRightWidth: 2},
              ]}>
              <Text style={styles.listText}>Printer 1</Text>
            </View>

            <View
              style={[
                styles.printerList,
                {borderRightColor: '#a9a9a9', borderRightWidth: 2},
              ]}>
              <Text style={styles.listText}>Cashier</Text>
            </View>

            <View style={styles.printerList}>
              <Text style={styles.listText}>Paired</Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              elevation: 5,
              width: wp('76.5%'),
              height: hp('9%'),
              marginTop: hp('1.2%'),
              flexDirection: 'row',
            }}>
            <View
              style={[
                styles.printerList,
                {borderRightColor: '#a9a9a9', borderRightWidth: 2},
              ]}>
              <Text style={styles.listText}>Printer 2</Text>
            </View>

            <View
              style={[
                styles.printerList,
                {borderRightColor: '#a9a9a9', borderRightWidth: 2},
              ]}>
              <Text style={styles.listText}>Cashier</Text>
            </View>

            <View style={styles.printerList}>
              <Text style={styles.listText}>Paired</Text>
            </View>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              elevation: 5,
              width: wp('76.5%'),
              height: hp('9%'),
              marginTop: hp('1.2%'),
              flexDirection: 'row',
            }}>
            <View
              style={[
                styles.printerList,
                {borderRightColor: '#a9a9a9', borderRightWidth: 2},
              ]}>
              <Text style={styles.listText}>Printer 3</Text>
            </View>

            <View
              style={[
                styles.printerList,
                {borderRightColor: '#a9a9a9', borderRightWidth: 2},
              ]}>
              <Text style={styles.listText}>Cashier</Text>
            </View>

            <View style={styles.printerList}>
              <Text style={styles.listText}>Paired</Text>
            </View>
          </View>
        </>
      ) : (
        <And />
      )}
    </View>
  );
};

export default Pl;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFAFA',
  },
  cyr: {
    flexDirection: 'row',
    width: wp('22%'),
    height: hp('7.5%'),
    backgroundColor: 'red',
    marginVertical: hp('1.5%'),
    paddingVertical: hp('1.5%'),
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: wp('5%'),
    alignItems: 'center',
  },
  cyrText: {
    fontSize: wp('1.5%'),
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  printerList: {
    width: wp('25.2%'),
    height: hp('7.5%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    margin: '0.5%',
    marginRight: wp('-0.2%'),
  },

  listText: {
    color: 'grey',
    marginLeft: wp('1%'),
  },
});
