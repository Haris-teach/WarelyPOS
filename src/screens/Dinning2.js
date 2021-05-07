import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, FlatList, Button, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import DropDownPicker from "react-native-dropdown-picker";
import Secondfloor from "./Secondfloor";
import Outdoor from "./Outdoor";
import Edit from "./Edit";
import Takeway from './Takeway';
import Delivery from './Delivery';
import Pickup from './Pickup';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SubTakeway from './SubTakeway';
import APIHandler from '../utils/APIHandler';
import { Get_Tables, Dine_Order, Pos_sell_end } from '../utils/urls';
import CustomActivityIndicator from "../components/generic/CustomActivityIndicator";
import { useSelector, useDispatch } from 'react-redux';
import { Call, Stf_Name } from '../Redux/Reducers/mainReducer';


var mergedTables = []

const Dinning = ({ route, navigation }) => {
    const [isLoading, setLoading] = useState(false);
    const { fun, stf_name, s_id, loc_id } = useSelector((state) => state.root.main);
    const [selectMerge, setSelectMerge] = useState(false);
    // MAin TAB BAR
    const [select, setSelect] = useState(0);
    const br = loc_id;
    const Key = s_id;
    const [res, setRes] = useState();
    const [dayData, setDayData] = useState([]);

    const [day_id, setDay_id] = useState(1);
    const [date, setDate] = useState();



    // 0.7 TAB BAR

    const [se, setSe] = useState(0);
    const updateIndexs = (s) => {
        setSe(s);
    };

    const bt3 = () => <Text style={{ fontWeight: '600', fontSize: wp('1%'), color: 'black', opacity: 0.4 }}>FIRST FLOOR</Text>
    const bt2 = () => <Text style={{ fontWeight: '600', fontSize: wp('1%'), color: 'black', opacity: 0.4 }}>SECOND FLOOR</Text>
    const bt1 = () => <Text style={{ fontWeight: '600', fontSize: wp('1%'), color: 'black', opacity: 0.4 }}>OUTDOOR</Text>
    const bt4 = () => <Text style={{ fontWeight: '600', fontSize: wp('1%'), color: 'black', opacity: 0.4 }}>EDIT</Text>
    const Buttons = [{ element: bt3 }, { element: bt2 }, { element: bt1 }, { element: bt4 }];

    // 0.3 TAB BAR
    const [sbtn, setSbtn] = useState(0);
    const updatebtn = (s) => {
        setSbtn(s);
    };

    const b2 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1%'), color: 'black', }}>SEATED</Text>
    const b1 = () => <Text style={{ fontWeight: 'bold', fontSize: wp('1%'), color: 'black', }}>UP-COMING</Text>

    const Btns = [{ element: b2 }, { element: b1 }];

    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisi, setModalVisi] = useState(false);
    const [count, setCount] = useState(1);
    const [state, setState] = useState(false);
    const [table, setTable] = useState('');
    const [table_id, setTable_id] = useState();
    const [t_order_id, setT_order_id] = useState();
    const [table_condi, setTable_condi] = useState('');


    const dispatch = useDispatch();

    const Model_show = () => {
        setModalVisi(true);
    }

    const increment = () => {
        return (
            setCount(count + 1)
        );
    }

    const decrement = () => {
        return (
            setCount(count - 1)
        );
    }

    const [branch, setBranch] = useState("branch");



    useEffect(() => {


        let param = {
            Loc_id: br
        };
        setLoading(true);

        APIHandler.hitApi(Get_Tables, 'POST', param).then(response => {
            setLoading(false);
            let localResponse = [...response];

            localResponse.forEach(element => {
                element.selected = false;
            });

            setRes(localResponse);
        });







        let params = {
            loc_id: br,
            stf_id: Key,
            id: 1,
        };

        APIHandler.hitApi(Dine_Order, 'POST', params).then(response => setDayData(response));
    }, []);


    const Day = (id) => {

        let params = {
            loc_id: br,
            stf_id: Key,
            id: id,
        };

        APIHandler.hitApi(Dine_Order, 'POST', params).then(response => setDayData(response));



    }

    const selectedTableForMerge = (index) => {
        let localArr = [...res];
        mergedTables = [];

        localArr[index].selected = !localArr[index].selected;

        localArr.forEach(element => {
            console.log(element);

            if (element.selected) {
                mergedTables.push(element);
            }
        });

        setRes(localArr);
    }


    const renderModal = () => {
        return (
            <View style={styles.centeredView}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        mergedTables = [];
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={{ width: "100%", height: "100%", backgroundColor: 'rgba(0,0,0,0.6)' }}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 8 }} onPress={() => {
                                mergedTables = [];
                                setModalVisible(false)
                            }}>
                                <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: wp('3%'), height: hp('5%') }} />
                            </TouchableOpacity>

                            <FlatList
                                data={mergedTables}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ width: wp('10%'), height: hp('12%'), marginTop: hp('-4%'), marginLeft: 10, borderColor: '#32CD32', borderWidth: 5, borderRadius: 3, alignSelf: 'center', justifyContent: 'center' }}>
                                            <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: 'black', alignSelf: 'center', }}>{item.table}</Text>
                                        </View>
                                    );
                                }}
                            />

                            <View style={{ flexDirection: 'row', marginBottom: '2%', marginTop: '-14%' }}>
                                <View style={{ flex: 1, marginLeft: 25, width: wp('10%'), height: hp('10%') }}>
                                    <TouchableOpacity style={{ alignSelf: 'flex-start', width: '100%', height: '100%' }} onPress={() => decrement()} >
                                        <Image source={require('../assets/minus.jpg')} resizeMode="contain" style={{ width: '100%', height: '100%', alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 1, marginLeft: 5, marginTop: 5 }}>
                                    <TouchableOpacity style={{ justifyContent: 'center' }}>
                                        <Text style={{ alignSelf: 'center', color: 'red', fontSize: wp('2.5%') }}>{count}</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{ flex: 1, marginRight: 25, width: wp('10%'), height: hp('10%') }}>
                                    <TouchableOpacity style={{ alignSelf: 'flex-end', width: '100%', height: '100%' }} onPress={() => increment()}>
                                        <Image source={require('../assets/plus_c.jpg')} resizeMode="contain" style={{ width: '100%', height: '100%', alignSelf: 'center' }} />
                                    </TouchableOpacity>
                                </View>

                            </View>
                            <View>
                                <Text style={{ fontSize: wp('2%') }}>PAX</Text>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 5, width: wp('20%'), height: hp('8%') }}>
                                <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 3, width: wp('19%'), marginBottom: 5, alignSelf: 'center', height: hp('5%'), justifyContent: 'center' }}
                                    onPress={() => {
                                        setState(true);
                                        setModalVisible(false);
                                    }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center', fontSize: wp('2%') }}>CONFIRM</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }


    const [response, setResponse] = useState([{ "created_at": "2021-05-06 18:16:54", "end_sell": "0", "end_time": "06:16:55", "id": 31, "open_sell": null, "start_time": "17:46:00", "stf_id": "8", "updated_at": "2021-05-06 18:16:54" }]);
    useEffect(() => {
        let param = {
            stf_id: Key,
        };

        APIHandler.hitApi(Pos_sell_end, 'POST', param).then(res => setResponse(res));

        dispatch(Call(false));

    }, []);
    console.log("Pos_sell_end===", response);
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            {renderModal()}

            <>
                {select == 0 ?
                    <>
                        { state == true ? <SubTakeway T_order_id={t_order_id} mergedTables={mergedTables} Pass='table' br={br} Table={table} pass="Main" table_pass={table_condi} Count={count} Table_Id={table_id} userId={Key} response={res} /> :
                            <>
                                <View style={{ flex: 1, flexDirection: "row" }}>


                                    {/* Flex 0.3 wala box */}
                                    <View style={{ flex: 0.3, borderRightWidth: 1 }}>
                                        <ButtonGroup
                                            onPress={updatebtn}
                                            selecte={sbtn}
                                            buttons={Btns}
                                            containerStyle={{ height: hp('6%'), backgroundColor: 'white', width: "100%", marginLeft: 0, marginTop: 0 }}
                                            selectedButtonStyle={{ backgroundColor: 'green' }}

                                        />
                                        <DropDownPicker
                                            items={[
                                                {
                                                    label: "Today",
                                                    value: "branch",
                                                    id: 1,
                                                },
                                                {
                                                    label: "Yesterday",
                                                    value: "branch",
                                                    id: 2,
                                                },


                                            ]}
                                            defaultValue={branch}

                                            containerStyle={{ height: 50, width: "100%", }}
                                            style={{ backgroundColor: "white", }}

                                            labelStyle={{
                                                fontSize: wp('1.2%'),
                                                backgroundColor: 'white'
                                            }}
                                            dropDownStyle={{ backgroundColor: "white" }}
                                            onChangeItem={(item) => {
                                                setBranch(item.value);
                                                setDay_id(item.id);
                                                Day(day_id);
                                            }}
                                        />

                                        {/* FLatList */}
                                        {sbtn == 0 ? <>
                                            <FlatList
                                                data={dayData}
                                                keyExtractor={item => item.id}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <View style={{ flexDirection: 'row', backgroundColor: item.bcolor, height: hp('10%'), }}>
                                                            <View style={{ marginLeft: 10, marginTop: 5, alignSelf: 'center' }}>

                                                                <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: 'red' }}>{item.Time.slice(0, -3)}  </Text>
                                                                <Text style={{ alignSelf: 'center', fontSize: wp('1.5%'), color: 'black' }}>{item.To}       </Text>

                                                            </View>
                                                            <View style={{ marginLeft: 10, marginTop: 5, alignSelf: 'center' }}>
                                                                <Text style={{ fontSize: wp('2%'), fontWeight: 'bold' }}>{item.user}</Text>
                                                                <Text style={{ alignSelf: 'center', fontSize: wp('1%'), }}>TABLE: <Text style={{ fontWeight: 'bold', color: 'red' }}>{item.table}</Text>           PAX: <Text style={{ fontWeight: 'bold', color: 'red' }}>{item.member}</Text> </Text>
                                                            </View>
                                                        </View>
                                                    )
                                                }}

                                            />

                                            {/* <View style={{ marginLeft: 10, width: "90%" }}>
                        <TouchableOpacity style={{ borderColor: 'red', borderWidth: 1, height: 35, borderRadius: 3, justifyContent: 'center' }}>
                          <Text style={{ alignSelf: 'center', color: 'red', fontSize: 15, fontWeight: 'bold', }}>Manage Queue</Text>
                        </TouchableOpacity>
                      </View> */}
                                        </> : sbtn == 1 ? <>
                                            <FlatList
                                                data={dayData}
                                                keyExtractor={item => item.id}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <View style={{ flexDirection: 'row', backgroundColor: item.bcolor, height: hp('10%'), }}>
                                                            <View style={{ marginLeft: 10, marginTop: 5, alignSelf: 'center' }}>

                                                                <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: 'red' }}>{item.Time.slice(0, -3)}  </Text>
                                                                <Text style={{ alignSelf: 'center', fontSize: wp('1.5%'), color: 'black' }}>{item.To}       </Text>

                                                            </View>
                                                            <View style={{ marginLeft: 10, marginTop: 5, alignSelf: 'center' }}>
                                                                <Text style={{ fontSize: wp('2%'), fontWeight: 'bold' }}>{item.user}</Text>
                                                                <Text style={{ alignSelf: 'center', fontSize: wp('1%'), }}>TABLE: <Text style={{ fontWeight: 'bold', color: 'red' }}>{item.table}</Text>           PAX: <Text style={{ fontWeight: 'bold', color: 'red' }}>{item.member}</Text> </Text>
                                                            </View>
                                                        </View>
                                                    )
                                                }}

                                            />
                                        </> : null}



                                    </View>
                                    {/* Flex 0.7 wala box */}
                                    <View style={{ flex: 0.7, backgroundColor: 'rgb(240,240,240)', borderLeftWidth: 0.3, flexDirection: 'column' }}>
                                        <ButtonGroup
                                            onPress={updateIndexs}
                                            selecte={se}
                                            buttons={Buttons}
                                            containerStyle={{ height: hp('6%'), backgroundColor: 'white', marginLeft: 0, marginTop: 0, width: "100%" }}
                                            selectedButtonStyle={{ backgroundColor: 'green' }}

                                        />
                                        {se == 0 ?


                                            <View>
                                                <View style={styles.containerStyle}>
                                                    <TouchableOpacity style={[styles.Card, { backgroundColor: '#32CD32' }]}>
                                                        <Text style={styles.CardText}>1</Text>
                                                        <Text style={styles.CardText1}>SEAT AVAIABLE</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={[styles.Card, { backgroundColor: '#FF2E2E' }]}>
                                                        <Text style={styles.CardText}>2</Text>
                                                        <Text style={styles.CardText1}>SEAT OCCUPIED</Text>
                                                    </TouchableOpacity>

                                                    <TouchableOpacity style={[styles.Card, { backgroundColor: '#ffbf00' }]}>
                                                        <Text style={styles.CardText}>3</Text>
                                                        <Text style={styles.CardText1}>SEAT RESERVED</Text>
                                                    </TouchableOpacity>
                                                </View>

                                                <TouchableOpacity
                                                    style={{
                                                        borderRadius: 5,
                                                        borderWidth: 1,
                                                        borderColor: "red",
                                                        marginTop: hp('-12'),
                                                        marginRight: wp('3%'),
                                                        alignSelf: 'flex-end',
                                                        justifyContent: 'center',
                                                        backgroundColor: 'white',
                                                        width: wp('8%'),
                                                        height: '5%'
                                                    }}

                                                    onPress={() => {
                                                        if (mergedTables.length > 0) {
                                                            setModalVisible(true);
                                                        } else {
                                                            setSelectMerge(!selectMerge);
                                                        }
                                                    }}
                                                >
                                                    <Text style={{ padding: 2, fontSize: wp('1%'), alignSelf: 'center', color: 'red' }}>
                                                        {mergedTables.length > 0 ? "Done" : "Merge Tables"}
                                                    </Text>
                                                </TouchableOpacity>
                                                {/* <View style={{ alignItems: 'flex-end', marginRight: 10, marginTop: -55 }}>
                          <TouchableOpacity style={{ width: 100, height: 25, backgroundColor: 'white', borderRadius: 3 }}>
                            <Text style={{ alignSelf: 'center', marginTop: 5, fontSize: 12, color: 'red', fontWeight: 'bold' }}>MERGE TABLE</Text>
                          </TouchableOpacity>
                        </View> */}

                                                <View style={{ width: "100%", height: '100%', alignSelf: 'center', marginTop: hp('10%'), backgroundColor: 'rgb(240,240,240)' }}>
                                                    {isLoading && <CustomActivityIndicator />}
                                                    <FlatList
                                                        showsVerticalScrollIndicator={false}
                                                        data={res}
                                                        style={{ marginTop: 10, width: wp('90%'), height: hp('90%') }}
                                                        numColumns={4}
                                                        renderItem={({ item, index }) => (
                                                            <>

                                                                <TouchableOpacity

                                                                    onPress={() => {
                                                                        if (item.status === "free") {
                                                                            if (selectMerge) {
                                                                                selectedTableForMerge(index);
                                                                                setTable_condi('notable');
                                                                                setT_order_id(item.order_id);
                                                                            }
                                                                            else {
                                                                                // setTable(item.table);
                                                                                // setTable_id(item.key);
                                                                                let singleTable = [
                                                                                    item,
                                                                                ];

                                                                                mergedTables = singleTable;
                                                                                setModalVisible(true);
                                                                                setTable_condi('notable');
                                                                                setT_order_id(item.order_id);

                                                                            }
                                                                        }
                                                                        else {
                                                                            setState(true);
                                                                            ToastAndroid.show(item.table + "  is Booked !", ToastAndroid.SHORT);
                                                                            setTable(item.table);
                                                                            setT_order_id(item.order_id);
                                                                            setTable_condi('table');
                                                                        }
                                                                    }}>
                                                                    <View style={item.status === "free" ? styles.freeTable : [styles.bookedTable, { borderColor: selectMerge ? '#b5b5b5' : '#FF2E2E', }]}>
                                                                        <Text style={item.status === "free" ? styles.TableText : styles.TableText}>{item.table}</Text>
                                                                    </View>

                                                                    {selectMerge && item.status === 'free' ?
                                                                        <Image
                                                                            style={{
                                                                                position: 'absolute',
                                                                                alignSelf: 'flex-end',
                                                                                height: hp('4%'),
                                                                                width: wp('4%'),
                                                                                tintColor: item.selected ? 'blue' : 'grey'
                                                                            }}
                                                                            source={require('../assets/order.jpg')}
                                                                            resizeMode='contain'
                                                                        />
                                                                        : null
                                                                    }
                                                                </TouchableOpacity>


                                                            </>
                                                        )}
                                                    />
                                                </View>
                                            </View>
                                            : se == 1 ? <Secondfloor /> : se == 2 ? <Outdoor /> : se == 3 ? <Edit /> : null}
                                    </View>
                                </View>
                            </>
                        }
                    </>
                    : select == 1 ? <Takeway branch={br} idUser={Key} /> : select == 2 ? <Delivery /> : select == 3 ? <Pickup /> : null}
            </>
            <View>
                <Modal
                    animationType="fade"

                    transparent={true}
                    visible={fun}
                    onRequestClose={() => {

                        dispatch(Call(false));
                    }}
                >

                    <View style={styles.modalView}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 8 }} onPress={() => dispatch(Call(false))}>
                            <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>




                        <View style={{ marginBottom: 2, alignItems: 'center' }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{stf_name}</Text>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                            <Text style={{ fontWeight: 'bold' }}>Check in Time</Text>
                            <Text>{response.map(i => i.start_time)}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                            <Text style={{ fontWeight: 'bold' }}>Check out Time</Text>
                            <Text>{response.map(i => i.end_time)}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                            <Text style={{ fontWeight: 'bold' }}>Check in amount</Text>
                            <Text>{response.map(i => i.open_sell)}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                            <Text style={{ fontWeight: 'bold' }}>Check out amount</Text>
                            <Text>${response.map(i => i.end_sell)}</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                            <Text style={{ fontWeight: 'bold' }}>Check out amount</Text>
                            <Text>${response.map(i => i.end_sell) - response.map(i => i.open_sell)}</Text>
                        </View>











                        <View style={{ justifyContent: 'flex-end', flex: 1, width: '98%' }}>
                            <TouchableOpacity style={{ backgroundColor: 'red', width: wp('19.5%'), height: hp('5%'), marginBottom: 5, borderRadius: 4, justifyContent: 'center' }}
                                onPress={() => {
                                    dispatch(Call(false));
                                    navigation.navigate('Login');
                                }}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.3%') }}>Confirm</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </Modal>
            </View>

        </View>
    );
}

