import React, { useState, useEffect } from 'react';
import { Modal, Image, Text, TouchableOpacity, View, DeviceEventEmitter, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FlatGrid } from 'react-native-super-grid';
import { Takeaway_Order, Printer_Recipet, PAYMENT_METHOD } from '../../utils/urls';
import { useDispatch, useSelector } from 'react-redux';
import APIHandler from '../../utils/APIHandler';
import { SetPrinter_Address, SetOrder_Dynamic } from '../../Redux/Reducers/mainReducer';
import Burger from './Burger';
import Visa from './Visa';
import Pay from './Pay'
import { BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter } from "react-native-bluetooth-escpos-printer";
var { height, width } = Dimensions.get('window');
var _listeners = [];
var dateFormat = require('dateformat');
const base64Image = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA8FBMVEUAAABCQkJDQ0NFRUU/Pz9BQUFAQEBERERDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MAAAA0ZZMIAAAATnRSTlMAAAAAAAAAABWFz8JdBQFHt9OYIxSi/PBsBFHjvCSk/vJt5b7mo26h75ziIZkD1csRXvpziwvx+QadveRSSA3XF6r31DMPOSLWzMTZFgd4wftfAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAaBJREFUSMe11dlSwjAUgOE2WmUTQRBtBQVBREREQEVUFkHcz/s/jklbQ7YOhwtz2fzftJ1OTi0rWDaJxRPJ1A6xxEXSu5nsXo7Ylrpskt8vABwcuqIgG94RABRLmtgk+eMTugXliiAI8U7ZRaiqwvnrJUH7WnBRFfR5zsKeinoohN4XRHyeZc8F2RJ6SSh9KJReeCpH7QOh9st76L3/5lrPRf5c6wEaF039IlQvmYgXAL1aVxQk8D20YxQk1wDXHQpuGui+22Pv4FbK2L5/639Rt44TYY8WvEcKoUcJqUcIpV8ptN4Xd5H9vd5TMXiIBMOOoXe8x0igzJKgf6pB9JJmCaIXJkPYb6/oFYHoJYHqxXllo/qlcDxcz8VzE9lTkWInLoPuAZIjCrJrgPGEgtYaYDqgIFc07LwMTbNkNmfvQEpVbafbfzXMkvbCn622Lth50adP2BuEf740MVvwP4oi+LyShNArQphXgpB69v/jQppXXCi9IJR5FQqt50KbV74w9Ey8td4/etq8Sn1+TeeGngn3u5PW7myPJj/G/v/WL4DMswebZ4AxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA2LTI1VDA4OjQ0OjQ2KzA4OjAww1b9dwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNi0yNVQwODo0NDo0NiswODowMLILRcsAAAAASUVORK5CYII=";
import AsyncStorage from '@react-native-async-storage/async-storage';


const DATA = [
    {
        key: '1',
        name: 'VISA',
        p: require('../../assets/visa.jpg')

    },
    {
        key: '2',
        name: 'VISA',
        p: require('../../assets/visa.jpg')

    },
    {
        key: '3',
        name: 'VISA',
        p: require('../../assets/visa.jpg')

    },
    {
        key: '4',
        name: 'VISA',
        p: require('../../assets/visa.jpg')


    },
    {
        key: '5',
        name: 'VISA',
        p: require('../../assets/visa.jpg')

    },
    {
        key: '6',
        name: 'VISA',
        p: require('../../assets/visa.jpg')

    },
    {
        key: '7',
        name: 'VISA',
        p: require('../../assets/visa.jpg')

    }
];

