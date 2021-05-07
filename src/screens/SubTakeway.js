import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, Modal, TouchableOpacity, View, ScrollView } from 'react-native';
import MainDashborad from './Dinning';
import Burger from './Burger';
import Pay from './Pay';
import Takeway from './Takeway';
import RNPrint from 'react-native-print';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Print_Slip, Table_res, Takeaway_Order, PRODUCT_CAT, Get_Tables, TABLE_DETAIL, Table_Close } from '../utils/urls';
import APIHandler from '../utils/APIHandler';
import CustomActivityIndicator from "../components/generic/CustomActivityIndicator";

var tableNames = "";
var tableIds = "";
const SubTakeway = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [modalVisible, setModalVisible] = useState(false);
    const [productItem, setProductItem] = useState({});
    const [variantArray, setVariantArray] = useState([]);
    const [isLoad, setLoad] = useState(false);
    const [state, setState] = useState('sub');
    const [loading, setLoading] = useState(false);
    const [select, setSelect] = useState('Burger');
    const [i, setI] = useState(1);
    const [p, setP] = useState(0);
    const [d, setD] = useState(0);
    const [value, setValue] = useState('1');
    const [data, setData] = useState();
    const [cat_id, setCat_id] = useState(0);
    const [slip, setSlip] = useState('');
    const [di, setDi] = useState(0);
    const or_Id = props.orID;
    const navigation = useNavigation();
    const [array, setArray] = useState([]);
    const [order, setOrder] = useState();
    const [cat, setCat] = useState();
    const count = props.Count;
    const [pri, setPri] = useState();
    const br = props.br;
    const [currentTime, setCurrentTime] = useState('');
    var svc = 0;
    var gst = 0;
    const Id = props.userId;
    var Total = p + svc + gst;
    const [table_order_detail, setTable_order_detail] = useState({ "arr": [{ "id": 503, "mem": 1, "payment_status": "Paid", "table": "T2", "table_id": "4", "total": "800.00", "sum": 30 }], "arry2": [{ "id": 402, "name": "pizza 2 Large", "quantity": 1, "unit_price": "800.00" }] });
    const [totalp, setTotalp] = useState('');
    const [modal, setModal] = useState(false);

    const mapAndJoin = (arr, key) => {
        return arr.map(function (o) {
            return o[key];
        }).join();
    }

    useEffect(() => {
        if (props.mergedTables) {
            const mergedTables = props.mergedTables;

            tableNames = mapAndJoin(mergedTables, 'table');
            tableIds = mapAndJoin(mergedTables, 'key');
            console.log("table_name=====", tableNames);

        }
    }, []);

    const reload = () => {
        setLoading(!loading)
    }

    const contains = (object) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].item === object.item) {
                return i;
            }
        }

        return -1;
    }

    const addNewItem = (name, price, Dis, id, Var) => {
        const obj = { 'key': i, 'item': name, 'p': price, 'dis': Dis, 'qty': value, "id": id, 'var_id': Var };

        let check = contains(obj);

        if (check !== -1) {
            array[check].qty = parseInt(array[check].qty) + 1;

            setP(p + parseInt(price));
            setArray([...array]);
        } else {
            setP(p + parseInt(price));
            setD(d + parseInt(Dis));
            array.push(obj);
            reload();
            setI(i + 1);
            setData([...array]);
            setDi(Dis);
        }
    };

    const newArray = (Id, pr, Dis) => {
        let index = array.indexOf(item => item.key == Id)
        array.splice(index, 0);

        setArray(array.filter(item => item.key != Id));

        setP(p - pr);
        setD(d - parseInt(Dis));
    }

    const Empty = () => {
        Total = 0;
        setP(0);
        svc = 0;
        gst = 0;
        setD(0);
        setArray([]);
        setLoading(!loading);
        setSelect('Burger');
    }

    const Table_order = () => {
        let param = {
            Loc_id: br
        };
        APIHandler.hitApi(Get_Tables, 'POST', param).then(response => console.log("Table API Response", response))

    };

    useEffect(() => {
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes

        setCurrentTime(
            hours + ':' + min
        );

        setArray(array);

        let param = {
            Data: data,
            Total: Total,
            Dis: d,
        };

        APIHandler.hitApi(Print_Slip, 'POST', param).then(response => setSlip(response));
        setLoad(true);
        let params = {
            order_id: props.T_order_id
        };
        APIHandler.hitApi(TABLE_DETAIL, 'POST', params).then(response => {
            setTable_order_detail(response);
            setLoad(false);
            console.log(response);



        });



        APIHandler.hitApi(PRODUCT_CAT, 'GET').then(response => {
            setCat(response);
        });



    }, [props.T_order_id, loading]);






    const callback = () => {
        setSelect('Burger');
    };



    const print = async printRemotePDF => {
        await RNPrint.print({ filePath: slip.url })
    }



    const concatinate = (v) => {
        let localArr = [...array];

        let localQuantity = localArr[selectedIndex].qty;
        let localSubtotal = p - (localQuantity * parseInt(localArr[selectedIndex].p));

        if (v == 'del') {
            localQuantity = localQuantity.slice(0, -1);

            var rowPrice = parseInt(localArr[selectedIndex].p) * localQuantity;
            setP(localSubtotal + rowPrice);
            setPri(rowPrice);

        }
        else {
            localQuantity = localQuantity + v;

            var rowPrice = parseInt(localArr[selectedIndex].p) * localQuantity;
            setP(localSubtotal + rowPrice);
            setPri(rowPrice);
        }

        localArr[selectedIndex].qty = localQuantity;
        setValue(localQuantity);
        setArray(localArr);
    }


    const Save_Order = () => {


        let param = {
            total: Total,
            loc_id: br,
            Data: data,
            stf_id: props.userId,
        };

        APIHandler.hitApi(Takeaway_Order, 'POST', param).then(response => setOrder(response));

    };

    const Table_Booked_but_not_Paid = () => {

        let param = {
            total: null,
            loc_id: br,
            Data: data,
            stf_id: props.userId,
            t_id: tableIds,
            mem: count,
        };

        APIHandler.hitApi(Table_res, 'POST', param).then(response => console.log(" Table_Booked_but_not_Paid ", response));
        setState(props.pass);
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
            total: Total,
            loc_id: br,
            Data: data,
            stf_id: props.userId,
            t_id: tableIds,
            mem: count,
        };

        APIHandler.hitApi(Table_res, 'POST', param).then(response => console.log(response));
    }

    const renderTakeAwayItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                <View style={styles.viewStyle}>
                    <Text style={[styles.textStyle, { color: 'black' }]}>{item.key}</Text>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={[styles.textStyle, { color: 'black' }]}>{item.item}</Text>
                </View>

                <TouchableOpacity
                    style={[styles.viewStyle, { borderWidth: 0.5 }]}
                    onPress={() => {
                        setSelect('cash');
                        setSelectedIndex(index);
                        setValue('');
                    }}>
                    <Text style={[styles.textStyle, { color: 'red' }]}>{item.qty}</Text>
                </TouchableOpacity>

                {/* <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>{item.dis}</Text>
                </View> */}

                <View style={styles.viewStyle}>
                    <Text style={[styles.textStyle, { color: 'red' }]}>${item.p}</Text>
                </View>
                <TouchableOpacity style={styles.viewbtnStyle}
                    onPress={() => newArray(item.key, item.p, item.dis)}>
                    <Image source={require('../assets/Group.jpg')} style={{ width: wp('4%'), height: hp('4%') }} resizeMode='contain' />
                </TouchableOpacity>

            </View>
        );
    };

    const ShowOrderTable = ({ item }) => {
        return (

            <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                { isLoad && <CustomActivityIndicator />}
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>{item.id}</Text>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>{item.name}</Text>
                </View>

                <View
                    style={[styles.viewStyle, { borderWidth: 0.5 }]}
                    onPress={() => {
                    }}>
                    <Text style={[styles.textStyle, { color: 'red' }]}>{item.quantity}</Text>
                </View>

                {/* <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>{item.dis}</Text>
                </View> */}

                <View style={styles.viewStyle}>
                    <Text style={[styles.textStyle, { color: 'red' }]}>${item.unit_price}</Text>
                </View>

                {setTotalp(item.total)}
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





    // <Pay pay={Total} branch={br} D={data} userid={props.userId} t_id={table_id} member={count} reload={reload} addNewItem={addNewItem} Empty={Empty}  Call={callback} function={fun} statename={props.pass} />
    return (
        <>
            <Modal
                animationType="fade"

                transparent={true}
                visible={modal}
                onRequestClose={() => {

                    setModal(!modal);
                }}
            >

                <View style={styles.modalView}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 8 }} onPress={() => setModal(false)}>
                        <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>


                    <View style={{ marginRight: 10, marginTop: 8, alignSelf: 'center', width: '40%', height: '40%' }} >
                        <Image source={require('../assets/booking-confirmed.png')} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
                    </View>
                    <Text style={{ fontSize: wp('1.4%') }}>Confirm to Table Free</Text>
                    <View style={{ justifyContent: 'flex-end', flex: 1, width: '98%' }}>
                        <TouchableOpacity style={{ backgroundColor: 'red', width: wp('19.5%'), height: hp('5%'), marginBottom: 5, borderRadius: 4, justifyContent: 'center' }}
                            onPress={() => {
                                setModal(false);
                                setState(props.pass);
                            }}>
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.3%') }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>
            {state === 'sub' ?
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.5, backgroundColor: 'white' }}>
                        {props.Pass == 'table' ?
                            <>
                                <View style={{ flexDirection: 'row', }}>
                                    <TouchableOpacity
                                        style={{
                                            borderRadius: 5,
                                            borderWidth: 2,
                                            borderColor: "#b5b5b5",
                                            marginTop: 5,
                                            width: '20%',
                                            alignItems: 'center',
                                            height: hp('7%'),
                                            flex: 1,
                                            alignSelf: 'flex-start',
                                            marginRight: 10,
                                            marginLeft: 5,
                                            justifyContent: 'center'
                                        }}
                                        onPress={() => {
                                            setState(props.pass);

                                        }} >
                                        <Text style={{ padding: 2, fontSize: wp('1.5%'), alignSelf: 'center' }}>Back</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        disabled={props.pass == 'Main' ? false : true}
                                        style={{
                                            borderRadius: 5,
                                            marginTop: 5,
                                            width: '50%',
                                            alignItems: 'center',
                                            height: hp('7%'),
                                            backgroundColor: 'red',
                                            alignSelf: 'flex-end',
                                            justifyContent: 'center'

                                        }}
                                        onPress={() => { props.table_pass == 'notable' ? Table_Booked_but_not_Paid() : <>{table_order_detail.arr.map(i => i.payment_status) == 'paid' ? Table_Free() : null}</> }}
                                    >
                                        {props.pass == 'Main' ? <>
                                            {/* {isLoad && <CustomActivityIndicator />} */}
                                            <Text style={{ padding: 2, fontSize: wp('1.5%'), color: 'white', alignSelf: 'center' }}>{props.table_pass == 'table' ? table_order_detail.arr.map(i => i.table) : tableNames}</Text></>
                                            : props.pass == 'Takeway' ? <Text style={{ padding: 2, fontSize: wp('1.5%'), color: 'white', alignSelf: 'center' }}>Takeaway</Text> : null}
                                    </TouchableOpacity>
                                    {props.pass == 'Main' ?
                                        <View
                                            style={{
                                                borderRadius: 5,
                                                marginTop: 5,
                                                width: '15%',
                                                alignItems: 'center',
                                                height: hp('7%'),
                                                backgroundColor: 'white',
                                                alignSelf: 'flex-end',
                                                justifyContent: 'center',
                                                borderWidth: 2,
                                                borderColor: "#b5b5b5",
                                                marginLeft: 5

                                            }} >
                                            {/* {isLoad && <CustomActivityIndicator />} */}
                                            <Text style={{ padding: 2, fontSize: wp('1.5%'), color: 'black', alignSelf: 'center' }}>{props.table_pass == 'notable' ? props.Count : props.table_pass == 'table' ? table_order_detail.arr.map(i => i.mem) : null} Pax</Text>
                                        </View> : null}
                                </View>

                                <View style={{
                                    flexDirection: 'row', height: hp('5%'), borderColor: '#cbcdad', marginTop: 10, shadowColor: "#000",
                                    shadowOffset: {
                                        width: 10,
                                        height: 10
                                    },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 1,
                                    elevation: 1
                                }}>
                                    {props.pass == 'Main' ?
                                        <Text style={{ alignSelf: 'flex-start', flex: 1, fontWeight: 'bold', fontSize: wp('1.3%'), marginTop: 4, marginLeft: 4 }}>Dinning</Text>
                                        : props.pass == 'Takeway' ? <Text style={{ alignSelf: 'flex-start', flex: 1, fontWeight: 'bold', fontSize: wp('1.3%'), marginTop: 4, marginLeft: 4 }}>TAKEAWAY</Text> : null}
                                    <Text style={{ alignItems: 'center', flex: 1, color: 'red', fontSize: wp('1%'), marginTop: 4 }}>
                                        RECEIVED {currentTime}
                                    </Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: wp('1.3%'), marginTop: 4, marginRight: 4 }}>
                                        N0. 001
                                </Text>
                                </View>

                                <View style={{ flexDirection: 'row', marginLeft: 0 }}>
                                    <View style={styles.viewStyle}>
                                        <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'black' }]}>NO.  </Text>
                                    </View>
                                    <View style={styles.viewStyle}>
                                        <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'black' }]}>item  </Text>
                                    </View>

                                    <View style={styles.viewStyle}>
                                        <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'black' }]}>Qty </Text>
                                    </View>

                                    {/* <View style={styles.viewStyle}>
                                        <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'black' }]}>Discount</Text>
                                    </View> */}

                                    <View style={styles.viewStyle}>
                                        <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'black' }]}>Price  </Text>
                                    </View>
                                    <View style={styles.viewStyle}>
                                        <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'black' }]}>Del   </Text>
                                    </View>
                                </View>

                                <View style={{ height: hp('40%') }}>
                                    {props.table_pass == 'notable' ?
                                        <FlatList
                                            data={array}
                                            keyExtractor={(item) => item.key}
                                            renderItem={renderTakeAwayItem} /> :
                                        props.table_pass == 'table' ?

                                            <FlatList
                                                data={table_order_detail.arry2}
                                                keyExtractor={(item) => item.id}
                                                renderItem={ShowOrderTable} /> : null}
                                </View>

                                <View style={{ flexDirection: 'row', flex: 1, }}>
                                    <View style={{ backgroundColor: 'rgb(240,240,240)', flex: 0.5, }}>
                                    </View>

                                    <View style={{ backgroundColor: 'rgb(240,240,240)', flex: 0.5, borderLeftWidth: 0.4, alignContent: 'center' }}>
                                        <View style={{ opacity: 0.5, marginLeft: 25, marginRight: 25 }}>

                                            <View style={styles.vStyle}>
                                                <Text style={[styles.Tstyle, { flex: 1 }]}>Sub Total</Text>
                                                <Text style={styles.Tstyle}>${p}</Text>
                                            </View>

                                            <View style={styles.vStyle}>
                                                <Text style={[styles.Tstyle, { flex: 1 }]}>SVC Charge</Text>
                                                <Text style={styles.Tstyle}>${svc}</Text>
                                            </View>

                                            <View style={styles.vStyle}>
                                                <Text style={[styles.Tstyle, { flex: 1 }]}>GST</Text>
                                                <Text style={styles.Tstyle}>${gst}</Text>
                                            </View>

                                            {/* <View style={styles.vStyle}>
                                                <Text style={[styles.Tstyle, { flex: 1 }]}>Discount</Text>
                                                <Text style={styles.Tstyle}>-${d}</Text>
                                            </View> */}
                                        </View>
                                        <View style={{ flexDirection: 'row', borderBottomWidth: 1, borderTopWidth: 1, marginLeft: 25, marginRight: 25, marginTop: '-4%' }}>
                                            <Text style={{ flex: 1, alignSelf: "center", fontSize: wp('1.5%') }} >Total</Text>
                                            <Text style={{ fontSize: wp('1.5%'), alignSelf: 'center', color: 'red' }}>${props.table_pass == 'table' ? table_order_detail.arr.map(i => i.sum) : props.table_pass == 'notable' ? Total : null}</Text>
                                        </View>

                                    </View>
                                </View>
                            </>
                            : null

                        }

                        <View style={{ flexDirection: 'row', marginBottom: '3%', }}>
                            <View style={{ flex: 1, marginLeft: 10, }}>
                                <TouchableOpacity style={[styles.fbtnStyle, { alignSelf: 'flex-start' }]} onPress={() => {
                                    Table_order();
                                    Empty();


                                }}>
                                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: wp('1.5%'), alignSelf: 'center', fontWeight: 'bold' }}>Void</Text>
                                </TouchableOpacity>
                            </View>
                            {props.pass == 'Takeway' ?

                                <View style={{ flex: 1, marginLeft: 10, }}>
                                    <TouchableOpacity style={{ alignSelf: 'center', width: wp('18%'), height: hp('6%'), borderWidth: 1, borderRadius: 3, justifyContent: 'center', marginLeft: wp('-5%') }} onPress={() => {
                                        print();
                                        Save_Order();
                                    }}>
                                        <Text style={{ alignSelf: 'center', fontSize: wp('1.5%'), marginTop: '2%', fontWeight: 'bold', alignSelf: 'center' }}>PRINT & SAVE TICKET </Text>
                                    </TouchableOpacity>
                                </View>
                                : props.pass == "Main" ? <>
                                    <View style={{ flex: 1, marginLeft: 10 }}>
                                        <TouchableOpacity style={{ alignSelf: 'center', width: wp('18%'), height: hp('6%'), borderWidth: 1, borderRadius: 3, justifyContent: "center", marginLeft: wp('-5%') }} onPress={() => {
                                            print();
                                            fun();
                                            Empty();
                                        }}>
                                            <Text style={{ alignSelf: 'center', fontSize: wp('1.5%'), alignSelf: 'center', fontWeight: 'bold' }}>PRINT & SAVE TICKET </Text>
                                        </TouchableOpacity>
                                    </View>
                                </> : null}
                            <View style={{ flex: 1, marginRight: 10 }}>
                                {props.table_pass == 'table' ?
                                    <TouchableOpacity
                                        disabled={table_order_detail.arr.map(i => i.payment_status) == 'paid' ? true : false}
                                        style={table_order_detail.arr.map(i => i.payment_status) == 'paid' ? { alignSelf: 'center', width: wp('15%'), height: hp('6%'), borderWidth: 1, borderRadius: 3, justifyContent: "center", backgroundColor: 'pink' } : { alignSelf: 'center', width: wp('15%'), height: hp('6%'), borderWidth: 1, borderRadius: 3, justifyContent: "center", backgroundColor: 'red' }}
                                        onPress={() => {
                                            setSelect("Pay");
                                        }}>
                                        <Text style={{ alignSelf: 'center', color: 'white', fontSize: wp('1.5%'), alignSelf: 'center', fontWeight: 'bold' }}>{table_order_detail.arr.map(i => i.payment_status) == 'paid' ? 'Paid' : 'Pay'} </Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity

                                        style={{ alignSelf: 'center', width: wp('15%'), height: hp('6%'), borderWidth: 1, borderRadius: 3, justifyContent: "center", backgroundColor: 'red' }}
                                        onPress={() => {
                                            setSelect("Pay");
                                        }}>
                                        <Text style={{ alignSelf: 'center', color: 'white', fontSize: wp('1.5%'), alignSelf: 'center', fontWeight: 'bold' }}>Pay </Text>
                                    </TouchableOpacity>}


                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 0.1, backgroundColor: 'rgb(240,240,240)', }}>

                        <FlatList
                            data={cat}
                            keyExtractor={item => item.key}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        style={[styles.Card, { backgroundColor: item.color }]}
                                        onPress={() => {
                                            setCat_id(item.id)
                                        }}>
                                        <Text style={styles.CardText}>{item.name}</Text>
                                    </TouchableOpacity>)
                            }}
                        />
                    </View>

                    <View style={{ flex: 0.5, backgroundColor: 'white' }}>

                        {select === 'Burger' ? <Burger variantCallback={variantCallback} reload={reload} addNewItem={addNewItem} branch={br} Cat_id={cat_id} /> : select === 'Pay' ? <Pay refresh={reload} pay={props.table_pass == 'table' ? table_order_detail.arr.map(i => i.sum) : props.table_pass == 'notable' ? Total : null} branch={br} D={data} userid={props.userId} t_id={tableIds} member={count} reload={reload} addNewItem={addNewItem} Empty={Empty} Call={callback} function={fun} statename={props.pass} Cat_id={cat_id} T_order_id={props.table_pass == 'table' ? table_order_detail.arr.map(i => i.id) : null} table_pass={props.table_pass} T_order_sum={props.table_pass == 'table' ? table_order_detail.arr.map(i => i.sum) : null} /> : select == 'cash' ?

                            <>
                                <View style={{ borderBottomWidth: 0.4, height: 50, flexDirection: 'row', backgroundColor: 'rgb(240,240,240)' }}>
                                    <Text style={{ alignSelf: 'center', flex: 1, fontSize: wp('1.4%'), marginLeft: 30 }}>Changing Quantity</Text>

                                    <Text style={{ fontSize: wp('1.4 %'), alignSelf: 'center', marginRight: 20 }} onPress={() => {

                                        setSelect('Burger');
                                        setValue('');
                                    }}>Back</Text>
                                </View>

                                <View style={{ backgroundColor: 'rgb(230,240,230)', height: 30, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Text style={{ color: 'black' }}></Text>
                                    <Text style={{ fontSize: wp('1%') }}>{value}</Text>
                                </View>




                                <ScrollView>
                                    <Animatable.View
                                        animation="fadeInUpBig"
                                        duration={1500}
                                        style={{ height: '100%', marginTop: 10, alignSelf: 'center' }}
                                    >


                                        <View style={{ flexDirection: 'row', width: '98%', borderWidth: 1, backgroundColor: 'white' }}>

                                            <TouchableOpacity style={{ width: '33%', backgroundColor: 'white', height: 100, justifyContent: 'center', borderRightWidth: 1 }}
                                                onPress={() => concatinate('1')}>
                                                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>1</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ width: '34%', backgroundColor: 'white', height: 100, justifyContent: 'center', }}
                                                onPress={() => concatinate('2')}>
                                                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>2</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ width: '33%', backgroundColor: 'white', height: 100, justifyContent: 'center', borderLeftWidth: 1 }}
                                                onPress={() => concatinate('3')}>
                                                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', }}>3</Text>
                                            </TouchableOpacity>


                                        </View>



                                        <View style={{ flexDirection: 'row', width: '98%', borderWidth: 1, backgroundColor: 'white' }}>


                                            <TouchableOpacity style={{ width: '33%', backgroundColor: 'white', height: 100, justifyContent: 'center', borderRightWidth: 1, }}
                                                onPress={() => concatinate('4')}>
                                                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>4</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ width: '34%', backgroundColor: 'white', height: 100, justifyContent: 'center', }}
                                                onPress={() => concatinate('5')}>
                                                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>5</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ width: '33%', backgroundColor: 'white', height: 100, justifyContent: 'center', borderLeftWidth: 1 }}
                                                onPress={() => concatinate('6')}>
                                                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', }}>6</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ flexDirection: 'row', width: '98%', borderWidth: 1, backgroundColor: 'white' }}>


                                            <TouchableOpacity style={{ width: '33%', backgroundColor: 'white', height: 100, justifyContent: 'center', borderRightWidth: 1 }}
                                                onPress={() => concatinate('7')}>
                                                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>7</Text>
                                            </TouchableOpacity>



                                            <TouchableOpacity style={{ width: '34%', backgroundColor: 'white', height: 100, justifyContent: 'center', }}
                                                onPress={() => concatinate('8')}>
                                                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>8</Text>
                                            </TouchableOpacity>



                                            <TouchableOpacity style={{ width: '33%', backgroundColor: 'white', height: 100, justifyContent: 'center', borderLeftWidth: 1 }}
                                                onPress={() => concatinate('9')}>
                                                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', }}>9</Text>
                                            </TouchableOpacity>


                                        </View>



                                        <View style={{ flexDirection: 'row', width: '98%', backgroundColor: 'white', borderWidth: 1 }}>


                                            <TouchableOpacity style={{ width: '33%', backgroundColor: 'white', height: 100, justifyContent: 'center', borderRightWidth: 1 }}
                                                onPress={() => concatinate('del')}>
                                                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>CLEAR</Text>
                                            </TouchableOpacity>



                                            <TouchableOpacity style={{ width: '34%', backgroundColor: 'white', height: 100, justifyContent: 'center', }}
                                                onPress={() => concatinate('0')}>
                                                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold' }}>0</Text>
                                            </TouchableOpacity>



                                            <TouchableOpacity style={{ width: '33%', backgroundColor: 'white', height: 100, justifyContent: 'center', borderLeftWidth: 1 }} onPress={() => concatinate('.')}>

                                                <Text style={{ alignSelf: 'center', fontSize: 25, fontWeight: 'bold', }}>.</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <TouchableOpacity style={{ backgroundColor: 'red', height: hp('8%'), justifyContent: 'center', borderRadius: 4, width: wp('40%'), alignSelf: 'center', marginTop: 30, marginBottom: 5 }}
                                            onPress={() => {
                                                setSelect('Burger');
                                                setValue('');
                                            }}
                                        >
                                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('2%') }}>Next</Text>
                                        </TouchableOpacity>

                                    </Animatable.View>
                                </ScrollView>


                            </> : null}

                    </View>
                </View> : state == 'Takeway' ?
                    <Takeway branch={br} idUser={props.userId} /> : state == 'Main' ? <MainDashborad br={br} Key={Id} /> : null
            }

            { renderVariantModal()}
        </>
    );
}

export default SubTakeway;

const styles = {
    textStyle: {
        fontSize: wp('1.3%'),
        alignSelf: 'center',
    },
    viewStyle: {

        marginTop: 5,
        borderRightWidth: 0.5,
        width: "17%"
    },
    viewbtnStyle: {
        marginLeft: '2%',
        marginTop: 5,
        width: wp('5%'),
        height: hp('5%'),
    },

    vStyle: {
        flexDirection: 'row',
        height: '21%'

    },
    Tstyle: {
        alignSelf: "center",
        fontSize: wp('1.3%')
    },
    fbtnStyle: {
        width: wp('7%'),
        height: hp('6%'),
        borderRadius: 3,
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    Card: {
        width: wp('8.2%'),
        height: hp('18%'),
        marginTop: 10,
        marginLeft: 3,
        justifyContent: 'center',
        borderRadius: 4,

    },
    CardText: {
        alignSelf: 'center',

        color: 'white',
        fontWeight: 'bold',
        fontSize: wp('1.7%')
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
        marginRight: 150,
        marginLeft: 150,
    },
    TextStyle: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
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
