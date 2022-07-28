import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ButtonGroup } from 'react-native-elements';
import RNPrint from 'react-native-print';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import CustomActivityIndicator from "../components/generic/CustomActivityIndicator";
import { SetSale_his, SetSel } from '../Redux/Reducers/mainReducer';
import APIHandler from "../utils/APIHandler";
import { Close_print, Re_print, SALE_HISTORY, SALE_HISTORY_DETAIL, Table_return } from "../utils/urls";
import Delivery from './Delivery';
import MainDashboard from './Dinning';
import Pickup from './Pickup';
import SubTakeway from './Dinning/SubTakeway';
import Takeway from './Takeway';



const SaleHistory = (props, route) => {
  console.log('contact wale ki id', props.Contact_id)
  const { s_id } = useSelector(state => state.root.main);
  const sUid = () => {

    let params = {
      stf_id: s_id,
    };

    APIHandler.hitApi(Close_print, 'POST', params).then(response => setSlip(response));


  };

  const closePrint = async printRemotePDF => {
    await RNPrint.print({ filePath: slip.url })
  }

  const dispatch = useDispatch()
  const { sel, stf_id, sale_his, loc_id, float_price } = useSelector((state) => state.root.main);

  const navigation = useNavigation();
  const br = route.params?.Loc_id;
  const Key = route.params?.userid;
  const [branch, setBranch] = useState("branch");
  const [saleOrders, setSaleOrders] = useState({ "arr": [{ "TimeStamp": "May 20 2021 07.55.pm", "id": 745, "key": 0, "member": 3, "table": "T3", "total": "20.00", "type": "Dine In" }, { "TimeStamp": "May 20 2021 06.31.pm", "id": 744, "key": 1, "member": 2, "table": "T2", "total": "14.00", "type": "Dine In" }, { "TimeStamp": "May 20 2021 06.30.pm", "id": 743, "key": 2, "member": 3, "table": "T3", "total": "20.00", "type": "Dine In" }], "card": 0, "cash_amount": 54, "float": 9000, "total": 54 });
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderType, setOrderType] = useState(2);
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
  const [text, setText] = useState('Takeaway');
  const [backgroundcolor, setbackgroundColor] = useState('#FC3F3F');
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
    setOrderDetails([]);
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

  const OrderIndividualReturn = () => {
    let param = {
      id: pid,
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
      console.log(response);
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
  const [total_dis, setTotal_dis] = useState();
  const renderOrdersItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{
        flexDirection: 'row',
        borderBottomWidth: 0.3,
        height: hp('9%'),
        borderBottomColor: 'rgb(230,230,230)',
        backgroundColor: index % 2 == 0 ? 'white' : '#F7F7F7'
      }}
        onPress={() => {
          callDetailAPI(item.id);

          setTime(item.TimeStamp); setTable(item.table);
          setPax(item.member);
          setPid(item.id);
          setT(item.total);
          setTotal_dis(item.total_dis);
          Re_Print();
        }}>
        <Text style={{
          marginLeft: wp('1%'),
          padding: '1%',
          marginRight: wp('1%'),
          color: 'black',
          fontSize: wp('1.2%'),
          fontWeight: '700',
          borderRightWidth: 0.3, width: wp('3%'),

        }}>{index + 1}</Text>

        <Text style={{
          padding: '2%', width: wp('20%'),
          color: 'black',
          fontSize: wp('1.2%'),
          fontWeight: '700'
        }}>{item.TimeStamp}</Text>

        <Text style={[styles.ordersRowText, {


          color: 'black',
          fontSize: wp('1.2%'),
          fontWeight: '700', width: wp('4.5%')
        }]}>{item.table}</Text>


        <Text style={{
          padding: '2%',
          color: 'black',
          fontSize: wp('1.2%'),
          fontWeight: '700', width: wp('4%')
        }}>{item.member}</Text>

        <Text style={{
          padding: '2%',
          color: 'black',
          fontSize: wp('1.2%'),
          fontWeight: '700', width: wp('7%')
        }}>{item.type}</Text>

        <Text style={{
          color: '#FC3F3F',
          padding: '2%',
          width: "10%", fontSize: wp('1.2%'), fontWeight: '700'
        }}>{"$" + item.total}</Text>
      </TouchableOpacity >
    );
  };

  const renderDetailItem = ({ item, index }) => {
    return (

      <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: index % 2 == 0 ? 'rgba(244, 244, 244, 1)' : 'white' }}>
        {/* <View style={{
          padding: '2%',
          borderRightWidth: 0.3,
          borderRightColor: 'gray',
          width: wp('5%')
        }}>
          <Text style={{ fontSize: wp('1%'), fontWeight: 'bold', }}>{index + 1}</Text>
        </View> */}

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
          width: "20%", color: '#FC3F3F'
        }}>
          <Text style={[styles.textStyle, { color: '#FC3F3F' }]}>{"$" + item.price}</Text>
        </View>
      </TouchableOpacity>

    );
  }
  const updateIn = (s) => {
    dispatch(SetSale_his(s));
  };
  const btn1 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginRight: 10 }}>DINING</Text>
  const btn2 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginLeft: 10, }}>TAKEAWAY</Text>
  // const btn3 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginLeft: 10, }}>DELIVERY</Text>
  // const btn4 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginLeft: 10, }}>PICKUP</Text>

  const button = [{ element: btn1 }, { element: btn2 }];
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
      {/* <View style={{ flexDirection: 'row', backgroundColor: '#FC3F3F' }}>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ height: hp('4%'), width: wp('4%'), marginLeft: wp('1%'), marginTop: hp('1%'), marginBottom: hp('2%') }}>
          <Image
            source={require('../assets/Hamburger.jpg')}
            style={{
              marginTop: hp('2.7%'),
              alignSelf: 'center',
              width: wp('3%'),
              height: hp('3%'),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>


        <View style={{ height: hp('10%'), width: wp('70%') }}>


          <ButtonGroup
            onPress={updateIn}
            selecte={sel}
            buttons={button}
            underlayColor={{ backgroundColor: 'white' }}
            containerStyle={{ height: hp('9%'), backgroundColor: '#FC3F3F', width: wp('60%'), marginLeft: wp('6%'), marginTop: hp('1%'), borderColor: '#FC3F3F' }}
            selectedIndex={sale_his}
            selectedButtonStyle={{ backgroundColor: '#DB1818' }} />

        </View>


        <View style={{ flexDirection: 'row', width: wp('20%'), alignSelf: 'flex-end', marginTop: hp('1%'), marginBottom: hp('2%'), marginRight: wp('1%'), }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()} >
            <Image
              source={require('../assets/Bell.png')}
              style={{
                marginRight: wp('4%'),
                width: wp('4.5%'),
                height: hp('4.5%'),

              }}
              resizeMode="contain"
            />

          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: wp('1.5%') }}>{dat}</Text>
        </View>

      </View> */}
      {sale_his == 0 ? <MainDashboard /> : sale_his == 1 ? <Takeway branch={br} idUser={Key} /> : sale_his == 2 ? <Delivery /> : sale_his == 3 ? <Pickup /> : sale_his == 4 ? <SubTakeway Pass='table' br={loc_id} User_id={stf_id} pass='Takeway' Table='Takeaway' userId={stf_id} table_pass='notable' /> : sale_his == 5 ?
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
                    <Image source={require('../assets/confirm.jpg')} style={{ width: wp('17.5%'), height: hp('32.7%') }} resizeMode="contain" />
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
                              setbackgroundColor('#FC3F3F');
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
            <View style={{ flexDirection: 'row', backgroundColor: '#F7F7F7', padding: '1.5%', alignContent: 'center' }}>
              <TouchableOpacity style={{
                width: wp('10%'),
                height: hp('6.4%'),
                justifyContent: 'center',
                borderRadius: 5,
                borderColor: '#FC3F3F',
                borderWidth: 1,
                marginRight: wp('1%'),
                marginTop: hp('1%'),
                backgroundColor: 'white',
              }}
                onPress={() => {
                  dispatch(SetSel(0))
                }}
              >
                <Text style={{
                  color: '#FC3F3F',
                  fontSize: wp('1.3%'),
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>Back</Text>
              </TouchableOpacity>

              <Text style={{
                marginLeft: wp('8%')
                , alignSelf: 'center',
                color: 'black',
                fontSize: wp('1.6%'),
                textAlign: 'center',
                fontWeight: 'bold',
              }}>SALE HISTORY</Text>
            </View>

            {/* {renderOrderListHeader()} */}
            {value == 2 ?
              <View style={{ borderTopColor: '#d3d3d3', borderTopWidth: 1, backgroundColor: '#F7F7F7', flexDirection: 'row', height: hp('8%') }}>
                <Text style={{ marginLeft: wp('0.3%'), fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('4.9%'), padding: '2%' }}>No</Text>
                <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('26.1%'), padding: '2%' }}>Time</Text>
                <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('8.45%'), padding: '2%' }}>Order Type</Text>
                <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('8.8%'), padding: '2%' }}>Bill Amount</Text>
              </View>
              :
              <View style={{ borderTopColor: '#d3d3d3', backgroundColor: '#F7F7F7', borderTopWidth: 1, flexDirection: 'row', height: hp('8%') }}>
                <Text style={{ marginLeft: wp('0.3%'), fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('4.9%'), padding: '2%' }}>No</Text>
                <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('19%'), padding: '2%' }}>Time Stamp</Text>
                <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('5.2%'), padding: '2%' }}>Table</Text>
                <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('4.3%'), padding: '2%' }}>Pax</Text>
                <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('4.9%'), padding: '2%' }}>Type</Text>
                <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('10%'), padding: '2%' }}>Total price</Text>
              </View>



            }

            <View style={{ borderWidth: 1, borderColor: '#d3d3d3', elevation: 1, height: hp('38%'), width: wp('64%') }}>
              {saleOrders.arr.length > 0 ?
                <FlatList
                  data={saleOrders.arr}
                  keyExtractor={item => item.key}
                  renderItem={renderOrdersItem}
                />

                :

                <Text style={{ alignSelf: 'center', color: 'grey', marginLeft: '-22%' }}>According to this Date there is no record to found</Text>
              }
              {/* <FlatList
                data={saleOrders.arr}
                keyExtractor={item => item.key}
                renderItem={renderOrdersItem}
              /> */}
            </View>


            <View style={{ backgroundColor: '#F7F7F7', borderBottomColor: '#d3d3d3', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
              <View style={{ alignItems: 'center', justifyContent: 'space-around', padding: '5%' }}>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold' }}>Cash</Text>
                <Text style={{ fontSize: wp('1%'), fontWeight: 'bold', color: 'black' }}>${parseFloat(saleOrders.cash_amount).toFixed(2)}</Text>
              </View>

              <View style={{ alignItems: 'center', justifyContent: 'space-around', padding: '5%' }}>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold' }}>Card</Text>
                <Text style={{ fontSize: wp('1%'), fontWeight: 'bold', color: 'black' }}>${parseFloat(saleOrders.card).toFixed(2)}</Text>
              </View>

              <View style={{ alignItems: 'center', justifyContent: 'space-around', padding: '5%' }}>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold' }}>Float</Text>
                <Text style={{ fontSize: wp('1%'), fontWeight: 'bold', color: 'black' }}>${float_price}.00</Text>
              </View>

              <View style={{ alignItems: 'center', justifyContent: 'space-around', padding: '5%' }}>
                <Text style={{ fontSize: wp('1%'), color: 'gray', fontWeight: 'bold' }}>Total Sale:</Text>
                <Text style={{ fontSize: wp('1%'), fontWeight: 'bold', color: 'black' }}>${parseFloat(saleOrders.total + saleOrders.card).toFixed(2)}</Text>
              </View>
            </View>
            {/* <View style={{ borderTopWidth: 1, borderColor: '#A4A4A4', flexDirection: 'row', flex: 1, height: hp('18%') }}>
              <View style={{ backgroundColor: 'white', flex: 0.5, height: hp('21%') }}>
                <>


                  <View style={{ flexDirection: 'row', alignSelf: 'center', width: wp('20%'), height: hp('6%'), justifyContent: 'space-between' }}>
                    <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold', fontSize: wp('1.2%') }}>Muhammad Haris</Text>
                    <TouchableOpacity style={{ borderWidth: 1, borderColor: '#9B9B9B', backgroundColor: 'red', width: wp('7.5%'), height: hp('5%'), justifyContent: 'center', borderRadius: 5, alignSelf: 'center' }}
                      onPress={() => {
                        // setState('Profile');
                      }}
                    >
                      <Text style={{ alignSelf: 'center', fontWeight: '600', fontSize: wp('1.2%'), color: 'white' }}>Profile</Text>
                    </TouchableOpacity>
                  </View>


                  <View style={{ justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#E2E2E2', height: hp('8%') }}>
                    <View style={{ alignSelf: 'center', width: wp('20%'), height: hp('6%'), justifyContent: 'center' }}>

                      <Text style={{ color: '#9B9B9B', marginTop: '1%', fontSize: wp('1%') }}>Home sweet Homw</Text>


                      <Text style={{ color: '#9B9B9B', marginTop: '1%', fontSize: wp('1%') }}>Jannat</Text>

                    </View>
                  </View>

                  <View style={{ justifyContent: 'center', borderTopWidth: 1, borderColor: '#E2E2E2', height: hp('5%'), flexDirection: 'row' }}>
                    <View style={{ alignSelf: 'center', flexDirection: 'row', width: wp('10%'), height: hp('4%'), justifyContent: 'center' }}>
                      <Text style={{ alignSelf: 'center', color: '#9B9B9B', fontSize: wp('1%'), }}>Expire:   </Text>
                      <Text style={{ alignSelf: 'center', color: 'black', fontWeight: '600', fontSize: wp('1.4%') }}>24/02/21</Text>

                    </View>

                    <View style={{ alignSelf: 'center', flexDirection: 'row', width: wp('10%'), height: hp('4%'), justifyContent: 'center' }}>
                      <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: wp('1%'), color: '#9B9B9B' }}>POINTS:   </Text>
                      <Text style={{ alignSelf: 'center', color: 'red', fontWeight: 'bold', fontSize: wp('2%') }}>30</Text>

                    </View>
                  </View>
                </>
              </View>
              <View style={{ backgroundColor: 'white', flex: 0.5, height: hp('21%'), borderLeftWidth: 1, borderLeftColor: '#CDCDCD', alignContent: 'center' }}>
                <View style={{ marginTop: hp('1%'), opacity: 0.5, marginLeft: wp('2%'), marginRight: wp('2%') }}>

                  <View style={styles.vStyle}>
                    <Text style={[styles.Tstyle]}>No .of purchase :</Text>
                    <Text style={styles.Tstyle}>$.00</Text>

                  </View>

                  <View style={[styles.vStyle, { marginTop: hp('3%') }]}>
                    <Text style={[styles.Tstyle]}>Lowest spend :</Text>
                    <Text style={styles.Tstyle}>.00</Text>
                  </View>

                  <View style={styles.vStyle}>
                    <Text style={[styles.Tstyle]}>Highest spend :</Text>
                    <Text style={styles.Tstyle}>.00</Text>
                  </View>

                  <View style={[styles.vStyle, { marginTop: hp('3%') }]}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>Avg spend:</Text>
                    <Text style={styles.Tstyle}>-$.00</Text>

                  </View>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: wp('2%'), marginRight: wp('2%') }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', flex: 1, alignSelf: "center", fontSize: wp('1.5%') }} >Total:</Text>
                  <Text style={{ fontSize: wp('1.5%'), alignSelf: 'center', color: 'red' }}>$.00</Text>
                </View>

              </View>
            </View> */}


            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.generateBtn}
                //  onPress={() => dispatch(SetSale_his(4))}>
                onPress={() => { sUid(), closePrint() }}>

                <Text style={styles.GenerateText}>Generate</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.TypeBtn, { backgroundColor: 'white' }]}
                onPress={() => setModal2Open(true)}>

                <Text style={[styles.TypeText, { color: 'red' }]}>{text}</Text>
                {/* <Text style={[styles.TypeText, { color: 'red' }]}>Select Type</Text> */}
              </TouchableOpacity>

              <TouchableOpacity style={styles.DateBtn}
                onPress={showDatepicker}
              >
                <Text style={styles.DateText}>{formatDate(date)}</Text>
                {/* <Text style={styles.DateText}>Select Date</Text> */}
              </TouchableOpacity>

            </View>
          </View>


          {/* OrderDetails */}
          <View style={{ flex: 0.5, borderLeftWidth: 1, borderColor: '#A7A7A7', backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', height: hp('13%') }}>
              <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> {time}</Text>

              {value == 1 ?
                <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> | </Text>
                :
                <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold', display: 'none' }}> | </Text>
              }
              <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold', color: '#FC3F3F' }}>{table} </Text>

              {value == 1 ?
                <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> | </Text>
                :
                <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold', display: 'none' }}> | </Text>
              }
              <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> {pax} PAX </Text>
            </View>

            <View style={{ marginLeft: wp('1%'), marginRight: wp('1%'), height: wp('26.6%') }}>


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
              <Text style={{ fontSize: wp('1%'), marginRight: wp('1%'), fontWeight: 'bold', color: 'black' }}>{orderDetails.length}</Text>
              <Text style={{ fontSize: wp('1%'), marginRight: wp('1%') }}>|</Text>
              <Text style={{ fontSize: wp('1%'), marginRight: wp('1%') }}>Payment Method:</Text>
              <Text style={{ fontSize: wp('1%'), marginRight: wp('1%'), fontWeight: 'bold', color: 'black' }}>CASH</Text>
            </View>

            <View style={{ flexDirection: 'row', width: wp('50%'), marginLeft: wp('2%'), justifyContent: 'center' }}>

              <View style={{ alignSelf: 'flex-end' }}>
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
              <View style={{ borderColor: '#d3d3d3', borderWidth: 2, flexDirection: 'row', width: wp('25%'), borderRadius: 4, marginLeft: wp('2%'), height: hp('20%'), }}>
                <View style={{ marginLeft: wp('4%'), marginTop: hp('3%') }}>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>Service Charges:</Text>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>Discount:</Text>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>GST:</Text>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>Total Price:</Text>
                </View>

                <View style={{ marginLeft: wp('6%'), marginTop: hp('3%') }}>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>$0.00</Text>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}> $ {parseFloat(total_dis).toFixed(2)}</Text>
                  <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>$0.00</Text>
                  <Text style={{ fontSize: wp('1%'), color: '#FC3F3F', marginBottom: wp('0.7%'), fontWeight: 'bold' }}>$ {parseFloat(t).toFixed(2)}</Text>
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
    width: wp('15%'),
    height: hp('8%'),
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#FC3F3F',
    borderWidth: 1,
    marginBottom: '6%'
  },
  RePrintText: {
    fontSize: wp('1%'),
    color: '#FC3F3F',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  RefundBtn: {
    width: wp('15%'),
    height: hp('8%'),
    backgroundColor: '#FC3F3F',
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
    backgroundColor: '#FC3F3F',
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
    height: hp('6.5%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: wp('15%'),
    marginLeft: wp('2%'),
    marginTop: hp('1%'),
    borderWidth: 1
  },
  GenerateText: {
    fontSize: wp('1%'),
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  TypeBtn: {
    width: wp('10%'),
    height: hp('6.5%'),
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#FC3F3F',
    borderWidth: 1,
    marginRight: wp('1%'),
    marginTop: hp('1%')
  },
  TypeText: {
    fontSize: wp('1%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  DateBtn: {
    width: wp('10%'),
    height: hp('6.5%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#FC3F3F',
    borderWidth: 1,
    marginTop: hp('1%'),
    marginBottom: hp('1%')
  },
  DateText: {
    fontSize: wp('1%'),
    color: '#FC3F3F',
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
    borderColor: '#FC3F3F',
    marginTop: hp('2%')
  },
  modal2Text: {
    fontSize: wp('1%'),
    color: '#FC3F3F',
    textAlign: 'center',
  },
  vStyle: {
    flexDirection: 'row',
    height: hp('3.5%'),
    justifyContent: 'space-between'

  },
  Tstyle: {
    alignSelf: "center",
    fontSize: wp('1.1%')
  },
});