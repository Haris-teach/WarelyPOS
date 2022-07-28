import React, { useEffect, useState } from 'react';
import { FlatList, Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch } from 'react-redux';
import { SetSelect } from '../../Redux/Reducers/mainReducer';
import APIHandler from '../../utils/APIHandler';
import { MODIFIRES } from '../../utils/urls';
import Burger from './Burger';

var name = '';
var price = '';
var var_Id = 1;
var arr = [];
var Product_Id = 0;
// { 'name': '', 'price': '', 'pax': '', 'mode_id': '' }
const Extras = (props) => {
    const dispatch = useDispatch()
    const [modalPax, setModalPax] = useState(false);
    const [paxCount, setPaxCount] = useState(1);
    const [modalPax1, setModalPax1] = useState(false);
    const [paxCount1, setPaxCount1] = useState(1);
    const [btn, setBtn] = useState('');
    const [btn1, setBtn1] = useState('');
    const [value, setValue] = useState();
    const [state, setState] = useState();
    const [value1, setValue1] = useState();
    const handleClick = () => setValue(!value)
    const handleClick1 = () => setValue1(!value1)
    const [backBtn, setBackBtn] = useState(0);
    const [response, setResponse] = useState();
    const [i, setI] = useState(0);


    const increment = () => {
        return (
            setPaxCount(paxCount + 1)
        );
    }

    const decrement = () => {

        if (paxCount > 1) {
            setPaxCount(paxCount - 1)
        }
    }

    const increment1 = () => {
        return (
            setPaxCount1(paxCount1 + 1)
        );
    }

    const decrement1 = () => {

        if (paxCount1 > 1) {
            setPaxCount1(paxCount1 - 1)
        }
    }
    // console.log("Produc Id is == ", props.product_id, props.ItemIndex)

    useEffect(() => {


        let mounted = true;
        if (mounted) {
            let params = {
                p_id: props.modifier,
            };

            APIHandler.hitApi(MODIFIRES, 'POST', params).then(res => {
                console.log("MOdifires Response is  ===", res);
                setResponse(res);
                // console.log('modifier dehnaaaa', response)
            });
        }
        return function cleanup() {
            mounted = false;
        }

    }, []);

    const AdditionalItems = (n, p, vid) => {
        const obj = { 'name': n, 'price': p, 'pax': paxCount, 'mode_id': vid, product_id: 15 };
        arr.push(obj)
    }



    console.log("SERVER LATER =====", props.modifier);

    return (

        <View style={{ flex: 1 }}>


            <>
                {state == 'Burger' ? <Burger Cat_id={props.Cat_id} Call={props.Call} ExtCallback={props.ExtCallback} btn={props.btn} addNewItem={props.addNewItem} modifier={props.modifier} itemName={props.itemName} itemPrice={props.itemPrice} Product_id={props.Product_id} /> :
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
                                    // props.ExtCallback(i);
                                    AdditionalItems(name, price, btn, Product_Id);
                                    // setP(p + (parseInt(price) * paxCount));
                                    // TotalSum = TotalSum + parseFloat(price);
                                    // dispatch(SetTotal2(p + (parseInt(price) * paxCount)));

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
                                                            price = item.price * paxCount;
                                                            Product_Id = item.mod_id;

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

                                    setState('Burger');
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
                                    // props.ServeLater('#FFA64D');
                                    setState('Burger');
                                    // props.addNewItem(props.productName, props.productPrice, 0, props.productID, props.modifier, name, price, paxCount, var_Id);
                                    props.addNewItem(props.productName, props.productPrice, 0, props.productID, props.modifier, arr, '#FFA64D');
                                    arr = [];
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

                                    setState('Burger');
                                    props.addNewItem(props.productName, props.productPrice, 0, props.productID, props.modifier, arr, 'white');
                                    arr = [];
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



                    </View>}</>


        </View >



    );
}

export default Extras;

const styles = {

};















// onPress={() => {
//     if (item.status === "free") {
//       if (selectMerge) {
//         selectedTableForMerge(index);
//         setTable_condi('notable');
//         setT_order_id(item.order_id);

//       }
//       else {
//         // setTable(item.table);
//         // setTable_id(item.key);
//         let singleTable = [
//           item,
//         ];

//         mergedTables = singleTable;
//         setModalVisible(true);
//         setTable_condi('notable');
//         setT_order_id(item.order_id);

//       }
//       dispatch(SetSelect('Burger'));
//     }




//     else {
//       if (item.payment == 'paid') {
//         selectedTableForMerge2(index);
//       }

//       else {

//         let singleTable = [
//           item,
//         ];

//         mergedTables2 = singleTable;
//         if (item.payment == 'paid') {
//           setModalVisible2(true);
//         }
//         setTable_condi('notable');
//         setT_order_id(item.order_id);

//       }

//       if (press == true) {
//         setState(true);
//       }
//       else {
//         setState(false);
//       }







//       // ToastAndroid.show(item.table + "  is Booked !", ToastAndroid.SHORT);
//       setTable(item.table);
//       setT_order_id(item.order_id);
//       setTable_condi('table');
//       const obj = { 'table': item.table };
//       mergedTables = [obj];
//       dispatch(SetSelect('Burger'));
//     }
//   }}