import React, {useEffect, useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  DeviceEventEmitter,
  NativeEventEmitter,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useSelector, useDispatch} from 'react-redux';
import APIHandler from '../../utils/APIHandler';
import {
  Dine_in_pay_later,
  Table_res,
  Takeaway_Order,
  Printer_Recipet,
} from '../../utils/urls';
import Cash from './Cash';
import {
  BluetoothEscposPrinter,
  BluetoothManager,
  BluetoothTscPrinter,
} from 'react-native-bluetooth-escpos-printer';
var {height, width} = Dimensions.get('window');
var _listeners = [];
var dateFormat = moment();
const base64Image =
  'iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA8FBMVEUAAABCQkJDQ0NFRUU/Pz9BQUFAQEBERERDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MAAAA0ZZMIAAAATnRSTlMAAAAAAAAAABWFz8JdBQFHt9OYIxSi/PBsBFHjvCSk/vJt5b7mo26h75ziIZkD1csRXvpziwvx+QadveRSSA3XF6r31DMPOSLWzMTZFgd4wftfAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAaBJREFUSMe11dlSwjAUgOE2WmUTQRBtBQVBREREQEVUFkHcz/s/jklbQ7YOhwtz2fzftJ1OTi0rWDaJxRPJ1A6xxEXSu5nsXo7Ylrpskt8vABwcuqIgG94RABRLmtgk+eMTugXliiAI8U7ZRaiqwvnrJUH7WnBRFfR5zsKeinoohN4XRHyeZc8F2RJ6SSh9KJReeCpH7QOh9st76L3/5lrPRf5c6wEaF039IlQvmYgXAL1aVxQk8D20YxQk1wDXHQpuGui+22Pv4FbK2L5/639Rt44TYY8WvEcKoUcJqUcIpV8ptN4Xd5H9vd5TMXiIBMOOoXe8x0igzJKgf6pB9JJmCaIXJkPYb6/oFYHoJYHqxXllo/qlcDxcz8VzE9lTkWInLoPuAZIjCrJrgPGEgtYaYDqgIFc07LwMTbNkNmfvQEpVbafbfzXMkvbCn622Lth50adP2BuEf740MVvwP4oi+LyShNArQphXgpB69v/jQppXXCi9IJR5FQqt50KbV74w9Ey8td4/etq8Sn1+TeeGngn3u5PW7myPJj/G/v/WL4DMswebZ4AxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA2LTI1VDA4OjQ0OjQ2KzA4OjAww1b9dwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNi0yNVQwODo0NDo0NiswODowMLILRcsAAAAASUVORK5CYII=';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {SetPrinter_Address} from '../../Redux/Reducers/mainReducer';
import moment from 'moment';

