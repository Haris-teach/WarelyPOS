import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    FlatList, Image, Modal, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View,
    ActivityIndicator,
    Platform,
    StyleSheet,

    Button,

    DeviceEventEmitter,
    NativeEventEmitter,

    Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Switch } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPrint from 'react-native-print';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import CustomActivityIndicator from "../../components/generic/CustomActivityIndicator";
import { SetC_Screen, SetDis2, SetSelect, SetTotal2, SetTotal_dis, SetScreenSwitch, SetALLData, SetPrinter_Address } from '../../Redux/Reducers/mainReducer';
import APIHandler from '../../utils/APIHandler';
import { CALLBACK_2ND_SCREEN, Get_Tables, Print_Slip, PRODUCT_CAT, Re_phone, Table_Close, TABLE_DETAIL, Table_res, Takeaway_Order, MODIFIRES, Printer_Recipet } from '../../utils/urls';
import Burger from './Burger';
import MainDashborad from '../Dinning';
import Extras from './Extras';
import Pay from './Pay';
import Profile from '../Profile';
import Takeway from '../Takeway';
import SwitchButton from 'switch-button-react-native';
import Dinelogin from '../../components/Dinelogin';
import App from '../../Printer/App';
import index from '../../Printer/index';
import { BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter } from "react-native-bluetooth-escpos-printer";
import Reservation from './Reservation';


var sr = 0;
var TotalSum = 0;
var price = '';
var tableNames = "";
var tableIds = "";
var paxUpd = '';
var counter = 0;
var sub_Sum = 0;
var total_discount = 0;
var Product_id = 0;


var _listeners = [];
var dateFormat = require('dateformat');
const base64Image = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA8FBMVEUAAABCQkJDQ0NFRUU/Pz9BQUFAQEBERERDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MAAAA0ZZMIAAAATnRSTlMAAAAAAAAAABWFz8JdBQFHt9OYIxSi/PBsBFHjvCSk/vJt5b7mo26h75ziIZkD1csRXvpziwvx+QadveRSSA3XF6r31DMPOSLWzMTZFgd4wftfAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAaBJREFUSMe11dlSwjAUgOE2WmUTQRBtBQVBREREQEVUFkHcz/s/jklbQ7YOhwtz2fzftJ1OTi0rWDaJxRPJ1A6xxEXSu5nsXo7Ylrpskt8vABwcuqIgG94RABRLmtgk+eMTugXliiAI8U7ZRaiqwvnrJUH7WnBRFfR5zsKeinoohN4XRHyeZc8F2RJ6SSh9KJReeCpH7QOh9st76L3/5lrPRf5c6wEaF039IlQvmYgXAL1aVxQk8D20YxQk1wDXHQpuGui+22Pv4FbK2L5/639Rt44TYY8WvEcKoUcJqUcIpV8ptN4Xd5H9vd5TMXiIBMOOoXe8x0igzJKgf6pB9JJmCaIXJkPYb6/oFYHoJYHqxXllo/qlcDxcz8VzE9lTkWInLoPuAZIjCrJrgPGEgtYaYDqgIFc07LwMTbNkNmfvQEpVbafbfzXMkvbCn622Lth50adP2BuEf740MVvwP4oi+LyShNArQphXgpB69v/jQppXXCi9IJR5FQqt50KbV74w9Ey8td4/etq8Sn1+TeeGngn3u5PW7myPJj/G/v/WL4DMswebZ4AxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA2LTI1VDA4OjQ0OjQ2KzA4OjAww1b9dwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNi0yNVQwODo0NDo0NiswODowMLILRcsAAAAASUVORK5CYII=";

