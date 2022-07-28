import React, { useState } from 'react';
import { Image, Modal, ScrollView, Text, TouchableOpacity, View, DeviceEventEmitter, Dimensions } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { SetPrinter_Address } from '../../Redux/Reducers/mainReducer';
import APIHandler from '../../utils/APIHandler';
import { Dine_in_pay_later, Table_res, Takeaway_Order, Printer_Recipet } from '../../utils/urls';
import Card from './Card';
import Cash from './Cash';
import { BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter } from "react-native-bluetooth-escpos-printer";
var { height, width } = Dimensions.get('window');
var _listeners = [];
var dateFormat = moment();       
const base64Image = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA8FBMVEUAAABCQkJDQ0NFRUU/Pz9BQUFAQEBERERDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MAAAA0ZZMIAAAATnRSTlMAAAAAAAAAABWFz8JdBQFHt9OYIxSi/PBsBFHjvCSk/vJt5b7mo26h75ziIZkD1csRXvpziwvx+QadveRSSA3XF6r31DMPOSLWzMTZFgd4wftfAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAaBJREFUSMe11dlSwjAUgOE2WmUTQRBtBQVBREREQEVUFkHcz/s/jklbQ7YOhwtz2fzftJ1OTi0rWDaJxRPJ1A6xxEXSu5nsXo7Ylrpskt8vABwcuqIgG94RABRLmtgk+eMTugXliiAI8U7ZRaiqwvnrJUH7WnBRFfR5zsKeinoohN4XRHyeZc8F2RJ6SSh9KJReeCpH7QOh9st76L3/5lrPRf5c6wEaF039IlQvmYgXAL1aVxQk8D20YxQk1wDXHQpuGui+22Pv4FbK2L5/639Rt44TYY8WvEcKoUcJqUcIpV8ptN4Xd5H9vd5TMXiIBMOOoXe8x0igzJKgf6pB9JJmCaIXJkPYb6/oFYHoJYHqxXllo/qlcDxcz8VzE9lTkWInLoPuAZIjCrJrgPGEgtYaYDqgIFc07LwMTbNkNmfvQEpVbafbfzXMkvbCn622Lth50adP2BuEf740MVvwP4oi+LyShNArQphXgpB69v/jQppXXCi9IJR5FQqt50KbV74w9Ey8td4/etq8Sn1+TeeGngn3u5PW7myPJj/G/v/WL4DMswebZ4AxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA2LTI1VDA4OjQ0OjQ2KzA4OjAww1b9dwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNi0yNVQwODo0NDo0NiswODowMLILRcsAAAAASUVORK5CYII=";
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const Visa = (props) => {
    const [state, setState] = useState('');
    const [modal, setModal] = useState(false);
    const dispatch = useDispatch();
    const [pairedDs, setPairedDs] = useState([]);
    const [foundDs, setFoundDs] = useState([]);
    const [boundAddress, setBoundAddress] = useState('');
    const [bleOpend, setBleOpend] = useState(false);

    const { loc_id, stf_id, total_dis, customer_id, printer_address } = useSelector((state) => state.root.main);
    // console.log(props.Statename)
    // console.log('empty function ka matlab hai', props.Empty)
    const Save = () => {

        let params = {
            total: props.total,
            loc_id: loc_id,
            stf_id: stf_id,
            Data: props.data,
            method: 'Card',
            total_dis: total_dis,
            card_type: 'Visa',
            c_id: parseInt(customer_id.map(i => i.id)),
        };

        APIHandler.hitApi(Takeaway_Order, 'POST', params).then(res => console.log("response is = ", res));
        console.log("Takeaway order done")

    };

    const fun = () => {

        let param = {
            total: props.total,
            c_id: parseInt(customer_id.map(i => i.id)),
            loc_id: loc_id,
            t_id: props.table_id,
            mem: props.count,
            stf_id: stf_id,
            Data: props.data,
            method: 'Card',
            card_type: 'Visa',
            total_dis: total_dis,
        };

        APIHandler.hitApi(Table_res, 'POST', param).then(response => console.log(response));


        console.log("Table order done",)

    }

    const Dine_in_pay_late = (id, sum) => {

        let params = {
            id: parseInt(id),
            total: parseInt(sum),
            method: 'Card',
            card_type: 'Visa',
        };

        APIHandler.hitApi(Dine_in_pay_later, 'POST', params).then(response => console.log("Dine_in_pay_later is Done===== ", response));


        console.log("Dine_in_pay_later is Done", props.T_order_id, props.T_order_sum)

    }

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
        //   console.log("Ahsan Naeem: Item Name: ",j.item," Qty: ",j.qty," price: ",j.p);
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
                props.data.map(async j => {
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


        } catch (e) {
            alert(e.message || "ERROR")
        }
        return (
            <View>
                <Image style={{ width: 1, height: 1 }} source={{ uri: "data:image/jpeg;base64," + base64Image }} />
            </View>
        );

    }

    return (
        <>
            {state == 'Card' ? <Card
                pay={props.pay} checkPaymode={props.checkPaymode} call={props.call} itemName={props.itemName} itemPrice={props.itemPrice} ExtCallback={props.ExtCallback} ExtCallback1={props.ExtCallback1} product_id={props.product_id} btn={props.btn} variantCallback={props.variantCallback} reload={props.reload} addNewItem={props.addNewItem} branch={props.branch} Cat_id={props.Cat_id}

                btnDisTot={props.btnDisTot} disTotal={props.disTotal} member={props.count} t_id={props.table_id} total={props.total} pay={props.OrgTotal} empty={props.empty} refresh={props.refresh} D={props.data} /> : state == 'Cash' ? <Cash pass='Pager' />
                :
                <>

                    <ScrollView>


                        <TouchableOpacity onPress={() => setState('Visa')} style={{ alignSelf: 'center', marginTop: '10%' }}>
                            <View style={{ borderRadius: 3, borderWidth: 1, borderColor: 'red', padding: 1, width: wp('22%'), height: hp('40%'), justifyContent: 'center' }}>
                                <Image source={props.img} style={{ width: 80, height: 80, alignSelf: 'center' }} resizeMode="contain" />
                            </View>
                        </TouchableOpacity>

                        <Text style={{ fontSize: wp('1.5%'), alignSelf: 'center', marginTop: hp('2%'), color: 'red' }}>Total: $
                            {parseFloat(props.total).toFixed(2)}
                            {/* {props.total} */}
                        </Text>


                        <View style={{ flex: 1, marginTop: hp('5%') }}>
                            {props.Statename == 'Takeway' ?
                                <TouchableOpacity style={{ backgroundColor: '#FC3F3F', borderRadius: 5, width: wp('35%'), alignSelf: 'center', height: hp('10%'), justifyContent: 'center' }}
                                    onPress={() => {
                                        setModal(true);
                                        Save();

                                        console.log("Table_order_detail_API _RUN_in_Takeaway");
                                    }}>
                                    <Text style={{ fontSize: wp('1.5%'), fontWeight: '700', alignSelf: 'center', color: 'white' }}>PAY</Text>
                                </TouchableOpacity>

                                :

                                props.Statename == 'Main' ?
                                    <>
                                        {props.table_pass == 'table' ?

                                            <TouchableOpacity style={{ backgroundColor: '#FC3F3F', borderRadius: 5, width: wp('35%'), alignSelf: 'center', height: hp('10%'), justifyContent: 'center' }}
                                                onPress={() => {
                                                    Dine_in_pay_late(props.T_order_id, props.T_order_sum);
                                                    setModal(true);
                                                }}>
                                                <Text style={{ fontSize: wp('1.5%'), fontWeight: '700', alignSelf: 'center', color: 'white' }}>PAY</Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity style={{ backgroundColor: '#FC3F3F', borderRadius: 5, width: wp('35%'), alignSelf: 'center', height: hp('10%'), justifyContent: 'center' }}
                                                onPress={() => {
                                                    setModal(true);
                                                    fun();
                                                    console.log("Table_order_detail_API _RUN_in_Dinning");
                                                }}>
                                                <Text style={{ fontSize: wp('1.5%'), fontWeight: '700', alignSelf: 'center', color: 'white' }}>PAY</Text>
                                            </TouchableOpacity>
                                        }
                                    </>
                                    : <TouchableOpacity style={{ backgroundColor: '#FC3F3F', borderRadius: 5, width: wp('30%'), alignSelf: 'center', height: hp('10%'), justifyContent: 'center' }}
                                        onPress={() => {
                                            setModal(true);
                                            fun();
                                        }}>
                                        <Text style={{ fontSize: wp('1.5%'), fontWeight: '700', alignSelf: 'center', color: 'white' }}>PAY</Text>
                                    </TouchableOpacity>}




                            <TouchableOpacity style={{ marginTop: hp('2%'), backgroundColor: 'white', borderColor: '#FC3F3F', borderWidth: 1, borderRadius: 5, width: wp('30%'), alignSelf: 'center', height: hp('10%'), justifyContent: 'center' }} onPress={() => setState('Card')} >
                                <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), alignSelf: 'center', color: '#FC3F3F' }}>Back</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>


                    <Modal
                        animationType="fade"

                        transparent={true}
                        visible={modal}
                        onRequestClose={() => {

                            setModal(!modal);
                        }}
                    >

                        <View style={styles.modalView}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: wp('1%'), marginTop: hp('1%') }} onPress={() => setModal(false)}>
                                <Image source={require('../../assets/cross2.png')} resizeMode="contain" style={{ width: wp('3.5%'), height: hp('3.5%') }} />
                            </TouchableOpacity>

                            <View style={{ marginTop: hp('3%'), justifyContent: 'center', alignItems: 'center', width: wp('25%'), height: hp('40%') }}
                                onPress={() => setModal(false)}>
                                <Image source={require('../../assets/confirm.jpg')} resizeMode="contain" style={{ width: wp('33%'), height: hp('33%'), }} />

                            </View>

                            <Text style={{ fontSize: wp('1.5%'), marginTop: '5%', color: 'gray' }}>PAYMENT SUCCESSFUL</Text>

                            <View style={{ justifyContent: 'flex-end', flex: 1, width: '80%' }}>
                                <TouchableOpacity style={{ marginBottom: hp('2%'), backgroundColor: '#FC3F3F', borderRadius: 5, width: wp('30%'), alignSelf: 'center', height: hp('10%'), justifyContent: 'center' }}
                                    onPress={() => {
                                        setModal(false);
                                        props.empty();
                                        props.refresh();
                                    }}>
                                    <Text style={{ fontSize: wp('1.5%'), color: 'white', alignSelf: 'center' }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </Modal>

                </>
            }
        </>
    );
}

export default Visa;

const styles = {

    modalView: {
        marginTop: hp('7%'),
        backgroundColor: "white",
        borderRadius: 20,
        height: hp('80%'),
        width: wp('35%'),
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