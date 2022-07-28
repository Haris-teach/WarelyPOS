import React, { useState, useEffect, useRef } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, Modal } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import SubTakeway from "../Dinning/SubTakeway";
import Takeway_dt from '../Takeway_dt';
import TakeawayOrder from './TakeawayOrder';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ORDER_DETAILS, Order_History, Order_Pending } from "../../utils/urls";
import APIHandler from "../../utils/APIHandler";
import { useSelector, useDispatch } from 'react-redux';
import { SetSelect, SetREload } from '../../Redux/Reducers/mainReducer';

var counter = 0;
var OrderID = 0;
var TotalDiscount = 0;
const Takeway = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const navigation = useNavigation();
  const branch = props.branch;
  const [value, setValue] = useState();
  const [id, setId] = useState();
  const [name, setName] = useState('');
  const [total, setTotal] = useState('');
  const [totalDis, setTotalDis] = useState();
  const [m, setM] = useState(false);
  const [status, setStatus] = useState('');
  const [order_Id, setOrder_Id] = useState('');
  const [complete, setComplete] = useState([]);
  const Key = props.idUser;
  const token = '$2y$10$f43enwo0NWLsBmlGfx/ZMevMgmvEdbrZ3JTF.FNoVM4Nrj2aZYE82';
  const [array, setArray] = useState();
  const [tOrder, setTOrder] = useState();
  const [loading, setLoading] = useState(false);
  const { stf_id, loc_id, reLoad } = useSelector((state) => state.root.main);


  const DATA = [
    {
      key: '1',
      p: require('../../assets/visa.jpg')

    },
    {
      key: '2',
      p: require('../../assets/visa.jpg')

    },
    {
      key: '3',
      p: require('../../assets/visa.jpg')

    },
    {
      key: '4',
      p: require('../../assets/visa.jpg')


    },
    {
      key: '5',
      p: require('../../assets/visa.jpg')

    },
    {
      key: '6',
      p: require('../../assets/visa.jpg')

    },
    {
      key: '7',
      p: require('../../assets/visa.jpg')


    },
    {
      key: '8',
      p: require('../../assets/visa.jpg')

    },
    {
      key: '9',
      p: require('../../assets/visa.jpg')

    }
  ];

  // console.log(branch, order_Id, status, Key)
  // OrderID = id; 


  const Reload = () => {
    setLoading(!loading);
    console.log("LOAding are running");
  }

  useEffect(() => {

    let mounted = true;

    if (mounted) {

      let param = {
        loc_id: loc_id,
        // id: order_Id,
        // Status: status,
        // stf_id: stf_id,
      };


      APIHandler.hitApi(Order_Pending, 'POST', param).then(response => {
        setValue(response);
      });
    }
    return function cleanup() {
      mounted = false;
    }

  }, [reLoad, loading]);



  useEffect(() => {
    // console.log('reload check', props.empty)
    // console.log('reload check', props.refresh)
    let mounted = true;

    if (mounted) {

      // let param = {
      //   loc_id: loc_id,
      //   // id: order_Id,
      //   // Status: status,
      //   // stf_id: stf_id,
      // };


      // APIHandler.hitApi(Order_Pending, 'POST', param).then(response => {
      //   let Res = response;
      //   setValue(response);
      //   //console.log('discount check++++++++++', response)

      //   // Res.map(i => {
      //   //   if (i.order_status == 'pennding')
      //   //     counter++;
      //   // })

      //   // // console.log("Counter is =", counter);
      //   // // props.counter(counter);
      //   // dispatch(SetCounter(counter));

      // });


      let params = {
        id: order_Id,
      };

      APIHandler.hitApi(Order_History, 'POST', params).then(response => setComplete(response));

    }

    return function cleanup() {
      mounted = false;
    }

  }, [order_Id]);


  const changeDesc = (Id) => {
    for (var i in value) {
      if (value[i].id == Id) {
        value[i].order_status = "complete";
        setStatus(value[i].order_status = "complete");

        break; //Stop this loop, we found it!

      }
    }
  }
  const TakeawayDt = () => {
    let param = {
      order_id: OrderID
      // value.map(i => i.id),
      // id: order_Id,
      // Status: status,
      // stf_id: stf_id,
    };

    APIHandler.hitApi(ORDER_DETAILS, 'POST', param).then(response => {
      console.log('response====dekhni', response);
      setTOrder(response);
    }
    );


  }
  const EmptyArray = () => {
    setArray([]);
  }

  return (
    <View style={{ flex: 1 }}>




      {state === 'Sub' ?
        // <SubTakeway emp={array} Pass='table' br={branch} User_id={id} pass='Takeway' orID={order_Id} Table='Takeaway' userId={Key} table_pass='notable' />
        <TakeawayOrder Reload={Reload} empty={props.empty} refresh={props.refresh} tOrder={tOrder} Order_ID={order_Id} cat={props.cat} T_order_id={props.T_order_id} mergedTables={props.mergedTables} br={props.br} Table={props.Table} table_pass={props.table_pass} Count={props.Count} Table_Id={props.Table_Id} userId={props.userId} response={props.response} pass="Main" Pass='table' />
        :
        state == 'detail' ?
          <TakeawayOrder Reload={Reload} value={value} changeDesc={changeDesc} totalDis={TotalDiscount} empty={props.empty} refresh={props.refresh} tOrder={tOrder} Order_ID={order_Id} OrderUser={name} OrderTotal={total} state={state} order_ID={order_Id} /> :
          <>
            <View style={{ justifyContent: 'center', backgroundColor: 'white', height: hp('15%'), width: wp('100%') }}>
              <TouchableOpacity style={{ marginLeft: wp('5%'), alignItems: 'center', flexDirection: 'row', borderRadius: 5, borderColor: '#FF2E2E', borderWidth: 1, width: wp('25%'), height: hp('9%'), justifyContent: 'center' }}
                onPress={() => {
                  setState('Sub');
                  EmptyArray();
                  dispatch(SetSelect('Burger'));
                  // console.log('Valueee+++++++++++++i', value)

                }}>
                <Image
                  source={require('../../assets/plus.jpg')}
                  style={{
                    width: wp('5%'),
                    height: hp('5%'),
                  }}
                  resizeMode="contain"
                />
                <Text style={{ color: '#FF2E2E', fontSize: wp('1.5%'), fontWeight: 'bold', alignSelf: 'center' }}>ADD TAKEAWAY ORDER</Text>

              </TouchableOpacity>
            </View>
            <View style={{ elevation: 5, justifyContent: 'center', height: hp('10%'), width: wp('100%'), backgroundColor: 'rgb(240,240,240)', }}>
              <Text style={{ color: '#FF2E2E', fontWeight: 'bold', fontSize: wp('2%'), marginLeft: wp('5%') }}>TAKEAWAY PENDING</Text>
            </View>


            <View style={{ flexDirection: 'row' }}>
              <View style={styles.viewStyle}>
                <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>NO.</Text>
              </View>
              <View style={styles.viewStyle}>
                <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>Order number  </Text>
              </View>
              <View style={styles.viewStyle}>
                <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>Time Received  </Text>
              </View>
              <View style={styles.viewStyle}>
                <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>Name  </Text>
              </View>
              <View style={styles.viewStyle}>
                <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>Total   </Text>
              </View>
              <View style={styles.viewStyle}>
                <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>Action </Text>
              </View>
            </View>


            <Animatable.View
              animation='fadeInUpBig'
              duration={500}
              style={{ height: hp('25%'), borderBottomWidth: 1, borderColor: '#d3d3d3' }}>
              <FlatList
                data={value}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {

                  return (
                    <>
                      {item.order_status == 'pennding' ?



                        <View style={{ flexDirection: 'row', backgroundColor: item.key % 2 == 0 ? 'white' : 'rgb(240,240,240)' }}>
                          <View style={styles.viewStyle}>
                            <Text style={styles.textStyle}>{item.key}</Text>
                          </View>
                          <View style={styles.viewStyle}>
                            <Text style={styles.textStyle}>{item.id}</Text>
                          </View>
                          <View style={styles.viewStyle}>
                            <Text style={styles.textStyle}>{item.time}</Text>
                          </View>
                          <View style={styles.viewStyle}>
                            <Text style={styles.textStyle}>{item.user}</Text>
                          </View>
                          <View style={styles.viewStyle}>
                            <Text style={styles.textStyle}>{item.total}</Text>
                          </View>

                          <TouchableOpacity disabled={true} style={styles.viewStyle} onPress={() => changeDesc(item.id)}>
                            <Text style={styles.textStyle}>Pending</Text>
                          </TouchableOpacity>


                          <TouchableOpacity style={styles.viewbtnStyle} onPress={() => {
                            Reload();
                            setState('detail');
                            OrderID = item.id;
                            setOrder_Id(item.id);
                            setName(item.user);
                            setTotal(item.total);
                            TotalDiscount = item.discount_amount;
                            TakeawayDt();
                            dispatch(SetREload(false));
                            // console.log('takeawayorder ka status===', OrderID);
                            // console.log('total discount dikha de bhai', TotalDiscount);
                          }}>
                            <Text style={{ color: '#FF2E2E', alignSelf: "center", fontSize: wp('1.2%') }}>View</Text>
                          </TouchableOpacity>
                        </View>

                        : null}
                    </>
                  )
                }}

              />
            </Animatable.View>




            <View style={{ elevation: 5, justifyContent: 'center', height: hp('10%'), width: wp('100%'), backgroundColor: 'rgb(240,240,240)', }}>
              <Text style={{ color: '#FF2E2E', fontWeight: 'bold', fontSize: wp('2%'), marginLeft: wp('5%') }}>TAKEAWAY HISTORY</Text>
            </View>
            <Animatable.View
              animation='fadeInUpBig'
              duration={500}
              style={{ height: "40%" }}>
              <FlatList
                data={value}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {

                  return (


                    <>
                      {item.order_status == 'complete' ?

                        <View style={{ flexDirection: 'row', backgroundColor: item.key % 2 == 0 ? 'white' : 'rgb(240,240,240)' }}>
                          <View style={styles.viewStyle}>
                            <Text style={styles.textStyle}>{item.key}</Text>
                          </View>
                          <View style={styles.viewStyle}>
                            <Text style={styles.textStyle}>{item.id}</Text>
                          </View>
                          <View style={styles.viewStyle}>
                            <Text style={styles.textStyle}>10 min</Text>
                          </View>
                          <View style={styles.viewStyle}>
                            <Text style={styles.textStyle}>{item.user}</Text>
                          </View>
                          <View style={styles.viewStyle}>
                            <Text style={styles.textStyle}>{item.total}</Text>
                          </View>

                          <TouchableOpacity style={styles.viewStyle} onPress={() => changeDesc(item.id)}>
                            <Text style={styles.textStyle}>Complete</Text>
                          </TouchableOpacity>
                        </View>
                        : null}
                    </>

                  )
                }}

              />
            </Animatable.View>

          </>
      }
    </View >
  );
}

export default Takeway;


const styles = {
  textStyle: {
    fontSize: wp('1.2%'),
  },
  viewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.3,
    width: wp('13%'),
    height: hp('8%'),

  },
  viewbtnStyle: {

    opacity: 1,
    width: wp('10%'),
    height: hp('5%'),
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: wp('2%'),
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#FF2E2E',
    justifyContent: 'center'
  },
  modalView: {
    marginTop: '5%',
    backgroundColor: "white",
    borderRadius: 20,
    height: '85%',
    width: '23%',
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
    justifyContent: 'center',
    padding: 2
  },

};