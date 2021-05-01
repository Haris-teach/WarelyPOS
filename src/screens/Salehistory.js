

import React, { useEffect, useState } from "react";
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomActivityIndicator from "../components/generic/CustomActivityIndicator";
import APIHandler from "../utils/APIHandler";
import { SALE_HISTORY, SALE_HISTORY_DETAIL } from "../utils/urls";


const SaleHistory = () => {



  const [saleOrders, setSaleOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);
  // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [text, setText] = useState('Select Type');
  const [backgroundcolor, setbackgroundColor] = useState('white');
  const [textColor, setTextColor] = useState('red');

  const [myDate, setMyDate] = useState('Select Date');

  const callHistoryAPI = () => {
    let params = {
      stf_id: 11,
      type: 1,
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

  useEffect(() => {
    callHistoryAPI();
  }, []);

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

  const renderOrdersItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={{
        flexDirection: 'row',
        borderBottomWidth: 0.3,
        borderBottomColor: 'rgb(230,230,230)'
      }}
        onPress={() => { callDetailAPI(item.id) }}>
        <Text style={[styles.ordersRowText, {
          height: '100%',
          width: "10%",
          textAlignVertical: 'center',
          borderRightWidth: 0.3,
        }]}>{index + 1}</Text>

        <Text style={[styles.ordersRowText, {
          width: "20%",
        }]}>{item.TimeStamp}</Text>

        <Text style={[styles.ordersRowText, {
          width: "13%"
        }]}>{item.table}</Text>


        <Text style={[styles.ordersRowText, {
          width: "13%",
        }]}>{item.member}</Text>

        <Text style={[styles.ordersRowText, {
          width: "15%"
        }]}>{item.type}</Text>

        <Text style={[styles.ordersRowText, {
          color: 'red',
          width: "19%"
        }]}>{"$" + item.total}</Text>
      </TouchableOpacity>
    );
  };

  //   {
  //     "id": 355,
  //     "product": "McChicken",
  //     "qty": 1,
  //     "price": "6.0000"
  // }

  const renderDetailItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: 'row', backgroundColor: item.bcolor }}>
        <View style={{
          padding: '2%',
          borderRightWidth: 0.3,
          borderRightColor: 'gray',
          width: "10%"
        }}>
          <Text style={{ fontSize: 9, fontWeight: 'bold', }}>{index + 1}</Text>
        </View>

        <View style={{
          marginLeft: '1%',
          padding: '2%',
          marginRight: '1%',
          borderRightColor: 'gray',
          width: "30%"
        }}>
          <Text style={{ fontSize: 9, fontWeight: 'bold', }}>{item.product}</Text>
        </View>
        <View style={{
          marginLeft: '1%',
          padding: '2%',
          borderRightColor: 'gray',
          marginRight: '1%',
          width: "20%"
        }}>
          <Text style={styles.textStyle}>{item.qty}</Text>
        </View>
        <View style={{
          marginLeft: '1%',
          padding: '2%',
          borderRightColor: 'gray',
          marginRight: '1%',
          width: "20%"
        }}>
          <Text style={styles.textStyle}>{"$" + item.price}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }} >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image source={require('../assets/cross2.png')} style={styles.crossImage} />
              </TouchableOpacity>
              <View style={styles.innerModalView}>
                <Image source={require('../assets/cross2.png')} style={{ marginBottom: 20, width: 100, height: 100 }} />
                <Text style={{ marginBottom: 15, textAlign: "center", fontWeight: 'bold' }}>Confirm Refund</Text>
                <Text style={{ marginBottom: 15, textAlign: "center", color: 'red', fontWeight: 'bold' }}>$ 0.00</Text>
                <TouchableOpacity
                  style={[styles.button, styles.confirmbtn]}
                  onPress={() => setModalVisible(!modalVisible)}
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

                <TouchableOpacity
                  style={[styles.button, styles.modal2Btn]}
                  onPress={() => {
                    setText('Pickup');
                    setbackgroundColor('red')
                    setTextColor('white')
                    setModal2Open(!modal2Open)
                  }}
                >
                  <Text style={styles.modal2Text}>Pickup</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.modal2Btn]}
                  onPress={() => {
                    setModal2Open(!modal2Open)
                    setbackgroundColor('red')
                    setTextColor('white')
                    setText('Delivery')
                  }}>
                  <Text style={styles.modal2Text}>Delivery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.modal2Btn]}
                  onPress={() => {
                    setModal2Open(!modal2Open)
                    setbackgroundColor('red')
                    setTextColor('white')
                    setText('Walk-in')
                  }}
                >
                  <Text style={styles.modal2Text}>Walk-in</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.button, styles.modal2Btn]}
                  onPress={() => {
                    setModal2Open(!modal2Open)

                    setText('Take-Away')
                  }}
                >
                  <Text style={styles.modal2Text}>Take-Away</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>

      <View style={{ borderRightColor: 'grey', borderRightWidth: 0.5, flex: 0.5, backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '1%', margin: '2%' }}>
          <Text style={{ fontWeight: 'bold' }}>History</Text>
          <Text style={{ fontWeight: 'bold' }}>Jan 8, 2020</Text>
        </View>

        {renderOrderListHeader()}

        <View style={{ borderWidth: 1, borderColor: '#d3d3d3', elevation: 1, height: '50%', width: '100%', justifyContent: 'center' }}>
          {saleOrders.length > 0 ?
            <FlatList
              data={saleOrders}
              keyExtractor={item => item.key}
              renderItem={renderOrdersItem}
            /> :
            <Text style={{ alignSelf: 'center', color: 'grey' }}>No orders to show</Text>
          }
        </View>

        <View style={{ borderBottomColor: '#d3d3d3', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <View style={{ alignItems: 'center', justifyContent: 'space-around', padding: '5%' }}>
            <Text style={{ color: 'gray', fontWeight: 'bold' }}>Cash</Text>
            <Text style={{ fontWeight: 'bold', color: '#696969' }}>$2500</Text>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'space-around', padding: '5%' }}>
            <Text style={{ color: 'gray', fontWeight: 'bold' }}>Card</Text>
            <Text style={{ fontWeight: 'bold', color: '#696969' }}>$2500</Text>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'space-around', padding: '5%' }}>
            <Text style={{ color: 'gray', fontWeight: 'bold' }}>Float</Text>
            <Text style={{ fontWeight: 'bold', color: '#696969' }}>$2500</Text>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'space-around', padding: '5%' }}>
            <Text style={{ color: 'gray', fontWeight: 'bold' }}>Total Sale:</Text>
            <Text style={{ fontWeight: 'bold', color: '#696969' }}>$2500</Text>
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
            onPress={() => setModal3Open(true)}
          >
            <Text style={styles.DateText}>{myDate}</Text>
          </TouchableOpacity>

        </View>
      </View>


      {/* OrderDetails */}
      <View style={{ flex: 0.5, backgroundColor: 'white' }}>
        <View style={{ height: '12%' }}>
          <Text style={{ padding: '2%', margin: '1%', fontWeight: 'bold' }}>Jan 8 2020, 12.30pm  |  Table A1  | 2pax</Text>
        </View>

        <View style={{ marginLeft: '3%', marginRight: '3%', height: '50%' }}>
          {orderDetails.length > 0 ?
            <FlatList
              data={orderDetails}
              keyExtractor={item => item.id}
              renderItem={renderDetailItem} /> :
            <Text style={{ alignSelf: 'center', color: 'grey' }}>Please select any order to view details</Text>
          }
        </View>

        <View style={{ borderColor: '#d3d3d3', borderTopWidth: 1, flexDirection: 'row', padding: '2%' }}>
          <Text style={{ marginLeft: '3%', marginRight: '2%' }}>Items:</Text>
          <Text style={{ marginRight: '2%', fontWeight: 'bold' }}>6</Text>
          <Text style={{ marginRight: '2%' }}>|</Text>
          <Text style={{ marginRight: '2%' }}>Payment Method:</Text>
          <Text style={{ marginRight: '2%', fontWeight: 'bold' }}>VISA</Text>
        </View>



        <View style={{ flexDirection: 'row', width: '100%', marginLeft: '4%' }}>

          <View style={{ height: '65%', width: '40%' }}>
            <TouchableOpacity style={styles.RePrintBtn}>
              <Text style={styles.RePrintText}>Re-Print</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.RefundBtn}
              onPress={() => setModalVisible(true)}>

              <Text style={styles.RefundText}>Refund</Text>
            </TouchableOpacity>
          </View>

          <View style={{ borderColor: '#d3d3d3', borderWidth: 2, flexDirection: 'row', height: '50%', width: '50%', borderRadius: 4, marginLeft: '5%' }}>
            <View style={{ padding: '12%' }}>
              <Text style={{ color: '#696969', marginBottom: '10%' }}>Service Charges:</Text>
              <Text style={{ color: '#696969', marginBottom: '10%' }}>Discount:</Text>
              <Text style={{ color: '#696969', marginBottom: '10%' }}>GST:</Text>
              <Text style={{ color: '#696969', marginBottom: '10%' }}>Total Price:</Text>
            </View>

            <View style={{ padding: '12%' }}>
              <Text style={{ color: '#696969', marginBottom: '30%' }}>$0.00</Text>
              <Text style={{ color: '#696969', marginBottom: '30%' }}>$0.00</Text>
              <Text style={{ color: '#696969', marginBottom: '30%' }}>$0.00</Text>
              <Text style={{ color: 'red', marginBottom: '30%', fontWeight: 'bold' }}>$0.00</Text>
            </View>

          </View>

        </View>

      </View>

      {isLoading && <CustomActivityIndicator />}
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
    marginTop: 22
  },
  crossImage: {
    margin: 10,
    width: 20,
    height: 20
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
    width: 300,
    height: 300,
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

  ScrollView: {
    alignItems: 'center',
    height: 300
  },
  billText: {
    alignItems: 'flex-end',
  },

  item: {
    padding: 10,
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
    fontSize: 15,
    color: 'red',
    textAlign: 'center'
  },
  RefundBtn: {
    width: '100%',
    height: '35%',
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 10
  },
  RefundText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',

  },
  confirmbtn: {
    width: 200,
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 10
  },
  confirmText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  closebtn: {
    width: 70,
    height: 70,
    elevation: 2
  },
  generateBtn: {
    width: '18%',
    height: '30%',
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: '40%',
    marginLeft: '2%',
    marginVertical: '3%'
  },
  GenerateText: {
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  TypeBtn: {
    width: '18%',
    height: '30%',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 1,
    marginRight: '3%',
    marginVertical: '3%'
  },
  TypeText: {
    fontSize: 15,
    textAlign: 'center',
  },
  DateBtn: {
    width: '18%',
    height: '30%',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: 'red',
    borderWidth: 1,
    marginVertical: '3%'
  },
  DateText: {
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
  },
  ordersHeaderText: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: '2%',
    marginHorizontal: '1%',
  },
  ordersRowText: {
    fontSize: 9,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    marginHorizontal: '1%',
    padding: "2%",
  },
  modal2Btn: {
    width: 200,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
    marginTop: 5
  },
  modal2Text: {
    fontSize: 15,
    color: 'red',
    textAlign: 'center',
  }
});
