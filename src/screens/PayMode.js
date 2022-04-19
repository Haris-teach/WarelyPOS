import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Pay from './Pay';
import Cash from './Cash';
import Card from './Card';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Paymode = (props) => {
    const [state, setState] = useState('');
    const Total = props.total;
    const Data = props.D;
    const branch = props.branch;




    return (
        <>
            {state == 'Pay' ? <Pay /> : state == 'Cash' ? <Cash refresh={props.refresh} T_order_sum={props.T_order_sum} pass='Payable' Cat_id={props.Cat_id} total={Total} D={Data} branch={branch} t_id={props.table_id} member={props.count} userid={props.userid} reload={props.reload} addNewItem={props.addNewItem} Empty={props.Empty} Call={props.callback} function={props.func} statename={props.Statename} T_order_id={props.T_order_id} table_pass={props.table_pass} /> : state == 'Card' ? <Card /> :

                <>
                    <View style={{ borderBottomWidth: 0.4, height: 70, flexDirection: 'row', }}>
                        <Text style={{ alignSelf: 'center', flex: 1, fontSize: wp('1.3%'), marginLeft: 30, fontWeight: 'bold', opacity: 0.5 }}></Text>

                        <Text style={{ fontSize: wp('1.3%'), fontWeight: 'bold', alignSelf: 'center', marginRight: 20 }} onPress={() => setState('Pay')}>Back</Text>
                    </View>


                    <View style={{ alignSelf: 'center', marginTop: '10%' }}>
                        <Text style={{ fontSize: wp('1.5%'), color: 'red' }}>PAYMENT MODE</Text>
                    </View>



                    <View style={styles.container1}>






                        <View
                            style={{
                                marginTop: wp('1.5%'),
                                flexDirection: "row",
                                flex: 1
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginLeft: wp('1.5%'),
                                    marginBottom: wp('1.5%'),
                                }}
                            >
                                <TouchableOpacity
                                    style={styles.ButtonView}
                                    onPress={() => setState('Card')}
                                >

                                    <Text style={styles.ButtonViewText}>Card</Text>

                                </TouchableOpacity>
                            </View>

                            <View
                                style={{
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginRight: wp('1.5%'),
                                    marginBottom: wp('1.5%'),
                                }}
                            >
                                <TouchableOpacity style={styles.ButtonView2} onPress={() => {
                                    setState('Cash');

                                }}>
                                    <Text style={styles.ButtonViewText}>Cash</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>





                </>
            }
        </>
    );
}

export default Paymode;

const styles = StyleSheet.create({

    container1: {
        borderRadius: 10,
        marginRight: wp('1.5%'),
        marginLeft: wp('1.5%'),
        alignItems: "center",
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: "#b5b5b5",
        width: "80%",
        height: '50%',
    },
    TextStyle: {
        color: "black",
        fontWeight: "bold",
        fontSize: wp('1.5%'),
    },
    ButtonView: {
        borderRadius: 5,
        alignSelf: "center",
        justifyContent: "center",
        width: wp('13%'),
        height: hp('8%'),
        marginLeft: wp('0.1%'),
        alignItems: "center",
        backgroundColor: "#74bf64",
    },
    ButtonView2: {
        borderRadius: 5,
        alignSelf: "center",
        justifyContent: "center",
        width: wp('13%'),
        height: hp('8%'),
        marginLeft: wp('1.5%'),
        alignItems: "center",
        backgroundColor: "red",
    },
    ButtonViewText: {
        color: "#ffffff",
        fontWeight: "bold",
        marginTop: 5,
        fontSize: wp('1.5%'),
    },

});
