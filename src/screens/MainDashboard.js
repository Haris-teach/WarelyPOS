import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View, TextInput } from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { ButtonGroup } from 'react-native-elements';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';

import Popover, { PopoverPlacement, PopoverMode } from 'react-native-popover-view';
import CustomActivityIndicator from "../components/generic/CustomActivityIndicator";
import { Call, Loc_ID, SaleClose, SetCloseSale, SetSel, SetSelect, Stf_ID } from '../Redux/Reducers/mainReducer';
import APIHandler from '../utils/APIHandler';
import { Dine_Order, GET_RESERVATION, Get_Tables, MULTITABLEFREE, Order_Pending, Pos_sell_end, SAVE_RESERVATION, TABLE_COUNT } from '../utils/urls';
import Delivery from './Delivery';
import MainDashborad from './Dinning';
import Edit from "./Edit";
import Outdoor from "./Outdoor";
import Pickup from './Pickup';
import Secondfloor from "./Secondfloor";
import SubTakeway from './Dinning/SubTakeway';
import TakeawayOrder from './Takeway/TakeawayOrder';
import SaleHistory from './Salehistory';


var mergedTables = []
var mergedTables2 = []
var Tableid = []
var Orderid = []

const Dinning = ({ route, navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const { fun, stf_name, saleClose, select, loc_id, stf_id, sel, loaded, closeSale, counter } = useSelector((state) => state.root.main);
  const [selectMerge, setSelectMerge] = useState(false);
  const [orderPending, setOrderPending] = useState();
  // MAin TAB BAR

  const br = loc_id;
  const Key = stf_id;

  const [res, setRes] = useState();
  const [dayData, setDayData] = useState([]);
  const [press, setPress] = useState(true);
  const [selectMerge2, setSelectMerge2] = useState(false);
  const [day_id, setDay_id] = useState(1);
  const [date, setDate] = useState();
  const [showPopover, setShowPopover] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [name, setName] = useState('');
  const [pax, setPax] = useState('');
  const [rDate, setRDate] = useState('');
  const [time, setTime] = useState('');
  const [phone, setPhone] = useState('');

  const updateIn = (s) => {
    dispatch(SetSel(s));
    setState(false);
  };
  const btn1 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginRight: 10 }}>DINING</Text>
  const btn2 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginLeft: 10, }}>TAKEAWAY</Text>
  const btn3 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginLeft: 10, }}>DELIVERY</Text>
  const btn4 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginLeft: 10, }}>PICKUP</Text>

  const button = [{ element: btn1 }, { element: btn2 }, { element: btn3 }, { element: btn4 }];

  // 0.7 TAB BAR

  const [se, setSe] = useState(0);
  const updateIndexs = (s) => {
    setSe(s);
  };

  const bt3 = () => <Text style={{ fontWeight: '600', fontSize: wp('1%'), color: 'black', opacity: 0.4 }}>FIRST FLOOR</Text>
  const bt2 = () => <Text style={{ fontWeight: '600', fontSize: wp('1%'), color: 'black', opacity: 0.4 }}>SECOND FLOOR</Text>
  const bt1 = () => <Text style={{ fontWeight: '600', fontSize: wp('1%'), color: 'black', opacity: 0.4 }}>OUTDOOR</Text>
  const Buttons = [{ element: bt3 }, { element: bt2 }, { element: bt1 }];

  // 0.3 TAB BAR
  const [sbtn, setSbtn] = useState(0);
  const updatebtn = (s) => {
    setSbtn(s);
  };

  const b2 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1%'), color: 'black', fontFamily: 'Roboto' }}>SEATED</Text>
  // const b1 = () => <View style={{ flexDirection: 'row' }}>
  //   <Text style={{ fontWeight: 'bold', fontSize: wp('1%'), color: 'black', fontFamily: 'Roboto', marginTop: hp('1%') }}>RESERVATION </Text>
  //   <View style={{ backgroundColor: '#F8AE00', borderRadius: 100000, width: wp('2.5%'), height: hp('4%'), justifyContent: 'center' }}>
  //     <Text style={{ alignSelf: 'center', color: 'white', fontFamily: 'Roboto', fontWeight: 'bold', fontSize: wp('1%') }}>{getReservation.length}</Text></View>
  // </View>
  const Btns = [{ element: b2 }];

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisi, setModalVisi] = useState(false);
  const [count, setCount] = useState(1);
  const [state, setState] = useState(false);
  const [table, setTable] = useState('');
  const [table_id, setTable_id] = useState();
  const [t_order_id, setT_order_id] = useState();
  const [table_condi, setTable_condi] = useState('');
  const [table_count, setTable_count] = useState({ "book": 4, "free": 5 });
  const [load, setLoad] = useState(false);
  const [getReservation, setGetReservation] = useState([]);
  const [reservSatate, setReservState] = useState(true);

  const dispatch = useDispatch();

  const Model_show = () => {
    setModalVisi(true);
  }

  const increment = () => {
    return (
      setCount(count + 1)
    );
  }

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  const [branch, setBranch] = useState("branch");



  useEffect(async () => {


    let mounted = true
    if (mounted) {



      // dispatch(Loc_ID(userID));
      // dispatch(Stf_ID(branch));

      setLoading(true)
      mergedTables = []
      mergedTables2 = []

      let param = {
        Loc_id: br
      };
      setLoading(true);

      APIHandler.hitApi(Get_Tables, 'POST', param).then(response => {
        setLoading(false);
        //  console.log("TABLE RESPONSE===", response);
        let localResponse = [...response];

        localResponse.forEach(element => {
          element.selected = false;
        });

        setRes(localResponse);
      });




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
      mon[7] = "Aug";
      mon[8] = "Sep";
      mon[9] = "Oct";
      mon[10] = "Nov";
      mon[11] = "Dec";

      var m = mon[d.getMonth()]; // Since getMonth() returns month from 0-11 not 
      var date = d.getDate();

      var dateStr = n + "," + m + " " + date;
      setDate(dateStr);


      let params = {
        loc_id: br,
        stf_id: Key,
        id: 1,
      };

      APIHandler.hitApi(Dine_Order, 'POST', params).then(response => setDayData(response));
      //console.log('this dani data1', dayData)


      let pa = {
        Loc_id: br,
      };

      APIHandler.hitApi(GET_RESERVATION, 'POST', pa).then(response => {
        setGetReservation(response);

      });


      let parameters = {
        loc_id: loc_id,
        // id: order_Id,
        // Status: status,
        // stf_id: stf_id,
      };


      APIHandler.hitApi(Order_Pending, 'POST', parameters).then(response => {
        setOrderPending(response);


      });
    }

    return function cleanup() {
      mounted = false
    }


  }, [load, loaded]);


  const Reservation_Save = () => {
    let params = {
      loc_id: br,
      name: name,
      pax: pax,
      phone: phone,
      time: time,
    };


    APIHandler.hitApi(SAVE_RESERVATION, 'POST', params).then(response => console.log(response));

  }


  const [col, setCol] = useState(false);
  const Day = (id) => {

    let params = {
      loc_id: br,
      stf_id: Key,
      id: id,
    };

    APIHandler.hitApi(Dine_Order, 'POST', params).then(response => setDayData(response));
    // console.log('this dani data', dayData)
  }

  const selectedTableForMerge = (index) => {
    let localArr = [...res];
    mergedTables = [];

    localArr[index].selected = !localArr[index].selected;

    localArr.forEach(element => {
      // console.log(element);

      if (element.selected) {
        mergedTables.push(element);
      }
    });

    setRes(localArr);
  }

  const selectedTableForMerge2 = (index) => {
    let localArr = [...res];
    mergedTables2 = [];

    localArr[index].selected = !localArr[index].selected;

    localArr.forEach(element => {
      //  console.log(element);

      if (element.selected) {
        mergedTables2.push(element);
      }
    });

    setRes(localArr);
  }

  const renderModal = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            mergedTables = [];
            setModalVisible(!modalVisible);
          }}>
          <View style={{
            borderWidth: 1,
            shadowColor: "#000",
            shadowOffset: {
              width: 10,
              height: 10
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 8, borderRadius: 5, alignSelf: 'center', backgroundColor: 'white', width: wp('25%'), height: hp('60%'), marginTop: hp('20%')
          }}>

            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', width: wp('3%'), height: hp('4%') }}
              onPress={() => {
                mergedTables = [];
                setModalVisible(false);
                setCol(false);
              }}>
              <Image source={require('../assets/cross2.png')} resizeMode="contain" style={{ marginRight: wp('1%'), marginTop: hp('1%'), width: wp('2%'), height: hp('2%') }} />
            </TouchableOpacity>
            <View style={{ elevation: 5, borderRadius: 3, borderColor: '#74BF63', borderWidth: 8, marginBottom: hp('5%'), alignItems: 'center', width: wp('8%'), height: hp('12%'), marginTop: hp('3%'), alignSelf: 'center', justifyContent: 'center' }}>
              <FlatList
                data={mergedTables}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (

                    <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: '#74BF63', alignSelf: 'center', }}>{item.table}</Text>

                  );
                }}
              />
            </View>

            <View style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginTop: hp('1%'), marginBottom: hp('1%'), flexDirection: 'row', width: wp('20%'), height: hp('10%') }}>

              <TouchableOpacity style={{ justifyContent: 'center', width: wp('10%'), height: hp('10%') }}
                onPress={() => decrement()} >
                <Image source={require('../assets/minus.png')} resizeMode="contain" style={{ width: wp('7%'), height: hp('7%'), alignSelf: 'center' }} />
              </TouchableOpacity>

              <TouchableOpacity style={{ justifyContent: 'center' }}>
                <Text style={{ marginBottom: hp('2%'), color: 'red', fontSize: wp('4%'), fontWeight: 'bold' }}>{count}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{ justifyContent: 'center', width: wp('10%'), height: hp('10%') }} onPress={() => increment()}>
                <Image source={require('../assets/plus_c.png')} resizeMode="contain" style={{ width: wp('7%'), height: hp('7%'), alignSelf: 'center' }} />
              </TouchableOpacity>




            </View>
            <View style={{ alignSelf: 'center', width: wp('5%'), height: hp('5%'), marginTop: hp('1%'), marginBottom: hp('7%'), alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: wp('2%'), color: '#8D8D8D' }}>PAX</Text>
            </View>
            <TouchableOpacity onPress={() => {
              setState(true);
              setModalVisible(false);
              setCol(false);

            }}
              style={{
                alignSelf: 'center', backgroundColor: '#FC3F3F', alignItems: 'center', borderRadius: 5, justifyContent: 'center', height: hp('7%'), width: wp('20%')
              }} >
              <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: 'white' }}>CONFIRM</Text>
            </TouchableOpacity>
          </View>

        </Modal>
      </View >
    );
  }
  const reload = () => {
    setLoad(!load)
  }

  const renderModal2 = () => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible2}
          onRequestClose={() => {
            mergedTables2 = [];
            setModalVisible2(!modalVisible2);
          }}>
          <View style={{ width: "100%", height: "100%", backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <View style={styles.modalView}>
              <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 8 }} onPress={() => {
                mergedTables2 = [];
                setModalVisible2(false)
                setPress(false);
              }}>
                <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: wp('3%'), height: hp('5%') }} />
              </TouchableOpacity>

              <FlatList
                data={mergedTables2}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  Tableid.push(item.key)
                  Orderid.push(item.order_id)
                  // console.log("merged Tavles 2 ==", Tableid, Orderid)
                  return (
                    <View style={{ width: wp('10%'), height: hp('12%'), margin: 5, borderColor: 'red', borderWidth: 5, borderRadius: 3, alignSelf: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: 'black', alignSelf: 'center', }}>{item.table}</Text>
                    </View>
                  );
                }}
              />
              <Text style={{ fontSize: wp('1.4%'), color: 'gray' }}>Close sale for this table and <Text style={{ fontWeight: 'bold', color: 'black' }}>reopen for new customer</Text></Text>


              <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 5, width: wp('20%'), height: hp('8%') }}>
                <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 3, width: wp('19%'), marginBottom: 5, alignSelf: 'center', height: hp('5%'), justifyContent: 'center' }}
                  onPress={() => {
                    // setState(true);
                    setModalVisible2(false);
                    setPress(false);
                    MultiTableFree(Tableid, Orderid);
                    reload();

                  }}>
                  <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.4%') }}> REOPEN TABLE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }


  useEffect(() => {

    let mounted = true
    if (mounted) {
      setLoading(true);
      let param = {
        stf_id: Key,
      };

      APIHandler.hitApi(Pos_sell_end, 'POST', param).then(json => {
        dispatch(SaleClose(json));

      });

      dispatch(Call(false));



      let para = {
        loc_id: loc_id,
      };

      APIHandler.hitApi(TABLE_COUNT, 'POST', para).then(json => {
        // console.log("Table Free & Reserved", json);
        setTable_count(json);

      });
    }
    return function cleanup() {
      mounted = false
    }

  }, [loaded]);

  const renderModal3 = () => {

    return (

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible3}
        onRequestClose={() => {
          setModalVisible3(!modalVisible3);
        }}>
        <View style={{ width: wp("100%"), height: hp("100%"), backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <View style={styles.modalView}>
            <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 0 }} onPress={() => {
              mergedTables2 = [];
              setModalVisible3(false)
              setPress(false);
              setTime('');
              setPax('');
              setPhone('');
              setName('');
              setDate('');
            }}>
              <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: wp('3%'), height: hp('5%') }} />
            </TouchableOpacity>
            <Text style={{ fontWeight: '700', fontSize: wp('1.2%') }}>RESERVATION</Text>

            <View style={{ borderColor: 'gray', borderWidth: 1, marginTop: hp('2%'), backgroundColor: '#ECECEC', height: hp('5.5%'), width: '90%', alignSelf: 'center' }}>
              <TextInput
                onChangeText={i => setName(i)}
                placeholder="Name" placeholderTextColor='gray'
                value={name}
                style={{ fontWeight: '700', fontSize: wp('1%'), }} />

            </View>
            <View style={{ borderColor: 'gray', borderWidth: 1, marginTop: hp('2%'), backgroundColor: '#ECECEC', height: hp('5.5%'), width: '90%', alignSelf: 'center' }}>
              <TextInput onChangeText={i => setPax(i)} placeholder="Pax"
                value={pax}
                placeholderTextColor='gray' style={{ fontWeight: '700', fontSize: wp('1%'), }} />
            </View>
            <View style={{ borderWidth: 1, borderColor: 'gray', marginTop: hp('2%'), backgroundColor: '#ECECEC', height: hp('5.5%'), width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
              <TextInput onChangeText={i => setRDate(i)}
                value={rDate}
                placeholder="Date" placeholderTextColor='gray' />


              <TextInput onChangeText={i => setTime(i)}
                value={time}
                placeholder="Time" placeholderTextColor='gray' />
            </View>

            <View style={{ borderWidth: 1, borderColor: 'gray', marginTop: hp('2%'), backgroundColor: '#ECECEC', height: hp('6.5%'), width: '90%', alignSelf: 'center' }}>
              <TextInput
                onChangeText={i => setPhone(i)}
                placeholder="Phone Number"

                value={phone} placeholderTextColor='gray' style={{ fontWeight: '700', fontSize: wp('1%'), }} />


            </View>
            <TouchableOpacity style={{ borderColor: 'gray', marginTop: hp('2%'), backgroundColor: 'red', borderRadius: 3, width: '90%', alignSelf: 'center', marginBottom: 5, height: hp('7%'), justifyContent: 'center' }}
              onPress={() => {
                if (reservSatate == true) {
                  Reservation_Save();
                  setModalVisible3(false);
                  setTime('');
                  setPax('');
                  setPhone('');
                  setName('');
                  setDate('');
                  reload();

                }
                else {
                  setModalVisible3(false);
                  setTime('');
                  setPax('');
                  setPhone('');
                  setName('');
                  setDate('');
                  reload();
                }
              }}>
              <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.4%') }}>CONFIRM</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal >

    );
  }



  const MultiTableFree = (Tid, Oid) => {
    let params = {

      table_id: Tid,
      order_id: Oid,
    };

    APIHandler.hitApi(MULTITABLEFREE, 'POST', params).then(response => {
      //console.log("response ni aia kia ? ", response);
      setSelectMerge2(!selectMerge2);
      mergedTables2 = [];
    });
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {renderModal()}
      {renderModal2()}
      {renderModal3()}
      <View style={{ flexDirection: 'row', backgroundColor: '#FC3F3F' }}>
        <TouchableOpacity onPress={() => {
          dispatch(SetCloseSale(!closeSale));
          navigation.openDrawer();
        }} style={{ justifyContent: 'center', height: hp('6%'), width: wp('6%'), marginLeft: wp('1%'), marginTop: hp('3%') }}>
          <Image
            source={require('../assets/Hamburger.jpg')}
            style={{
              alignSelf: 'center',
              width: wp('2%'),
              height: hp('2%'),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>


        <View
          style={{ height: hp('12%'), width: wp('70%') }}
        >


          <ButtonGroup
            onPress={updateIn}
            selecte={sel}
            buttons={button}
            containerStyle={{ marginTop: hp('-0.1%'), height: hp('12%'), backgroundColor: '#FC3F3F', width: wp('60%'), marginLeft: wp('6%'), borderColor: '#FC3F3F' }}
            selectedIndex={sel}
            selectedButtonStyle={{ backgroundColor: '#DB1818' }}


          />

        </View>


        <View style={{ flexDirection: 'row', width: wp('20%'), height: hp('10%'), }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', width: wp('7%'), height: hp('10%'), marginLeft: wp('1%') }}>


            <TouchableOpacity style={{
              marginLeft: wp('-1%'), alignItems: 'center', backgroundColor: 'white', borderColor: '#FC3F3F', borderWidth: 1, borderRadius: 20, width: wp('2.5% '), height: hp('4% ')
            }}>
              < Text style={{ marginTop: hp('0.15%'), fontSize: wp('1.5%'), marginRight: wp('0.1%'), color: '#FC3F3F' }} >{counter}</Text>
            </TouchableOpacity>

            <Popover

              placement={PopoverPlacement.BOTTOM}

              from={(
                <TouchableOpacity onPress={() => {
                  pending();
                  setShowPopover(true);
                }}>
                  <Image
                    source={require('../assets/Bell.png')}
                    style={{
                      marginTop: hp('-0.9%'),
                      marginRight: wp('4%'),
                      width: wp('4.5%'),
                      height: hp('4.5%'),

                    }}
                    resizeMode="contain"
                  />

                </TouchableOpacity>
              )}>
              <View style={{ borderWidth: 1, borderColor: '#FC3F3F', justifyContent: 'center', alignItems: 'center', width: wp('25%'), height: hp('30%') }}>

                <FlatList
                  data={orderPending}

                  renderItem={({ item }) => (
                    <>
                      {item.order_status == 'pennding' ?
                        <View style={{ flexDirection: 'row' }}>
                          <View
                            style={[{ justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderBottomWidth: 1, width: wp('25%'), height: hp('10 % ') }]}

                          >
                            <Text style={{ fontSize: wp('2%'), color: 'black' }}>You Have New Order</Text>
                            <Text style={{ fontSize: wp('2%'), color: '#FC3F3F', fontWeight: '700', }}>{item.id}</Text>
                          </View>

                        </View>
                        : null}
                    </>
                  )} />


              </View>
            </Popover>

          </View>
          {/* <TouchableOpacity
            onPress={() => reload()}
            style={{ borderRadius: 25, backgroundColor: 'orange', width: wp('3%'), justifyContent: 'center', height: hp('5%'), marginTop: hp('4%') }}>
            <Text style={{ alignSelf: 'center' }}>
              Sync
            </Text>
          </TouchableOpacity> */}
          <Text style={{ marginTop: wp('2%'), marginLeft: wp('2%'), alignSelf: 'center', color: 'white', fontSize: wp('1.5%') }}>{date}</Text>
        </View>

      </View>


      <>
        {sel == 1 ? <TakeawayOrder T_order_id={t_order_id} mergedTables={mergedTables} Pass='table' br={br} Table={table} pass="Main" table_pass={table_condi} Count={count} Table_Id={table_id} userId={Key} response={res} />
          :
          sel == 0 ?
            <>
              {state == true ? <SubTakeway T_order_id={t_order_id} mergedTables={mergedTables} Pass='table' br={br} Table={table} pass="Main" table_pass={table_condi} Count={count} Table_Id={table_id} userId={Key} response={res} /> :
                <>
                  <View style={{ flex: 1, flexDirection: "row" }}>


                    {/* Flex 0.3 wala box */}
                    <View style={{ flex: 0.3, borderRightWidth: 1 }}>
                      <ButtonGroup
                        onPress={updatebtn}
                        selecte={sbtn}
                        buttons={Btns}
                        containerStyle={{ height: hp('9%'), backgroundColor: 'white', width: "100%", marginLeft: 0, marginTop: 0 }}
                        selectedIndex={sbtn}
                        selectedButtonStyle={{ backgroundColor: 'rgba(247, 247, 247, 1)', borderBottomWidth: 4, borderBottomColor: 'rgba(155, 155, 155, 1)' }}

                      />
                      {/* <DropDownPicker
                      items={[
                        {
                          label: "SORT BY TIME",
                          value: "branch",
                          id: 1,
                        },
                        {
                          label: "Today",
                          value: "branch",
                          id: 1,
                        },
                        {
                          label: "Yesterday",
                          value: "branch",
                          id: 2,
                        },


                      ]}
                      defaultValue={branch}

                      containerStyle={{ height: 50, width: "100%", }}
                      style={{ backgroundColor: "white" }}

                      labelStyle={{
                        fontSize: wp('1.2%'),
                        backgroundColor: 'white'
                      }}
                      dropDownStyle={{ backgroundColor: "white" }}
                      onChangeItem={(item) => {
                        setBranch(item.value);
                        Day(item.id);
                      }}
                    /> */}

                      {/* FLatList */}
                      {sbtn == 0 ? <>
                        <FlatList
                          data={dayData}
                          keyExtractor={item => item.id}
                          renderItem={({ item }) => {
                            return (
                              <View style={{ flexDirection: 'row', backgroundColor: item.id % 2 == 0 ? 'rgba(247, 247, 247, 1)' : 'white', height: hp('10%'), width: wp('100%') }}>
                                <View style={{ marginLeft: wp('1%'), marginTop: hp('1%'), alignSelf: 'center', borderRightWidth: 1.5, borderRightColor: 'rgba(217, 217, 217, 1)' }}>

                                  <Text style={{ fontSize: wp('2%'), color: 'red' }}>{item.Time}  </Text>
                                  <Text style={{ alignSelf: 'center', fontSize: wp('1.5%'), color: 'black', textTransform: 'uppercase' }}>{item.To}       </Text>

                                </View>
                                <View style={{ width: wp('12%'), marginLeft: wp('1%'), marginTop: hp('1%'), alignSelf: 'center' }}>
                                  <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: wp('2%'), color: 'black', textTransform: 'uppercase' }}>{item.user}</Text>

                                    {/* <View style={{ backgroundColor: '#FC3F3F', borderRadius: 2, borderWidth: 1, width: wp('5%'), height: hp('4%'), justifyContent: 'center', marginLeft: wp('9%') }}>
                                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: wp('1%') }}>paid</Text>
                                  </View> */}

                                  </View>

                                  <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ alignSelf: 'center', fontSize: wp('0.8%') }}>TABLE:      </Text>
                                    <Text style={{ marginRight: wp('1%'), fontWeight: 'bold', color: 'red', fontSize: wp('1.4%') }}>{item.table}   </Text>
                                    <Text style={{ alignSelf: 'center', fontSize: wp('0.8%') }}> PAX:       </Text>
                                    <Text>
                                      {item.member == null ?
                                        <Text style={{ marginRight: wp('1%'), fontWeight: 'bold', color: 'red', fontSize: wp('1.4%') }}>0</Text>
                                        :
                                        <Text style={{ marginRight: wp('1%'), fontWeight: 'bold', color: 'red', fontSize: wp('1.4%') }}>{item.member}</Text>}

                                    </Text>

                                  </View>

                                </View>
                              </View>
                            )
                          }}

                        />
                        {/* <TouchableOpacity

                        style={{ flexDirection: 'row', width: wp('28%'), borderRadius: 5, height: hp('6%'), borderWidth: 1, alignSelf: 'center', justifyContent: 'center', marginBottom: wp('2%') }}>
                        <Image source={require('../assets/manageicon.png')} resizeMode='contain' style={{ width: wp('3%'), height: hp('4%'), alignSelf: 'flex-start', marginTop: hp('0.7%') }} />
                        <Text style={{ alignSelf: 'center', fontSize: wp('2%'), color: '#FC3F3F', fontFamily: 'Roboto' }}>MANAGE QUEUE</Text>
                      </TouchableOpacity> */}

                      </> : sbtn == 1 ? <>
                        <FlatList
                          data={getReservation}
                          keyExtractor={item => item.id}
                          renderItem={({ item }) => {
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  setModalVisible3(true);
                                  setName(item.name);
                                  setPhone(item.phone);
                                  setPax(item.pax.toString());
                                  setTime(item.time);
                                  setReservState(false);
                                }} style={{ flexDirection: 'row', backgroundColor: item.id % 2 == 0 ? 'rgba(247, 247, 247, 1)' : 'white', height: hp('10%'), width: wp('100%') }}>
                                <View style={{ marginLeft: wp('1%'), marginTop: hp('1%'), alignSelf: 'center', borderRightWidth: 1.5, borderRightColor: 'rgba(217, 217, 217, 1)' }}>

                                  <Text style={{ fontSize: wp('2%'), color: 'rgba(255, 166, 77, 1)' }}>{item.time}  </Text>
                                  <Text style={{ alignSelf: 'center', fontSize: wp('1.5%'), color: 'black', textTransform: 'uppercase' }}>{item.To}       </Text>

                                </View>
                                <View style={{ width: wp('12%'), marginLeft: wp('1%'), marginTop: hp('1%'), alignSelf: 'center' }}>
                                  <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: wp('2%'), color: 'black', textTransform: 'uppercase' }}>{item.name}</Text>

                                    {/* <View style={{ backgroundColor: '#FC3F3F', borderRadius: 2, borderWidth: 1, width: wp('5%'), height: hp('4%'), justifyContent: 'center', marginLeft: wp('9%') }}>
                                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: wp('1%') }}>paid</Text>
                                  </View> */}

                                  </View>

                                  <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ alignSelf: 'center', fontSize: wp('0.8%') }}>PHONE#      </Text>
                                    <Text style={{ marginRight: wp('1%'), fontWeight: 'bold', color: 'red', fontSize: wp('1.4%') }}>{item.phone}   </Text>
                                    <Text style={{ alignSelf: 'center', fontSize: wp('0.8%') }}> PAX:       </Text>

                                    <Text style={{ marginRight: wp('1%'), fontWeight: 'bold', color: 'red', fontSize: wp('1.4%') }}>{item.pax}</Text>



                                  </View>

                                </View>
                              </TouchableOpacity>
                            )
                          }}

                        />
                        <TouchableOpacity
                          onPress={() => {
                            setModalVisible3(true);
                            setReservState(true);
                          }}
                          style={{ flexDirection: 'row', width: wp('28%'), borderRadius: 5, height: hp('6%'), borderWidth: 1, alignSelf: 'center', justifyContent: 'center', marginBottom: wp('2%') }}>
                          <Image source={require('../assets/manageicon.png')} resizeMode='contain' style={{ width: wp('3%'), height: hp('4%'), alignSelf: 'flex-start', marginTop: hp('0.7%') }} />
                          <Text style={{ alignSelf: 'center', fontSize: wp('2%'), color: '#FC3F3F', fontFamily: 'Roboto' }}>ADD RESERVATION</Text>
                        </TouchableOpacity>
                      </> : null}



                    </View>
                    {/* Flex 0.7 wala box */}
                    <View style={{ flex: 0.7, backgroundColor: 'rgb(240,240,240)', borderLeftWidth: 0.3, flexDirection: 'column' }}>
                      <View style={{ backgroundColor: 'white', shadowOffset: 1, elevation: 1 }}>
                        <ButtonGroup
                          onPress={updateIndexs}
                          selecte={se}
                          buttons={Buttons}
                          containerStyle={{ height: hp('9%'), backgroundColor: '#F7F7F7', marginLeft: 0, marginTop: 0, marginBottom: 0, width: "60%" }}

                          selectedButtonStyle={{ backgroundColor: 'rgba(247, 247, 247, 1)', borderBottomWidth: 4, borderBottomColor: 'rgba(155, 155, 155, 1)' }}
                          selectedIndex={se}
                          selectedTextStyle={{ color: 'black' }}
                          underlayColor='black'

                        />
                        <View style={styles.containerStyle}>
                          <TouchableOpacity style={[styles.Card, { backgroundColor: '#74BF63' }]}>
                            <Text style={styles.CardText}>{table_count.free}</Text>
                            <Text style={styles.CardText1}>SEAT AVAILABLE</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={[styles.Card, { backgroundColor: '#FC3F3F' }]}>
                            <Text style={styles.CardText}>{table_count.book}</Text>
                            <Text style={styles.CardText1}>SEAT OCCUPIED</Text>
                          </TouchableOpacity>


                        </View>
                      </View>
                      {se == 0 ?


                        <View>





                          <TouchableOpacity
                            style={{
                              borderRadius: 3,
                              borderWidth: 1,
                              borderColor: "rgba(252, 63, 63, 1)",

                              marginRight: wp('3%'),
                              alignSelf: 'flex-end',
                              justifyContent: 'center',
                              backgroundColor: col == true ? 'red' : 'white',
                              width: wp('10%'),
                              height: hp('6%'),
                              flexDirection: 'row'
                            }}

                            onPress={() => {

                              if (mergedTables.length > 0) {
                                setModalVisible(true);
                              } else {
                                setSelectMerge(!selectMerge);
                              }
                            }}
                          >
                            {col == false ?
                              <Image source={require('../assets/mergeicon.png')} resizeMode='contain' style={{ width: wp('2%'), height: hp('3%'), alignSelf: 'flex-start', marginTop: hp('1.2%') }} />
                              : null}
                            <Text style={{ padding: 5, fontSize: wp('1%'), alignSelf: 'center', color: col == false ? 'red' : 'white', fontFamily: 'Roboto' }}>
                              {mergedTables.length > 0 ? "Done" : "MERGE TABLE"}
                            </Text>
                          </TouchableOpacity>


                          {/* <TouchableOpacity
    style={{
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "red",
      marginTop: hp('-3.9'),
      marginRight: wp('13%'),
      alignSelf: 'flex-end',
      justifyContent: 'center',
      backgroundColor: 'white',
      width: wp('8%'),
      height: hp('4%')
    }}

    onPress={() => {
      if (mergedTables2.length > 0) {
        setModalVisible2(true);
      } else {
        setSelectMerge2(!selectMerge2);
      }
      setPress(!press);
    }}
  >
    <Text style={{ padding: 2, fontSize: wp('1%'), alignSelf: 'center', color: 'red' }}>
      {mergedTables2.length > 0 ? "Done" : "Free Tables"}
    </Text>
  </TouchableOpacity> */}


                          <View style={{ width: "100%", height: '100%', alignSelf: 'center', marginTop: hp('0%'), backgroundColor: 'rgb(240,240,240)' }}>
                            {isLoading && <CustomActivityIndicator />}
                            <FlatList
                              showsVerticalScrollIndicator={false}
                              data={res}
                              style={{ marginTop: 10, width: wp('90%'), height: hp('90%') }}
                              numColumns={5}
                              renderItem={({ item, index }) => (
                                <>
                                  <TouchableOpacity

                                    onPress={() => {
                                      setCol(true)
                                      if (item.status === "free") {
                                        if (selectMerge) {
                                          selectedTableForMerge(index);
                                          setTable_condi('notable');
                                          setT_order_id(item.order_id);

                                        }
                                        else {
                                          // setTable(item.table);
                                          // setTable_id(item.key);
                                          let singleTable = [
                                            item,
                                          ];

                                          mergedTables = singleTable;
                                          setModalVisible(true);
                                          setTable_condi('notable');
                                          setT_order_id(item.order_id);

                                        }
                                        dispatch(SetSelect('Burger'));
                                      }




                                      else {
                                        if (item.payment == 'paid') {
                                          selectedTableForMerge2(index);
                                        }

                                        else {

                                          let singleTable = [
                                            item,
                                          ];

                                          mergedTables2 = singleTable;
                                          if (item.payment == 'paid') {
                                            setModalVisible2(true);
                                          }
                                          setTable_condi('notable');
                                          setT_order_id(item.order_id);

                                        }

                                        if (press == true) {
                                          setState(true);
                                          const obj = { 'table': item.table };
                                          mergedTables = [obj];
                                        }
                                        else {
                                          setState(false);

                                        }







                                        // ToastAndroid.show(item.table + "  is Booked !", ToastAndroid.SHORT);
                                        setTable(item.table);
                                        setT_order_id(item.order_id);
                                        setTable_condi('table');

                                        dispatch(SetSelect('Burger'));
                                      }
                                    }}>
                                    <View style={item.status === "free" ? [styles.freeTable, { borderColor: selectMerge ? '#32CD32' : selectMerge2 ? '#b5b5b5' : '#74BF63' }] : [styles.bookedTable, { borderColor: selectMerge ? '#b5b5b5' : '#FF2E2E', }]}>
                                      <Text style={item.status === "free" ? styles.TableText : styles.TableText}>{item.table}</Text>
                                    </View>

                                    {selectMerge && item.status === 'free' || selectMerge2 && item.status == 'Book' && item.payment == 'paid' ?
                                      <Image
                                        style={{
                                          position: 'absolute',
                                          alignSelf: 'flex-end',
                                          height: hp('4%'),
                                          width: wp('4%'),
                                          tintColor: item.selected ? 'blue' : 'grey'
                                        }}
                                        source={require('../assets/order.jpg')}
                                        resizeMode='contain'
                                      />
                                      : null
                                    }
                                  </TouchableOpacity>


                                </>
                              )}
                            />
                          </View>
                        </View>
                        : se == 1 ? <Secondfloor /> : se == 2 ? <Outdoor /> : se == 3 ? <Edit /> : null}

                    </View>
                  </View>
                </>
              }
            </>
            : sel == 2 ? <Delivery /> : sel == 3 ? <Pickup /> : sel == 4 ? <MainDashborad br={br} Key={Key} /> :
              sel == 5 ? <SaleHistory /> : null}
      </>



    </View >
  );
}

