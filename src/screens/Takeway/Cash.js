import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Pager from '../Pager';
import Payable from './Payable';
import Pay from './Pay';
const Cash = (props) => {
    const [state, setState] = useState('');
    const [value, setValue] = useState('');
    const Total = props.total;
    const Data = props.D;
    const branch = props.branch;
    // console.log([props.empty])
    // console.log('Total ===', props.pay, Total)

    const concatinate = (v) => {
        let word = value;

        if (v == 'del') {
            word = word.slice(0, -1);
            setValue(word);
            return;
        }
        else {
            word = word + v;
        }

        setValue(word);
    }


    return (
        <View style={{ flex: 1 }}>
            {state == 'Payable' ? <Payable
                total={props.total}
                checkPaymode={props.checkPaymode} NameState={props.NameState} btnDisTot={props.btnDisTot} disTotal={props.disTotal} total_dis={props.total_dis} pay={props.OrgTotal} refresh={props.refresh} T_order_sum={props.T_order_sum} T_order_id={props.T_order_id} table_pass={props.table_pass} Value={value} Cat_id={props.Cat_id} total={Total} D={Data} branch={branch} userid={props.userid} table_id={props.table_id} count={props.count} reload={props.reload} addNewItem={props.addNewItem} empty={props.Empty} callback={props.Call} func={props.function} Statename={props.statename} pass={props.pass} /> : state == 'Pager' ? <Pager /> : state == 'Pay' ?

                    <Pay checkPaymode={props.checkPaymode} NameState={props.NameState} btnDisTot={props.btnDisTot} disTotal={props.disTotal} Total_Discount={props.total_dis} retu={props.totalState} pay={props.OrgTotal} refresh={props.refresh} T_order_sum={props.T_order_sum} pass='Payable' Cat_id={props.Cat_id} total={Total} D={Data} branch={branch} t_id={props.table_id} member={props.count} userid={props.userid} reload={props.reload} addNewItem={props.addNewItem} empty={props.Empty} Call={props.callback} function={props.func} statename={props.Statename} T_order_id={props.T_order_id} table_pass={props.table_pass} />

                    :
                    <View style={{ flex: 1, borderLeftWidth: 1, borderColor: 'gray', }}>
                        <View style={{ backgroundColor: '#ECECEC', height: hp('10%'), width: wp('40%'), flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', flex: 1, fontSize: wp('1.3%'), color: '#c4c4c4', marginLeft: wp('3%') }}>Enter the recieved amount</Text>
                        </View>

                        <View style={{ backgroundColor: '#ECECEC', height: hp('15%'), width: wp('40%'), flexDirection: 'row' }}>
                            <Text style={{ marginLeft: wp('3%'), color: 'black', alignSelf: 'center', fontSize: wp('3%'), fontWeight: 'bold' }}>$ </Text>
                            <Text style={{ color: 'black', fontWeight: 'bold', alignSelf: 'center', fontSize: wp('3%') }}>{value}</Text>
                        </View>




                        <View
                            style={{ width: wp('39.9%'), height: hp('61%') }}
                        >


                            <View style={{ flexDirection: 'row', width: wp('40%'), borderTopWidth: 1, borderColor: '#CCCCCC', backgroundColor: 'white' }}>

                                <TouchableOpacity style={{ width: wp('13.5%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderRightWidth: 1 }}
                                    onPress={() => concatinate('1')}>
                                    <Text style={{ alignSelf: 'center', fontSize: 25, }}>1</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: wp('13.5%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', }}
                                    onPress={() => concatinate('2')}>
                                    <Text style={{ alignSelf: 'center', fontSize: 25, }}>2</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: wp('13.5%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderLeftWidth: 1 }}
                                    onPress={() => concatinate('3')}>
                                    <Text style={{ alignSelf: 'center', fontSize: 25, }}>3</Text>
                                </TouchableOpacity>


                            </View>



                            <View style={{ flexDirection: 'row', width: wp('40%'), borderTopWidth: 1, borderColor: '#CCCCCC', backgroundColor: 'white' }}>

                                <TouchableOpacity style={{ width: wp('13.5%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderRightWidth: 1 }}
                                    onPress={() => concatinate('4')}>
                                    <Text style={{ alignSelf: 'center', fontSize: 25, }}>4</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: wp('13.5%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', }}
                                    onPress={() => concatinate('5')}>
                                    <Text style={{ alignSelf: 'center', fontSize: 25, }}>5</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: wp('13.5%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderLeftWidth: 1 }}
                                    onPress={() => concatinate('6')}>
                                    <Text style={{ alignSelf: 'center', fontSize: 25, }}>6</Text>
                                </TouchableOpacity>


                            </View>



                            <View style={{ flexDirection: 'row', width: wp('40%'), borderTopWidth: 1, borderColor: '#CCCCCC', backgroundColor: 'white' }}>

                                <TouchableOpacity style={{ width: wp('13.5%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderRightWidth: 1 }}
                                    onPress={() => concatinate('7')}>
                                    <Text style={{ alignSelf: 'center', fontSize: 25, }}>7</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: wp('13.5%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', }}
                                    onPress={() => concatinate('8')}>
                                    <Text style={{ alignSelf: 'center', fontSize: 25, }}>8</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ width: wp('13.5%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderLeftWidth: 1 }}
                                    onPress={() => concatinate('9')}>
                                    <Text style={{ alignSelf: 'center', fontSize: 25, }}>9</Text>
                                </TouchableOpacity>


                            </View>



                            <View style={{ flexDirection: 'row', width: wp('40%'), borderTopWidth: 1, borderColor: '#CCCCCC', backgroundColor: 'white' }}>


                                <TouchableOpacity style={{ borderBottomWidth: 1, width: wp('13.5%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderRightWidth: 1 }}
                                    onPress={() => {
                                        concatinate('del');
                                        // counter = 0;
                                        // console.log('dot ki value zero krni hai', counter)
                                    }}>
                                    <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: '600' }}>CLEAR</Text>
                                </TouchableOpacity>



                                <TouchableOpacity style={{ borderColor: '#CCCCCC', borderBottomWidth: 1, width: wp('13.5%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center' }}
                                    onPress={() => concatinate('0')}>
                                    <Text style={{ alignSelf: 'center', fontSize: 25, }}>0</Text>
                                </TouchableOpacity>



                                <TouchableOpacity
                                    // disabled={counter > 0 ? true : false}
                                    style={{ borderBottomWidth: 1, width: wp('13.5%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center', borderColor: '#CCCCCC', borderLeftWidth: 1 }}
                                    onPress={() => {
                                        concatinate('.')
                                        // counterAdd()
                                    }}>

                                    <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold', }}>.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', height: hp('12%'), width: wp('40%'), backgroundColor: 'white', }}>
                                <TouchableOpacity
                                    //  disabled={counter > 0 ? true : false}
                                    style={{ width: wp('13.5%'), backgroundColor: 'white', height: hp('12%'), justifyContent: 'center' }}
                                    onPress={() => setState('Pay')}>

                                    <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: '600', color: '#FF2E2E' }}>BACK</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: wp('26.5%'), backgroundColor: '#FF2E2E', height: hp('12%'), justifyContent: 'center' }}
                                    onPress={() => {
                                        // setState(props.pass)
                                        setState('Payable');


                                    }}
                                >
                                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold' }}>ENTER</Text>
                                </TouchableOpacity>

                            </View>



                        </View>


                    </View>
            }
        </View >
    );
}

export default Cash;

const styles = StyleSheet.create({
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
});