const Card = (props) => {
    const dispatch = useDispatch();
    const [state, setState] = useState('');
    const [temp, setTemp] = useState();
    const [itemBtn, setItemBtn] = useState();
    const [loading, setLoading] = useState(true);
    const [pairedDs, setPairedDs] = useState([]);
    const [foundDs, setFoundDs] = useState([]);
    const [boundAddress, setBoundAddress] = useState('');
    const [bleOpend, setBleOpend] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [btn, setBtn] = useState(0);
    const [payName, setPayName] = useState('');
    const [payment, setPayment] = useState([]);
    const { loc_id, stf_id, total_dis, customer_id, printer_address, order_dynamic } = useSelector((state) => state.root.main);

    const Save = () => {

        let params = {
            total: props.total,
            loc_id: loc_id,
            stf_id: stf_id,
            Data: props.D,
            method: 'Cash',
            card_type: 'Visa',
            total_dis: total_dis,
            c_id: parseInt(customer_id.map(i => i.id)),
        };

        APIHandler.hitApi(Takeaway_Order, 'POST', params).then(res => console.log("Takeaway order done=========", res));


    };


    const [printer_Recipet, setPrinter_Recipet] = useState();
    useEffect(async () => {


        let mounted = true
        if (mounted) {
            setLoading(false);
            BluetoothManager.isBluetoothEnabled().then((enabled) => {
                // this.setState({
                //     bleOpend: Boolean(enabled),
                //     loading: false
                // })
                setBleOpend(Boolean(enabled));
                setLoading(false);
            }, (err) => {
                err
            });


            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp) => {
                    _deviceAlreadPaired(rsp)
                }));
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
                    _deviceFoundEvent(rsp)
                }));
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_CONNECTION_LOST, () => {
                    // this.setState({
                    //     name: '',
                    //     boundAddress: ''
                    // });
                    setName('');
                    setBoundAddress('');
                }
            ));
            _listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
                    ToastAndroid.show("Device Not Support Bluetooth !", ToastAndroid.LONG);
                }
            ))


            let params = {
                Loc_id: loc_id,
            };

            APIHandler.hitApi(Printer_Recipet, 'POST', params).then(response => {
                setPrinter_Recipet(response);
                console.log("Printer Recipet Response", printer_Recipet);
            });

            let PrinterAddress = await AsyncStorage.getItem('PrinterAddress');
            // console.log("PRINTER ADDRESS IS =", PrinterAddress);
            dispatch(SetPrinter_Address(PrinterAddress));

            _scan();
        }

        return function cleanup() {
            mounted = false
        }
    }, []);

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
                if (i.address == printer_address) {
                    setLoading(true);
                    BluetoothManager.connect(printer_address)
                        .then((s) => {

                            setLoading(false);
                            setBoundAddress(printer_address);
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
        else {
            console.log("Not Connected");
        }
    }
    const _deviceFoundEvent = (rsp) => {//alert(JSON.stringify(rsp))
        var r = null;
        try {
            if (typeof (rsp.device) == "object") {
                r = rsp.device;
            } else {
                r = JSON.parse(rsp.device);
            }
        } catch (e) {//alert(e.message);
            //ignore
        }
        //alert('f')
        if (r) {
            let found = foundDs || [];
            if (found.findIndex) {
                let duplicated = found.findIndex(function (x) {
                    return x.address == r.address
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
    }
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

    const Printer = async () => {

        //data.map(async j => {
        // console.log("Ahsan Naeem: Item Name")
        //})

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
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                await BluetoothEscposPrinter.printText("-----------------------------------------------\r\n", {});
                await BluetoothEscposPrinter.printText("Order No: 01    ", {});
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.RIGHT);

                await BluetoothEscposPrinter.printText("Date & Time: " + (dateFormat(new Date(), "yyyy-mm-dd h:MM:ss")) + "\r\n", {});

                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                await BluetoothEscposPrinter.printText("-----------------------------------------------\r\n", {});
                await BluetoothEscposPrinter.printText("\r\n", {});
                let columnWidths = [30, 8, 10];
                await BluetoothEscposPrinter.printColumn(columnWidths,
                    [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                    ['Name', 'Qty', 'Price'], {});
                await BluetoothEscposPrinter.printText("\r\n", {});
                props.D.map(async j => {
                    await BluetoothEscposPrinter.printColumn(columnWidths,
                        [BluetoothEscposPrinter.ALIGN.LEFT, BluetoothEscposPrinter.ALIGN.CENTER, BluetoothEscposPrinter.ALIGN.RIGHT],
                        [(j.item), (j.qty), (j.p)], {});
                    await BluetoothEscposPrinter.printText("\r\n", {});
                });
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                await BluetoothEscposPrinter.printText("-----------------------------------------------\r\n", {});
                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.RIGHT);
                await BluetoothEscposPrinter.printText("Subtotal: $" + p, {});
                await BluetoothEscposPrinter.printText("\r\n", {});
                await BluetoothEscposPrinter.printText("Discount: $" + d, {});
                await BluetoothEscposPrinter.printText("\r\n", {});
                await BluetoothEscposPrinter.printText("Total: $" + (p - d), {});
                await BluetoothEscposPrinter.printText("\r\n", {});


                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                await BluetoothEscposPrinter.printText("-----------------------------------------------\r\n", {});
                await BluetoothEscposPrinter.printText("Terms & Conditions" + i.Footer + "\r\n", {});


                Paper_Cut();

            } catch (e) {
                alert(e.message || "ERROR");
            }
        })




    }

    const Paper_Cut = async () => {

        try {
            await BluetoothEscposPrinter.printPic(base64Image, { width: 1, left: 1 });
            await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});
            await BluetoothEscposPrinter.openDrawer(0, 250, 250);

        } catch (e) {
            alert(e.message || "ERROR")
        }
        return (
            <View>
                <Image style={{ width: 1, height: 1 }} source={{ uri: "data:image/jpeg;base64," + base64Image }} />
            </View>
        );

    }


    useEffect(() => {

        let mounted = true;

        if (mounted) {

            let param = {
                loc_id: loc_id,
                b_id: 3,
            };


            APIHandler.hitApi(PAYMENT_METHOD, 'POST', param).then(response => {
                let Res = response;
                setPayment(response);
                console.log('discount check++++++++++', response)
            });
        }

        return function cleanup() {
            mounted = false;
        }

    }, []);

    return (


        <>
            {state == 'Pay' ? <Pay
                btnDisTot={props.btnDisTot} disTotal={props.disTotal} checkPaymode={props.checkPaymode}
                total={props.total} pay={props.pay} call={props.call} itemName={props.itemName} itemPrice={props.itemPrice} ExtCallback={props.ExtCallback} ExtCallback1={props.ExtCallback1} product_id={props.product_id} btn={props.btn} variantCallback={props.variantCallback} reload={props.reload} addNewItem={props.addNewItem} branch={props.branch} Cat_id={props.Cat_id}

                refresh={props.refresh} T_order_sum={props.T_order_sum} pass='Payable' Cat_id={props.Cat_id} D={props.D} branch={props.branch} table_id={props.t_id} count={props.member} userid={props.userid} reload={props.reload} addNewItem={props.addNewItem} empty={props.empty} callback={props.Call} func={props.function} Statename={props.statename} T_order_id={props.T_order_id} table_pass={props.table_pass} total={props.total} OrgTotal={props.pay}
            />
                :
                state == 'Visa' ? <Visa pay={props.pay}
                    checkPaymode={props.checkPaymode} call={props.call} itemName={props.itemName} itemPrice={props.itemPrice} ExtCallback={props.ExtCallback} ExtCallback1={props.ExtCallback1} product_id={props.product_id} btn={props.btn} variantCallback={props.variantCallback} reload={props.reload} addNewItem={props.addNewItem} branch={props.branch} Cat_id={props.Cat_id}
                    btnDisTot={props.btnDisTot} disTotal={props.disTotal} count={props.member} OrgTotal={props.pay} reload={props.reload} refresh={props.refresh} img={temp} total={props.total} data={props.D} empty={props.empty} Statename={props.Statename} table_id={props.t_id} T_order_id={props.T_order_id} table_pass={props.table_pass} T_order_sum={props.T_order_sum}
                />
                    : <>
                        <View style={{ borderLeftWidth: 1, borderColor: 'gray', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: hp('73.2%'), width: wp('44.2%') }}>

                            <View style={{ marginTop: hp('10%'), height: hp('10%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ alignSelf: 'center', fontSize: wp('1.5%'), fontWeight: '700', color: 'black' }}>Payment mode</Text>
                            </View>


                            <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center', alignContent: 'center', height: hp('45%'), width: wp('30%') }}>
                                <FlatGrid
                                    showsVerticalScrollIndicator={false}
                                    // itemDimension={100}
                                    data={payment}
                                    style={styles.gridView}
                                    staticDimension={115}
                                    // fixed
                                    numColumns={3}
                                    spacing={25}
                                    // keyExtractor={item.key}
                                    renderItem={({ item }) => (
                                        <>

                                            <TouchableOpacity style={{ marginTop: hp('2.5%'), alignItems: 'center', backgroundColor: '#ECECEC', borderRadius: 3, width: wp('8%'), height: hp('10%'), justifyContent: 'center' }} onPress={() => {
                                                setItemBtn(item.key);
                                                setBtn(1);
                                                setTemp(item.p);
                                                setPayName(item.name);
                                                console.log('selected item id', btn)
                                            }}>
                                                {/* {itemBtn == item.key ? <Image source={require('../../assets/red-tick.png')} style={{ marginLeft: wp('6.5%'), marginTop: hp('-6%'), marginBottom: hp('1.8%'), height: hp('4.8%'), width: wp('3%') }} /> : null} */}
                                                <Text style={{ fontWeight: '700', fontSize: wp('0.8%'), color: 'black' }}>{item.name}</Text>
                                            </TouchableOpacity>

                                        </>
                                    )}
                                />
                            </View>
                            <View style={{ backgroundColor: '#ECECEC', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: hp('10%'), width: wp('44%') }}>
                                <Text style={{ color: 'gray', fontSize: wp('1%'), fontWeight: '700' }}>Selected Option:       </Text>
                                <Text style={{ color: 'black', fontSize: wp('1%'), fontWeight: '700' }}>{payName}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: hp('12.5%'), width: wp('44.2%') }}>
                            <TouchableOpacity style={{ alignItems: 'center', borderWidth: 1, marginRight: wp('1%'), borderRadius: 5, justifyContent: 'center', height: hp('7.5%'), width: wp('13%') }} onPress={() => setState('Pay')} >
                                <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: '#FC3F3F' }}>Back</Text>
                            </TouchableOpacity>

                            <TouchableOpacity disabled={btn == 0 ? true : false} onPress={() => {
                                // setState('Visa');
                                setModalVisible(true);

                            }} style={{ backgroundColor: btn == 0 ? 'gray' : '#FC3F3F', alignItems: 'center', borderRadius: 5, justifyContent: 'center', height: hp('7.5%'), width: wp('20%') }} >

                                <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: 'white' }}>Confirm Payment</Text>
                            </TouchableOpacity>
                        </View>

                        <Modal
                            animationType="fade"

                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {

                                setModalVisible(!modalVisible);
                            }}
                        >

                            <View style={styles.modalView}>
                                <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: wp('1%'), marginTop: hp('2%') }} onPress={() => setModalVisible(false)}>
                                    <Image source={require('../../assets/cross2.png')} resizeMode="contain" style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>


                                <View style={{ justifyContent: 'center', alignItems: 'center', marginRight: wp('1%'), marginTop: hp('1%'), alignSelf: 'center', width: wp('11%'), height: hp('20%') }} >
                                    <Image source={require('../../assets/order.png')} resizeMode="contain" style={{ width: wp('20%'), height: hp('20%') }} />
                                </View>
                                <Text style={{ fontSize: wp('1.4%'), marginTop: hp('2%'), fontWeight: 'bold', color: '#8D8D8D' }}>ORDER SUCCESSFULL</Text>

                                <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1, width: '98%' }}>
                                    <TouchableOpacity style={{ backgroundColor: 'red', width: wp('15.5%'), height: hp('8%'), marginBottom: hp('2%'), borderRadius: 4, justifyContent: 'center' }}
                                        onPress={() => {
                                            setModalVisible(false);
                                            Printer();
                                            Save();
                                            props.empty();
                                            props.refresh();
                                            dispatch(SetOrder_Dynamic(order_dynamic + 1));
                                        }}>
                                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.3%'), fontWeight: 'bold' }}>NEXT ORDER</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>

                        </Modal>
                    </>
            }

        </>
    );
}


export default Card;

const styles = {

    modalView: {
        marginTop: '12%',
        backgroundColor: "white",
        borderRadius: 20,
        height: hp('50%'),
        width: '20%',
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