export default Dinning;

const styles = {
  containerStyle: {
    marginTop: hp('-8.5%'),
    marginBottom: hp('-0.5%'),
    height: hp('9%'),
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginRight: hp('5%'),

  },
  Card: {
    width: wp('12%'),
    height: hp('8%'),
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 2,
  },
  CardText: {
    alignSelf: 'center',

    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('2')
  },
  CardText1: {
    fontSize: wp('0.9%'),
    color: 'white',
    alignSelf: 'center'
  },
  modalView: {
    marginTop: '15%',
    backgroundColor: "white",
    borderRadius: 20,
    width: wp('20%'),
    height: hp('50%'),
    alignSelf: 'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,

  },
  freeTable: {
    width: wp('8%'),
    height: hp('13%'),
    borderWidth: 6,
    marginLeft: wp('3%'),
    borderColor: '#32CD32',
    borderRadius: 3,
    justifyContent: 'center',
    marginBottom: hp('3%'),


  },
  TableText: {
    alignSelf: 'center',
    fontSize: wp('2%'),
    fontWeight: 'bold',
    color: 'black'
  },
  bookedTable: {
    width: wp('8%'),
    height: hp('13%'),
    borderWidth: 6,
    marginLeft: wp('3%'),
    borderRadius: 100,
    justifyContent: 'center',
    marginBottom: hp('3%'),
  },
  // bookedTableText: {
  //   alignSelf: 'center',
  //   fontSize: 15,
  //   fontWeight: 'bold',
  //   color: 'black'
  // },
};