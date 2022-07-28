import React, { useState, useEffect, useRef } from "react";
import { Image, Text, View, FlatList, TouchableOpacity, Modal } from "react-native";
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import SubTakeway from "./Dinning/SubTakeway";
import Takeway_dt from './Takeway_dt';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Order_History, Order_Pending } from "../utils/urls";
import APIHandler from "../utils/APIHandler";
import { useSelector, useDispatch } from 'react-redux';
import { SetSelect } from '../Redux/Reducers/mainReducer';



const Takeway = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(false);
  const navigation = useNavigation();
  const branch = props.branch;
  const [value, setValue] = useState();
  const [id, setId] = useState('');
  const [m, setM] = useState(false);
  const [status, setStatus] = useState('');
  const [order_Id, setOrder_Id] = useState('');
  const [complete, setComplete] = useState([]);
  const Key = props.idUser;
  const token = '$2y$10$f43enwo0NWLsBmlGfx/ZMevMgmvEdbrZ3JTF.FNoVM4Nrj2aZYE82';
  const [array, setArray] = useState();
  const { stf_id, loc_id, } = useSelector((state) => state.root.main);


  console.log(branch, order_Id, status, Key)

  useEffect(() => {

    let param = {
      loc_id: loc_id,
      id: order_Id,
      Status: status,
      stf_id: stf_id,
    };

    APIHandler.hitApi(Order_Pending, 'POST', param).then(response => setValue(response));


    let params = {
      id: order_Id,
    };

    APIHandler.hitApi(Order_History, 'POST', params).then(response => setComplete(response));



  }, [order_Id]);


  const changeDesc = (Id) => {
    for (var i in value) {
      if (value[i].id == Id) {
        value[i].order_status = "complete";
        setStatus(value[i].order_status = "complete");
        setOrder_Id(Id);
        break; //Stop this loop, we found it!

      }
    }
  }

  const EmptyArray = () => {
    setArray([]);
  }

  return (
    <View style={{ flex: 1 }}>




      {state === 'Sub' ? <SubTakeway emp={array} Pass='table' br={branch} User_id={id} pass='Takeway' orID={order_Id} Table='Takeaway' userId={Key} table_pass='notable' /> : state == 'detail' ? <Takeway_dt order_ID={order_Id} /> :
        <>
          <View style={{ backgroundColor: 'white', width: wp('100%') }}>
            <TouchableOpacity style={{ flexDirection: 'row', borderRadius: 5, borderColor: '#FF2E2E', borderWidth: 1, width: wp('20%'), height: hp('6%'), margin: hp('3%'), justifyContent: 'center' }} onPress={() => {
              setState('Sub');
              EmptyArray();
              dispatch(SetSelect('Burger'));

            }}>
              <Image
                source={require('../assets/plus.jpg')}
                style={{
                  width: wp('5%'),
                  height: hp('5%'),
                  alignSelf: 'center',
                  marginLeft: -25
                }}
                resizeMode="contain"
              />
              <Text style={{ color: '#FF2E2E', fontSize: wp('1.5%'), fontWeight: 'bold', alignSelf: 'center' }}>ADD TAKEAWAY ORDER</Text>

            </TouchableOpacity>
          </View>
          <View style={{ elevation: 5, backgroundColor: 'rgb(240,240,240)', }}>
            <Text style={{ margin: 5, color: '#FF2E2E', fontWeight: 'bold', fontSize: wp('1.2%') }}>TAKEAWAY PENDING</Text>
          </View>


          <View style={{ flexDirection: 'row' }}>
            <View style={styles.viewStyle}>
              <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>NO.  </Text>
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
            style={{ height: "25%", borderBottomWidth: 1, borderColor: '#d3d3d3' }}>
            <FlatList
              data={value}
              keyExtractor={item => item.id}
              renderItem={({ item, index }) => {

                return (
                  <>
                    {item.order_status == 'pennding' ?
                      <>
                        {item.key % 2 == 0 ?

                          <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
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
                              <Text style={styles.textStyle}>{item.order_status}</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.viewbtnStyle} onPress={() => {
                              setState('detail');
                              setId(item.id);
                            }}>
                              <Text style={{ color: '#FF2E2E', alignSelf: "center", fontSize: wp('1.2%') }}>View</Text>
                            </TouchableOpacity>
                          </View>
                          :
                          <View style={{ flexDirection: 'row', backgroundColor: 'rgb(240,240,240)' }}>
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
                              <Text style={styles.textStyle}>{item.order_status}</Text>
                            </TouchableOpacity>


                            <TouchableOpacity style={styles.viewbtnStyle} onPress={() => {
                              setState('detail');
                              setId(item.id);
                            }}>
                              <Text style={{ color: '#FF2E2E', alignSelf: "center", fontSize: wp('1.2%') }}>View</Text>
                            </TouchableOpacity>
                          </View>

                        }
                      </>
                      : null}
                  </>
                )
              }}

            />
          </Animatable.View>


          {/* <Modal
            animationType="fade"

            transparent={true}
            visible={m}
            onRequestClose={() => {

              setM(!m);
            }}
          >

            <View style={styles.modalView}>
              <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 8 }} onPress={() => setM(false)}>
                <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: 20, height: 20 }} />
              </TouchableOpacity>


              <View style={{ marginRight: 10, marginTop: 8, alignSelf: 'center', width: '40%', height: '40%' }} >
                <Image source={require('../assets/order.jpg')} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
              </View>
              <Text>Order Complete</Text>

              <View style={{ justifyContent: 'flex-end', flex: 1, width: '98%' }}>
                <TouchableOpacity style={{ backgroundColor: '#FF2E2E', width: '100%', height: 30, marginBottom: 5, borderRadius: 4 }} onPress={() => {
                  setOrder('complete');
                  setM(false);
                }}>
                  <Text style={{ color: 'white', alignSelf: 'center' }}>Confirm</Text>
                </TouchableOpacity>
              </View>

            </View>

          </Modal> */}

          <View style={{ elevation: 5, backgroundColor: 'rgb(240,240,240)' }}>
            <Text style={{ margin: 5, color: '#FF2E2E', fontWeight: 'bold', fontSize: wp('1.2%') }}>TAKEAWAY HISTORY</Text>
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
                      <>
                        {item.key % 2 == 0 ?
                          <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
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
                              <Text style={styles.textStyle}>{item.order_status}</Text>
                            </TouchableOpacity>
                          </View>
                          :
                          <View style={{ flexDirection: 'row', backgroundColor: 'rgb(240,240,240)' }}>
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
                              <Text style={styles.textStyle}>{item.order_status}</Text>
                            </TouchableOpacity>

                          </View>
                        }
                      </>
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
    marginLeft: '1%',
    padding: '1%',
    borderRightWidth: 0.3,
    marginRight: '1%',
    opacity: 0.5,
    width: '10%',
  },
  viewbtnStyle: {
    marginLeft: 30,
    marginTop: 2,
    opacity: 0.5,
    width: wp('5%'),
    height: hp('5%'),
    marginBottom: 3,
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