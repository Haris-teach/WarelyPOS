import React, { useEffect, useState } from "react";
import { ScrollView, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { ButtonGroup } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomActivityIndicator from "../components/generic/CustomActivityIndicator";
import APIHandler from "../utils/APIHandler";
import { SALE_HISTORY, SALE_HISTORY_DETAIL, Table_return, Re_print } from "../utils/urls";
import Takeway from './Takeway';
import Delivery from './Delivery';
import Pickup from './Pickup';

import RNPrint from 'react-native-print';
import MainDashboard from './Dinning';
import { useSelector, useDispatch } from 'react-redux';
import { SetSale_his } from '../Redux/Reducers/mainReducer';


const SaleHistory = (route) => {
  const dispatch = useDispatch()
  const { stf_id, sale_his } = useSelector((state) => state.root.main);

  const navigation = useNavigation();
  const br = route.params?.Loc_id;
  const Key = route.params?.userid;
  const [branch, setBranch] = useState("branch");
  const [saleOrders, setSaleOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderType, setOrderType] = useState(1);
  const [orderDate, setOrderDate] = useState();
  const [value, setValue] = useState();
  const [pid, setPid] = useState();
  const [time, setTime] = useState('Select Order');
  const [table, setTable] = useState('');
  const [pax, setPax] = useState('');
  const [isLoading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [text, setText] = useState('Dine in');
  const [backgroundcolor, setbackgroundColor] = useState('red');
  const [textColor, setTextColor] = useState('white');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const [dat, setDat] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(Platform.OS === 'ios' ? true : false);
  };


  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };


  const formatDate = (date) => {
    return `${date.getDate()}/${date.getMonth() +
      1}/${date.getFullYear()}`;
  };
  const tableReturn = () => {
    let param = {
      id: pid
    };

    APIHandler.hitApi(Table_return, 'POST', param)
      .then(response => {
        console.log("Tables Return Order", response);
      }
      );

  }
  const [load, setLoad] = useState(false);
  const reload = () => {
    setLoad(!load);
  }

  const callHistoryAPI = () => {
    let params = {
      stf_id: stf_id,
      type: orderType,
      date: `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()}}`,
    };

    setLoading(true);

    APIHandler.hitApi(SALE_HISTORY, 'POST', params).then(response => {
      setLoading(false);
      setSaleOrders(response);
    }).catch(error => {
      setLoading(false);
      // console.log(error);
    });
  };

  const callDetailAPI = (orderId) => {
    let params = {
      trans_id: orderId,
    };

    setLoading(true);

    APIHandler.hitApi(SALE_HISTORY_DETAIL, 'POST', params).then(response => {
      setLoading(false);
      setOrderDetails(response);
    }).catch(error => {
      setLoading(false);
      // console.log(error);
    });
  };
  const [a, setA] = useState(0);
  useEffect(() => {

    if (a == 0) {
      let params = {
        stf_id: stf_id,
        type: orderType,
        date: null,
      };
      console.log("chalta ha bhai if ma b", a);
      setLoading(true);
      setA(1);
      APIHandler.hitApi(SALE_HISTORY, 'POST', params).then(response => {
        setLoading(false);
        setSaleOrders(response);
      }).catch(error => {
        setLoading(false);
        // console.log(error);
      });

    }
    else {
      callHistoryAPI();
      console.log("chalta ha bhai else my b", a);

    }

    var weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mond";
    weekday[2] = "Tues";
    weekday[3] = "Wed";
    weekday[4] = "Thur";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var d = new Date();
    var n = weekday[d.getDay()];
    var mon = new Array(7);
    mon[0] = "Jan";
    mon[1] = "Feb";
    mon[2] = "Mar";
    mon[3] = "Apr";
    mon[4] = "May";
    mon[5] = "Jun";
    mon[6] = "July";
    mon[7] = "Agus";
    mon[8] = "Sep";
    mon[9] = "Oct";
    mon[10] = "Nov";
    mon[11] = "Dec";

    var m = mon[d.getMonth()]; // Since getMonth() returns month from 0-11 not 
    var date = d.getDate();

    var dateStr = n + "." + m + " " + date;
    setDat(dateStr);
  }, [date, load]);



  useEffect(() => {
    callHistoryAPI();
  }, [orderType, orderDate]);

  const renderOrderListHeader = () => {
    return (
      <View style={{
        borderTopColor: '#d3d3d3',
        borderTopWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
      }}>
        <Text style={[styles.ordersHeaderText, {
          width: "10%",
        }]}>No</Text>

        <Text style={[styles.ordersHeaderText, {
          width: "20%",
        }]}>Time</Text>

        <Text style={[styles.ordersHeaderText, {
          width: "13%"
        }]}>Table</Text>


        <Text style={[styles.ordersHeaderText, {
          width: "13%",
        }]}>Pax</Text>

        <Text style={[styles.ordersHeaderText, {
          width: "15%"
        }]}>Order Type</Text>

        <Text style={[styles.ordersHeaderText, {
          width: "19%"
        }]}>Bill Amount</Text>
      </View>
    );
  };

  const [t, setT] = useState();
  const renderOrdersItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{
        flexDirection: 'row',
        borderBottomWidth: 0.3,
        borderBottomColor: 'rgb(230,230,230)',
        backgroundColor: item.bcolor
      }}
        onPress={() => {
          callDetailAPI(item.id);

          setTime(item.TimeStamp); setTable(item.table);
          setPax(item.member);
          setPid(item.id);
          setT(item.total);
          Re_Print();
        }}>
        <Text style={{
          marginLeft: wp('2%'),
          padding: '2%',
          marginRight: wp('1%'),
          borderRightWidth: 0.3, width: wp('5%'),
          fontSize: wp('1.5%')
        }}>{index + 1}</Text>

        <Text style={{
          padding: '2%', width: wp('8.5%'), fontSize: wp('1.5%')
        }}>{item.TimeStamp}</Text>

        <Text style={[styles.ordersRowText, {
          padding: '2%', fontSize: wp('1.5%'),
          marginRight: wp('1%'), width: wp('5.5%')
        }]}>{item.table}</Text>


        <Text style={{
          marginLeft: wp('1%'),
          padding: '2%', fontSize: wp('1.5%'),
          marginRight: wp('1%'), width: wp('5.5%')
        }}>{item.member}</Text>

        <Text style={{
          marginLeft: wp('1%'),
          padding: '2%', fontSize: wp('1.5%'),
          marginRight: wp('4.5%'), width: wp('7%')
        }}>{item.type}</Text>

        <Text style={{
          color: 'red',
          padding: '2%',
          width: "19%", fontSize: wp('1.5%')
        }}>{"$" + item.total}</Text>
      </TouchableOpacity >
    );
  };

  const renderDetailItem = ({ item, index }) => {
    return (

      <View style={{ flexDirection: 'row', backgroundColor: item.bcolor }}>
        <View style={{
          padding: '2%',
          borderRightWidth: 0.3,
          borderRightColor: 'gray',
          width: wp('5%')
        }}>
          <Text style={{ fontSize: wp('1%'), fontWeight: 'bold', }}>{index + 1}</Text>
        </View>

        <View style={{
          marginLeft: wp('1%'),
          padding: '2%',
          marginRight: wp('1%'),
          borderRightColor: 'gray',
          width: wp('13%')
        }}>
          <Text style={{ fontSize: wp('1%'), fontWeight: 'bold', }}>{item.product}</Text>
        </View>
        <View style={{
          marginLeft: wp('1%'),
          padding: '2%',
          borderRightColor: 'gray',
          marginRight: wp('1%'),
          width: wp('7%')
        }}>
          <Text style={styles.textStyle}>{item.qty}</Text>
        </View>
        <View style={{
          marginLeft: '1%',
          padding: '2%',
          borderRightColor: 'gray',
          marginRight: '1%',
          width: "20%", color: 'red'
        }}>
          <Text style={[styles.textStyle, { color: 'red' }]}>{"$" + item.price}</Text>
        </View>
      </View>

    );
  }
  const updateIn = (s) => {
    dispatch(SetSale_his(s));
  };
  const btn1 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginRight: 10 }}>DINING</Text>
  const btn2 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginLeft: 10, }}>TAKEAWAY</Text>
  const btn3 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginLeft: 10, }}>DELIVERY</Text>
  const btn4 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginLeft: 10, }}>PICKUP</Text>

  const button = [{ element: btn1 }, { element: btn2 }, { element: btn3 }, { element: btn4 }];
  const TYPE_ARRAY = [
    {
      id: 1,
      value: "Dine in",
    },
    {
      id: 2,
      value: "Take away",
    },
  ];



  const [slip, setSlip] = useState();
  const Re_Print = () => {
    let params = {
      trans_id: pid,
    };
    APIHandler.hitApi(Re_print, 'POST', params).then(response => {

      setSlip(response.url);
    }).catch(error => {

      console.log(error);
    });
    console.log(slip)

  }

  const print = async printRemotePDF => {
    await RNPrint.print({ filePath: slip })
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ backgroundColor: 'red' }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ width: wp('4%'), marginLeft: wp('1%'), marginTop: hp('1%'), marginBottom: hp('2%') }}>
          <Image
            source={require('../assets/Hamburger.jpg')}
            style={{
              width: wp('3%'),
              height: hp('3%'),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>


        <View>
          <ButtonGroup
            onPress={updateIn}
            selecte={sale_his}
            buttons={button}
            containerStyle={{ height: hp('6%'), backgroundColor: 'red', width: "40%", marginLeft: wp('6%'), marginTop: hp('-7%'), borderColor: 'red', marginBottom: 2 }}
            selectedButtonStyle={{ backgroundColor: 'green' }}

          />

        </View>

        <View style={{ width: wp('20%'), alignSelf: 'flex-end', marginTop: hp('-5.5%'), marginBottom: 7, marginRight: 10, }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} >
            <Image
              source={require('../assets/Bell.jpg')}
              style={{
                width: wp('3.5%'),
                height: hp('3.5%'),

              }}
              resizeMode="contain"
            />

          </TouchableOpacity>
          <View style={{ marginTop: hp('-4%'), marginLeft: wp('8%') }}><Text style={{ color: 'white', fontSize: wp('1.5%') }}>{dat}</Text></View>
        </View>

      </View>
      { sale_his == 0 ? <MainDashboard /> : sale_his == 1 ? <Takeway branch={br} idUser={Key} /> : sale_his == 2 ? <Delivery /> : sale_his == 3 ? <Pickup /> : sale_his == 4 ?
        <View style={styles.container}>

          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalOpen}
              onRequestClose={() => {
                setModalOpen(!modalOpen);
              }} >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity onPress={() => setModalOpen(!modalOpen)}>
                    <Image source={require('../assets/cross2.png')} style={styles.crossImage} />
                  </TouchableOpacity>
                  <View style={styles.innerModalView}>
                    <Image source={require('../assets/confirm.jpg')} style={{ width: wp('17.5%'), height: hp('32.7%') }} />
                    <Text style={{ fontSize: wp('2%'), marginBottom: wp('1%'), textAlign: "center", fontWeight: 'bold' }}>Confirm Refund</Text>
                    <Text style={{ fontSize: wp('2%'), marginBottom: wp('1%'), textAlign: "center", color: 'red', fontWeight: 'bold' }}>$ {t}</Text>
                    <TouchableOpacity
                      style={[styles.button, styles.confirmbtn]}
                      onPress={() => {
                        setModalOpen(!modalOpen);
                        reload();
                      }}
                    >
                      <Text style={styles.confirmText}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modal2Open}
              onRequestClose={() => {
                setModal2Open(!modal2Open);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <TouchableOpacity onPress={() => setModal2Open(!modal2Open)}>
                    <Image source={require('../assets/cross2.png')} style={styles.crossImage} />
                  </TouchableOpacity>
                  <View style={[styles.innerModalView]}>
                    <FlatList
                      data={TYPE_ARRAY}
                      keyExtractor={item => item.id}
                      renderItem={({ item }) => {
                        return (
                          <TouchableOpacity
                            style={[styles.button, styles.modal2Btn]}
                            onPress={() => {
                              setText(item.value);
                              setbackgroundColor('red');
                              setTextColor('white');
                              setModal2Open(!modal2Open);
                              setOrderType(item.id);
                              setValue(item.id);
                              setOrderDetails([]);
                            }}>
                            <Text style={styles.modal2Text}>{item.value}</Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </View>

          <View style={{ borderRightColor: 'grey', borderRightWidth: 0.5, flex: 0.5, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '1%', margin: '2%' }}>
              <Text style={{ fontSize: wp('1%'), fontWeight: 'bold' }}>History</Text>
              {/* orderDate.getFullYear() + "-" + (orderDate.getMonth() + 1) + "-" + orderDate.getDate() */}
              <Text style={{ fontWeight: 'bold' }}>{orderDate ? orderDate.string : ''}</Text>
            </View>

            {/* {renderOrderListHeader()} */}
            {value == 2 ?
              <View style={{ borderTopColor: '#d3d3d3', borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-around', padding: '2%' }}>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold', marginLeft: '-5%' }}>No</Text>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold', marginLeft: '-2%' }}>Time</Text>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold', marginLeft: '30%' }}>Order Type</Text>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold', marginRight: '-3%' }}>Bill Amount</Text>
              </View>
              :
              <View style={{ borderTopColor: '#d3d3d3', borderTopWidth: 1, flexDirection: 'row', justifyContent: 'space-around', padding: '2%' }}>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold', marginLeft: '-2%' }}>No</Text>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold', marginLeft: '-3%' }}>Time</Text>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold', marginLeft: '-2%' }}>Table</Text>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold' }}>Pax</Text>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold' }}>Order Type</Text>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold', marginRight: '-3%' }}>Bill Amount</Text>
              </View>



            }

            <View style={{ borderWidth: 1, borderColor: '#d3d3d3', elevation: 1, height: hp('38%'), width: wp('64%') }}>

              <FlatList
                data={saleOrders.arr}
                keyExtractor={item => item.key}
                renderItem={renderOrdersItem}
              />


            </View>


            <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <View style={{ alignItems: 'center', justifyContent: 'space-around', padding: '5%' }}>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold' }}>Cash</Text>
                <Text style={{ fontSize: wp('1%'), fontWeight: 'bold', color: '#696969' }}>${saleOrders.cash_amount}</Text>
              </View>

              <View style={{ alignItems: 'center', justifyContent: 'space-around', padding: '5%' }}>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold' }}>Card</Text>
                <Text style={{ fontSize: wp('1%'), fontWeight: 'bold', color: '#696969' }}>${saleOrders.card}</Text>
              </View>

              <View style={{ alignItems: 'center', justifyContent: 'space-around', padding: '5%' }}>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold' }}>Float</Text>
                <Text style={{ fontSize: wp('1%'), fontWeight: 'bold', color: '#696969' }}>${saleOrders.float}</Text>
              </View>

              <View style={{ alignItems: 'center', justifyContent: 'space-around', padding: '5%' }}>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold' }}>Total Sale:</Text>
                <Text style={{ fontSize: wp('1%'), fontWeight: 'bold', color: '#696969' }}>${saleOrders.total + saleOrders.card}</Text>
              </View>
            </View>


            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.generateBtn}>

                <Text style={styles.GenerateText}>Generate</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.TypeBtn, { backgroundColor: backgroundcolor }]}
                onPress={() => setModal2Open(true)}>

                <Text style={[styles.TypeText, { color: textColor }]}>{text}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.DateBtn}
                onPress={showDatepicker}
              >
                <Text style={styles.DateText}>{formatDate(date)}</Text>
              </TouchableOpacity>

            </View>
          </View>


          {/* OrderDetails */}
          <View style={{ flex: 0.5, backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', height: hp('13%') }}>
              <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> {time}</Text>

              {value == 1 ?
                <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> | </Text>
                :
                <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold', display: 'none' }}> | </Text>
              }
              <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold', color: 'red' }}>{table} </Text>

              {value == 1 ?
                <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> | </Text>
                :
                <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold', display: 'none' }}> | </Text>
              }
              <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> {pax} </Text>
            </View>

            <View style={{ marginLeft: wp('1%'), marginRight: wp('1%'), height: wp('18%') }}>


              {orderDetails.length > 0 ?
                <FlatList
                  data={orderDetails}
                  keyExtractor={item => item.id}
                  renderItem={renderDetailItem} /> :
                <Text style={{ alignSelf: 'center', color: 'grey' }}>Please select any order to view details</Text>
              }



            </View>

            <View style={{ borderColor: '#d3d3d3', borderTopWidth: 1, flexDirection: 'row', padding: '2%' }}>
              <Text style={{ fontSize: wp('1%'), marginLeft: wp('1%'), marginRight: wp('1%') }}>Items:</Text>
              <Text style={{ fontSize: wp('1%'), marginRight: wp('1%'), fontWeight: 'bold' }}>{orderDetails.length}</Text>
              <Text style={{ fontSize: wp('1%'), marginRight: wp('1%') }}>|</Text>
              <Text style={{ fontSize: wp('1%'), marginRight: wp('1%') }}>Payment Method:</Text>
              <Text style={{ fontSize: wp('1%'), marginRight: wp('1%'), fontWeight: 'bold' }}>CASH</Text>
            </View>

            <View style={{ flexDirection: 'row', height: hp('50%'), width: wp('50%'), marginLeft: wp('2%') }}>

              <View style={{ height: hp('30%'), width: wp('20%') }}>
                <TouchableOpacity style={styles.RePrintBtn}
                  onPress={() => print()}>
                  <Text style={styles.RePrintText}>Re-Print</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.RefundBtn}
                  onPress={() => {
                    setOrderDetails([]);
                    setModalOpen(true);
                    tableReturn();

                  }}>

                  <Text style={styles.RefundText}>Refund</Text>
                </TouchableOpacity>
              </View>
              <View style={{ borderColor: '#d3d3d3', borderWidth: 2, flexDirection: 'row', height: wp('12.5%'), width: wp('25%'), borderRadius: 4, marginLeft: wp('2%') }}>
                <View style={{ marginLeft: wp('4%'), marginTop: hp('3%') }}>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>Service Charges:</Text>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>Discount:</Text>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>GST:</Text>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>Total Price:</Text>
                </View>

                <View style={{ marginLeft: wp('6%'), marginTop: hp('3%') }}>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>$0.00</Text>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>$0.00</Text>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>$0.00</Text>
                  <Text style={{ fontSize: wp('1%'), color: 'red', marginBottom: wp('0.7%'), fontWeight: 'bold' }}>${t}</Text>
                </View>

              </View>

            </View>

          </View>

          {isLoading && <CustomActivityIndicator />}

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}
        </View >
        : null}
    </View >
  );
};



