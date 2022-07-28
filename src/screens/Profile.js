import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from "react";
import { TextInput, FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RNPrint from 'react-native-print';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import CustomActivityIndicator from "../components/generic/CustomActivityIndicator";
import { SetSale_his } from '../Redux/Reducers/mainReducer';
import APIHandler from "../utils/APIHandler";
import { Close_print, Re_print, SALE_HISTORY, SALE_HISTORY_DETAIL, Table_return, Item_Refund } from "../utils/urls";
import Delivery from './Delivery';
import MainDashboard from './Dinning';
import Pickup from './Pickup';
import SubTakeway from './Dinning/SubTakeway';
import Takeway from './Takeway';



const Profile = (props, route) => {
    const { s_id } = useSelector(state => state.root.main);
    const sUid = () => {

        let params = {
            stf_id: s_id,
        };

        APIHandler.hitApi(Close_print, 'POST', params).then(response => setSlip(response));


    };

    const closePrint = async printRemotePDF => {
        await RNPrint.print({ filePath: slip.url })
    }

    const dispatch = useDispatch()
    const { sel, stf_id, sale_his, loc_id, } = useSelector((state) => state.root.main);

    const navigation = useNavigation();
    const br = route.params?.Loc_id;
    const Key = route.params?.userid;
    const [branch, setBranch] = useState("branch");
    const [saleOrders, setSaleOrders] = useState({ "arr": [{ "TimeStamp": "May 20 2021 07.55.pm", "id": 745, "key": 0, "member": 3, "table": "T3", "total": "20.00", "type": "Dine In" }, { "TimeStamp": "May 20 2021 06.31.pm", "id": 744, "key": 1, "member": 2, "table": "T2", "total": "14.00", "type": "Dine In" }, { "TimeStamp": "May 20 2021 06.30.pm", "id": 743, "key": 2, "member": 3, "table": "T3", "total": "20.00", "type": "Dine In" }], "card": 0, "cash_amount": 54, "float": 9000, "total": 54 });
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderType, setOrderType] = useState(1);
    const [orderDate, setOrderDate] = useState();
    const [value, setValue] = useState();
    const [pid, setPid] = useState();
    const [time, setTime] = useState('Select Order');
    const [table, setTable] = useState('');
    const [pax, setPax] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [state, setState] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [modal2Open, setModal2Open] = useState(false);
    // const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [text, setText] = useState('Select Type');
    const [backgroundcolor, setbackgroundColor] = useState('white');
    const [textColor, setTextColor] = useState('#FC3F3F');
    const [back, setBack] = useState(0);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const [dat, setDat] = useState();

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(Platform.OS === 'ios' ? true : false);
    };


    const showMode = currentMode => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
        setOrderDetails([]);
    };


    const formatDate = (date) => {
        return `${date.getDate()}/${date.getMonth() +
            1}/${date.getFullYear()}`;
    };
    const tableReturn = () => {
        let param = {
            id: pid
        };

        APIHandler.hitApi(Table_return, 'POST', param)
            .then(response => {
                console.log("Tables Return Order", response);
            }
            );

    }


    const [item_id, setItem_id] = useState();
    const [item_qty, setItem_qty] = useState();
    const [switched, setSwitched] = useState(false);
    const ItemIndividualReturn = () => {
        let param = {
            id: pid,
            item_id: item_id,
            return_item_qty: item_qty,
            loc_id: loc_id,
        };

        APIHandler.hitApi(Item_Refund, 'POST', param)
            .then(response => {
                console.log("Tables Individual Return Order", response);
            }
            );

    }

    const [load, setLoad] = useState(false);
    const reload = () => {
        setLoad(!load);
    }

    const callHistoryAPI = () => {
        let params = {
            stf_id: stf_id,
            type: orderType,
            date: `${date.getFullYear()}/${date.getMonth() +
                1}/${date.getDate()}}`,
        };

        setLoading(true);

        APIHandler.hitApi(SALE_HISTORY, 'POST', params).then(response => {
            setLoading(false);
            setSaleOrders(response);
            console.log(response);
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
            console.log('SALE _HISToRY', response);
        }).catch(error => {
            setLoading(false);
            // console.log(error);
        });
    };
    const [a, setA] = useState(0);
    useEffect(() => {

        if (a == 0) {
            let params = {
                stf_id: stf_id,
                type: orderType,
                date: null,
            };
            console.log("chalta ha bhai if ma b", a);
            setLoading(true);
            setA(1);
            APIHandler.hitApi(SALE_HISTORY, 'POST', params).then(response => {
                setLoading(false);
                setSaleOrders(response);
            }).catch(error => {
                setLoading(false);
                // console.log(error);
            });

        }
        else {
            callHistoryAPI();
            console.log("chalta ha bhai else my b", a);

        }

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

        var dateStr = n + "." + m + " " + date;
        setDat(dateStr);
    }, [date, load]);



    useEffect(() => {
        callHistoryAPI();
    }, [orderType, orderDate]);

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

    const [t, setT] = useState();
    const [total_dis, setTotal_dis] = useState();
    const renderOrdersItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{
                flexDirection: 'row',
                borderBottomWidth: 0.3,
                height: hp('9%'),
                borderBottomColor: 'rgb(230,230,230)',
                backgroundColor: index % 2 == 0 ? 'white' : '#F7F7F7'
            }}
                onPress={() => {
                    callDetailAPI(item.id);
                    setSwitched(false);
                    setTime(item.TimeStamp); setTable(item.table);
                    setPax(item.member);
                    setPid(item.id);
                    setT(item.total);
                    setTotal_dis(item.total_dis);
                    Re_Print();
                }}>
                <Text style={{
                    marginLeft: wp('1%'),
                    padding: '1%',
                    marginRight: wp('1%'),
                    color: 'black',
                    fontSize: wp('1.2%'),
                    fontWeight: '700',
                    borderRightWidth: 0.3, width: wp('3%'),

                }}>{index + 1}</Text>

                <Text style={{
                    padding: '2%', width: wp('20%'),
                    color: 'black',
                    fontSize: wp('1.2%'),
                    fontWeight: '700'
                }}>{item.TimeStamp}</Text>

                <Text style={[styles.ordersRowText, {

                    padding: '2%',
                    color: 'black',
                    fontSize: wp('1.2%'),
                    fontWeight: '700', width: wp('4.5%')
                }]}>{item.table}</Text>


                <Text style={{
                    padding: '2%',
                    color: 'black',
                    fontSize: wp('1.2%'),
                    fontWeight: '700', width: wp('4%')
                }}>{item.member}</Text>

                <Text style={{
                    padding: '2%',
                    color: 'black',
                    fontSize: wp('1.2%'),
                    fontWeight: '700', width: wp('7%')
                }}>{item.type}</Text>

                <Text style={{
                    color: '#FC3F3F',
                    padding: '2%',
                    width: "10%", fontSize: wp('1.2%'), fontWeight: '700'
                }}>{"$" + item.total}</Text>
            </TouchableOpacity >
        );
    };

    const renderDetailItem = ({ item, index }) => {
        console.log("ITEM.Qty Return is ===", item.qty_returned)
        return (
            <>
                {parseInt(item.qty_returned) < 1 ?
                    <>
                        <TouchableOpacity
                            onPress={() => {
                                setItem_id(item.id);
                                setItem_qty(item.qty);
                                setSwitched(true);
                            }}
                            style={{ flexDirection: 'row', backgroundColor: index % 2 == 0 ? 'rgba(244, 244, 244, 1)' : 'white' }}>
                            <View style={{
                                padding: '2%',
                                borderRightWidth: 0.3,
                                borderRightColor: 'gray',
                                width: wp('5%')
                            }}>
                                <Text style={{ fontSize: wp('1%'), fontWeight: 'bold', }}>{index + 1}</Text>
                            </View>

                            <View style={{
                                marginLeft: wp('1%'),
                                padding: '2%',
                                marginRight: wp('1%'),
                                borderRightColor: 'gray',
                                width: wp('13%')
                            }}>
                                <Text style={{ fontSize: wp('1%'), fontWeight: 'bold', }}>{item.product}</Text>
                            </View>
                            <View style={{
                                marginLeft: wp('1%'),
                                padding: '2%',
                                borderRightColor: 'gray',
                                marginRight: wp('1%'),
                                width: wp('7%')
                            }}>
                                <Text style={styles.textStyle}>{item.qty}</Text>
                            </View>
                            <View style={{
                                marginLeft: '1%',
                                padding: '2%',
                                borderRightColor: 'gray',
                                marginRight: '1%',
                                width: "20%", color: '#FC3F3F'
                            }}>
                                <Text style={[styles.textStyle, { color: '#FC3F3F' }]}>{"$" + item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                    : null}
            </>

        );

    }
    const updateIn = (s) => {
        dispatch(SetSale_his(s));
    };

    const TYPE_ARRAY = [
        {
            id: 1,
            value: "Dine in",
        },
        {
            id: 2,
            value: "Take away",
        },
        {
            id: 3,
            value: "Pickup",
        },
        {
            id: 4,
            value: "Delivery",
        },
    ];



    const [slip, setSlip] = useState();
    const Re_Print = () => {
        let params = {
            trans_id: pid,
        };
        APIHandler.hitApi(Re_print, 'POST', params).then(response => {

            setSlip(response.url);
        }).catch(error => {

            console.log(error);
        });
        console.log(slip)

    }

    const print = async printRemotePDF => {
        await RNPrint.print({ filePath: slip })
    }


    console.log('adress check', props.contactAddress1)

    return (
        <>
            {back == 1 ? <SubTakeway Pass='table' br={br} Table={table} pass="Main" userId={Key} /> :

                <View style={{ flex: 1 }}>

                    {sale_his == 0 ? <MainDashboard /> : sale_his == 1 ? <Takeway branch={br} idUser={Key} /> : sale_his == 2 ? <Delivery /> : sale_his == 3 ? <Pickup /> : sale_his == 4 ? <SubTakeway Pass='table' br={loc_id} User_id={stf_id} pass='Takeway' Table='Takeaway' userId={stf_id} table_pass='notable' /> : sale_his == 5 ?
                        <View style={styles.container}>

                            <View style={styles.centeredView}>
                                <Modal
                                    animationType="fade"
                                    transparent={true}
                                    visible={modalOpen}
                                    onRequestClose={() => {
                                        setModalOpen(!modalOpen);
                                    }} >
                                    <View style={styles.centeredView}>
                                        <View style={styles.modalView}>
                                            <TouchableOpacity onPress={() => setModalOpen(!modalOpen)}>
                                                <Image source={require('../assets/cross2.png')} style={styles.crossImage} />
                                            </TouchableOpacity>
                                            <View style={styles.innerModalView}>
                                                <Image source={require('../assets/confirm.jpg')} style={{ width: wp('17.5%'), height: hp('32.7%') }} resizeMode="contain" />
                                                <Text style={{ fontSize: wp('2%'), marginBottom: wp('1%'), textAlign: "center", fontWeight: 'bold' }}>Confirm Refund</Text>
                                                <Text style={{ fontSize: wp('2%'), marginBottom: wp('1%'), textAlign: "center", color: 'red', fontWeight: 'bold' }}>$ {t}</Text>
                                                <TouchableOpacity
                                                    style={[styles.button, styles.confirmbtn]}
                                                    onPress={() => {
                                                        setModalOpen(!modalOpen);
                                                        reload();
                                                    }}
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
                                                <FlatList
                                                    data={TYPE_ARRAY}
                                                    keyExtractor={item => item.id}
                                                    renderItem={({ item }) => {
                                                        return (
                                                            <TouchableOpacity
                                                                style={[styles.button, styles.modal2Btn]}
                                                                onPress={() => {
                                                                    setText(item.value);
                                                                    setbackgroundColor('#FFA64D');
                                                                    setTextColor('white');
                                                                    setModal2Open(!modal2Open);
                                                                    setOrderType(item.id);
                                                                    setValue(item.id);
                                                                    setOrderDetails([]);
                                                                }}>
                                                                <Text style={styles.modal2Text}>{item.value}</Text>
                                                            </TouchableOpacity>
                                                        );
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </Modal>
                            </View>

                            <View style={{ borderRightColor: 'grey', borderRightWidth: 0.5, flex: 0.5, backgroundColor: 'white' }}>
                                <View style={{ flexDirection: 'row', backgroundColor: '#F7F7F7', padding: '1.5%', alignContent: 'center' }}>
                                    <TouchableOpacity style={{
                                        width: wp('10%'),
                                        height: hp('6.4%'),
                                        justifyContent: 'center',
                                        borderRadius: 5,
                                        borderColor: '#FC3F3F',
                                        borderWidth: 1,
                                        marginRight: wp('1%'),
                                        marginTop: hp('1%')
                                    }}
                                        onPress={() => {
                                            setBack(1);
                                        }}
                                    >
                                        <Text style={{
                                            color: '#FC3F3F',
                                            fontSize: wp('1.3%'),
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                        }}>Back</Text>
                                    </TouchableOpacity>

                                    <Text style={{
                                        marginLeft: wp('8%')
                                        , alignSelf: 'center',
                                        color: 'black',
                                        fontSize: wp('1.6%'),
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                    }}>CUSTOMER PROFILE</Text>
                                </View>

                                {/* {renderOrderListHeader()} */}
                                {value == 2 ?
                                    <View style={{ borderTopColor: '#d3d3d3', borderTopWidth: 1, backgroundColor: '#F7F7F7', flexDirection: 'row', height: hp('8%') }}>
                                        <Text style={{ marginLeft: wp('0.3%'), fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('4.9%'), padding: '2%' }}>No</Text>
                                        <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('26.1%'), padding: '2%' }}>Time</Text>
                                        <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('8.45%'), padding: '2%' }}>Order Type</Text>
                                        <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('8.8%'), padding: '2%' }}>Bill Amount</Text>
                                    </View>
                                    :
                                    <View style={{ borderTopColor: '#d3d3d3', backgroundColor: '#F7F7F7', borderTopWidth: 1, flexDirection: 'row', height: hp('8%') }}>
                                        <Text style={{ marginLeft: wp('0.3%'), fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('4.9%'), padding: '2%' }}>No</Text>
                                        <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('19%'), padding: '2%' }}>Time Stamp</Text>
                                        <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('5.2%'), padding: '2%' }}>Table</Text>
                                        <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('4.3%'), padding: '2%' }}>Pax</Text>
                                        <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('4.9%'), padding: '2%' }}>Type</Text>
                                        <Text style={{ fontSize: wp('1.3%'), color: 'gray', fontWeight: 'bold', width: wp('10%'), padding: '2%' }}>Bill Amount</Text>
                                    </View>



                                }

                                <View style={{ borderWidth: 1, borderColor: '#d3d3d3', elevation: 1, height: hp('35%'), width: wp('64%') }}>
                                    {saleOrders.arr.length > 0 ?
                                        <FlatList
                                            data={saleOrders.arr}
                                            keyExtractor={item => item.key}
                                            renderItem={renderOrdersItem}
                                        />

                                        :

                                        <Text style={{ alignSelf: 'center', color: 'grey', marginLeft: '-22%' }}>According to this Date there is no record to found</Text>
                                    }
                                    {/* <FlatList
                data={saleOrders.arr}
                keyExtractor={item => item.key}
                renderItem={renderOrdersItem}
              /> */}
                                </View>


                                <View style={{ borderTopWidth: 1, borderColor: '#A4A4A4', flexDirection: 'row', flex: 1, height: hp('21%') }}>
                                    <View style={{ backgroundColor: '#F7F7F7', flex: 0.5, height: hp('21%') }}>
                                        <>


                                            <View style={{ flexDirection: 'row', alignSelf: 'center', width: wp('20%'), height: hp('6%'), justifyContent: 'space-between' }}>
                                                <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold', fontSize: wp('1.2%') }}>{props.contactName}</Text>
                                                <TouchableOpacity style={{ backgroundColor: '#FC3F3F', width: wp('7.5%'), height: hp('5%'), justifyContent: 'center', borderRadius: 5, alignSelf: 'center' }}
                                                    onPress={() => {
                                                        // setState('Profile');
                                                    }}
                                                >
                                                    <Text style={{ alignSelf: 'center', fontWeight: '600', fontSize: wp('1.2%'), color: 'white' }}>Profile</Text>
                                                </TouchableOpacity>
                                            </View>


                                            <View style={{ justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#E2E2E2', height: hp('8%') }}>
                                                <View style={{ alignSelf: 'center', width: wp('20%'), height: hp('6%'), justifyContent: 'center' }}>

                                                    {props.contactAddress1 == null ?
                                                        <Text style={{ color: '#FC3F3F', marginTop: '1%', fontSize: wp('1%') }}>No Address 1 Found</Text>
                                                        : null
                                                        // <Text style={{ color: '#9B9B9B', marginTop: '1%', fontSize: wp('1%') }}>{contactDetails.map(i => i.address_line_1)}</Text>
                                                    }
                                                    {props.contactAddress2 == null ?
                                                        <Text style={{ color: '#FC3F3F', marginTop: '1%', fontSize: wp('1%') }}>No Address 2 Found</Text>
                                                        : null
                                                        // <Text style={{ color: '#9B9B9B', marginTop: '1%', fontSize: wp('1%') }}>{contactDetails.map(i => i.address_line_2)}</Text>
                                                    }
                                                </View>
                                            </View>

                                            <View style={{ justifyContent: 'center', borderTopWidth: 1, borderColor: '#E2E2E2', height: hp('5%'), flexDirection: 'row' }}>
                                                <View style={{ alignSelf: 'center', flexDirection: 'row', width: wp('10%'), height: hp('4%'), justifyContent: 'center' }}>
                                                    <Text style={{ alignSelf: 'center', color: '#9B9B9B', fontSize: wp('1%'), }}>Expire:   </Text>
                                                    <Text style={{ alignSelf: 'center', color: 'black', fontWeight: '600', fontSize: wp('1.4%') }}>24/02/21</Text>

                                                </View>

                                                <View style={{ alignSelf: 'center', flexDirection: 'row', width: wp('10%'), height: hp('4%'), justifyContent: 'center' }}>
                                                    <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: wp('1%'), color: '#9B9B9B' }}>POINTS:   </Text>
                                                    <Text style={{ alignSelf: 'center', color: '#FC3F3F', fontWeight: 'bold', fontSize: wp('2%') }}>30</Text>

                                                </View>
                                            </View>
                                        </>
                                    </View>
                                    <View style={{ backgroundColor: '#F7F7F7', flex: 0.5, height: hp('21%'), borderLeftWidth: 1, borderLeftColor: '#CDCDCD', alignContent: 'center' }}>


                                        <View style={{ marginTop: hp('1%'), marginLeft: wp('2%'), marginRight: wp('2%') }}>

                                            <View style={styles.vStyle}>
                                                <Text style={{ fontSize: wp('1.1%'), color: '#9B9B9B', fontWeight: 'bold' }}>No. of Purchases:</Text>
                                                <Text style={{ fontSize: wp('1.1%'), color: '#626262', fontWeight: 'bold' }}>12</Text>

                                            </View>

                                            <View style={[styles.vStyle, { marginTop: hp('3%') }]}>
                                                <Text style={{ fontSize: wp('1.1%'), color: '#9B9B9B', fontWeight: 'bold' }}>Lowest spend:</Text>
                                                <Text style={{ fontSize: wp('1.1%'), color: '#626262', fontWeight: 'bold' }}>${parseFloat(20).toFixed(2)}</Text>
                                            </View>

                                            <View style={styles.vStyle}>
                                                <Text style={{ fontSize: wp('1.1%'), color: '#9B9B9B', fontWeight: 'bold' }}>Highest spend:</Text>
                                                <Text style={{ fontSize: wp('1.1%'), color: '#626262', fontWeight: 'bold' }}>${parseFloat(500).toFixed(2)}</Text>
                                            </View>

                                            <View style={[styles.vStyle, { marginTop: hp('0.1%') }]}>
                                                <Text style={{ fontSize: wp('1.1%'), color: 'black', fontWeight: 'bold' }}>Avg spend:</Text>
                                                <Text style={{ fontSize: wp('1.8%'), color: '#FC3F3F', fontWeight: 'bold' }}>${parseFloat(235).toFixed(2)}</Text>

                                            </View>
                                        </View>
                                        {/* <View style={{ flexDirection: 'row', marginLeft: wp('2%'), marginRight: wp('2%') }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', flex: 1, alignSelf: "center", fontSize: wp('1.5%') }} >Total:</Text>
                  <Text style={{ fontSize: wp('1.5%'), alignSelf: 'center', color: 'red' }}>$.00</Text>
                </View> */}

                                    </View>
                                </View>


                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={styles.generateBtn}
                                        //  onPress={() => dispatch(SetSale_his(4))}>
                                        onPress={() => {
                                            //  sUid(),
                                            // closePrint() 
                                            setState('Note');

                                        }}>

                                        <Text style={styles.GenerateText}>ADD NOTE</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.TypeBtn, { backgroundColor: backgroundcolor }]}
                                        onPress={() => setModal2Open(true)}>

                                        <Text style={[styles.TypeText, { color: textColor }]}>{text}</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.DateBtn}
                                        onPress={showDatepicker}
                                    >
                                        <Text style={styles.DateText}>{formatDate(date)}</Text>
                                    </TouchableOpacity>

                                    {/* <TouchableOpacity style={styles.DateBtn}
                                        onPress={showDatepicker}
                                    >
                                        {/* <Text style={styles.DateText}>{formatDate(date)}</Text> */}
                                    {/* <Text style={styles.DateText}>Select Date</Text>
                                    </TouchableOpacity> */}

                                </View>
                            </View>


                            {/* OrderDetails */}
                            <View style={{ flex: 0.5, borderLeftWidth: 1, borderColor: '#A7A7A7', backgroundColor: 'white' }}>
                                {state == 'Note' ?
                                    <>
                                        <View style={{ marginTop: hp('2%'), marginLeft: wp('1%') }}>
                                            <Text style={{ color: 'black', fontSize: wp('1%'), fontWeight: 'bold' }}>Note:</Text>
                                        </View>

                                        <View style={{ backgroundColor: '#f1f1f1', marginTop: hp('1%'), marginBottom: hp('1%'), marginRight: wp('2%'), marginLeft: hp('2%'), height: hp('70%'), width: wp('48%'), }}>
                                            <TextInput placeholder='Enter Notes Here' placeholderTextColor='#AAAAA' style={{ fontSize: wp('1%'), marginLeft: hp('2%'), backgroundColor: '#f1f1f1', height: hp('10%'), width: wp('46%') }}></TextInput>
                                        </View>
                                        <View
                                            style={{ flexDirection: 'row', marginTop: hp('0.1%'), height: hp('8%'), width: wp('50%'), }}>
                                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', height: hp('9%'), width: wp('17%'), }}
                                                onPress={() => {
                                                    setState('Back');
                                                }}
                                            >
                                                <Text style={{ fontWeight: '600', fontSize: wp('1.5%'), color: '#FC3F3F' }}>BACK</Text>
                                            </TouchableOpacity >
                                            <TouchableOpacity style={{ backgroundColor: '#FC3F3F', justifyContent: 'center', alignItems: 'center', height: hp('9%'), width: wp('33%'), }}
                                                onPress={() => {
                                                    setState('Save');
                                                }}
                                            >
                                                <Text style={{ fontWeight: 'bold', fontSize: wp('1.5%'), color: 'white' }}>SAVE</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                    : state == 'Back' && state == 'Save' ?
                                        <>
                                            <View style={{ flexDirection: 'row', height: hp('13%'), justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: wp('1%'), fontWeight: 'bold' }}> {time}</Text>

                                                {value == 1 ?
                                                    <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> | </Text>
                                                    :
                                                    <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold', display: 'none' }}> | </Text>
                                                }
                                                <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold', color: '#FC3F3F' }}>{table} </Text>

                                                {value == 1 ?
                                                    <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> | </Text>
                                                    :
                                                    <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold', display: 'none' }}> | </Text>
                                                }
                                                <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> {pax} </Text>
                                            </View>

                                            <View style={{ marginLeft: wp('1%'), marginRight: wp('1%'), height: wp('18%') }}>


                                                {orderDetails.length > 0 ?
                                                    <FlatList
                                                        data={orderDetails}
                                                        keyExtractor={item => item.id}
                                                        renderItem={renderDetailItem} /> :
                                                    <Text style={{ alignSelf: 'center', color: 'grey' }}>Please select any order to view details</Text>
                                                }



                                            </View>

                                            <View style={{ borderColor: '#d3d3d3', borderTopWidth: 1, flexDirection: 'row', padding: '2%' }}>
                                                <Text style={{ fontSize: wp('1%'), marginLeft: wp('1%'), marginRight: wp('1%') }}>Items:</Text>
                                                <Text style={{ fontSize: wp('1%'), marginRight: wp('1%'), fontWeight: 'bold' }}>{orderDetails.length}</Text>
                                                <Text style={{ fontSize: wp('1%'), marginRight: wp('1%') }}>|</Text>
                                                <Text style={{ fontSize: wp('1%'), marginRight: wp('1%') }}>Payment Method:</Text>
                                                <Text style={{ fontSize: wp('1%'), marginRight: wp('1%'), fontWeight: 'bold' }}>CASH</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', height: hp('50%'), width: wp('50%'), marginLeft: wp('2%') }}>

                                                <View style={{ height: hp('30%'), width: wp('20%') }}>
                                                    <TouchableOpacity style={styles.RePrintBtn}
                                                        onPress={() => print()}>
                                                        <Text style={styles.RePrintText}>Re-Print</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={styles.RefundBtn}
                                                        onPress={() => {
                                                            setOrderDetails([]);
                                                            setModalOpen(true);
                                                            tableReturn();

                                                        }}>

                                                        <Text style={styles.RefundText}>Refund</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ borderColor: '#d3d3d3', borderWidth: 2, flexDirection: 'row', height: wp('11.5%'), width: wp('25%'), borderRadius: 4, marginLeft: wp('2%') }}>
                                                    <View style={{ marginLeft: wp('4%'), marginTop: hp('3%') }}>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>Service Charges:</Text>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>Discount:</Text>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>GST:</Text>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>Total Price:</Text>
                                                    </View>

                                                    <View style={{ marginLeft: wp('6%'), marginTop: hp('3%') }}>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>$0.00</Text>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}> $ {parseFloat(total_dis).toFixed(2)}</Text>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>$0.00</Text>
                                                        <Text style={{ fontSize: wp('1%'), color: '#FC3F3F', marginBottom: wp('0.7%'), fontWeight: 'bold' }}>$ {parseFloat(t).toFixed(2)}</Text>
                                                    </View>

                                                </View>

                                            </View>
                                        </>
                                        : <>
                                            <View style={{ flexDirection: 'row', height: hp('13%'), justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: wp('1%'), fontWeight: 'bold' }}> {time}</Text>

                                                {value == 1 ?
                                                    <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> | </Text>
                                                    :
                                                    <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold', display: 'none' }}> | </Text>
                                                }
                                                <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold', color: '#FC3F3F' }}>{table} </Text>

                                                {value == 1 ?
                                                    <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> | </Text>
                                                    :
                                                    <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold', display: 'none' }}> | </Text>
                                                }
                                                <Text style={{ fontSize: wp('1%'), padding: '2%', margin: '1%', fontWeight: 'bold' }}> {pax} </Text>
                                            </View>

                                            <View style={{ marginLeft: wp('1%'), marginRight: wp('1%'), height: wp('18%') }}>


                                                {orderDetails.length > 0 ?
                                                    <FlatList
                                                        data={orderDetails}
                                                        keyExtractor={item => item.id}
                                                        renderItem={renderDetailItem} /> :
                                                    <Text style={{ alignSelf: 'center', color: 'grey' }}>Please select any order to view details</Text>
                                                }



                                            </View>

                                            <View style={{ borderColor: '#d3d3d3', borderTopWidth: 1, flexDirection: 'row', padding: '2%' }}>
                                                <Text style={{ fontSize: wp('1%'), marginLeft: wp('1%'), marginRight: wp('1%') }}>Items:</Text>
                                                <Text style={{ fontSize: wp('1%'), marginRight: wp('1%'), fontWeight: 'bold' }}>{orderDetails.length}</Text>
                                                <Text style={{ fontSize: wp('1%'), marginRight: wp('1%') }}>|</Text>
                                                <Text style={{ fontSize: wp('1%'), marginRight: wp('1%') }}>Payment Method:</Text>
                                                <Text style={{ fontSize: wp('1%'), marginRight: wp('1%'), fontWeight: 'bold' }}>CASH</Text>
                                            </View>

                                            <View style={{ flexDirection: 'row', height: hp('50%'), width: wp('50%'), marginLeft: wp('2%') }}>

                                                <View style={{ height: hp('30%'), width: wp('20%') }}>
                                                    <TouchableOpacity style={styles.RePrintBtn}
                                                        onPress={() => print()}>
                                                        <Text style={styles.RePrintText}>Re-Print</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={styles.RefundBtn}
                                                        onPress={() => {
                                                            if (switched == false) {
                                                                setOrderDetails([]);
                                                                setModalOpen(true);
                                                                tableReturn();
                                                            }
                                                            else {
                                                                ItemIndividualReturn();
                                                            }

                                                        }}>

                                                        <Text style={styles.RefundText}>Refund</Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ borderColor: '#d3d3d3', borderWidth: 2, flexDirection: 'row', height: wp('11.5%'), width: wp('25%'), borderRadius: 4, marginLeft: wp('2%') }}>
                                                    <View style={{ marginLeft: wp('4%'), marginTop: hp('3%') }}>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>Service Charges:</Text>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>Discount:</Text>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>GST:</Text>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>Total Price:</Text>
                                                    </View>

                                                    <View style={{ marginLeft: wp('6%'), marginTop: hp('3%') }}>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>$0.00</Text>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}> $ {parseFloat(total_dis).toFixed(2)}</Text>
                                                        <Text style={{ fontSize: wp('1%'), color: '#696969', marginBottom: wp('0.7%') }}>$0.00</Text>
                                                        <Text style={{ fontSize: wp('1%'), color: '#FC3F3F', marginBottom: wp('0.7%'), fontWeight: 'bold' }}>$ {parseFloat(t).toFixed(2)}</Text>
                                                    </View>

                                                </View>

                                            </View>
                                        </>}
                            </View>

                            {isLoading && <CustomActivityIndicator />}

                            {show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={date}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                />
                            )}
                        </View >
                        : null}


                </View >}
        </>
    );
};



