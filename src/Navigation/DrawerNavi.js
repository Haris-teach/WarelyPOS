import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, TouchableOpacity, View, ToastAndroid, DeviceEventEmitter, } from 'react-native';
import { Drawer, Text } from 'react-native-paper';
import RNPrint from 'react-native-print';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { SetOpen, SetSale_his, SetSel } from '../Redux/Reducers/mainReducer';
import APIHandler from '../utils/APIHandler';
import { Close_print, Printer_Recipet } from '../utils/urls';
var dateFormat = require('dateformat');
const base64Image = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA8FBMVEUAAABCQkJDQ0NFRUU/Pz9BQUFAQEBERERDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MAAAA0ZZMIAAAATnRSTlMAAAAAAAAAABWFz8JdBQFHt9OYIxSi/PBsBFHjvCSk/vJt5b7mo26h75ziIZkD1csRXvpziwvx+QadveRSSA3XF6r31DMPOSLWzMTZFgd4wftfAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAaBJREFUSMe11dlSwjAUgOE2WmUTQRBtBQVBREREQEVUFkHcz/s/jklbQ7YOhwtz2fzftJ1OTi0rWDaJxRPJ1A6xxEXSu5nsXo7Ylrpskt8vABwcuqIgG94RABRLmtgk+eMTugXliiAI8U7ZRaiqwvnrJUH7WnBRFfR5zsKeinoohN4XRHyeZc8F2RJ6SSh9KJReeCpH7QOh9st76L3/5lrPRf5c6wEaF039IlQvmYgXAL1aVxQk8D20YxQk1wDXHQpuGui+22Pv4FbK2L5/639Rt44TYY8WvEcKoUcJqUcIpV8ptN4Xd5H9vd5TMXiIBMOOoXe8x0igzJKgf6pB9JJmCaIXJkPYb6/oFYHoJYHqxXllo/qlcDxcz8VzE9lTkWInLoPuAZIjCrJrgPGEgtYaYDqgIFc07LwMTbNkNmfvQEpVbafbfzXMkvbCn622Lth50adP2BuEf740MVvwP4oi+LyShNArQphXgpB69v/jQppXXCi9IJR5FQqt50KbV74w9Ey8td4/etq8Sn1+TeeGngn3u5PW7myPJj/G/v/WL4DMswebZ4AxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA2LTI1VDA4OjQ0OjQ2KzA4OjAww1b9dwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNi0yNVQwODo0NDo0NiswODowMLILRcsAAAAASUVORK5CYII=";
import { BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter } from "react-native-bluetooth-escpos-printer";

