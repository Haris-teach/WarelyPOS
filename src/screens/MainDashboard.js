import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, FlatList, Button, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import DropDownPicker from "react-native-dropdown-picker";
import Secondfloor from "./Secondfloor";
import Outdoor from "./Outdoor";
import Edit from "./Edit";
import Takeway from './Takeway';
import Delivery from './Delivery';
import Pickup from './Pickup';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SubTakeway from './SubTakeway';
import APIHandler from '../utils/APIHandler';
import { Get_Tables, Dine_Order } from '../utils/urls';



var mergedTables = []

const Dinning = ({ route, navigation }) => {

  const [selectMerge, setSelectMerge] = useState(false);
  // MAin TAB BAR
  const [select, setSelect] = useState(0);
  const br = route.params?.Loc_id;
  const Key = route.params?.userid;
  const [res, setRes] = useState();
  const [dayData, setDayData] = useState([]);

  const [day_id, setDay_id] = useState(1);
  const [date, setDate] = useState();

  const updateIn = (s) => {
    setSelect(s);
  };
  const btn1 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginRight: 10 }}>DINING</Text>
  const btn2 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginLeft: 10, }}>TAKEAWAY</Text>
  const btn3 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginLeft: 10, }}>DELIVERY</Text>
  const btn4 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white', marginLeft: 10, }}>PICKUP</Text>

  const button = [{ element: btn1 }, { element: btn2 }, { element: btn3 }, { element: btn4 },];

  // 0.7 TAB BAR

  const [se, setSe] = useState(0);
  const updateIndexs = (s) => {
    setSe(s);
  };

  const bt3 = () => <Text style={{ fontWeight: '600', fontSize: wp('1%'), color: 'black', opacity: 0.4 }}>FIRST FLOOR</Text>
  const bt2 = () => <Text style={{ fontWeight: '600', fontSize: wp('1%'), color: 'black', opacity: 0.4 }}>SECOND FLOOR</Text>
  const bt1 = () => <Text style={{ fontWeight: '600', fontSize: wp('1%'), color: 'black', opacity: 0.4 }}>OUTDOOR</Text>
  const bt4 = () => <Text style={{ fontWeight: '600', fontSize: wp('1%'), color: 'black', opacity: 0.4 }}>EDIT</Text>
  const Buttons = [{ element: bt3 }, { element: bt2 }, { element: bt1 }, { element: bt4 }];

  // 0.3 TAB BAR
  const [sbtn, setSbtn] = useState(0);
  const updatebtn = (s) => {
    setSbtn(s);
  };

  const b2 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1%'), color: 'black', }}>SEATED</Text>
  const b1 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1%'), color: 'black', }}>UP-COMING</Text>

  const Btns = [{ element: b2 }, { element: b1 }];

  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(1);
  const [state, setState] = useState(false);
  const [table, setTable] = useState('');
  const [table_id, setTable_id] = useState();

  const increment = () => {
    return (
      setCount(count + 1)
    );
  }

  const decrement = () => {
    return (
      setCount(count - 1)
    );
  }

  const [branch, setBranch] = useState("branch");



  useEffect(() => {


    let param = {
      Loc_id: br
    };

    APIHandler.hitApi(Get_Tables, 'POST', param).then(response => {
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
    mon[7] = "Agus";
    mon[8] = "Sep";
    mon[9] = "Oct";
    mon[10] = "Nov";
    mon[11] = "Dec";

    var m = mon[d.getMonth()]; // Since getMonth() returns month from 0-11 not 
    var date = d.getDate();

    var dateStr = n + "/" + m + "/" + date;
    setDate(dateStr);


    let params = {
      loc_id: br,
      stf_id: Key,
      id: 1,
    };

    APIHandler.hitApi(Dine_Order, 'POST', params).then(response => setDayData(response));
  }, []);


  const Day = (id) => {

    let params = {
      loc_id: br,
      stf_id: Key,
      id: id,
    };

    APIHandler.hitApi(Dine_Order, 'POST', params).then(response => setDayData(response));



  }

  const selectedTableForMerge = (index) => {
    let localArr = [...res];
    mergedTables = [];

    localArr[index].selected = !localArr[index].selected;

    localArr.forEach(element => {
      console.log(element);

      if (element.selected) {
        mergedTables.push(element);
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
          <View style={{ width: "100%", height: "100%", backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <View style={styles.modalView}>
              <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 8 }} onPress={() => {
                mergedTables = [];
                setModalVisible(false)
              }}>
                <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: wp('3%'), height: hp('5%') }} />
              </TouchableOpacity>

              <FlatList
                data={mergedTables}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <View style={{ width: wp('10%'), height: hp('12%'), marginTop: hp('-4%'), marginLeft: 10, borderColor: '#32CD32', borderWidth: 5, borderRadius: 3, alignSelf: 'center', justifyContent: 'center' }}>
                      <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: 'black', alignSelf: 'center', }}>{item.table}</Text>
                    </View>
                  );
                }}
              />

              <View style={{ flexDirection: 'row', marginBottom: '2%', marginTop: '-14%' }}>
                <View style={{ flex: 1, marginLeft: 25, width: wp('10%'), height: hp('10%') }}>
                  <TouchableOpacity style={{ alignSelf: 'flex-start', width: '100%', height: '100%' }} onPress={() => decrement()} >
                    <Image source={require('../assets/minus.jpg')} resizeMode="contain" style={{ width: '100%', height: '100%', alignSelf: 'center' }} />
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginLeft: 5, marginTop: 5 }}>
                  <TouchableOpacity style={{ justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', color: 'red', fontSize: wp('2.5%') }}>{count}</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1, marginRight: 25, width: wp('10%'), height: hp('10%') }}>
                  <TouchableOpacity style={{ alignSelf: 'flex-end', width: '100%', height: '100%' }} onPress={() => increment()}>
                    <Image source={require('../assets/plus_c.jpg')} resizeMode="contain" style={{ width: '100%', height: '100%', alignSelf: 'center' }} />
                  </TouchableOpacity>
                </View>

              </View>
              <View>
                <Text style={{ fontSize: wp('2%') }}>PAX</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 5, width: wp('20%'), height: hp('8%') }}>
                <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 3, width: wp('19%'), marginBottom: 5, alignSelf: 'center', height: hp('5%'), justifyContent: 'center' }}
                  onPress={() => {
                    setState(true);
                    setModalVisible(false);
                  }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center', fontSize: wp('2%') }}>CONFIRM</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }



  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      {renderModal()}
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
            selecte={select}
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
          <View style={{ marginTop: hp('-4%'), marginLeft: wp('8%') }}><Text style={{ color: 'white', fontSize: wp('1.5%') }}>{date}</Text></View>
        </View>

      </View>


      <>
        {select == 0 ?
          <>
            { state == true ? <SubTakeway mergedTables={mergedTables} Pass='table' br={br} Table={table} pass="Main" Count={count} Table_Id={table_id} userId={Key} response={res} /> :
              <>
                <View style={{ flex: 1, flexDirection: "row" }}>


                  {/* Flex 0.3 wala box */}
                  <View style={{ flex: 0.3, borderRightWidth: 1 }}>
                    <ButtonGroup
                      onPress={updatebtn}
                      selecte={sbtn}
                      buttons={Btns}
                      containerStyle={{ height: hp('6%'), backgroundColor: 'white', width: "100%", marginLeft: 0, marginTop: 0 }}
                      selectedButtonStyle={{ backgroundColor: 'green' }}

                    />
                    <DropDownPicker
                      items={[
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

                      containerStyle={{ height: hp('7%'), width: "100%", }}
                      style={{ backgroundColor: "white", }}

                      labelStyle={{
                        fontSize: wp('1.2%'),
                        backgroundColor: 'white'
                      }}
                      dropDownStyle={{ backgroundColor: "white" }}
                      onChangeItem={(item) => {
                        setBranch(item.value);
                        setDay_id(item.id);
                        Day(day_id);
                      }}
                    />

                    {/* FLatList */}
                    {sbtn == 0 ? <>
                      <FlatList
                        data={dayData}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                          return (
                            <View style={{ flexDirection: 'row', backgroundColor: item.bcolor, height: hp('10%'), }}>
                              <View style={{ marginLeft: 10, marginTop: 5, alignSelf: 'center' }}>

                                <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: 'red' }}>{item.Time.slice(0, -3)}  </Text>
                                <Text style={{ alignSelf: 'center', fontSize: wp('1.5%'), color: 'black' }}>{item.To}       </Text>

                              </View>
                              <View style={{ marginLeft: 10, marginTop: 5, alignSelf: 'center' }}>
                                <Text style={{ fontSize: wp('2%'), fontWeight: 'bold' }}>{item.user}</Text>
                                <Text style={{ alignSelf: 'center', fontSize: wp('1%'), }}>TABLE: <Text style={{ fontWeight: 'bold', color: 'red' }}>{item.table}</Text>           PAX: <Text style={{ fontWeight: 'bold', color: 'red' }}>{item.member}</Text> </Text>
                              </View>
                            </View>
                          )
                        }}

                      />

                      {/* <View style={{ marginLeft: 10, width: "90%" }}>
                        <TouchableOpacity style={{ borderColor: 'red', borderWidth: 1, height: 35, borderRadius: 3, justifyContent: 'center' }}>
                          <Text style={{ alignSelf: 'center', color: 'red', fontSize: 15, fontWeight: 'bold', }}>Manage Queue</Text>
                        </TouchableOpacity>
                      </View> */}
                    </> : sbtn == 1 ? <>
                      <FlatList
                        data={dayData}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                          return (
                            <View style={{ flexDirection: 'row', backgroundColor: item.bcolor, height: hp('10%'), }}>
                              <View style={{ marginLeft: 10, marginTop: 5, alignSelf: 'center' }}>

                                <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: 'red' }}>{item.Time.slice(0, -3)}  </Text>
                                <Text style={{ alignSelf: 'center', fontSize: wp('1.5%'), color: 'black' }}>{item.To}       </Text>

                              </View>
                              <View style={{ marginLeft: 10, marginTop: 5, alignSelf: 'center' }}>
                                <Text style={{ fontSize: wp('2%'), fontWeight: 'bold' }}>{item.user}</Text>
                                <Text style={{ alignSelf: 'center', fontSize: wp('1%'), }}>TABLE: <Text style={{ fontWeight: 'bold', color: 'red' }}>{item.table}</Text>           PAX: <Text style={{ fontWeight: 'bold', color: 'red' }}>{item.member}</Text> </Text>
                              </View>
                            </View>
                          )
                        }}

                      />
                    </> : null}



                  </View>
                  {/* Flex 0.7 wala box */}
                  <View style={{ flex: 0.7, backgroundColor: 'rgb(240,240,240)', borderLeftWidth: 0.3, flexDirection: 'column' }}>
                    <ButtonGroup
                      onPress={updateIndexs}
                      selecte={se}
                      buttons={Buttons}
                      containerStyle={{ height: hp('6%'), backgroundColor: 'white', marginLeft: 0, marginTop: 0, width: "100%" }}
                      selectedButtonStyle={{ backgroundColor: 'green' }}

                    />
                    {se == 0 ?


                      <View>
                        <View style={styles.containerStyle}>
                          <TouchableOpacity style={[styles.Card, { backgroundColor: '#32CD32' }]}>
                            <Text style={styles.CardText}>1</Text>
                            <Text style={styles.CardText1}>SEAT AVAIABLE</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={[styles.Card, { backgroundColor: '#FF2E2E' }]}>
                            <Text style={styles.CardText}>2</Text>
                            <Text style={styles.CardText1}>SEAT OCCUPIED</Text>
                          </TouchableOpacity>

                          <TouchableOpacity style={[styles.Card, { backgroundColor: '#ffbf00' }]}>
                            <Text style={styles.CardText}>3</Text>
                            <Text style={styles.CardText1}>SEAT RESERVED</Text>
                          </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                          style={{
                            borderRadius: 5,
                            borderWidth: 1,
                            borderColor: "red",
                            marginTop: hp('-12'),
                            marginRight: wp('3%'),
                            alignSelf: 'flex-end',
                            justifyContent: 'center',
                            backgroundColor: 'white',
                            width: wp('8%'),
                            height: hp('4%')
                          }}

                          onPress={() => {
                            if (mergedTables.length > 0) {
                              setModalVisible(true);
                            } else {
                              setSelectMerge(!selectMerge);
                            }
                          }}
                        >
                          <Text style={{ padding: 2, fontSize: wp('1%'), alignSelf: 'center', color: 'red' }}>
                            {mergedTables.length > 0 ? "Done" : "Merge Tables"}
                          </Text>
                        </TouchableOpacity>
                        {/* <View style={{ alignItems: 'flex-end', marginRight: 10, marginTop: -55 }}>
                          <TouchableOpacity style={{ width: 100, height: 25, backgroundColor: 'white', borderRadius: 3 }}>
                            <Text style={{ alignSelf: 'center', marginTop: 5, fontSize: 12, color: 'red', fontWeight: 'bold' }}>MERGE TABLE</Text>
                          </TouchableOpacity>
                        </View> */}

                        <View style={{ width: "100%", height: '100%', alignSelf: 'center', marginTop: hp('10%'), backgroundColor: 'rgb(240,240,240)' }}>
                          <FlatList
                            showsVerticalScrollIndicator={false}
                            data={res}
                            style={{ marginTop: 10, width: wp('90%'), height: hp('90%') }}
                            numColumns={4}
                            renderItem={({ item, index }) => (
                              <>
                                <TouchableOpacity
                                  disabled={item.status === "free" ? false : true}
                                  onPress={() => {
                                    if (item.status === "free") {
                                      if (selectMerge) {
                                        selectedTableForMerge(index);
                                      }
                                      else {
                                        // setTable(item.table);
                                        // setTable_id(item.key);
                                        let singleTable = [
                                          item,
                                        ];

                                        mergedTables = singleTable;
                                        setModalVisible(true);
                                      }
                                    } else {
                                      ToastAndroid.show(item.table + "  is Booked !", ToastAndroid.SHORT)
                                    }
                                  }}>
                                  <View style={item.status === "free" ? styles.freeTable : [styles.bookedTable, { borderColor: selectMerge ? '#b5b5b5' : '#FF2E2E', }]}>
                                    <Text style={item.status === "free" ? styles.TableText : styles.TableText}>{item.table}</Text>
                                  </View>

                                  {selectMerge && item.status === 'free' ?
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
          : select == 1 ? <Takeway branch={br} idUser={Key} /> : select == 2 ? <Delivery /> : select == 3 ? <Pickup /> : null}
      </>
    </View>
  );
}

export default Dinning;

const styles = {
  containerStyle: {
    borderWidth: 0.6,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
    marginLeft: 2,
    width: wp('30%'),
    height: hp('18%'),
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 7
  },
  Card: {
    width: wp('9%'),
    height: hp('13%'),
    marginTop: hp('2.5%'),
    marginRight: 5,
    justifyContent: 'center',
    borderRadius: 3,
    marginRight: 2
  },
  CardText: {
    alignSelf: 'center',
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
    fontSize: wp('2')
  },
  CardText1: {
    fontSize: wp('0.9%'),
    color: 'white',
    alignSelf: 'center',
    marginTop: 10,
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
    width: wp('10%'),
    height: hp('15%'),
    borderWidth: 9,
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
    width: wp('10%'),
    height: hp('15%'),
    borderWidth: 9,
    marginLeft: wp('3%'),
    borderRadius: 40,
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