const Payable = props => {
  let Recived = props.Value;
  const dispatch = useDispatch();
  const Total = props.total;
  let V = Recived - Total;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisi, setModalVisi] = useState(false);
  const [bleOpend, setBleOpend] = useState(false);

  const [pairedDs, setPairedDs] = useState([]);
  const [foundDs, setFoundDs] = useState([]);

  const [loading, setLoading] = useState(true);
  const [boundAddress, setBoundAddress] = useState('');

  const [name, setName] = useState('');

  const Data = props.D;
  const token = '$2y$10$f43enwo0NWLsBmlGfx/ZMevMgmvEdbrZ3JTF.FNoVM4Nrj2aZYE82';
  const br = props.branch;
  const {loc_id, stf_id, total_dis, customer_id, printer_address} = useSelector(
    state => state.root.main,
  );

  // console.log("Kia bana phir", props.branch, props.table_id, props.count, props.userid, props.D, props.total_dis, Total)
  // console.log('Total Discount ===', props.total_dis)

  // const Save = () => {

  //     let params = {
  //         total: Total,
  //         loc_id: loc_id,
  //         stf_id: stf_id,
  //         Data: Data,
  //         method: 'Cash',
  //         card_type: 'Visa',
  //         total_dis: total_dis,
  //         c_id: parseInt(customer_id.map(i => i.id)),
  //     };

  //     APIHandler.hitApi(Takeaway_Order, 'POST', params).then(res => console.log(res));
  //     console.log("Takeaway order done")

  // };
  const [printer_Recipet, setPrinter_Recipet] = useState();
  useEffect(async () => {
    let mounted = true;
    if (mounted) {
      setLoading(false);
      BluetoothManager.isBluetoothEnabled().then(
        enabled => {
          // this.setState({
          //     bleOpend: Boolean(enabled),
          //     loading: false
          // })
          setBleOpend(Boolean(enabled));
          setLoading(false);
        },
        err => {
          err;
        },
      );

      _listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
          rsp => {
            _deviceAlreadPaired(rsp);
          },
        ),
      );
      _listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_DEVICE_FOUND,
          rsp => {
            _deviceFoundEvent(rsp);
          },
        ),
      );
      _listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_CONNECTION_LOST,
          () => {
            // this.setState({
            //     name: '',
            //     boundAddress: ''
            // });
            setName('');
            setBoundAddress('');
          },
        ),
      );
      _listeners.push(
        DeviceEventEmitter.addListener(
          BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT,
          () => {
            ToastAndroid.show(
              'Device Not Support Bluetooth !',
              ToastAndroid.LONG,
            );
          },
        ),
      );

      let params = {
        Loc_id: loc_id,
      };

      APIHandler.hitApi(Printer_Recipet, 'POST', params).then(response => {
        setPrinter_Recipet(response);
        console.log('Printer Recipet Response', printer_Recipet);
      });

      let PrinterAddress = await AsyncStorage.getItem('PrinterAddress');
      // console.log("PRINTER ADDRESS IS =", PrinterAddress);
      dispatch(SetPrinter_Address(PrinterAddress));

      _scan();
    }

    return function cleanup() {
      mounted = false;
    };
  }, []);

  const _deviceAlreadPaired = async rsp => {
    var ds = null;
    if (typeof rsp.devices == 'object') {
      ds = rsp.devices;
    } else {
      try {
        ds = JSON.parse(rsp.devices);
      } catch (e) {}
    }
    if (ds && ds.length) {
      let pared = pairedDs;
      pared = pared.concat(ds || []);
      setPairedDs(pared);
      pared.map(i => {
        if (i.address == printer_address) {
          setLoading(true);
          BluetoothManager.connect(printer_address).then(
            s => {
              setLoading(false);
              setBoundAddress(printer_address);
              setName('MHT-P80A' || 'UNKNOWN');
              console.log('Connected');
            },
            e => {
              setLoading(false);
              alert(e);
              console.log('Not Connected');
            },
          );
        }
      });
    } else {
      console.log('Not Connected');
    }
  };
  const _deviceFoundEvent = rsp => {
    //alert(JSON.stringify(rsp))
    var r = null;
    try {
      if (typeof rsp.device == 'object') {
        r = rsp.device;
      } else {
        r = JSON.parse(rsp.device);
      }
    } catch (e) {
      //alert(e.message);
      //ignore
    }
    //alert('f')
    if (r) {
      let found = foundDs || [];
      if (found.findIndex) {
        let duplicated = found.findIndex(function (x) {
          return x.address == r.address;
        });
        //CHECK DEPLICATED HERE...
        if (duplicated == -1) {
          // found.push(r);
          found.push(r);
          // this.setState({
          //     foundDs: found
          // });
          setFoundDs(found);
        }
      }
    }
  };
  const _scan = () => {
    // this.setState({
    //     loading: true
    // })
    setLoading(true);
    BluetoothManager.scanDevices().then(
      s => {
        var ss = s;
        var found = ss.found;
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
        } catch (e) {
          //ignore
        }
        var fds = foundDs;
        if (found && found.length) {
          fds = found;
        }
        // this.setState({
        //     foundDs: fds,
        //     loading: false
        // });
        setLoading(false);
        setFoundDs(fds);
      },
      er => {
        // this.setState({
        //     loading: false
        // })
        setLoading(false);
        alert('error' + JSON.stringify(er));
      },
    );
  };

  const Printer = async () => {
    printer_Recipet.map(async i => {
      try {
        await BluetoothEscposPrinter.printerInit();
        await BluetoothEscposPrinter.printerLeftSpace(0);

        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.CENTER,
        );
        await BluetoothEscposPrinter.setBlob(0);
        await BluetoothEscposPrinter.printText(i.tittle + '\r\n', {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 2,
          heigthtimes: 2,
          fonttype: 1,
        });
        await BluetoothEscposPrinter.setBlob(0);
        await BluetoothEscposPrinter.printText('Phone: ' + i.phone + '\r\n', {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1,
        });

        await BluetoothEscposPrinter.printText('Address:' + i.adress + '\r\n', {
          encoding: 'GBK',
          codepage: 0,
          widthtimes: 0,
          heigthtimes: 0,
          fonttype: 1,
        });
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.LEFT,
        );
        await BluetoothEscposPrinter.printText(
          '-----------------------------------------------\r\n',
          {},
        );
        await BluetoothEscposPrinter.printText('Order No: 01    ', {});
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.RIGHT,
        );

        await BluetoothEscposPrinter.printText(
          'Date & Time: ' +
            dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss') +
            '\r\n',
          {},
        );

        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.LEFT,
        );
        await BluetoothEscposPrinter.printText(
          '-----------------------------------------------\r\n',
          {},
        );
        await BluetoothEscposPrinter.printText('\r\n', {});
        let columnWidths = [30, 8, 10];
        await BluetoothEscposPrinter.printColumn(
          columnWidths,
          [
            BluetoothEscposPrinter.ALIGN.LEFT,
            BluetoothEscposPrinter.ALIGN.CENTER,
            BluetoothEscposPrinter.ALIGN.RIGHT,
          ],
          ['Name', 'Qty', 'Price'],
          {},
        );
        await BluetoothEscposPrinter.printText('\r\n', {});
        Data.map(async j => {
          await BluetoothEscposPrinter.printColumn(
            columnWidths,
            [
              BluetoothEscposPrinter.ALIGN.LEFT,
              BluetoothEscposPrinter.ALIGN.CENTER,
              BluetoothEscposPrinter.ALIGN.RIGHT,
            ],
            [j.item, j.qty, j.p],
            {},
          );
          await BluetoothEscposPrinter.printText('\r\n', {});
        });
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.LEFT,
        );
        await BluetoothEscposPrinter.printText(
          '-----------------------------------------------\r\n',
          {},
        );
        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.RIGHT,
        );
        await BluetoothEscposPrinter.printText('Subtotal: $' + Total, {});
        await BluetoothEscposPrinter.printText('\r\n', {});
        await BluetoothEscposPrinter.printText(
          'Discount: $' + props.total_dis,
          {},
        );
        await BluetoothEscposPrinter.printText('\r\n', {});
        await BluetoothEscposPrinter.printText(
          'Total: $' + (Total - props.total_dis),
          {},
        );
        await BluetoothEscposPrinter.printText('\r\n', {});

        await BluetoothEscposPrinter.printerAlign(
          BluetoothEscposPrinter.ALIGN.LEFT,
        );
        await BluetoothEscposPrinter.printText(
          '-----------------------------------------------\r\n',
          {},
        );
        await BluetoothEscposPrinter.printText(
          'Terms & Conditions' + i.Footer + '\r\n',
          {},
        );

        Paper_Cut();
      } catch (e) {
        alert(e.message || 'ERROR');
      }
    });
  };

  const Paper_Cut = async () => {
    try {
      await BluetoothEscposPrinter.printPic(base64Image, {width: 1, left: 1});
      await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
      await BluetoothEscposPrinter.openDrawer(0, 250, 250);
    } catch (e) {
      alert(e.message || 'ERROR');
    }
    return (
      <View>
        <Image
          style={{width: 1, height: 1}}
          source={{uri: 'data:image/jpeg;base64,' + base64Image}}
        />
      </View>
    );
  };

  const fun = () => {
    let param = {
      total: Total,
      c_id: parseInt(customer_id.map(i => i.id)),
      loc_id: props.branch,
      t_id: props.table_id,
      mem: props.count,
      stf_id: props.userid,
      Data: props.D,
      total_dis: props.total_dis,
      method: 'Cash',
      card_type: 'Visa',
    };

    APIHandler.hitApi(Table_res, 'POST', param).then(response =>
      console.log(response),
    );

    console.log('Table order done');
  };

  const Dine_in_pay_late = (id, sum) => {
    let params = {
      id: parseInt(id),
      total: Total,
    };

    APIHandler.hitApi(Dine_in_pay_later, 'POST', params).then(response =>
      console.log('Dine_in_pay_later is Done===== ', response),
    );

    console.log(
      'Dine_in_pay_later is Done',
      props.T_order_id,
      props.T_order_sum,
    );
  };

  const [state, setState] = useState();

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1, backgroundColor: 'rgb(240,240,240)'}}>
        {state == 'cash' ? (
          <Cash
            NameState={props.NameState}
            btnDisTot={props.btnDisTot}
            disTotal={props.disTotal}
            total_dis={props.total_dis}
            D={props.D}
            userid={props.userid}
            count={props.count}
            total={Total}
            pass={props.pass}
            Empty={props.empty}
            refresh={props.refresh}
            OrgTotal={props.pay}
            statename={props.Statename}
            table_pass={props.table_pass}
            Total={props.total}
            branch={props.branch}
            table_id={props.table_id}
          />
        ) : (
          <View style={{borderLeftWidth: 1, borderColor: 'gray', flex: 1}}>
            <View
              style={[
                styles.containerStyle,
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp('25%'),
                },
              ]}>
              <View
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  width: wp('20%'),
                  height: hp('8%'),
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: wp('1.2%'),
                    fontWeight: 'bold',
                  }}>
                  RECEIVED AMOUNT:
                </Text>
                <Text
                  style={{
                    color: 'black',
                    fontSize: wp('1.2%'),
                    fontWeight: 'bold',
                  }}>
                  PAYABLE:
                </Text>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  height: hp('10%'),
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: wp('1.8%'),
                    fontWeight: 'bold',
                  }}>
                  $ {Recived == 0 ? '0.00' : parseFloat(Recived).toFixed(2)}
                </Text>
                <Text
                  style={{
                    color: 'black',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: wp('1.8%'),
                  }}>
                  $ {parseFloat(Total).toFixed(2)}
                  {/* {parseFloat(props.pay).toFixed(2)} */}
                </Text>
              </View>
            </View>
            {/* <View style={[styles.containerStyle, { alignItems: 'center', justifyContent: 'center', marginTop: hp('20%') }]}>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Text style={{ color: 'black', fontSize: wp('1.2%'), marginRight: wp('10%') }}>RECEIVED AMOUNT:</Text>
                                <Text style={{ color: 'black', fontSize: wp('1.8%'), fontWeight: 'bold' }}>$ {Recived}.00</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start', marginTop: hp('2%') }}>
                                <Text style={{ color: 'black', alignSelf: 'center', fontSize: wp('1.2%'), marginRight: wp('13.6%') }}>PAYABLE:</Text>
                                <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold', fontSize: wp('1.8%') }}>$ {parseFloat(Total).toFixed(2)}</Text>
                            </View>

                        </View> */}
            {/* <View style={styles.container}>
                            <Text style={{ alignSelf: 'center', color: 'black', fontSize: wp('1.5%') }}>CHANGE:</Text>
                            <Text style={{ alignSelf: 'center', fontSize: wp('1.5%'), color: "red" }}>${parseFloat(V).toFixed(2)} </Text>
                        </View> */}
            <View style={styles.container}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: 'black',
                  fontSize: wp('1.5%'),
                  fontWeight: 'bold',
                }}>
                CHANGE:
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: wp('2%'),
                  color: '#FC3F3F',
                  fontWeight: 'bold',
                }}>
                $ {parseFloat(V).toFixed(2)}{' '}
              </Text>
            </View>

            <View></View>

            <View
              style={{
                flexDirection: 'row',
                height: hp('12%'),
                width: wp('40%'),
                backgroundColor: 'white',
              }}>
              <TouchableOpacity
                //  disabled={counter > 0 ? true : false}
                style={{
                  width: wp('14%'),
                  backgroundColor: 'white',
                  height: hp('12.3%'),
                  justifyContent: 'center',
                }}
                onPress={() => setState('cash')}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontSize: wp('2%'),
                    fontWeight: '600',
                    color: '#FF2E2E',
                  }}>
                  BACK
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={parseFloat(V).toFixed(2) < 0 ? true : false}
                style={{
                  width: wp('26%'),
                  backgroundColor:
                    parseFloat(V).toFixed(2) < 0 ? 'gray' : '#FF2E2E',
                  height: hp('12.3%'),
                  justifyContent: 'center',
                }}
                onPress={() => {
                  // if (props.Statename == 'Takeway') {
                  //     setModalVisible(true);
                  //     Save();

                  // }
                  // else {
                  if (props.table_pass == 'table') {
                    Dine_in_pay_late(props.T_order_id, props.T_order_sum);
                    setModalVisi(true);
                  } else {
                    setModalVisible(true);
                    fun();
                  }
                }}>
                <Text
                  style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontSize: wp('2%'),
                    fontWeight: '600',
                  }}>
                  CONFIRM & PRINT
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', marginRight: 10, marginTop: 8}}
                  onPress={() => setModalVisible(false)}>
                  <Image
                    source={require('../../assets/cross2.png')}
                    resizeMode="contain"
                    style={{width: 20, height: 20}}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    marginRight: 10,
                    marginTop: 8,
                    alignSelf: 'center',
                    width: '40%',
                    height: '40%',
                  }}>
                  <Image
                    source={require('../../assets/order.jpg')}
                    resizeMode="contain"
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <Text style={{fontSize: wp('1.4%')}}>
                  Order Created Successfully
                </Text>

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    flex: 1,
                    width: '98%',
                  }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'red',
                      width: wp('15.5%'),
                      height: hp('8%'),
                      marginBottom: hp('2%'),
                      borderRadius: 4,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setModalVisible(false);
                      Printer();
                      props.empty();
                      props.refresh('Main');
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        alignSelf: 'center',
                        fontSize: wp('1.3%'),
                      }}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisi}
              onRequestClose={() => {
                setModalVisi(!modalVisi);
              }}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end', marginRight: 10, marginTop: 8}}
                  onPress={() => setModalVisi(false)}>
                  <Image
                    source={require('../../assets/cross.jpg')}
                    resizeMode="contain"
                    style={{width: 20, height: 20}}
                  />
                </TouchableOpacity>

                <View
                  style={{
                    marginRight: 10,
                    marginTop: 8,
                    alignSelf: 'center',
                    width: '40%',
                    height: '40%',
                  }}>
                  <Image
                    source={require('../../assets/order.jpg')}
                    resizeMode="contain"
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <Text style={{fontSize: wp('1.4%')}}>Payment Successfully</Text>
                <View
                  style={{justifyContent: 'flex-end', flex: 1, width: '98%'}}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'red',
                      width: wp('19.5%'),
                      height: hp('5%'),
                      marginBottom: 5,
                      borderRadius: 4,
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      setModalVisi(false);
                      Printer();
                      props.empty();
                      props.refresh('nope');
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        alignSelf: 'center',
                        fontSize: wp('1.3%'),
                      }}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Payable;

const styles = {
  containerStyle: {
    borderWidth: 1,
    alignSelf: 'center',
    width: wp('30%'),
    height: hp('15%'),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 4,
    marginTop: hp('5%'),
    marginBottom: hp('18%'),
    width: wp('30%'),
    height: hp('10%'),
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  modalView: {
    marginTop: '12%',
    backgroundColor: 'white',
    borderRadius: 20,
    height: hp('50%'),
    width: '20%',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
    justifyContent: 'center',
    padding: 2,
  },
};