var Pin = '';
var CPin = '';
var _listeners = [];
const DrawerNavigate = (props, route) => {
    const dispatch = useDispatch();
    const { s_id, stf_id, opendrawer, closeSale, loc_id } = useSelector(state => state.root.main);
    const [userID, setUserID] = useState();
    const [slip, setSlip] = useState('');


    const sendUId = () => {

        let params = {
            stf_id: s_id,
        };

        APIHandler.hitApi(Close_print, 'POST', params).then(response => setSlip(response));


    };
    // console.log(route.params?.userid);
    useEffect(async () => {
        Pin = await AsyncStorage.getItem('Pin');
        let params = {
            stf_id: s_id,
        };

        APIHandler.hitApi(Close_print, 'POST', params).then(response => {
            setSlip(response);
            console.log("Close sale response ===", response);
            console.log(Pin);

        });


    }, [closeSale]);

    const closePrint = async printRemotePDF => {
        await RNPrint.print({ filePath: slip.url })
    }
    const [show_modal, setShow_modal] = useState(false);
    const [p1, setP1] = useState('white');
    const [p2, setP2] = useState('white');
    const [p3, setP3] = useState('white');
    const [p4, setP4] = useState('white');
    const [value, setValue] = useState('');
    const [modal, setModal] = useState(false);
    const [pairedDs, setPairedDs] = useState([]);
    const [foundDs, setFoundDs] = useState([]);
    const [loading, setLoading] = useState(true);
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
        CPin = word;
        setValue(word.toString());
        console.log(CPin.slice(0, -1));

    };
    const [printer_Recipet, setPrinter_Recipet] = useState();
    useEffect(() => {

        _listeners.push(DeviceEventEmitter.addListener(
            BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp) => {
                _deviceAlreadPaired(rsp)
            }));

        let params = {
            Loc_id: loc_id,
        };

        APIHandler.hitApi(Printer_Recipet, 'POST', params).then(response => {
            setPrinter_Recipet(response);
            console.log("Printer Recipet Response", printer_Recipet);
        });



        _scan();
    }, [closeSale]);

    const _scan = () => {
        // this.setState({
        //     loading: true
        // })
        setLoading(true);
        BluetoothManager.scanDevices()
            .then((s) => {
                var ss = s;
                var found = ss.found;
                try {
                    found = JSON.parse(found);//@FIX_it: the parse action too weired..
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
            }, (er) => {
                // this.setState({
                //     loading: false
                // })
                setLoading(false);
                alert('error' + JSON.stringify(er));
            });
    }

    const _deviceAlreadPaired = async (rsp) => {
        var ds = null;
        if (typeof (rsp.devices) == 'object') {
            ds = rsp.devices;

        } else {
            try {
                ds = JSON.parse(rsp.devices);

            } catch (e) {
            }
        }
        if (ds && ds.length) {
            let pared = pairedDs;
            pared = pared.concat(ds || []);
            setPairedDs(pared);
            pared.map(i => {
                if (i.address == '3F:34:32:3D:41:2C') {
                    setLoading(true);
                    BluetoothManager.connect('3F:34:32:3D:41:2C')
                        .then((s) => {

                            setLoading(false);
                            setBoundAddress('3F:34:32:3D:41:2C');
                            setName('MHT-P80A' || "UNKNOWN");
                            console.log("Connected");
                        }, (e) => {

                            setLoading(false);
                            alert(e);
                            console.log("Not Connected");

                        });

                }

            })

        }
    }


    const Printer = async () => {
        printer_Recipet.map(async i => {



            try {
                await BluetoothEscposPrinter.printerInit();
                await BluetoothEscposPrinter.printerLeftSpace(0);


                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                await BluetoothEscposPrinter.setBlob(0);
                await BluetoothEscposPrinter.printText(i.tittle + "\r\n", {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 2,
                    heigthtimes: 2,
                    fonttype: 1
                });
                await BluetoothEscposPrinter.setBlob(0);
                await BluetoothEscposPrinter.printText("Phone: " + i.phone + "\r\n", {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 1
                });

                await BluetoothEscposPrinter.printText("Address:" + i.adress + "\r\n", {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 0,
                    heigthtimes: 0,
                    fonttype: 1
                });
                await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                await BluetoothEscposPrinter.printText("Order No: XXX    ", {});
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.RIGHT);

                await BluetoothEscposPrinter.printText("Date & Time" + (dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")) + "\r\n", {});

                await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                await BluetoothEscposPrinter.printText("\r\n", {});
                await BluetoothEscposPrinter.printColumn([12, 3, 5],
                    [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                    ['Name', "Qty", 'Price'], {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 1,
                    heigthtimes: 1,
                    fonttype: 1
                });
                await BluetoothEscposPrinter.printText("\r\n", {});
                data.map(async j => {
                    let columnWidths = [12, 3, 5];
                    await BluetoothEscposPrinter.printColumn(columnWidths,
                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                        [j.item, j.qty, j.p], {
                        encoding: 'GBK',
                        codepage: 0,
                        widthtimes: 0,
                        heigthtimes: 0,
                        fonttype: 1
                    });
                })

                await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});

                await BluetoothEscposPrinter.printColumn([12, 3],
                    [BluetoothEscposPrinter.ALIGN.RIGHT, BluetoothEscposPrinter.ALIGN.RIGHT],
                    ['SubTotal:    ', p], {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 1,
                    heigthtimes: 1,
                    fonttype: 1
                });
                await BluetoothEscposPrinter.printText("\r\n", {});
                await BluetoothEscposPrinter.printColumn([12, 3],
                    [BluetoothEscposPrinter.ALIGN.RIGHT, BluetoothEscposPrinter.ALIGN.RIGHT],
                    ['Disc:    ', d], {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 1,
                    heigthtimes: 1,
                    fonttype: 1
                });
                await BluetoothEscposPrinter.printText("\r\n", {});
                await BluetoothEscposPrinter.printColumn([12, 3],
                    [BluetoothEscposPrinter.ALIGN.RIGHT, BluetoothEscposPrinter.ALIGN.RIGHT],
                    ['Total:    ', p - d], {
                    encoding: 'GBK',
                    codepage: 0,
                    widthtimes: 1,
                    heigthtimes: 1,
                    fonttype: 1
                });
                await BluetoothEscposPrinter.printText("\r\n", {});

                await BluetoothEscposPrinter.printText("-------------------------------------\r\n", {});

                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                await BluetoothEscposPrinter.printText("Terms & Conditions" + i.Footer + "\r\n", {});
                await BluetoothEscposPrinter.printText("This is a sample\r\n", {});




            } catch (e) {
                alert(e.message || "ERROR");
            }
        })

        Paper_Cut()




    }

    const Paper_Cut = async () => {

        try {
            await BluetoothEscposPrinter.printPic(base64Image, { width: 200, left: 40 });
            await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});

            console.log("Paper Cut ho reha ha");

        } catch (e) {
            alert(e.message || "ERROR")
        }
        return (
            <View>
                <Image style={{ width: 150, height: 58 }} source={{ uri: "data:image/jpeg;base64," + base64Image }} />
            </View>
        );

    }

    const Drawer_Open = async () => {

        try {

            await BluetoothEscposPrinter.opendDrawer(0, 250, 250);
            console.log("Drawer is open Now ");

        } catch (e) {
            alert(e.message || "ERROR")
        }
    }




    return (
        <>
            <Modal
                animationType="fade"

                transparent={true}
                visible={opendrawer}
                onRequestClose={() => {

                    dispatch(SetOpen(!opendrawer))
                }}
            >

                <View style={[styles.modalView, { width: wp('60%'), height: hp('80%') }]}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: wp('1%'), marginTop: hp('1%') }} onPress={() => dispatch(SetOpen(false))}>
                        <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: wp('5%'), height: hp('5%') }} />
                    </TouchableOpacity>





                    <View style={styles.container1}>
                        <View
                            style={{
                                backgroundColor: 'rgb(250,250,250)',
                                width: wp('10%'),
                                marginTop: hp('-2.5%'),
                                marginBottom: 20,
                                alignItems: 'center',
                            }}>
                            <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%') }}>
                                Enter PIN
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: '5%' }}>
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

                        <ScrollView>
                            <View
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

                                    <TouchableOpacity
                                        onPress={() => {
                                            if (CPin.slice(0, -1) == Pin) {
                                                setModal(true);
                                                dispatch(SetOpen(false));
                                                setP1('white');
                                                setP2('white');
                                                setP3('white');
                                                setP4('white');
                                                concatinate('del');
                                            }
                                            else {
                                                setP1('white');
                                                setP2('white');
                                                setP3('white');
                                                setP4('white');
                                                concatinate('del');
                                                ToastAndroid.show(" Incorrect Pin !", ToastAndroid.SHORT);

                                            }
                                        }}
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
                                            }}>Open</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>



                </View>

            </Modal>

            <Modal
                animationType="fade"

                transparent={true}
                visible={modal}
                onRequestClose={() => {

                    setModal(!modal);
                }}
            >

                <View style={[styles.modalView, { width: wp('35%'), height: hp('55%') }]}>
                    <TouchableOpacity style={{ marginBottom: hp('1%'), alignSelf: 'flex-end', marginRight: wp('1%'), marginTop: hp('1%') }} onPress={() => setModal(false)}>
                        <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: wp('3%'), height: hp('3%') }} />
                    </TouchableOpacity>


                    <View style={{ marginRight: wp('1%'), alignSelf: 'center', width: wp('30%'), height: hp('30%') }} >
                        <Image source={require('../assets/draweropen.png')} resizeMode="contain" style={{ width: wp('30%'), height: hp('30%') }} />
                    </View>
                    <Text style={{ fontSize: wp('1.4%'), marginTop: hp('5%') }}>Drawer Open</Text>
                    <View style={{ marginBottom: hp('2%'), flex: 1, width: wp('32%'), flexDirection: 'row', justifyContent: 'space-around' }}>


                        <TouchableOpacity style={{ backgroundColor: 'red', width: wp('15%'), height: hp('5%'), marginBottom: hp('1%'), borderRadius: 4, justifyContent: 'center', alignSelf: 'flex-end' }}
                            onPress={() => {
                                setModal(false);
                                Drawer_Open();

                            }}>
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.3%') }}>OK</Text>
                        </TouchableOpacity>
                    </View>


                </View>

            </Modal>

            <DrawerContentScrollView {...props}>

                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem
                        icon={() => (
                            <Image
                                source={require('../assets/Logo.jpg')}
                                style={{
                                    alignItems: 'center',
                                    width: wp('16%'),
                                    height: hp('10%'),
                                }}
                                resizeMode="contain"
                            />
                        )}
                        label={'1'}
                    />
                    <DrawerItem
                        // icon={() => (
                        //     <Image source={require('../assest/icons/location.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
                        // )}
                        label={Lable1}
                        onPress={() => {
                            // props.navigation.navigate('Dinning');
                            dispatch(SetSel(0));
                        }}
                    />
                    <DrawerItem
                        // icon={() => (
                        //     <Image source={require('../assest/icons/pay.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
                        // )}
                        label={Lable2}
                        onPress={() => {
                            // props.navigation.navigate('Sale History');
                            dispatch(SetSel(5));
                            props.navigation.closeDrawer();
                        }}
                    />

                    <DrawerItem
                        // icon={() => (
                        //     <Image source={require('../assest/icons/stats.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
                        // )}
                        label={Lable4}
                        onPress={() => {
                            props.navigation.navigate('Setting');
                        }}
                    />
                    <DrawerItem
                        // icon={() => (
                        //     <Image source={require('../assest/icons/pay.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
                        // )}
                        label={Lable3}
                        onPress={() => {
                            // props.navigation.navigate('Shift');
                            dispatch(SetOpen(true));
                            props.navigation.closeDrawer();
                        }}
                    />

                    <DrawerItem
                        // icon={() => (
                        //     <Image source={require('../assest/icons/stats.png')} style={{ marginLeft: -5, marginRight: -35, marginTop: -10, height: 30, width: 30, resizeMode: 'contain' }} />
                        // )}
                        label={Lable6}
                        onPress={() => {
                            if (slip.free == 'true') {
                                ToastAndroid.show(" Some Table are not Free !", ToastAndroid.SHORT);
                                props.navigation.closeDrawer();
                            }

                            else {
                                AsyncStorage.clear().then(() => props.navigation.closeDrawer(),
                                    props.navigation.navigate('Login'),
                                    // sendUId(),
                                    //closePrint(),
                                    Printer(),
                                );
                            }
                        }}
                    />
                </Drawer.Section>
            </DrawerContentScrollView>
        </>
    );
};

