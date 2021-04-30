import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Payable from './Payable';
import Pager from './Pager';
import Paymode from './PayMode';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Cash = (props) => {
    const [state, setState] = useState('');
    const [value, setValue] = useState('');
    const Total = props.total;
    const Data = props.D;
    const branch = props.branch;


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
    console.log(props.userid)

    return (
        <>
            {state == 'Payable' ? <Payable Value={value} Cat_id={props.Cat_id} total={Total} D={Data} branch={branch} userid={props.userid} table_id={props.t_id} count={props.member} reload={props.reload} addNewItem={props.addNewItem} Empty={props.Empty} callback={props.Call} func={props.function} Statename={props.statename} /> : state == 'Pager' ? <Pager /> : state == 'Paymode' ? <Paymode /> :
                <>
                    <View style={{ borderBottomWidth: 0.4, height: 50, flexDirection: 'row', backgroundColor: 'rgb(240,240,240)' }}>
                        <Text style={{ alignSelf: 'center', flex: 1, fontSize: wp('1.4%'), marginLeft: 30, fontWeight: 'bold', opacity: 0.5 }}>Recived amount</Text>

                        {/* <Text style={{ fontSize: 10, alignSelf: 'center', marginRight: 20 }} onPress={() => setState('Paymode')}>Back</Text> */}
                    </View>

                    <View style={{ backgroundColor: 'rgb(230,240,230)', height: '8%', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ color: 'red', alignSelf: 'center', fontSize: wp('2%') }}>$</Text>
                        <Text style={{ color: 'black', alignSelf: 'center', fontSize: wp('2%') }}>{value}</Text>
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
                                onPress={() => setState(props.pass)}
                            >
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('2%') }}>Next</Text>
                            </TouchableOpacity>

                        </Animatable.View>
                    </ScrollView>


                </>
            }
        </>
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