export default SaleHistory;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp('10%'),
  },
  crossImage: {
    margin: '5%',
    width: wp('1.3%'),
    height: hp('1.8%')
  },
  viewStyle: {
    marginLeft: '1%',
    padding: '1%',
    borderRightWidth: 0.3,
    marginRight: '1%',
    opacity: 0.5,
    width: '10%',
  },

  modalView: {
    width: hp('70%'),
    height: hp('70%'),
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  innerModalView: {
    justifyContent: 'space-evenly',
    alignItems: "center",

  },

  billText: {
    alignItems: 'flex-end',
  },

  item: {
    padding: '1%',
  },
  RePrintBtn: {
    width: '100%',
    height: '35%',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: '6%'
  },
  RePrintText: {
    fontSize: wp('1%'),
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  RefundBtn: {
    width: '100%',
    height: '35%',
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: wp('1%')
  },
  RefundText: {
    fontSize: wp('1%'),
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'

  },
  confirmbtn: {
    width: wp('15%'),
    height: hp('7%'),
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: wp('0.5%')
  },
  confirmText: {
    fontSize: wp('1%'),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  generateBtn: {
    width: wp('11%'),
    height: hp('6.4%'),
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: wp('15%'),
    marginLeft: wp('2%'),
    marginTop: hp('3%')
  },
  GenerateText: {
    fontSize: wp('1%'),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  TypeBtn: {
    width: wp('10%'),
    height: hp('6.4%'),
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 1,
    marginRight: wp('1%'),
    marginTop: hp('3%')
  },
  TypeText: {
    fontSize: wp('1%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  DateBtn: {
    width: wp('10%'),
    height: hp('6.4%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 1,
    marginTop: hp('3%')
  },
  DateText: {
    fontSize: wp('1%'),
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    fontSize: wp('1%'),
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  modal2Btn: {
    width: wp('20%'),
    height: hp('10%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    marginTop: hp('2%')
  },
  modal2Text: {
    fontSize: wp('1%'),
    color: 'red',
    textAlign: 'center',
  }
});