const Lable1 = () => {
    return (
        <View style={styles.boxStyle}>
            <Text
                style={{ fontSize: wp('1.2%'), alignSelf: 'center', fontWeight: 'bold' }}>
                HOME
            </Text>
        </View>
    );
};

const Lable2 = () => {
    return (
        <View style={styles.boxStyle}>
            <Text
                style={{ fontSize: wp('1.2%'), alignSelf: 'center', fontWeight: 'bold' }}>
                SALE HISTORY
            </Text>
        </View>
    );
};

const Lable3 = () => {
    return (
        <View style={styles.boxStyle}>
            <Text
                style={{ fontSize: wp('1.2%'), alignSelf: 'center', fontWeight: 'bold' }}>
                OPEN DRAWER
            </Text>
        </View>
    );
};

const Lable4 = () => {
    return (
        <View style={styles.boxStyle}>
            <Text
                style={{ fontSize: wp('1.2%'), alignSelf: 'center', fontWeight: 'bold' }}>
                SETTING
            </Text>
        </View>
    );
};

const Lable6 = () => {
    return (
        <View
            style={{
                borderRadius: 2,
                width: wp('20%'),
                height: hp('5%'),
                alignSelf: 'center',
                marginTop: -13,
                backgroundColor: 'red',
                justifyContent: 'center',
            }}>
            <Text
                style={{
                    fontSize: wp('1.2%'),
                    color: 'white',
                    alignSelf: 'center',
                    fontWeight: 'bold',
                }}>
                CLOSE SALE
            </Text>
        </View>
    );
};
export default DrawerNavigate;

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    drawerSection: {
        marginTop: 2,
        marginLeft: '10%',
        alignSelf: 'center',
    },
    boxStyle: {
        borderWidth: 2,
        borderRadius: 6,
        width: wp('15%'),
        height: hp('5%'),
        justifyContent: 'center',
        marginTop: -13,
        alignSelf: 'center',
    },
    modalView: {
        marginTop: wp('5%'),
        backgroundColor: "white",
        borderRadius: 20,
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
        justifyContent: 'center',
        padding: 2
    },
    PinView: {
        width: '5%',
        height: hp('5%'),
        marginLeft: 15,

        borderRadius: 25,
    },
    container1: {
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderColor: '#b5b5b5',
        width: '100%',
        height: '95%',
        marginRight: 150,
        marginLeft: 150,
        backgroundColor: 'rgb(250,250,250)',
    },
});