export default Profile;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp('10%'),
    },
    crossImage: {
        margin: '5%',
        width: wp('1.3%'),
        height: hp('1.8%')
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
        width: hp('70%'),
        height: hp('70%'),
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

    billText: {
        alignItems: 'flex-end',
    },

    item: {
        padding: '1%',
    },
    RePrintBtn: {
        width: '100%',
        height: '35%',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#FC3F3F',
        borderWidth: 1,
        marginBottom: '6%'
    },
    RePrintText: {
        fontSize: wp('1%'),
        color: '#FC3F3F',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    RefundBtn: {
        width: '100%',
        height: '35%',
        backgroundColor: '#FC3F3F',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: wp('1%')
    },
    RefundText: {
        fontSize: wp('1%'),
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'

    },
    confirmbtn: {
        width: wp('15%'),
        height: hp('7%'),
        backgroundColor: '#FC3F3F',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: wp('0.5%')
    },
    confirmText: {
        fontSize: wp('1%'),
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    generateBtn: {
        width: wp('11%'),
        height: hp('6.5%'),
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#FC3F3F',
        marginRight: wp('15%'),
        marginLeft: wp('2%'),
        marginTop: hp('1%'),
        borderWidth: 1
    },
    GenerateText: {
        fontSize: wp('1%'),
        fontWeight: 'bold',
        color: '#FC3F3F',
        textAlign: 'center',
    },
    TypeBtn: {
        width: wp('10%'),
        height: hp('6.5%'),
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#FC3F3F',
        borderWidth: 0.5,
        marginRight: wp('1%'),
        marginTop: hp('1%')
    },
    TypeText: {
        fontSize: wp('1%'),
        textAlign: 'center',
        fontWeight: 'bold',
    },
    DateBtn: {
        width: wp('10%'),
        height: hp('6.5%'),
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#FC3F3F',
        borderWidth: 1,
        marginTop: hp('1%'),
        marginBottom: hp('1%')
    },
    DateText: {
        fontSize: wp('1%'),
        color: '#FC3F3F',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    textStyle: {
        fontSize: wp('1%'),
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    textStyle: {
        fontSize: wp('1%'),
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    modal2Btn: {
        width: wp('20%'),
        height: hp('10%'),
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#FC3F3F',
        marginTop: hp('2%')
    },
    modal2Text: {
        fontSize: wp('1%'),
        color: '#FC3F3F',
        textAlign: 'center',
    },
    vStyle: {
        flexDirection: 'row',
        height: hp('4%'),
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    Tstyle: {
        alignSelf: "center",
        fontSize: wp('1.1%')
    },
});