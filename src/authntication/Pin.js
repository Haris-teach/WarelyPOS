import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  Image,
  ScrollView, Text,

  ToastAndroid, TouchableOpacity, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {
  heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import APIHandler from '../utils/APIHandler';
import { User_Pin } from '../utils/urls';
import Login from '../authntication/Login';

const Pin = ({ navigation, route }) => {
  const [p1, setP1] = useState('white');
  const [p2, setP2] = useState('white');
  const [p3, setP3] = useState('white');
  const [p4, setP4] = useState('white');
  const [value, setValue] = useState('');
  const [back, setBack] = useState();

  const concatinate = v => {
    let word = value;

    if (v == 'del') {
      word = word.slice(0, -50);
      setValue(word);
      return;
    } else {
      word = word + v;
    }
    word = word + ',';
    setValue(word.toString());
  };

  const Key = route.params?.paramKey;
  const Pin = value.slice(0, -1);
  const branch = route.params?.branchId;

  useEffect(() => {
    let params = {
      Pin: Pin,
      Id: Key,
    };

    APIHandler.hitApi(User_Pin, 'POST', params).then(async response => {
      if (Pin.length == 7) {
        if (response.status == 200) {
          try {
            await AsyncStorage.setItem('uid', Key.toString());
            await AsyncStorage.setItem('Pin', Pin.toString());
            await AsyncStorage.setItem('branch', branch.toString());

          } catch (error) {
            console.log('Something went wrong ', error);

          }
          navigation.navigate('EditTime', { Loc_id: branch, userid: Key });
          ToastAndroid.showWithGravityAndOffset(
            'You have successfully Login',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            15,
            15,
          );
        }
        else {
          ToastAndroid.show('Invalid key for Login !', ToastAndroid.SHORT);
          setP1('white');
          setP2('white');
          setP3('white');
          setP4('white');
          setValue(value.slice(0, -50));
        }
      }
    });
  }, [Pin]);

  return (
    <>
      {back == 1 ? <Login /> :
        <View style={{ flex: 1, backgroundColor: 'rgb(250,250,250)' }}>


          <View
            style={{ backgroundColor: 'rgb(250,250,250)', width: wp('20%'), height: hp('8%'), marginLeft: wp('1%'), marginTop: hp('2%'), marginBottom: hp('4%') }}>
            <Image
              source={require('../assets/Logo.png')}
              style={{ width: wp('20%'), height: hp('8%') }}
              resizeMode="contain"
            />
          </View>
          <Text style={{ alignSelf: 'center', marginBottom: hp('10%'), fontFamily: 'Roboto', fontWeight: 'bold', fontSize: wp('2%') }}>Enter Pin</Text>
          <View style={styles.container1}>


            <View
              style={{
                backgroundColor: 'rgb(250,250,250)',
                width: wp('20%'),
                marginTop: hp('-2.5%'),
                marginBottom: 20,
                alignItems: 'center',
              }}>







              <View style={{ flexDirection: 'row', marginBottom: '5%' }}>
                <View
                  style={[
                    styles.PinView,
                    {
                      backgroundColor: p1,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.PinView,
                    {
                      backgroundColor: p2,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.PinView,
                    {
                      backgroundColor: p3,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.PinView,
                    {
                      backgroundColor: p4,
                    },
                  ]}
                />
              </View>
            </View>

            <ScrollView>
              <Animatable.View
                animation="fadeInUpBig"
                duration={1500}
                style={{
                  height: hp('120%'),
                  marginTop: 10,
                  alignSelf: 'center',
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('98%'),
                    backgroundColor: 'red',
                    borderTopWidth: 1,
                    borderColor: '#b5b5b5',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: wp('20%'),
                      backgroundColor: 'white',
                      height: 100,
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderColor: '#b5b5b5',
                    }}
                    onPress={() => {
                      {
                        p1 === 'white'
                          ? setP1('red')
                          : p2 === 'white'
                            ? setP2('red')
                            : p3 === 'white'
                              ? setP3('red')
                              : p4 === 'white'
                                ? setP4('red')
                                : null;
                      }
                      concatinate('1');
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      1
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      width: wp('20%'),
                      backgroundColor: 'white',
                      height: 100,
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderColor: '#b5b5b5',
                    }}
                    onPress={() => {
                      {
                        p1 === 'white'
                          ? setP1('red')
                          : p2 === 'white'
                            ? setP2('red')
                            : p3 === 'white'
                              ? setP3('red')
                              : p4 === 'white'
                                ? setP4('red')
                                : null;
                      }
                      concatinate('2');
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      2
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      width: wp('20.3%'),
                      backgroundColor: 'white',
                      height: 100,
                      justifyContent: 'center',
                      borderColor: '#b5b5b5',
                    }}
                    onPress={() => {
                      {
                        p1 === 'white'
                          ? setP1('red')
                          : p2 === 'white'
                            ? setP2('red')
                            : p3 === 'white'
                              ? setP3('red')
                              : p4 === 'white'
                                ? setP4('red')
                                : null;
                      }
                      concatinate('3');
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      3
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('98%'),
                    borderTopWidth: 1,
                    backgroundColor: 'red',
                    borderColor: '#b5b5b5',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: wp('20%'),
                      backgroundColor: 'white',
                      height: 100,
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderColor: '#b5b5b5',
                    }}
                    onPress={() => {
                      {
                        p1 === 'white'
                          ? setP1('red')
                          : p2 === 'white'
                            ? setP2('red')
                            : p3 === 'white'
                              ? setP3('red')
                              : p4 === 'white'
                                ? setP4('red')
                                : null;
                      }
                      concatinate('4');
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      4
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      width: wp('20%'),
                      backgroundColor: 'white',
                      height: 100,
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderColor: '#b5b5b5',
                    }}
                    onPress={() => {
                      {
                        p1 === 'white'
                          ? setP1('red')
                          : p2 === 'white'
                            ? setP2('red')
                            : p3 === 'white'
                              ? setP3('red')
                              : p4 === 'white'
                                ? setP4('red')
                                : null;
                      }
                      concatinate('5');
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      5
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      width: wp('20.3%'),
                      backgroundColor: 'white',
                      height: 100,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      {
                        p1 === 'white'
                          ? setP1('red')
                          : p2 === 'white'
                            ? setP2('red')
                            : p3 === 'white'
                              ? setP3('red')
                              : p4 === 'white'
                                ? setP4('red')
                                : null;
                      }
                      concatinate('6');
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      6
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('98%'),
                    borderTopWidth: 1,
                    backgroundColor: 'red',
                    borderColor: '#b5b5b5',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: wp('20%'),
                      backgroundColor: 'white',
                      height: 100,
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderColor: '#b5b5b5',
                    }}
                    onPress={() => {
                      {
                        p1 === 'white'
                          ? setP1('red')
                          : p2 === 'white'
                            ? setP2('red')
                            : p3 === 'white'
                              ? setP3('red')
                              : p4 === 'white'
                                ? setP4('red')
                                : null;
                      }
                      concatinate('7');
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      7
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      width: wp('20%'),
                      backgroundColor: 'white',
                      height: 100,
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderColor: '#b5b5b5',
                    }}
                    onPress={() => {
                      {
                        p1 === 'white'
                          ? setP1('red')
                          : p2 === 'white'
                            ? setP2('red')
                            : p3 === 'white'
                              ? setP3('red')
                              : p4 === 'white'
                                ? setP4('red')
                                : null;
                      }
                      concatinate('8');
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      8
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      width: wp('20.3%'),
                      backgroundColor: 'white',
                      height: 100,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      {
                        p1 === 'white'
                          ? setP1('red')
                          : p2 === 'white'
                            ? setP2('red')
                            : p3 === 'white'
                              ? setP3('red')
                              : p4 === 'white'
                                ? setP4('red')
                                : null;
                      }
                      concatinate('9');
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      9
                    </Text>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('98%'),
                    backgroundColor: 'red',
                    borderTopWidth: 1,
                    marginBottom: 5,
                    borderBottomWidth: 1,
                    borderColor: '#b5b5b5',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: wp('20%'),
                      backgroundColor: 'white',
                      height: 99,
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderColor: '#b5b5b5',
                    }}
                    onPress={() => {
                      setP1('white');
                      setP2('white');
                      setP3('white');
                      setP4('white');
                      concatinate('del');
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      CLEAR
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      width: wp('20%'),
                      backgroundColor: 'white',
                      height: 99,
                      justifyContent: 'center',
                      borderRightWidth: 1,
                      borderColor: '#b5b5b5',
                    }}
                    onPress={() => {
                      {
                        p1 === 'white'
                          ? setP1('red')
                          : p2 === 'white'
                            ? setP2('red')
                            : p3 === 'white'
                              ? setP3('red')
                              : p4 === 'white'
                                ? setP4('red')
                                : null;
                      }
                      concatinate('0');
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}>
                      0
                    </Text>
                  </TouchableOpacity>

                  <View
                    style={{
                      width: wp('20.3%'),
                      backgroundColor: 'white',
                      height: 99,
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        alignSelf: 'center',
                        fontSize: 25,
                        fontWeight: 'bold',
                      }}></Text>
                  </View>
                </View>
              </Animatable.View>
            </ScrollView>

          </View>
          <TouchableOpacity onPress={() => {
            navigation.goBack();
          }} style={{ backgroundColor: 'white', alignItems: 'center', borderWidth: 1, borderColor: '#FC3F3F', marginLeft: wp('2%'), borderRadius: 5, justifyContent: 'center', height: hp('10%'), width: wp('15%'), marginTop: hp('-10%'), }} >
            <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: 'gray' }}>Back</Text>
          </TouchableOpacity>
        </View>}
    </>
  );
};

export default Pin;

const styles = {
  PinView: {
    width: '15%',
    height: hp('5%'),
    marginLeft: 15,

    borderRadius: 25,
  },
  container1: {
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#b5b5b5',
    width: '60%',
    height: '70%',
    marginRight: 150,
    marginLeft: 150,
    backgroundColor: 'rgb(250,250,250)',
  },
};