const SubTakeway = (props) => {
    const dispatch = useDispatch();
    // const [modalPax, setModalPax] = useState(false);
    const [disTot, setDisTot] = useState();
    const [totDis, setTotDis] = useState();
    const [response, setResponse] = useState();
    const [btn, setBtn] = useState('');
    const [mBtn, setMBtn] = useState('All Categories');
    const [modalPax1, setModalPax1] = useState(false);
    const [paxCount1, setPaxCount1] = useState(1);
    const { select, c_Screen, stf_id, loc_id, printer_address } = useSelector((state) => state.root.main);
    const [notFound, setNotFound] = useState();
    const [paxCount, setPaxCount] = useState(1);
    const [cBtn, setCBtn] = useState(0);
    const [extras, setExtras] = useState(0);
    const [details, setDetails] = useState();
    const [contactDetails, setContactDetails] = useState([]);
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [modalVisible, setModalVisible] = useState(false);
    const [productItem, setProductItem] = useState({});
    const [variantArray, setVariantArray] = useState([]);
    const [isLoad, setLoad] = useState(false);
    const [state, setState] = useState('sub');
    const [loading, setLoading] = useState(true);
    const [printer_Recipet, setPrinter_Recipet] = useState();
    const [i, setI] = useState(1);
    const [p, setP] = useState(0);
    const [d, setD] = useState(0);
    const [value, setValue] = useState('1');
    const [data, setData] = useState();
    const [cat_id, setCat_id] = useState(0);
    const [slip, setSlip] = useState('');
    const [di, setDi] = useState(0);
    const [nameState, setNameState] = useState('');
    // const or_Id = props.orID;
    const navigation = useNavigation();
    const [array, setArray] = useState([]);
    const [order, setOrder] = useState();
    const [cat, setCat] = useState();
    const count = props.Count;
    const br = props.br;
    const contact_id = 0;
    const [currentTime, setCurrentTime] = useState('');
    const [discount, setDiscount] = useState(0);
    const [ext, setExt] = useState();
    var svc = 0;
    var gst = 0;
    var Item_sum = 0;
    const Id = props.userId;
    // var Total = p + svc + gst;
    // const [total_b , setTotal_b] = useState(0);
    // '3F:34:32:3D:41:2C'

    const [table_order_detail, setTable_order_detail] = useState({ "arr": [{ "id": 503, "mem": 1, "payment_status": "Paid", "table": "T2", "table_id": "4", "total": "800.00", "sum": 30 }], "arry2": [{ "id": 402, "name": "pizza 2 Large", "quantity": 1, "unit_price": "800.00" }] });
    const [devices, setDevices] = useState(null);
    const [pairedDs, setPairedDs] = useState([]);
    const [foundDs, setFoundDs] = useState([]);
    const [bleOpend, setBleOpend] = useState(false);
    // const [loading, setLoading] = useState(true);
    const [boundAddress, setBoundAddress] = useState('');
    const [debugMsg, setdebugMsg] = useState('');
    const [state1, setState1] = useState(1);
    const [name, setName] = useState('');
    const [modal, setModal] = useState(false);
    const [dis, setDis] = useState(0);
    const [phone, setPhone] = useState('');
    const [show_modal, setShow_modal] = useState(false);
    const [show_m, setShow_m] = useState(false);
    const [modalPax, setModalPax] = useState(false);
    const [extVal, setExtVal] = useState();
    const [itemName, setItemName] = useState();
    const [itemPrice, setItemPrice] = useState();
    const [dinelogin, setDinelogin] = useState(true);


    const counterAdd = () => {

        counter = counter + 1;
        // console.log('dot ki value', counter);
    }

    // console.log("oye", contactDetails.map(i => i.id))
    const increment = () => {
        return (
            setPaxCount(paxCount + 1)
        );
    }

    const decrement = () => {
        return (
            setPaxCount(paxCount - 1)
        );
    }

    const mapAndJoin = (arr, key) => {
        return arr.map(function (o) {
            return o[key];
        }).join();
    }

    const CBDisTotal = (v) => {
        setTotDis(v);

    }
    const CBTotalDis = (b) => {
        setDisTot(b)
    }



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
                data.map(async j => {
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


    useEffect(async () => {
        let mounted = true
        if (mounted) {
            setLoading(true)
            if (props.mergedTables) {
                const mergedTables = props.mergedTables;

                tableNames = mapAndJoin(mergedTables, 'table');
                tableIds = mapAndJoin(mergedTables, 'key');
                // console.log("table_name=====", tableNames);

            }
            let params = {
                mob_no: phone,
            };

            APIHandler.hitApi(Re_phone, 'POST', params).then(response => setContactDetails(response));

            let userI = await AsyncStorage.getItem('opid');
            // console.log("++++++++++++++++okay", userI);
            if (userI == 'okay') {
                setDinelogin(false);
                // console.log("++++++++++++++++");
            }
        }
        return function cleanup() {
            mounted = false
        }

    }, []);

    const reload = (s) => {
        setLoading(!loading)
        if (s == 'Main' || s == 'Takeway') {
            setState(s);
        }
        else {
            return null;
        }
    }

    const contains = (object) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].item === object.item) {
                return i;
            }
        }

        return -1;
    }

    const DineLogin = () => {
        setDinelogin(false);
    }

    const [product_id, setProduct_id] = useState(15);
    const AdditionalItems = (i) => {
        const obj = { 'name': name, 'price': price, 'pax': paxCount, 'mode_id': btn, 'product_id': product_id };
        let localArr = [...array];
        let additems = localArr[i].additem;
        let TotalItemSum = localArr[i].TotalSum;
        additems.push(obj);
        TotalItemSum = TotalItemSum + (parseFloat(price) * paxCount);
        localArr[i].TotalSum = TotalItemSum;
        localArr[i].additem = additems;
        setArray(localArr);
        setData[[...array]];

        let params = {
            data: [...array],
            count: 0,
            SubTotal: 0,
            Total: 0,
            discount: 0,
        };

        APIHandler.hitApi(CALLBACK_2ND_SCREEN, 'POST', params).then(response => {
            // console.log("2nd Screen ===", response);
            dispatch(SetC_Screen(!c_Screen));



        });

    }

    const [modi, setModi] = useState();

    const addNewItem = (name, price, Dis, id, Var, a) => {
        sr = sr + 1;
        const obj = { 'key': i, 'sr': sr, 'item': name, 'p': price, 'price': price, 'dis': '+', 'qty': value, "id": id, 'var_id': Var, 'total_dis': 0, 'dis_sign': '', 'additem': a, 'color': 'white', 'TotalSum': 0 };

        let check = contains(obj);
        a.map(i => {
            //console.log("Modi Array data is =", i.price, i.pax);
            obj.p = parseInt(obj.p) + parseInt(i.pr);
        })


        if (check !== -1) {
            // console.log("Addtitinal items", array[check].additem);
            array[check].qty = parseInt(array[check].qty) + 1;
            sr = sr - 1;
            setP(p + parseInt(price));
            setArray([...array]);

            dispatch(SetTotal2(p + parseInt(price)));
            if (array[check].dis_sign == '$') {
                array[check].p = parseInt(array[check].p) + parseInt(array[check].price) - parseInt(array[check].dis);
            }
            else if (array[check].dis_sign == '%') {

                array[check].p = parseFloat(array[check].p) + parseFloat(array[check].price) - ((parseFloat(array[check].dis) / 100) * parseFloat(array[check].price));
                // console.log("Discount  is =", ((parseFloat(array[check].dis) / 100) * parseInt(array[check].price)))
            }
            else {
                array[check].p = parseInt(array[check].p) + parseInt(array[check].price);
            }




            Calculation(array);

        } else {


            // let TotalItemSum = obj.TotalSum;

            let sum = 0;
            // let loop = obj.additem;
            obj.additem.forEach((item) => {
                // TotalItemSum = TotalItemSum + (parseFloat(item.price) * item.pax);
                // obj.TotalSum = TotalItemSum;
                // obj.TotalSum = obj.TotalSum + parseInt(item.Price * item.pax);

                // modisum = modisum + parseInt(item.Price * item.pax);



                sum = sum + parseInt(item.price * item.pax);
                obj.TotalSum = sum;

            })

            //  console.log("Show ho ja dubara =====", obj.TotalSum);







            setP(p + parseInt(price) + sum);
            // setD(d + parseInt(Dis));
            array.push(obj);
            reload();
            setI(i + 1);
            setData([...array]);
            setDi(Dis);
            dispatch(SetTotal2(p + parseInt(price)));
            dispatch(SetDis2(d + parseInt(Dis)));
            Calculation(array);
            Product_id = id;
            let params = {
                data: [...array],
                count: 0,
                SubTotal: 0,
                Total: 0,
                discount: 0,
            };

            APIHandler.hitApi(CALLBACK_2ND_SCREEN, 'POST', params).then(response => {
                // console.log("2nd Screen ===", response);
                dispatch(SetC_Screen(!c_Screen));



            });
        }

    };

    const newArray = (Id, pr, Dis) => {
        let index = array.indexOf(item => item.key == Id)
        array.splice(index, 0);

        setP(p - pr);
        setArray(array.filter(item => item.key != Id));

        //  console.log("New Array is ===", array.filter(item => item.key != Id))


        // setP(p - pr);
        // setD(d - parseInt(Dis));
        dispatch(SetTotal2(p - pr));
        dispatch(SetDis2(d - parseInt(Dis)));
        // setMounted(true);
        let params = {
            data: array.filter(item => item.key != Id),
            count: 0,
            SubTotal: 0,
            Total: 0,
            discount: 0,
        };

        APIHandler.hitApi(CALLBACK_2ND_SCREEN, 'POST', params).then(response => {
            //("2nd Screen ===", response);
            dispatch(SetC_Screen(!c_Screen));



        });
        Calculation(array.filter(item => item.key != Id));
    }

    const Empty = () => {
        setModalPax1(false);
        setPaxCount(1);
        setState('Main');
        setP(0);
        sr = 0;
        svc = 0;
        gst = 0;
        setD(0);
        setArray([]);
        setLoading(!loading);
        dispatch(SetSelect('Burger'));
        setDiscount(0);
        setDis(0);
        setValue(1);
        setTotal_dis(0);
        dispatch(SetTotal2(0));
        dispatch(SetDis2(0));
        setIsSwitchOn(false);
        total_discount = 0;
        c = 0;
        let params = {
            count: 2,
            SubTotal: 0,
            Total: 0,
            discount: 0,

        };

        APIHandler.hitApi(CALLBACK_2ND_SCREEN, 'POST', params).then(response => {
            // console.log("2nd Screen ===", response);
            dispatch(SetC_Screen(!c_Screen));


        });

    }

    const sendPhone = () => {

        let params = {
            mob_no: phone,
        };

        APIHandler.hitApi(Re_phone, 'POST', params).then(response => setContactDetails(response));
        // console.log(contactDetails);


    };

    const Table_order = () => {
        let param = {
            Loc_id: br
        };
        APIHandler.hitApi(Get_Tables, 'POST', param).then(response => console.log("Table API Response", response))

    };

    useEffect(() => {
        let mounted = true
        if (mounted) {
            setLoading(true);
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes

            setCurrentTime(
                hours + ':' + min
            );

            setArray(array);

            let param = {
                Data: data,
                Total: p,
                Dis: d,
            };

            APIHandler.hitApi(Print_Slip, 'POST', param).then(response => setSlip(response));
            setLoad(true);
            let params = {
                order_id: props.T_order_id
                // order_id: null
            };



            APIHandler.hitApi(TABLE_DETAIL, 'POST', params).then(response => {
                setTable_order_detail(response);

                console.log("TABLE ORDER DETAIL", response);
                setLoad(false);
                let res = response.arry2;
                setOrder_Id(props.T_order_id);
                console.log("TABLE ORDER ID is =", order_Id);
                // { 'name': i.modi_name, 'price': i.unit_price, 'pax': 1, 'mode_id': 3, 'product_id': i.id }
                var sum = 0;
                res.map(j => {
                    // const Modi_obj = { 'name': j.modi_name, 'price': j.unit_price, 'pax': 1, 'mode_id': 3, 'product_id': j.id };
                    const obj = { 'key': j.id, 'item': j.name, 'p': j.unit_price, 'dis': j.pro_dis, 'qty': j.quantity, "id": j.id, 'var_id': 11, 'total_dis': 0, 'dis_sign': j.pro_dis_type, 'additem': j.modi, 'color': j.color, 'TotalSum': j.TotalSum };
                    array.push(obj);
                    j.modi.map(k => {
                        sum = sum + parseInt(k.unit_price);
                    })
                    sum = sum + parseInt(j.quantity) * parseFloat(j.unit_price);


                })
                setP(p + sum);


            });



            let par = {
                b_id: 3,
            };

            APIHandler.hitApi(PRODUCT_CAT, 'POST', par).then(response => {
                setCat(response);
                console.log("Product Item==", response)

            });
        }

        return function cleanup() {
            mounted = false
        }


    }, []);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);




    const Callback = () => {
        dispatch(SetSelect('Burger'));
        setCat_id(0);
        setMBtn("All Categories");
    };



    const print = async printRemotePDF => {
        await RNPrint.print({ filePath: slip.url })
    }

    const Delete_Items = (i) => {
        let localArr = [...array];
        let localQuantity = localArr[i].qty;
        let localDiscount = localArr[i].dis;
        let localsing = localArr[i].dis_sign;
        let localSubtotal = (localQuantity * parseFloat(localArr[i].price));
        var rowPrice = parseInt(localArr[i].price) * localQuantity;
        sr = sr - 1;

        let Tot = localArr[i].TotalSum;



        // setP(p - parseFloat(localSubtotal) - Tot);
        // dispatch(SetTotal2(p - Tot - parseFloat(localSubtotal)));
        // console.warn("Array count is =", localArr.length());

        // localArr.forEach(element => {
        //     sr = element.sr;
        // });

        if (localDiscount == '+') {
            setD(d);
            dispatch(SetDis2(d));
        }
        else {

            if (localsing == '$') {
                setD(d - localDiscount);
                dispatch(SetDis2(d - localDiscount));
            }
            else {
                setD(d - (rowPrice * localDiscount / 100));
                dispatch(SetDis2(d - (rowPrice * localDiscount / 100)));
            }
        }
    };

    const concatinate = (v) => {


        if (select == 'cash') {

            let localArr = [...array];

            let localQuantity = localArr[selectedIndex].qty;

            if (v == 'del') {
                localQuantity = localQuantity.slice(0, -1);




            }
            else {
                if (v == '.') {
                    localQuantity = localQuantity;
                }

                else {
                    localQuantity = localQuantity + v;
                }



            }

            localArr[selectedIndex].qty = localQuantity;
            setValue(localQuantity);
            setArray(localArr);

            let params = {
                data: [...array],
                count: 0,
                SubTotal: 0,
                Total: 0,
                discount: 0,
            };

            APIHandler.hitApi(CALLBACK_2ND_SCREEN, 'POST', params).then(response => {
                // console.log("2nd Screen ===", response);
                dispatch(SetC_Screen(!c_Screen));

            });
        }
        else if (select == 'dis') {
            let localArr = [...array];
            let localDiscount = localArr[selectedIndex].dis;
            if (v == 'del') {
                localDiscount = localDiscount.slice(0, -1);

            }
            else {

                if (v == '.') {
                    localDiscount = localDiscount;
                }
                else {
                    localDiscount = localDiscount + v;
                }
            }

            localArr[selectedIndex].dis = localDiscount;
            setDis(localDiscount);
            let params = {
                data: [...array],
                count: 0,
                SubTotal: 0,
                Total: 0,
                discount: 0,
            };

            APIHandler.hitApi(CALLBACK_2ND_SCREEN, 'POST', params).then(response => {
                // console.log("2nd Screen ===", response);
                dispatch(SetC_Screen(!c_Screen));

            });

        }
        else {
            let word = phone;

            if (v == 'del') {
                word = word.slice(0, -1);
                setPhone(word);
                return;
            }
            else {
                word = word + v;
            }

            setPhone(word);
        }

    }

    const [total_dis, setTotal_dis] = useState(0);


    const item_Dis = () => {
        if (isSwitchOn == false) {

            let localArr = [...array];
            let localDiscount = localArr[selectedIndex].dis;
            let localQuantity = localArr[selectedIndex].qty;
            let localTotal_dis = localArr[selectedIndex].total_dis;
            let modifier_Sum = 0;

            localArr[selectedIndex].additem.map(i => {
                modifier_Sum = modifier_Sum + parseInt(i.pr);

            })



            let localDis_sign = localArr[selectedIndex].dis_sign;
            var RowPrice = parseInt(localArr[selectedIndex].price) * localQuantity - localDiscount;

            if (parseInt(localDiscount) > parseInt(localArr[selectedIndex].p - modifier_Sum)) {

                ToastAndroid.show("Discount is Greater then item price", ToastAndroid.SHORT)

                localArr[selectedIndex].dis = '0';
                setArray(localArr);
            }
            else {

                // setP(p + RowPrice);
                dispatch(SetTotal2(p + RowPrice));


                // setD(d + parseFloat(localDiscount));
                dispatch(SetDis2(d + parseFloat(localDiscount)));

                localDis_sign = '$';
                total_discount = total_discount + parseInt(localDiscount);
                setTotal_dis(total_dis + parseInt(localDiscount));
                localArr[selectedIndex].dis_sign = localDis_sign;
                localArr[selectedIndex].total_dis = total_discount;
                localArr[selectedIndex].p = RowPrice + modifier_Sum;
                dispatch(SetTotal_dis(total_discount));
                setArray(localArr);
                Calculation(localArr);

                // console.log("OYE KHUTYI BTIA CHL JA=== ", total_discount)


            }


            // console.log("chl ja bhai==", localArr[selectedIndex].dis_sign, localDiscount, localArr[selectedIndex].total_dis);


        }




        else {

            let localArr = [...array];
            let localDiscount = localArr[selectedIndex].dis;
            let localQuantity = localArr[selectedIndex].qty;

            let localDis_sign = localArr[selectedIndex].dis_sign;

            let modifier_Sum = 0;

            localArr[selectedIndex].additem.map(i => {
                modifier_Sum = modifier_Sum + parseInt(i.pr);

            })

            var RowPrice = parseInt(localArr[selectedIndex].price) * localQuantity - ((localDiscount / 100) * parseInt(localArr[selectedIndex].price) * localQuantity) + modifier_Sum;
            if (RowPrice > parseInt(localArr[selectedIndex].p) * localQuantity) {

                ToastAndroid.show("Discount is Greater then item price", ToastAndroid.SHORT);
                localArr[selectedIndex].dis = '0';
                setArray(localArr);

            }
            else {


                // setD(d + parseFloat(RowPrice * localDiscount / 100));
                dispatch(SetDis2(d + parseFloat(RowPrice * localDiscount / 100)));
                localDis_sign = "%";
                total_discount = total_discount + parseFloat(RowPrice * localDiscount / 100);
                setTotal_dis(total_dis + parseFloat(RowPrice * localDiscount / 100));
                localArr[selectedIndex].total_dis = total_discount;
                localArr[selectedIndex].dis_sign = localDis_sign;
                localArr[selectedIndex].p = RowPrice;
                dispatch(SetTotal_dis(total_discount));
                setArray(localArr);
                Calculation(localArr);
                // console.log("OYE KHUTYI BTIA CHL JA=== ", total_discount)
            }

            // console.log("chl ja bhai==", localArr[selectedIndex].dis_sign, localDiscount, localArr[selectedIndex].total_dis);

        }
    }

    const Calculation = (v) => {
        let localArr = [...v];
        let variable = 0;
        localArr.forEach(e => {
            variable = variable + parseFloat(e.p);
        });

        sub_Sum = variable;

    }

    const ServeLater = (col) => {
        let localArr = [...array];

        localArr[selectedIndex].color = col;
        setArray[localArr];
        setData([...array]);
        let params = {
            data: [...array],
            count: 0,
            SubTotal: 0,
            Total: 0,
            discount: 0,
        };

        APIHandler.hitApi(CALLBACK_2ND_SCREEN, 'POST', params).then(response => {
            // console.log("2nd Screen ===", response);
            dispatch(SetC_Screen(!c_Screen));

        });

    }


    const Save_Order = () => {


        let param = {
            total: p,
            loc_id: br,
            Data: data,
            stf_id: props.userId,
        };

        APIHandler.hitApi(Takeaway_Order, 'POST', param).then(response => setOrder(response));

    };

    const [order_Id, setOrder_Id] = useState(0);
    const Table_Booked_but_not_Paid = () => {

        let param = {
            total: null,
            total_2: p - parseFloat(d).toFixed(2),
            loc_id: br,
            Data: data,
            stf_id: props.userId,
            t_id: tableIds,
            mem: count,
            total_dis: d,
            order_id: null,

        };

        APIHandler.hitApi(Table_res, 'POST', param).then(response => console.log(" Table_Booked_but_not_Paid ", response));
        setState(props.pass);
    }

    // const CAllBACK = (val) => {
    //     setExt(val);
    // };
    const extCB = (val) => {
        setExtVal(val);
    }

    const Table_Free = () => {
        setModal(true);
        if (modal == false) {
            let param = {
                id: parseInt(table_order_detail.arr.map(i => i.id)),
                // t_id: table_order_detail.arr.map(i => i.table_id),
            };

            APIHandler.hitApi(Table_Close, 'POST', param).then(response => console.log(" Table_Free_====== ", response));
        }

    }


    const fun = () => {

        let param = {
            total: p - parseFloat(d).toFixed(2),
            loc_id: br,
            Data: data,
            stf_id: props.userId,
            t_id: tableIds,
            mem: count,
        };

        APIHandler.hitApi(Table_res, 'POST', param).then(response => console.log(response));
    }

    const Null_qty = (i) => {

        let localArr = [...array];

        let localQ = localArr[i].qty;
        let localQuantity = localArr[i].qty;
        let localsing = localArr[i].dis_sign;
        let localP = localArr[i].p;
        let localPrice = localArr[i].price;
        let localD = localArr[i].dis;


        localQ = '';
        let local_price = localPrice * localQuantity;


        setValue(localQ);
        localArr[i].qty = localQ;
        localArr[i].p = localPrice;
        setArray(localArr);
        Calculation(localArr);
        setP(p - local_price);
        if (localD != '+' && localsing == '%') {
            setD(d - (local_price * localD / 100));
        }

        //(localQ, localQuantity, localP, localD, local_price, localsing);


    }


    const item_qty = (i) => {
        let localArr = [...array];

        let localQ = localArr[i].qty;
        let localQuantity = localArr[i].qty;
        let localsing = localArr[i].dis_sign;
        let localP = localArr[i].p;
        let localD = localArr[i].dis;
        // let localSubtotal = p - (localQuantity * parseInt(localArr[selectedIndex].p));
        let modifier_Sum = 0;

        localArr[i].additem.map(j => {
            modifier_Sum = modifier_Sum + parseInt(j.pr);

        })

        if (localsing == '$') {
            var rowPrice = parseInt(localArr[i].p) * localQuantity - localD + modifier_Sum;
            setP(p + rowPrice);
            dispatch(SetTotal2(p + rowPrice));
        }
        else if (localsing == '%') {
            var rowPrice = parseInt(localArr[i].p) * localQuantity - ((localD / 100) * parseInt(localArr[i].p) * localQuantity) + modifier_Sum;
            setP(p + rowPrice);
            dispatch(SetTotal2(p + rowPrice));
        }
        else {
            var rowPrice = parseInt(localArr[i].p) * localQuantity + modifier_Sum;
            setP(p + rowPrice);
            dispatch(SetTotal2(p + rowPrice));

        }



        localArr[i].p = rowPrice;
        //  let local_price = localP * localQuantity;

        setArray(localArr);
        Calculation(localArr);

        // console.log(localQuantity, localD, localP, local_price);


    }

    const Null_dis = (i) => {
        let localArr = [...array];


        let localQuantity = localArr[i].qty;
        var RowPrice = parseInt(localArr[i].p) * localQuantity;
        let localD = localArr[i].dis;
        let localDis = localArr[i].dis;
        let localDis_sign = localArr[i].dis_sign;
        localD = '';
        if (localDis_sign === '$') {
            if (localDis == '+' || localDis == 0) {
                setD(d - 0);
                setP(p + 0);
            }
            else {
                setD(d - parseInt(localDis));
                setP(p);
            }
        }
        else {
            if (localDis == '+') {
                setD(d - 0);
                setP(p + 0);
            }
            else {
                setD(d - parseFloat(RowPrice * localDis / 100));

                setP(p);
            }

        }

        localArr[i].dis = localD;
        setDis(localD);
        setArray(localArr);
        Calculation(localArr);


    }
    // console.log('Additional Item=========', addITEMS)
    // const [sub_Sum, setSub_Sum] = useState(0);
    const renderTakeAwayItem = ({ item, index }) => {
        setItemName(item.item);
        setItemPrice(item.p);
        // setSub_Sum(sub_Sum + parseInt(item.p));
        return (
            <>
                {/* For Even Number in List */}

                <View style={{ flexDirection: 'row', backgroundColor: item.key % 2 == 0 ? 'white' : '#F7F7F7' }}>
                    <View style={{ borderRightWidth: 1, justifyContent: 'center', borderColor: '#A4A4A4', width: wp('4.6%') }}>
                        <View style={{ backgroundColor: item.color, width: wp('4%'), height: hp('6%'), borderRadius: 1000000000, justifyContent: 'center' }}

                        >
                            <Text style={[styles.textStyle, { alignSelf: 'center', color: 'black', }]}>{item.sr}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                        disabled={true}
                        style={{ justifyContent: 'center', width: wp('22.9%') }} onPress={() => {
                            dispatch(SetSelect('Additems'));
                            Modifires(item.var_id);
                            setSelectedIndex(index);
                        }}>
                        <Text style={[styles.textStyle, { marginLeft: wp('0.5%'), color: 'black' }]}>{item.item}</Text>

                        <View style={{ justifyContent: 'center', marginLeft: wp('0.5%'), width: wp('17%'), marginTop: hp('1%'), flexDirection: 'row' }}>
                            <FlatList
                                data={item.additem}
                                // numColumns={2}
                                horizontal={false}
                                spacing={100}
                                renderItem={({ item }) => (
                                    <View style={{ flexDirection: 'row' }}>
                                        <View
                                            style={[{ backgroundColor: 'white', marginLeft: wp('0.5%'), marginBottom: hp('0.5%'), justifyContent: 'center', alignItems: 'center', borderColor: '#FC3F3F', borderRadius: 8, borderWidth: 1, width: wp('7% '), height: hp('5 % ') }]}>
                                            <Text style={{ textAlign: 'center', fontSize: wp('0.9%'), color: '#FC3F3F' }}>{item.name}</Text>
                                        </View>
                                        <View
                                            style={[{ backgroundColor: 'white', marginLeft: wp('0.5%'), justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderRadius: 8, borderWidth: 1, width: wp('4% '), height: hp('5 % ') }]}>
                                            <Text style={{ textAlign: 'center', fontSize: wp('0.9%'), color: 'black' }}>{item.pax}</Text>
                                        </View>
                                        <View
                                            style={[{ backgroundColor: 'white', marginLeft: wp('0.5%'), justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderRadius: 8, borderWidth: 1, width: wp('5% '), height: hp('5 % ') }]}>
                                            <Text style={{ textAlign: 'center', fontSize: wp('0.9%'), color: 'black' }}>${item.price}</Text>
                                        </View>
                                    </View>
                                )} />


                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.viewStyle, { justifyContent: 'center', alignItems: 'center', width: wp('7.1%'), height: hp('10%'), }]}
                        onPress={() => {
                            dispatch(SetSelect('cash'));
                            setSelectedIndex(index);
                            Null_qty(index);
                        }}>
                        {item.item == '0.3 Takeaway' ?
                            <></>
                            :
                            <Text style={[{ backgroundColor: 'white', color: 'black', width: wp('5%'), height: hp('4%'), textAlign: 'center', fontSize: wp('1.5%'), borderWidth: 1, borderRadius: 5, borderColor: 'gray' }]}>{item.qty}</Text>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.viewStyle, { alignItems: 'center', width: wp('6.7%'), height: hp('10%'), }]}
                        onPress={() => {
                            dispatch(SetSelect('dis'));
                            setSelectedIndex(index);
                            Null_dis(index);
                            counter = 0;


                        }}>

                        {item.item == '0.3 Takeaway' ?
                            <></>
                            :
                            <>
                                {item.dis == '+' ?
                                    <Text style={[{ backgroundColor: 'white', color: 'black', width: wp('3%'), height: hp('5%'), textAlign: 'center', fontSize: wp('1.9%'), borderWidth: 1, borderRadius: 8, borderColor: 'gray' }]}>{item.dis}</Text>
                                    :


                                    <Text style={[styles.textStyle, { width: wp('5.5%'), color: 'red' }]}>
                                        {item.dis_sign == '$' ?

                                            <Text>{item.dis_sign + item.dis}</Text>
                                            :

                                            <Text> {item.dis + item.dis_sign}</Text>
                                        }
                                    </Text>
                                }
                            </>
                        }

                    </TouchableOpacity>



                    <View style={[styles.viewStyle, { width: wp('7.1%'), height: hp('10%') }]}>
                        <Text style={[styles.textStyle, { alignSelf: 'center', color: '#FC3F3F' }]}>${item.p}</Text>
                    </View>
                    <TouchableOpacity style={[styles.viewStyle, { alignItems: 'center', width: wp('5%'), height: hp('10%') }]}
                        onPress={() => {
                            newArray(item.key, item.p, item.dis);
                            Delete_Items(index);
                            dispatch(SetDis_Zero(0));


                        }}>
                        <Image source={require('../../assets/Bin.png')} style={{ width: wp('4%'), height: hp('4%') }} resizeMode='contain' />
                    </TouchableOpacity>

                </View>


            </>
        );
    };


    // console.log('itemName ka name====', itemName, itemPrice)
    const ShowOrderTable = ({ index, item }) => {
        return (



            <View style={{ flexDirection: 'row', backgroundColor: item.key % 2 == 0 ? 'white' : '#F7F7F7' }}>
                <View style={{ borderRightWidth: 1, justifyContent: 'center', borderColor: '#A4A4A4', width: wp('4.6%') }}>
                    <TouchableOpacity disabled={true}
                        style={{ backgroundColor: item.color, width: wp('4%'), height: hp('6%'), borderRadius: 1000000000, justifyContent: 'center' }}
                        onPress={() => {
                            dispatch(SetSelect('reservation'));
                            setModi(item.additem)
                        }}
                    >
                        <Text style={[styles.textStyle, { alignSelf: 'center', color: 'black', }]}>{item.key}</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity disabled={true}
                    style={{ justifyContent: 'center', width: wp('22.9%') }} onPress={() => {
                        dispatch(SetSelect('Additems'));
                        Modifires(item.var_id);
                        setSelectedIndex(index);
                    }}>
                    <Text style={[styles.textStyle, { marginLeft: wp('0.5%'), color: 'black' }]}>{item.item}</Text>

                    <View style={{ justifyContent: 'center', marginLeft: wp('0.5%'), width: wp('17%'), marginTop: hp('1%'), flexDirection: 'row' }}>
                        <FlatList
                            data={item.additem}
                            // numColumns={2}
                            horizontal={false}
                            spacing={100}
                            renderItem={({ item }) => (
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity disabled={true}
                                        style={[{ backgroundColor: 'white', marginLeft: wp('0.5%'), marginBottom: hp('0.5%'), justifyContent: 'center', alignItems: 'center', borderColor: '#FC3F3F', borderRadius: 8, borderWidth: 1, width: wp('7% '), height: hp('5 % ') }]}>
                                        <Text style={{ textAlign: 'center', fontSize: wp('0.9%'), color: '#FC3F3F' }}>{item.modi_name}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={true}
                                        style={[{ backgroundColor: 'white', marginLeft: wp('0.5%'), justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderRadius: 8, borderWidth: 1, width: wp('4% '), height: hp('5 % ') }]}>
                                        <Text style={{ textAlign: 'center', fontSize: wp('0.9%'), color: 'black' }}>{item.quantity}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity disabled={true}
                                        style={[{ backgroundColor: 'white', marginLeft: wp('0.5%'), justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderRadius: 8, borderWidth: 1, width: wp('5% '), height: hp('5 % ') }]}>
                                        <Text style={{ textAlign: 'center', fontSize: wp('0.9%'), color: 'black' }}>${item.unit_price}</Text>
                                    </TouchableOpacity>
                                </View>
                            )} />


                    </View>
                </TouchableOpacity>

                <TouchableOpacity disabled={true}
                    style={[styles.viewStyle, { justifyContent: 'center', alignItems: 'center', width: wp('7.1%'), height: hp('10%'), }]}
                    onPress={() => {
                        dispatch(SetSelect('cash'));
                        setSelectedIndex(index);
                        Null_qty(index);
                    }}>
                    <Text style={[{ backgroundColor: 'white', color: 'black', width: wp('5%'), height: hp('4%'), textAlign: 'center', fontSize: wp('1.5%'), borderWidth: 1, borderRadius: 5, borderColor: 'gray' }]}>{item.qty}</Text>

                </TouchableOpacity>

                <TouchableOpacity disabled={true}
                    style={[styles.viewStyle, { alignItems: 'center', width: wp('6.7%'), height: hp('10%'), }]}
                    onPress={() => {
                        dispatch(SetSelect('dis'));
                        setSelectedIndex(index);
                        Null_dis(index);
                        counter = 0;


                    }}>



                    {item.dis == '+' ?
                        <Text style={[{ backgroundColor: 'white', color: 'black', width: wp('3%'), height: hp('5%'), textAlign: 'center', fontSize: wp('1.9%'), borderWidth: 1, borderRadius: 8, borderColor: 'gray' }]}>{item.dis.slice(0, -3)}</Text>
                        :


                        <Text style={[styles.textStyle, { width: wp('5.5%'), color: 'red' }]}>
                            {item.dis_sign == '$' ?

                                <Text>{item.dis_sign + item.dis}</Text>
                                :

                                <Text> {item.dis + item.dis_sign}</Text>
                            }
                        </Text>
                    }

                </TouchableOpacity>



                <View style={[styles.viewStyle, { width: wp('7.1%'), height: hp('10%') }]}>
                    <Text style={[styles.textStyle, { alignSelf: 'center', color: '#FC3F3F' }]}>${item.p}</Text>
                </View>
                <TouchableOpacity disabled={true} style={[styles.viewStyle, { alignItems: 'center', width: wp('5%'), height: hp('10%') }]}
                    onPress={() => {
                        newArray(item.key, item.p, item.dis);
                        Delete_Items(index);
                    }}>
                    <Image source={require('../../assets/Bin.png')} style={{ width: wp('4%'), height: hp('4%') }} resizeMode='contain' />
                </TouchableOpacity>

            </View>
        );
    };

    const renderVariantModal = () => {
        return (

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}>
                <View style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <View style={{ width: '30%', height: '30%', backgroundColor: 'white', }}>
                        <View style={{ flexDirection: "row", margin: 5, justifyContent: 'space-between' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: wp('1.4%') }}>Variant Name</Text>
                            <Text style={{ fontWeight: 'bold', fontSize: wp('1.2%') }}>Price</Text>
                        </View>
                        <FlatList
                            data={variantArray}
                            keyExtractor={(item) => item.var_id}

                            ItemSeparatorComponent={() => {
                                return (
                                    <View style={{
                                        marginHorizontal: 5,
                                        borderWidth: 0.25,
                                        borderColor: 'rgba(0,0,0,0.3)'
                                    }} />
                                );
                            }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={{ flexDirection: "row", margin: 5, justifyContent: 'space-between' }}
                                        onPress={() => {
                                            addNewItem(productItem.name + " - " + item.name, item.price, item.discount, productItem.id, item.id);
                                            setProductItem({});
                                            setVariantArray([]);
                                            setModalVisible(false);
                                        }}>
                                        <Text style={{ fontSize: wp('1%') }}>{item.name}</Text>
                                        <Text style={{ fontSize: wp('1%'), color: 'red' }}>{"$" + item.price}</Text>
                                    </TouchableOpacity>
                                );
                            }}
                        />

                        <TouchableOpacity style={{ margin: 5, padding: 5, alignItems: 'center', backgroundColor: 'red' }}
                            onPress={() => {
                                setModalVisible(false);
                            }}>
                            <Text style={{ color: 'white', fontSize: wp('0.9%'), fontWeight: 'bold' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    const variantCallback = (item) => {
        setModalVisible(true);
        setProductItem(item);
        setVariantArray(item.var);
    }


    const pax = () => {

        if (cBtn == 0) {
            paxUpd = props.Count;
            // console.log("aja aja aja ==", paxUpd)
        }
        else {
            paxUpd = paxCount;
            // console.log("aja aja aja ==", paxUpd)
        }
    }


    // console.log('Id & Sum', table_order_detail.arr.map(i => i.id), table_order_detail.arr.map(i => i.sum))


    // <Pay pay={Total} branch={br} D={data} userid={props.userId} t_id={table_id} member={count} reload={reload} addNewItem={addNewItem} Empty={Empty} Call={callback} function={fun} statename={props.pass} />
    return (
        <>
            {state == 'Profile' ? <Profile />
                : state == true ? <Takeway T_order_id={props.T_order_id} mergedTables={props.mergedTables} br={props.br} Table={props.Table} table_pass={props.table_pass} Count={props.Count} Table_Id={props.Table_Id} userId={props.userId} response={props.response} pass="Main" Pass='table' /> :
                    <>
                        <Modal
                            animationType="fade"

                            transparent={true}
                            visible={modalPax}
                            onRequestClose={() => {

                                setModalPax(!modalPax);
                            }}
                        >

                            <View style={{
                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 10,
                                    height: 10
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 8, borderRadius: 3, alignSelf: 'center', backgroundColor: 'white', width: wp('30%'), height: hp('50%'), marginTop: hp('15%')
                            }}>

                                <TouchableOpacity style={{ alignSelf: 'flex-end', width: wp('4%'), height: hp('5%'), marginRight: wp('1%'), marginTop: hp('1%') }}
                                    onPress={() => {
                                        setModalPax(false);
                                        setCBtn(0);
                                        pax();
                                    }}>
                                    <Image source={require('../../assets/cross2.png')} resizeMode="contain" style={{ width: wp('5%'), height: hp('5%') }} />
                                </TouchableOpacity>

                                <Text style={{ marginTop: hp('3%'), alignSelf: 'center', color: '#FC3F3F', fontSize: wp('2.5%') }}>PAX</Text>

                                <View style={{ marginTop: hp('5%'), marginBottom: hp('5%'), marginLeft: wp('4%'), flexDirection: 'row', width: wp('10%'), height: hp('10%') }}>

                                    <TouchableOpacity style={{ alignSelf: 'flex-start', width: wp('10%'), height: hp('10%') }} onPress={() => decrement()} >
                                        <Image source={require('../../assets/minus.jpg')} resizeMode="contain" style={{ width: wp('10%'), height: hp('10%'), alignSelf: 'center' }} />
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ justifyContent: 'center' }}>
                                        <Text style={{ alignSelf: 'center', color: '#FC3F3F', fontSize: wp('2.5%') }}>{paxCount}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={{ alignSelf: 'flex-end', width: wp('10%'), height: hp('10%') }} onPress={() => increment()}>
                                        <Image source={require('../../assets/plus_c.jpg')} resizeMode="contain" style={{ width: wp('10%'), height: hp('10%'), alignSelf: 'center' }} />
                                    </TouchableOpacity>




                                </View>
                                <TouchableOpacity onPress={() => {
                                    setModalPax(false);
                                    setCBtn(1);
                                    pax();
                                }}
                                    style={{
                                        alignSelf: 'center', backgroundColor: '#FC3F3F', alignItems: 'center', borderRadius: 5, justifyContent: 'center', height: hp('10%'), width: wp('20%')
                                    }} >
                                    <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: 'white' }}>Confirm</Text>
                                </TouchableOpacity>
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

                            <View style={[styles.modalView, { width: '20%', height: '50%' }]}>
                                <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 8 }} onPress={() => setModal(false)}>
                                    <Image source={require('../../assets/cross.jpg')} resizeMode="contain" style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>


                                <View style={{ marginRight: 10, marginTop: 8, alignSelf: 'center', width: '40%', height: '40%' }} >
                                    <Image source={require('../../assets/warning-removebg-preview.png')} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
                                </View>
                                <Text style={{ fontSize: wp('1.4%'), color: 'black' }}>Close sale for this table and <Text style={{ fontWeight: 'bold', color: 'black' }}>reopen for new customer</Text></Text>
                                <View style={{ justifyContent: 'flex-end', flex: 1, width: '98%' }}>
                                    <TouchableOpacity style={{ backgroundColor: 'red', width: wp('19.5%'), height: hp('5%'), marginBottom: 5, borderRadius: 4, justifyContent: 'center' }}
                                        onPress={() => {
                                            setModal(false);
                                            setState(props.pass);
                                        }}>
                                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.3%') }}>REOPEN TABLE</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </Modal>

                        <Modal
                            animationType="fade"

                            transparent={true}
                            visible={show_m}
                            onRequestClose={() => {

                                setShow_m(!show_m);
                            }}
                        >

                            <View style={[styles.modalView, { width: '35%' }]}>
                                <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 0 }} onPress={() => setShow_m(false)}>
                                    <Image source={require('../../assets/cross.jpg')} resizeMode="contain" style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>


                                <View style={{ marginRight: 10, marginTop: 0, alignSelf: 'center', width: '40%', height: '40%' }} >
                                    <Image source={require('../../assets/conf.png')} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
                                </View>
                                <Text style={{ fontSize: wp('1.4%'), marginTop: '5%' }}>Will you discard the order?</Text>
                                <View style={{ flex: 1, width: '98%', flexDirection: 'row', justifyContent: 'space-around' }}>

                                    <TouchableOpacity style={{ backgroundColor: 'red', width: wp('15%'), height: hp('5%'), marginBottom: 5, borderRadius: 4, justifyContent: 'center', alignSelf: 'flex-end' }}
                                        onPress={() => {
                                            setShow_m(false);
                                            setState(props.pass);
                                            counter = 0;
                                            // console.log('value 0 krne k lie', counter)
                                        }}>
                                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.3%') }}>Proceed</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: '#676767', width: wp('15%'), height: hp('5%'), marginBottom: 5, borderRadius: 4, justifyContent: 'center', alignSelf: 'flex-end' }}
                                        onPress={() => {
                                            setShow_m(false);

                                        }}>
                                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.3%') }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>

                        </Modal>

                        <Modal
                            animationType="fade"

                            transparent={true}
                            visible={show_modal}
                            onRequestClose={() => {

                                setShow_modal(!show_modal);
                            }}
                        >

                            <View style={[styles.modalView, { width: wp('35%'), height: hp('55%') }]}>
                                <TouchableOpacity style={{ marginBottom: hp('1%'), alignSelf: 'flex-end', marginRight: wp('1%'), marginTop: hp('1%') }} onPress={() => setShow_modal(false)}>
                                    <Image source={require('../../assets/cross.jpg')} resizeMode="contain" style={{ width: wp('3%'), height: hp('3%') }} />
                                </TouchableOpacity>


                                <View style={{ marginRight: wp('1%'), alignSelf: 'center', width: wp('30%'), height: hp('30%') }} >
                                    <Image source={require('../../assets/conf.png')} resizeMode="contain" style={{ width: wp('30%'), height: hp('30%') }} />
                                </View>
                                <Text style={{ fontSize: wp('1.4%'), marginTop: hp('5%') }}>Will you discard the order?</Text>
                                <View style={{ marginBottom: hp('2%'), flex: 1, width: wp('32%'), flexDirection: 'row', justifyContent: 'space-around' }}>

                                    <TouchableOpacity style={{ backgroundColor: '#FC3F3F', width: wp('15%'), height: hp('5%'), marginBottom: hp('1%'), borderRadius: 4, justifyContent: 'center', alignSelf: 'flex-end' }}
                                        onPress={() => {
                                            Empty();
                                            Table_order();
                                            setShow_modal(false);
                                        }}>
                                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.3%') }}>Proceed</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: '#676767', width: wp('15%'), height: hp('5%'), marginBottom: hp('1%'), borderRadius: 4, justifyContent: 'center', alignSelf: 'flex-end' }}
                                        onPress={() => {
                                            setShow_modal(false);

                                        }}>
                                        <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.3%') }}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>

                        </Modal>

                        {state === 'sub' ?
                            <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'white' }}>
                                <View style={{ flex: 0.6, backgroundColor: '#F7F7F7' }}>
                                    {props.Pass == 'table' ?
                                        <>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity
                                                    style={{
                                                        borderRadius: 5,
                                                        borderWidth: 1,
                                                        borderColor: "#FC3F3F",

                                                        alignItems: 'center',
                                                        height: hp('6%'),
                                                        flex: 1,
                                                        alignSelf: 'flex-start',


                                                        margin: wp('0.5%'),
                                                        justifyContent: 'center',
                                                        backgroundColor: 'white'
                                                    }}
                                                    onPress={() => {

                                                        if (props.table_pass == 'table') {
                                                            setShow_m(false);
                                                            setState(props.pass);
                                                        }

                                                        else {
                                                            if (array.length == 0 && props.table_pass == 'notable') {
                                                                setShow_m(false);
                                                                setState(props.pass);
                                                            }
                                                            else {
                                                                setShow_m(true);
                                                            }
                                                        }


                                                    }} >
                                                    <Text style={{ color: '#FC3F3F', padding: 2, fontSize: wp('1.5%'), alignSelf: 'center', fontFamily: 'Roboto' }}>Home</Text>
                                                </TouchableOpacity>
                                                <View

                                                    style={{
                                                        borderRadius: 5,
                                                        width: wp('30%'),
                                                        marginTop: hp('1%'),
                                                        height: hp('6%'),
                                                        backgroundColor: '#FFFFFF',
                                                        margin: wp('0.5%'),
                                                        borderColor: "#D2D2D2",
                                                        borderWidth: 1,
                                                        flexDirection: 'row',
                                                        justifyContent: 'space-between',
                                                    }}

                                                >

                                                    <Text style={{ fontSize: wp('1.2%'), color: '#6A6A6A', alignSelf: 'center', fontFamily: 'Roboto', marginLeft: wp('3%') }}>TABLE {props.table_pass == 'table' ? table_order_detail.arr.map(i => i.table) : tableNames}</Text>
                                                    <View style={{ borderRightWidth: 1, justifyContent: 'flex-start', borderColor: '#D2D2D2' }} />
                                                    <TouchableOpacity
                                                        // disabled={dinelogin == true ? true : false}
                                                        disabled={array.length == 0 ? true : false}
                                                        onPress={() => {

                                                            setModalPax(true);
                                                            setCBtn(1);
                                                        }} style={{ justifyContent: 'center' }}>

                                                        <Text style={{ padding: 2, fontSize: wp('1.2%'), color: '#6A6A6A', alignSelf: 'center', marginRight: wp('2%') }}>
                                                            {cBtn == 1 ? paxCount
                                                                :
                                                                props.table_pass == 'notable' ? props.Count
                                                                    :
                                                                    props.table_pass == 'table' ? table_order_detail.arr.map(i => i.mem)

                                                                        : null
                                                            }
                                                            PAX</Text>
                                                    </TouchableOpacity>

                                                </View>


                                                <TouchableOpacity
                                                    // disabled={dinelogin == true ? true : false}
                                                    disabled={array.length == 0 ? true : false}
                                                    style={{
                                                        borderRadius: 5,
                                                        margin: hp('0.5%'),
                                                        width: wp('14%'),
                                                        alignItems: 'center',
                                                        height: hp('6%'),
                                                        alignSelf: 'flex-end',
                                                        justifyContent: 'center',
                                                        borderColor: '#A4A4A4',
                                                        borderWidth: 1,
                                                        // backgroundColor: dinelogin == true ? 'rgba(120, 120, 120, 1)' : '#FC3F3F',
                                                        backgroundColor: array.length == 0 ? 'rgba(120, 120, 120, 1)' : '#FC3F3F',
                                                    }}
                                                    onPress={() => { props.table_pass == 'notable' ? Table_Booked_but_not_Paid() : <>{table_order_detail.arr.map(i => i.payment_status) == 'paid' ? Table_Free() : null}</> }}
                                                >
                                                    {/* {isLoad && <CustomActivityIndicator />} */}
                                                    <Text style={{ fontSize: wp('1.2%'), color: 'white', alignSelf: 'center', fontFamily: 'Roboto' }}>

                                                        CLOSE THIS TABLE
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>


                                            <View style={{ backgroundColor: 'white', height: hp('6%'), borderTopWidth: 1, borderColor: '#A4A4A4', borderBottomWidth: 1, flexDirection: 'row' }}>
                                                <View style={[styles.viewStyle, { width: "10%" }]}>
                                                    <Text style={[styles.textStyle, { alignSelf: 'center', fontWeight: '700', color: 'black' }]}>No:</Text>
                                                </View>
                                                <View style={[styles.viewStyle, { alignItems: 'flex-start', width: wp('24%') }]}>
                                                    <Text style={[styles.textStyle, { fontWeight: '700', color: 'black' }]}>Items</Text>
                                                </View>

                                                <View style={[styles.viewStyle, { alignItems: 'center', width: "11.5%" }]}>
                                                    <Text style={[styles.textStyle, { fontWeight: '700', color: 'black' }]}>Qty </Text>
                                                </View>

                                                <View style={[styles.viewStyle, { alignItems: 'center', width: "12.3%" }]}>
                                                    <Text style={[styles.textStyle, { fontWeight: '700', color: 'black' }]}>Discount</Text>
                                                </View>

                                                <View style={[styles.viewStyle, { alignItems: 'center', width: "13.5%" }]}>
                                                    <Text style={[styles.textStyle, { fontWeight: '700', color: 'black' }]}>Total  </Text>
                                                </View>
                                                <View style={[styles.viewStyle, { alignItems: 'center', width: "9.3%" }]}>
                                                    <Text style={[styles.textStyle, { fontWeight: '700', color: 'black' }]}>Del   </Text>
                                                </View>
                                            </View>

                                            <View style={{
                                                height: hp('38%'), backgroundColor: dinelogin == false ? '#F7F7F7' : 'white'
                                            }}>

                                                {
                                                    props.table_pass == 'notable' && dinelogin == true ?
                                                        <FlatList
                                                            data={array}
                                                            keyExtractor={(item) => item.key}
                                                            renderItem={renderTakeAwayItem} /> :


                                                        props.table_pass == 'table' && dinelogin == true ?

                                                            < FlatList
                                                                data={array}
                                                                keyExtractor={(item) => item.id}
                                                                renderItem={ShowOrderTable} /> :

                                                            props.table_pass == 'table' || props.table_pass == 'notable' && dinelogin == true ?
                                                                <Dinelogin DineLogin={DineLogin} />
                                                                : null
                                                }
                                            </View>
                                            <View style={{ borderTopWidth: 1, borderColor: '#A4A4A4', flexDirection: 'row', flex: 1, height: hp('18%') }}>


                                                <View style={{ backgroundColor: '#F7F7F7', flex: 0.5, height: hp('21%') }}>
                                                    {contactDetails == 405 ?

                                                        <View>
                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    dispatch(SetSelect('phone'));
                                                                    setSelectedIndex(0);
                                                                }}
                                                                style={{ elevation: 1, backgroundColor: 'white', width: wp('12%'), height: hp('7%'), justifyContent: 'center', borderRadius: 5, marginTop: hp('2%'), alignSelf: 'center' }}>
                                                                <Text style={{ color: 'black', alignSelf: 'center', fontSize: wp('1%') }}>Enter mobile number</Text>
                                                            </TouchableOpacity>


                                                            <TouchableOpacity
                                                                onPress={() => {
                                                                    // navigation.navigate('Add Customer');
                                                                    dispatch(SetScreenSwitch('second'));
                                                                }}
                                                                style={{ flexDirection: 'row', elevation: 1, backgroundColor: 'white', width: wp('12%'), height: hp('7%'), justifyContent: 'center', borderRadius: 5, marginTop: hp('2%'), alignSelf: 'center' }}>


                                                                <Image style={{ marginTop: hp('2.4%'), marginRight: wp('0.5%'), height: hp('2.12%'), width: wp('1.25%') }} source={require('../../assets/plus_cc.png')} />
                                                                <Text style={{ color: 'black', alignSelf: 'center', fontSize: wp('1%') }}>Customer</Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                        :
                                                        <>
                                                            <View style={{ flexDirection: 'row', width: wp('22.2%'), height: hp('8%'), justifyContent: 'center' }}>
                                                                <View style={{ marginLeft: wp('6.5%'), flexDirection: 'row', alignSelf: 'center', width: wp('20%'), height: hp('6%'), justifyContent: 'center' }}>
                                                                    <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold', fontSize: wp('1.2%') }}>{contactDetails.map(i => i.name)}</Text>
                                                                    <TouchableOpacity style={{ marginLeft: wp('4%'), flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#9B9B9B', backgroundColor: 'white', width: wp('8.5%'), height: hp('5%'), justifyContent: 'center', borderRadius: 5, alignSelf: 'center' }}
                                                                        onPress={() => {
                                                                            setState('Profile');
                                                                        }}
                                                                    >

                                                                        <Image style={{ width: wp('2.5%'), height: hp('4%'), marginRight: wp('1%') }} source={require('../../assets/Vector.png')} />
                                                                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: wp('1.2%'), color: '#9B9B9B' }}>Profile</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>

                                                            <View style={{ justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#E2E2E2', height: hp('8%') }}>
                                                                <View style={{ alignSelf: 'center', width: wp('20%'), height: hp('6%'), justifyContent: 'center' }}>
                                                                    {i.address_line_1 == null ?
                                                                        <Text style={{ color: 'red', marginTop: '1%', fontSize: wp('1%') }}>No Address 1 Found</Text>
                                                                        :
                                                                        <Text style={{ color: '#9B9B9B', marginTop: '1%', fontSize: wp('1%') }}>{contactDetails.map(i => i.address_line_1)}</Text>
                                                                    }
                                                                    {i.address_line_2 == null ?
                                                                        <Text style={{ color: 'red', marginTop: '1%', fontSize: wp('1%') }}>No Address 2 Found</Text>
                                                                        :
                                                                        <Text style={{ color: '#9B9B9B', marginTop: '1%', fontSize: wp('1%') }}>{contactDetails.map(i => i.address_line_2)}</Text>
                                                                    }
                                                                </View>
                                                            </View>

                                                            <View style={{ justifyContent: 'center', borderTopWidth: 1, borderColor: '#E2E2E2', height: hp('5%'), flexDirection: 'row' }}>
                                                                <View style={{ alignSelf: 'center', flexDirection: 'row', width: wp('10%'), height: hp('4%'), justifyContent: 'center' }}>
                                                                    <Text style={{ alignSelf: 'center', color: '#9B9B9B', fontSize: wp('1%'), }}>Expire:   </Text>
                                                                    <Text style={{ alignSelf: 'center', color: 'black', fontWeight: '600', fontSize: wp('1.4%') }}>03/08/21</Text>

                                                                </View>

                                                                <View style={{ alignSelf: 'center', flexDirection: 'row', width: wp('10%'), height: hp('4%'), justifyContent: 'center' }}>
                                                                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: wp('1%'), color: '#9B9B9B' }}>POINTS:   </Text>
                                                                    <Text style={{ alignSelf: 'center', color: '#C80101', fontWeight: 'bold', fontSize: wp('1.8%') }}>30</Text>

                                                                </View>
                                                            </View>
                                                        </>
                                                    }
                                                </View>

                                                <View style={{ backgroundColor: '#F7F7F7', flex: 0.5, height: hp('21%'), borderLeftWidth: 1, borderLeftColor: '#CDCDCD', alignContent: 'center' }}>
                                                    <View style={{ marginTop: hp('1%'), opacity: 0.5, marginLeft: wp('2%'), marginRight: wp('2%') }}>

                                                        <View style={styles.vStyle}>
                                                            <Text style={[styles.Tstyle, { flex: 1 }]}>Sub Total:</Text>
                                                            <Text style={styles.Tstyle}>$
                                                                {
                                                                    sub_Sum
                                                                }
                                                                .00</Text>

                                                        </View>

                                                        <View style={styles.vStyle}>
                                                            <Text style={[styles.Tstyle, { flex: 1 }]}>SRV Charge:</Text>
                                                            <Text style={styles.Tstyle}>${svc}.00</Text>
                                                        </View>

                                                        <View style={styles.vStyle}>
                                                            <Text style={[styles.Tstyle, { flex: 1 }]}>GST:</Text>
                                                            <Text style={styles.Tstyle}>${gst}.00</Text>
                                                        </View>

                                                        <View style={styles.vStyle}>
                                                            <Text style={[styles.Tstyle, { flex: 1 }]}>Discount:</Text>
                                                            <Text style={styles.Tstyle}>-$
                                                                {totDis == 0 ? 0 : parseFloat(sub_Sum - totDis).toFixed(2)}</Text>

                                                        </View>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', marginLeft: wp('2%'), marginRight: wp('2%') }}>
                                                        <Text style={{ color: 'black', fontWeight: 'bold', flex: 1, alignSelf: "center", fontSize: wp('1.5%') }} >Total:</Text>
                                                        <Text style={{ fontSize: wp('1.5%'), alignSelf: 'center', color: 'red' }}>
                                                            ${disTot == 1 ? totDis
                                                                : parseFloat(sub_Sum)}.00
                                                        </Text>
                                                    </View>

                                                </View>


                                            </View>
                                        </>
                                        : null

                                    }


                                    <View style={{ height: hp('14%'), justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white' }}>

                                        <TouchableOpacity
                                            // disabled={dinelogin == true ? true : false}
                                            disabled={array.length == 0 ? true : false}

                                            style={{
                                                width: wp('12%'),
                                                borderRadius: 3,
                                                justifyContent: 'center', marginRight: wp('0%'), backgroundColor: array.length == 0 ? 'rgba(120, 120, 120, 1)' : '#4CAE36', height: hp('7%')
                                            }} onPress={() => Empty()} >

                                            <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: 'white', fontSize: wp('1.2%'), }}>VOID</Text>
                                        </TouchableOpacity>

                                        {/* {props.pass == 'Takeway' ? */}

                                        {/* <>
                                                <TouchableOpacity
                                                    disabled={dinelogin == true ? true : false}
                                                    style={[styles.fbtnStyle, { marginLeft: wp('1%'), backgroundColor: dinelogin == true ? 'rgba(120, 120, 120, 1)' : '#4CAE36', width: wp('12%'), height: hp('7%'), marginRight: wp('0%') }]} onPress={() => {
                                                        <App/>
                                                        Save_Order();
                                                        Empty();
                                                    }}>
                                                    <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: 'white', fontSize: wp('1.2%'), }}>PRINT & SAVE</Text>
                                                </TouchableOpacity>
                                            </> */}
                                        {/* : props.pass == "Main" ? <> */}

                                        <TouchableOpacity
                                            // disabled={dinelogin == true ? true : false}
                                            disabled={array.length == 0 ? true : false}
                                            style={[styles.fbtnStyle, { marginLeft: wp('1%'), backgroundColor: array.length == 0 ? 'rgba(120, 120, 120, 1)' : '#4CAE36', width: wp('12%'), height: hp('7%'), marginRight: wp('0%') }]} onPress={() => {
                                                // setState('blue');
                                                // fun();
                                                Empty();
                                                // setState('Main');
                                                Table_Booked_but_not_Paid();
                                                // Save_Order();
                                                Printer();
                                                //Paper_Cut();
                                                dispatch(SetALLData(data));
                                                console.log("OAKY AB THEK HA");
                                            }}>
                                            <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: 'white', fontSize: wp('1.2%'), }}>PRINT & SAVE</Text>
                                        </TouchableOpacity>

                                        {/* </> : null} */}
                                        {/* {props.table_pass == 'table' ?
                                            <TouchableOpacity
                                                disabled={table_order_detail.arr.map(i => i.payment_status) == 'paid' ? true : false}

                                                style={table_order_detail.arr.map(i => i.payment_status) == 'paid' ?

                                                    { alignSelf: 'center', width: wp('15%'), height: hp('6%'), borderWidth: 1, borderRadius: 3, justifyContent: "center", backgroundColor: 'pink' }
                                                    :
                                                    { alignSelf: 'center', width: wp('15%'), height: hp('6%'), borderWidth: 1, borderRadius: 3, justifyContent: "center", backgroundColor: '#C80101' }}

                                                onPress={() => {
                                                    // setSelect("Pay");
                                                    dispatch(SetSelect('Pay'));
                                                }}
                                            >

                                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: wp('1.5%'), alignSelf: 'center', fontWeight: 'bold' }}>{table_order_detail.arr.map(i => i.payment_status) == 'paid' ? 'Paid' : 'Pay'} </Text>
                                            </TouchableOpacity>
                                            :
                                            <TouchableOpacity
                                                disabled={array.length > 0 ? false : true}
                                                style={{ marginLeft: wp('0%'), alignSelf: 'center', width: wp('15%'), height: hp('6%'), borderRadius: 3, justifyContent: "center", backgroundColor: array.length > 0 ? '#FC3F3F' : 'gray' }}
                                                onPress={() => {
                                                    dispatch(SetSelect('Pay'));
                                                }}>
                                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: wp('1.5%'), alignSelf: 'center', fontWeight: 'bold' }}>Pay </Text>
                                            </TouchableOpacity>} */}
                                        <TouchableOpacity
                                            // disabled={dinelogin == true ? true : false}
                                            disabled={array.length == 0 ? true : false}
                                            style={[styles.fbtnStyle, { backgroundColor: array.length == 0 ? 'rgba(120, 120, 120, 1)' : '#4CAE36', width: wp('12%'), height: hp('7%'), marginLeft: wp('1%'), marginRight: wp('1%') }]}
                                            onPress={() => {
                                                dispatch(SetSelect('Pay'));
                                                setNameState('Card');
                                                dispatch(SetALLData(data));
                                            }}
                                        >
                                            <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: 'white', fontSize: wp('1.2%'), }}>CARD</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity

                                            // disabled={dinelogin == true ? true : false}
                                            disabled={array.length == 0 ? true : false}
                                            onPress={() => {
                                                dispatch(SetSelect('Pay'));
                                                setNameState('Cash');
                                                dispatch(SetALLData(data));
                                            }}
                                            style={[styles.fbtnStyle, { backgroundColor: array.length == 0 ? 'rgba(120, 120, 120, 1)' : '#4CAE36', width: wp('12%'), height: hp('7%') }]} >
                                            <Text style={{ fontWeight: 'bold', alignSelf: 'center', color: 'white', fontSize: wp('1.2%'), }}>CASH</Text>
                                        </TouchableOpacity>


                                    </View>
                                </View>
                                {select != "Pay" ?
                                    <View style={{ justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: '#A4A4A4', borderLeftWidth: 1, borderLeftColor: '#A4A4A4', flex: 0.125, backgroundColor: 'white', }}>

                                        <FlatList
                                            data={cat}
                                            // keyExtractor={item => item.key}

                                            renderItem={({ item }) => {
                                                return (
                                                    <TouchableOpacity
                                                        style={[styles.Card, { backgroundColor: item.color }]}
                                                        onPress={() => {
                                                            setCat_id(item.id)
                                                            setMBtn(item.name)

                                                        }}>
                                                        <Text style={styles.CardText}>{item.name}</Text>
                                                    </TouchableOpacity>)
                                            }}
                                        />
                                    </View>
                                    : null}

                                <View style={{ flex: 0.4, backgroundColor: 'white' }}>
                                    {select == 'reservation' ? <Reservation Modi={modi} />
                                        : select === 'Burger' ? <Burger Dinelogin={dinelogin} serveLater={ServeLater} itemName={itemName} itemPrice={itemPrice} ExtCallback={AdditionalItems} ExtCallback1={extCB} product_id={Product_id} btn={mBtn} variantCallback={variantCallback} reload={reload} addNewItem={addNewItem} branch={br} Cat_id={cat_id} Call={Callback} table_pass={props.table_pass} /> : select === 'Pay' ? <Pay NameState={nameState} disTotal={CBDisTotal} btnDisTot={CBTotalDis} refresh={reload} pay={props.table_pass == 'table' ? table_order_detail.arr.map(i => i.total) : props.table_pass == 'notable' ? sub_Sum : null} branch={br} D={data} userid={props.userId} t_id={tableIds} member={cBtn == 0 ? props.Count : paxUpd} reload={reload} empty={Empty} Call={Callback} function={fun} statename={props.pass} Cat_id={cat_id} T_order_id={props.table_pass == 'table' ? table_order_detail.arr.map(i => i.id) : null} table_pass={props.table_pass} T_order_sum={props.table_pass == 'table' ? table_order_detail.arr.map(i => i.total) : null} Total_Discount={total_discount} /> : select == 'cash' || select == 'dis' || select == 'phone' ?

                                            <>
                                                <View style={{ borderBottomWidth: 0.4, height: hp('7%'), flexDirection: 'row', backgroundColor: 'rgb(240,240,240)', justifyContent: 'space-between' }}>
                                                    {
                                                        select == 'dis' ?
                                                            <>
                                                                <View style={{ marginTop: hp('1%'), backgroundColor: '#ECECEC', height: hp('8%'), width: wp('38.4%'), flexDirection: 'row' }}>
                                                                    <Text style={{ alignSelf: 'center', flex: 1, fontSize: wp('1.3%'), color: '#c4c4c4', marginLeft: wp('3%') }}>ENTER DISCOUNT</Text>

                                                                    <View style={{ marginRight: wp('5%'), justifyContent: 'center' }}>
                                                                        <SwitchButton
                                                                            onValueChange={onToggleSwitch}
                                                                            value={isSwitchOn}
                                                                            text1='$'
                                                                            text2='%'
                                                                            switchWidth={80}
                                                                            switchHeight={45}
                                                                            switchdirection='rtl'
                                                                            switchBorderRadius={110}
                                                                            switchSpeedChange={500}
                                                                            switchBorderColor='#b1b1b1'
                                                                            switchBackgroundColor='#fff'
                                                                            btnBorderColor='#FF2E2E'
                                                                            btnBackgroundColor='#FF2E2E'
                                                                            fontColor='#FF2E2E'
                                                                            fontSize={100}
                                                                            activeFontColor='white'

                                                                        />

                                                                        {isSwitchOn === true ? console.log('view1') : console.log('view2')}

                                                                    </View>

                                                                </View>
                                                                {/* <Text>{isSwitchOn == true ? <Text style={{ fontSize: wp('2%') }}>%</Text> : <Text style={{ fontSize: wp('2%') }}>$</Text>}</Text> */}
                                                            </>
                                                            : select == 'cash' ?
                                                                <View style={{ marginTop: hp('2%'), backgroundColor: '#ECECEC', height: hp('10%'), width: wp('38.4%'), flexDirection: 'row' }}>
                                                                    <Text style={{ alignSelf: 'center', flex: 1, fontSize: wp('1.3%'), color: '#c4c4c4', marginLeft: wp('3%') }}>ENTER QUANTITY</Text>
                                                                </View>
                                                                : select == 'phone' ?
                                                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('0%'), backgroundColor: '#ECECEC', height: hp('10%'), width: wp('38.4%'), flexDirection: 'row' }}>
                                                                        <Text style={{ flex: 1, fontSize: wp('1.3%'), marginLeft: wp('3%'), color: '#c4c4c4' }}>ENTER PHONE NUMBER</Text>
                                                                        {contactDetails == 405 && notFound == 1 && select == "phone" ?
                                                                            <View style={{ width: wp('12%'), alignItems: 'center', borderColor: '#C80101', borderRadius: 15, borderWidth: 1, marginRight: wp('2%'), justifyContent: 'center', marginTop: hp('1%') }}>
                                                                                <Text style={{ color: "#C80101" }}>
                                                                                    RECORD NOT FOUND
                                                                                </Text>
                                                                            </View> : null}
                                                                    </View> : null

                                                    }

                                                </View>

                                                <View style={{ marginTop: hp('2%'), backgroundColor: '#ECECEC', height: hp('17.5%'), width: wp('38.5%'), flexDirection: 'row' }}>
                                                    {select == 'dis' ?
                                                        <TextInput placeholder="0.00" placeholderTextColor='black' style={{ fontWeight: '700', fontSize: wp('4%'), marginLeft: wp('3%') }} >{dis}</TextInput> :
                                                        select == 'cash' ?
                                                            <TextInput placeholder="0" placeholderTextColor='black' style={{ fontWeight: '700', fontSize: wp('4%'), marginLeft: wp('3%') }} >{value}</TextInput> :
                                                            select == 'phone' ?
                                                                <TextInput placeholder=" " style={{ fontSize: wp('4%'), marginLeft: wp('3%') }} >{phone}</TextInput> :
                                                                null}
                                                </View>




                                                <View
                                                    style={{ width: wp('38%'), height: hp('58.5%') }}
                                                >


                                                    <View style={{ flexDirection: 'row', width: wp('39%'), borderTopWidth: 1, borderColor: '#CCCCCC', backgroundColor: 'white' }}>

                                                        <TouchableOpacity style={{ width: wp('11.7%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderRightWidth: 1 }}
                                                            onPress={() => concatinate('1')}>
                                                            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>1</Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={{ width: wp('11.7%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', }}
                                                            onPress={() => concatinate('2')}>
                                                            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>2</Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={{ width: wp('11.7%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderLeftWidth: 1 }}
                                                            onPress={() => concatinate('3')}>
                                                            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', }}>3</Text>
                                                        </TouchableOpacity>


                                                    </View>




                                                    <View style={{ flexDirection: 'row', width: wp('39%'), borderTopWidth: 1, borderColor: '#CCCCCC', backgroundColor: 'white' }}>

                                                        <TouchableOpacity style={{ width: wp('11.7%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderRightWidth: 1 }}
                                                            onPress={() => concatinate('4')}>
                                                            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>4</Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={{ width: wp('11.7%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', }}
                                                            onPress={() => concatinate('5')}>
                                                            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>5</Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={{ width: wp('11.7%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderLeftWidth: 1 }}
                                                            onPress={() => concatinate('6')}>
                                                            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', }}>6</Text>
                                                        </TouchableOpacity>


                                                    </View>


                                                    <View style={{ flexDirection: 'row', width: wp('39%'), borderTopWidth: 1, borderColor: '#CCCCCC', backgroundColor: 'white' }}>

                                                        <TouchableOpacity style={{ width: wp('11.7%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderRightWidth: 1 }}
                                                            onPress={() => concatinate('7')}>
                                                            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>7</Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={{ width: wp('11.7%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', }}
                                                            onPress={() => concatinate('8')}>
                                                            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>8</Text>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={{ width: wp('11.7%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderLeftWidth: 1 }}
                                                            onPress={() => concatinate('9')}>
                                                            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', }}>9</Text>
                                                        </TouchableOpacity>


                                                    </View>



                                                    <View style={{ flexDirection: 'row', width: wp('39%'), borderTopWidth: 1, borderColor: '#CCCCCC', backgroundColor: 'white' }}>


                                                        <TouchableOpacity style={{ borderBottomWidth: 1, width: wp('11.7%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderRightWidth: 1 }}
                                                            onPress={() => {
                                                                concatinate('del');
                                                                counter = 0;
                                                                // console.log('dot ki value zero krni hai', counter)
                                                            }}>
                                                            <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold' }}>CLEAR</Text>
                                                        </TouchableOpacity>



                                                        <TouchableOpacity style={{ borderColor: '#CCCCCC', borderBottomWidth: 1, width: wp('11.7%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center' }}
                                                            onPress={() => concatinate('0')}>
                                                            <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', }}>0</Text>
                                                        </TouchableOpacity>



                                                        <TouchableOpacity disabled={counter > 0 ? true : false} style={{ borderBottomWidth: 1, width: wp('11.7%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderLeftWidth: 1 }}
                                                            onPress={() => {
                                                                concatinate('.')
                                                                counterAdd()
                                                            }}>

                                                            <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold', }}>.</Text>
                                                        </TouchableOpacity>
                                                    </View>


                                                    {/* {contactDetails == 405 && notFound == 1 && select == "phone" ?
                                                        <View style={{ justifyContent: 'center', marginTop: hp('1%') }}>
                                                            <Text style={{ color: "#C80101" }}>
                                                                RECORD NOT FOUND
                                                            </Text>
                                                        </View> : null} */}
                                                    <View style={{ flexDirection: 'row', height: hp('12%'), width: wp('39%'), backgroundColor: 'white', }}>
                                                        <TouchableOpacity disabled={counter > 0 ? true : false} style={{ width: wp('11.7%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center' }}
                                                            onPress={() => {
                                                                dispatch(SetSelect('Burger'));
                                                                setDis(0);
                                                                setValue(1);
                                                            }}>

                                                            <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold', }}>BACK</Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={{ width: wp('26%'), backgroundColor: '#FF2E2E', height: hp('12%'), justifyContent: 'center' }}
                                                            onPress={() => {

                                                                select == 'dis' ?
                                                                    <>
                                                                        {dispatch(SetSelect('Burger')),
                                                                            item_Dis(),
                                                                            setIsSwitchOn(false)}
                                                                    </>
                                                                    :
                                                                    select == 'cash' ?
                                                                        <>
                                                                            {dispatch(SetSelect('Burger')),
                                                                                item_qty(selectedIndex)

                                                                            }
                                                                        </>
                                                                        :
                                                                        sendPhone();
                                                                setNotFound(1)
                                                                setDetails(1);
                                                                setDis(0);
                                                                setValue(1);


                                                            }}
                                                        >
                                                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('2%') }}>ENTER</Text>
                                                        </TouchableOpacity>

                                                    </View>
                                                </View>



                                            </> :
                                            select == 'Additems' ?
                                                <View style={{ flex: 1 }}>

                                                    <Modal

                                                        animationType="fade"

                                                        transparent={true}
                                                        visible={modalPax}
                                                        onRequestClose={() => {

                                                            setModalPax(!modalPax);
                                                        }}
                                                    >

                                                        <View style={{
                                                            shadowColor: "#000",
                                                            shadowOffset: {
                                                                width: 10,
                                                                height: 10
                                                            },
                                                            shadowOpacity: 0.25,
                                                            shadowRadius: 4,
                                                            elevation: 8, borderRadius: 3, alignSelf: 'center', backgroundColor: 'white', width: wp('30%'), height: hp('50%'), marginTop: hp('15%')
                                                        }}>

                                                            <TouchableOpacity style={{ alignSelf: 'flex-end', width: wp('4%'), height: hp('5%'), marginRight: wp('1%'), marginTop: hp('1%') }}
                                                                onPress={() => {
                                                                    setModalPax(false);

                                                                }}>
                                                                <Image source={require('../../assets/cross2.png')} resizeMode="contain" style={{ width: wp('5%'), height: hp('5%') }} />
                                                            </TouchableOpacity>

                                                            <Text style={{ marginTop: hp('3%'), alignSelf: 'center', color: '#FC3F3F', fontSize: wp('2.5%') }}>Quantity</Text>

                                                            <View style={{ marginTop: hp('5%'), marginBottom: hp('5%'), marginLeft: wp('4%'), flexDirection: 'row', width: wp('10%'), height: hp('10%') }}>

                                                                <TouchableOpacity style={{ alignSelf: 'flex-start', width: wp('10%'), height: hp('10%') }} onPress={() => decrement()} >
                                                                    <Image source={require('../../assets/minus.jpg')} resizeMode="contain" style={{ width: wp('10%'), height: hp('10%'), alignSelf: 'center' }} />
                                                                </TouchableOpacity>

                                                                <TouchableOpacity style={{ justifyContent: 'center' }}>
                                                                    <Text style={{ alignSelf: 'center', color: '#FC3F3F', fontSize: wp('2.5%') }}>{paxCount}</Text>
                                                                </TouchableOpacity>

                                                                <TouchableOpacity style={{ alignSelf: 'flex-end', width: wp('10%'), height: hp('10%') }} onPress={() => increment()}>
                                                                    <Image source={require('../../assets/plus_c.jpg')} resizeMode="contain" style={{ width: wp('10%'), height: hp('10%'), alignSelf: 'center' }} />
                                                                </TouchableOpacity>




                                                            </View>
                                                            <TouchableOpacity onPress={() => {
                                                                setModalPax(false);
                                                                AdditionalItems(selectedIndex);
                                                                setP(p + (parseInt(price) * paxCount));
                                                                TotalSum = TotalSum + parseFloat(price);
                                                                dispatch(SetTotal2(p + (parseInt(price) * paxCount)));

                                                            }}
                                                                style={{
                                                                    alignSelf: 'center', backgroundColor: '#FC3F3F', alignItems: 'center', borderRadius: 5, justifyContent: 'center', height: hp('10%'), width: wp('20%')
                                                                }} >
                                                                <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: 'white' }}>Confirm</Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                    </Modal>

                                                    <Modal
                                                        animationType="fade"

                                                        transparent={true}
                                                        visible={modalPax1}
                                                        onRequestClose={() => {

                                                            setModalPax1(!modalPax1);
                                                        }}
                                                    >

                                                        <View style={{
                                                            shadowColor: "#000",
                                                            shadowOffset: {
                                                                width: 10,
                                                                height: 10
                                                            },
                                                            shadowOpacity: 0.25,
                                                            shadowRadius: 4,
                                                            elevation: 8, borderRadius: 3, alignSelf: 'center', backgroundColor: 'white', width: wp('30%'), height: hp('50%'), marginTop: hp('15%')
                                                        }}>

                                                            <TouchableOpacity style={{ alignSelf: 'flex-end', width: wp('4%'), height: hp('5%'), marginRight: wp('1%'), marginTop: hp('1%') }}
                                                                onPress={() => {
                                                                    setModalPax1(false);

                                                                }}>
                                                                <Image source={require('../../assets/cross2.png')} resizeMode="contain" style={{ width: wp('5%'), height: hp('5%') }} />
                                                            </TouchableOpacity>

                                                            <Text style={{ marginTop: hp('3%'), alignSelf: 'center', color: '#FC3F3F', fontSize: wp('2.5%') }}>Quantity</Text>

                                                            <View style={{ marginTop: hp('5%'), marginBottom: hp('5%'), marginLeft: wp('4%'), flexDirection: 'row', width: wp('10%'), height: hp('10%') }}>

                                                                <TouchableOpacity style={{ alignSelf: 'flex-start', width: wp('10%'), height: hp('10%') }} onPress={() => decrement1()} >
                                                                    <Image source={require('../../assets/minus.jpg')} resizeMode="contain" style={{ width: wp('10%'), height: hp('10%'), alignSelf: 'center' }} />
                                                                </TouchableOpacity>

                                                                <TouchableOpacity style={{ justifyContent: 'center' }}>
                                                                    <Text style={{ alignSelf: 'center', color: '#FC3F3F', fontSize: wp('2.5%') }}>{paxCount1}</Text>
                                                                </TouchableOpacity>

                                                                <TouchableOpacity style={{ alignSelf: 'flex-end', width: wp('10%'), height: hp('10%') }} onPress={() => increment1()}>
                                                                    <Image source={require('../../assets/plus_c.jpg')} resizeMode="contain" style={{ width: wp('10%'), height: hp('10%'), alignSelf: 'center' }} />
                                                                </TouchableOpacity>




                                                            </View>
                                                            <TouchableOpacity onPress={() => {
                                                                setModalPax1(false);

                                                            }}
                                                                style={{
                                                                    alignSelf: 'center', backgroundColor: '#FC3F3F', alignItems: 'center', borderRadius: 5, justifyContent: 'center', height: hp('10%'), width: wp('20%')
                                                                }} >
                                                                <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: 'white' }}>Confirm</Text>
                                                            </TouchableOpacity>
                                                        </View>

                                                    </Modal>

                                                    <FlatList
                                                        data={response}
                                                        renderItem={({ item }) => (
                                                            <>
                                                                <View style={{ justifyContent: 'center', height: hp('5%'), width: wp('35%') }}>
                                                                    <Text style={{ marginLeft: wp('1%'), fontWeight: 'bold', fontSize: wp('1.5%'), color: 'gray' }}>{item.name}</Text>

                                                                </View>
                                                                <View style={{ height: hp('15%'), width: wp('35%') }}>
                                                                    <FlatList
                                                                        data={item.var}
                                                                        numColumns={3}
                                                                        spacing={100}
                                                                        renderItem={({ item, index }) => (
                                                                            <>

                                                                                <TouchableOpacity style={{ backgroundColor: btn == item.var_id ? '#FC3F3F' : 'white', marginLeft: wp('0.9%'), marginTop: hp('2%'), borderRadius: 3, borderWidth: 1, borderColor: '#FC3F3F', width: wp('10.5%'), height: hp('6.5%'), justifyContent: 'center' }}
                                                                                    onPress={() => {
                                                                                        setModalPax(true)

                                                                                        setBtn(item.var_id);

                                                                                        name = item.name;
                                                                                        price = item.price;

                                                                                    }}>

                                                                                    <Text style={{
                                                                                        alignSelf: 'center',
                                                                                        fontWeight: '600',
                                                                                        fontSize: wp('1.2%'), color: btn == item.var_id ? 'white' : '#FC3F3F'
                                                                                    }}>{item.name}</Text>


                                                                                </TouchableOpacity>
                                                                                {btn == item.var_id ?
                                                                                    <TouchableOpacity onPress={() => { setModalPax(true) }} style={{
                                                                                        marginLeft: wp('-2%'), marginTop: hp('1%'), alignItems: 'center', backgroundColor: 'white', borderColor: '#FC3F3F', borderWidth: 1, borderRadius: 20, width: wp('2.8% '), height: hp('4.4% ')
                                                                                    }}>
                                                                                        < Text style={{ marginTop: hp('0.3%'), fontSize: wp('1.5%'), marginRight: wp('0.2%'), color: '#FC3F3F' }} >{paxCount}</Text>
                                                                                    </TouchableOpacity> : null}

                                                                            </>
                                                                        )}
                                                                    />
                                                                </View>
                                                            </>
                                                        )}

                                                    />



                                                    <View style={{ marginTop: hp('1%'), marginLeft: wp('1%'), justifyContent: 'center', height: hp('5%'), width: wp('30%') }}>
                                                        <Text style={{ fontSize: wp('1.5%'), color: 'gray' }}>Comment</Text>
                                                    </View>

                                                    <View style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: '#EEEEEE', height: hp('8%'), width: wp('45%') }}>
                                                        <Text style={{ marginLeft: wp('1%'), fontSize: wp('1.3%'), color: '#767676', fontWeight: '500' }}>{props.itemName}</Text>
                                                        <Text style={{ marginLeft: wp('3%'), fontFamily: 'roboto', fontSize: wp('1.3%'), color: '#767676', fontWeight: '700' }}>${props.itemPrice}</Text>
                                                    </View>

                                                    <View style={{ borderColor: 'black', alignItems: 'center', flexDirection: 'row', height: hp('10%') }}>
                                                        <TouchableOpacity style={{ margin: hp('1%'), borderRadius: 3, elevation: 2, width: wp('10%'), height: hp('6%'), justifyContent: 'center' }}
                                                            onPress={() => {

                                                                dispatch(SetSelect('Burger'));
                                                            }}
                                                        >

                                                            <Text style={{
                                                                alignSelf: 'center',
                                                                fontWeight: '700',
                                                                fontSize: wp('1.3%'), color: '#FC3F3F'
                                                            }}>BACK</Text>


                                                        </TouchableOpacity>

                                                        <TouchableOpacity style={{ backgroundColor: '#FFA64D', margin: hp('1%'), borderRadius: 3, width: wp('10%'), height: hp('6%'), justifyContent: 'center' }}
                                                            onPress={() => {
                                                                ServeLater('#FFA64D');
                                                                dispatch(SetSelect('Burger'));
                                                            }}
                                                        >

                                                            <Text style={{
                                                                alignSelf: 'center',
                                                                fontWeight: '700',
                                                                fontSize: wp('1.2%'), color: 'white',
                                                                fontFamily: 'Roboto',
                                                            }}>SERVE LATER</Text>


                                                        </TouchableOpacity>

                                                        <TouchableOpacity
                                                            onPress={() => {

                                                                dispatch(SetSelect('Burger'));
                                                            }}
                                                            style={{ backgroundColor: '#FC3F3F', margin: hp('1%'), borderRadius: 3, width: wp('10%'), height: hp('6%'), justifyContent: 'center' }}>

                                                            <Text style={{
                                                                alignSelf: 'center',
                                                                fontWeight: '700',
                                                                fontSize: wp('1.2%'), color: 'white',
                                                                fontFamily: 'Roboto'
                                                            }}>SERVE NOW</Text>


                                                        </TouchableOpacity>

                                                    </View>



                                                </View> : null}

                                </View>
                            </View> : state == 'Takeway' ?
                                <Takeway branch={br} idUser={props.userId} />
                                :
                                state == 'Main' ? <MainDashborad br={br} Key={Id} />
                                    :
                                    state == 'blue' ? <App br={br} Key={Id} Empty={Empty} />
                                        :

                                        null
                        }

                        {renderVariantModal()}
                    </>
            }</>
    );
}

export default SubTakeway;

const styles = {
    textStyle: {
        fontSize: wp('1.3%')
    },
    viewStyle: {
        justifyContent: 'center'
        // marginTop: hp('1.3%'),
        // borderRightWidth: 1,

    },
    viewbtnStyle: {
        marginLeft: wp('1.3%'),
        marginTop: hp('1.3%'),
        width: wp('8%'),
        height: hp('5%'),
    },

    vStyle: {
        flexDirection: 'row',
        height: hp('3.5%')

    },
    Tstyle: {
        alignSelf: "center",
        fontSize: wp('1.1%')
    },
    fbtnStyle: {
        width: wp('17%'),
        height: hp('6%'),
        borderRadius: 3,
        backgroundColor: '#E01E26',
        justifyContent: 'center'
    },
    Card: {
        width: wp('10%'),
        height: hp('12%'),
        marginTop: hp('1.3%'),
        justifyContent: 'center',
        borderRadius: 4,
        alignItems: 'center'

    },
    CardText: {

        color: 'white',
        fontWeight: 'bold',
        fontSize: wp('1.2%')
    },
    container: {
        flex: 1,
        backgroundColor: "#ffffff",

    },
    container1: {
        borderRadius: 10,
        alignSelf: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#b5b5b5",
        width: "60%",
        height: "80%",
        marginRight: wp('15%'),
        marginLeft: wp('15%'),
    },
    UserView: {
        borderRadius: 40,
        alignSelf: "center",
        justifyContent: "center",
        width: 75,
        height: 75,
        marginLeft: 10,
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
    UserViewText: {
        color: "#ab8081",
        fontWeight: "bold",
        marginTop: 5,
        fontSize: 12,
    },

    NumberTextStyle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 25,
        alignSelf: "center",
    },

    PinView: {

        width: 25,
        height: 25,
        marginLeft: 5,
        borderWidth: 1,
        borderRadius: 25
    },
    modalView: {
        marginTop: hp('25%'),
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        height: hp('38%'),
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