export default Dinning;

const styles = {
    containerStyle: {
        borderWidth: 0.6,
        borderColor: '#ddd',
        borderBottomWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 2,
        marginLeft: 2,
        width: wp('30%'),
        height: hp('18%'),
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 7
    },
    Card: {
        width: wp('9%'),
        height: hp('13%'),
        marginTop: hp('2.5%'),
        marginRight: 5,
        justifyContent: 'center',
        borderRadius: 3,
        marginRight: 2
    },
    CardText: {
        alignSelf: 'center',
        marginTop: 5,
        color: 'white',
        fontWeight: 'bold',
        fontSize: wp('2')
    },
    CardText1: {
        fontSize: wp('0.9%'),
        color: 'white',
        alignSelf: 'center',
        marginTop: 5,
    },
    modalView: {
        marginTop: '15%',
        backgroundColor: "white",
        borderRadius: 20,
        width: wp('20%'),
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

    },
    freeTable: {
        width: wp('10%'),
        height: hp('15%'),
        borderWidth: 9,
        marginLeft: wp('3%'),
        borderColor: '#32CD32',
        borderRadius: 3,
        justifyContent: 'center',
        marginBottom: hp('3%'),


    },
    TableText: {
        alignSelf: 'center',
        fontSize: wp('2%'),
        fontWeight: 'bold',
        color: 'black'
    },
    bookedTable: {
        width: wp('10%'),
        height: hp('15%'),
        borderWidth: 9,
        marginLeft: wp('3%'),
        borderRadius: 40,
        justifyContent: 'center',
        marginBottom: hp('3%'),
    },
    // bookedTableText: {
    //   alignSelf: 'center',
    //   fontSize: 15,
    //   fontWeight: 'bold',
    //   color: 'black'
    // },
};