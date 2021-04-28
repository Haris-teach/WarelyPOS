import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Pay from './Pay';
import Cash from './Cash';
import Card from './Card';

const Paymode = (props) => {
    const [state, setState] = useState('');
    const Total = props.total;
    const Data = props.D;
    const branch = props.branch;



    return (
        <>
            {state == 'Pay' ? <Pay /> : state == 'Cash' ? <Cash pass='Payable' Cat_id={props.Cat_id} total={Total} D={Data} branch={branch} t_id={props.table_id} member={props.count} userid={props.userid} reload={props.reload} addNewItem={props.addNewItem} Empty={props.Empty} Call={props.callback} function={props.func} statename={props.Statename} /> : state == 'Card' ? <Card /> :

                <>

                    <View style={{ alignSelf: 'center', marginTop: '10%' }}>
                        <Text style={{ fontSize: 13, color: 'red' }}>PAYMENT MODE</Text>
                    </View>



                    <View style={styles.container1}>






                        <View
                            style={{
                                marginTop: 15,
                                flexDirection: "row",
                                flex: 1
                            }}
                        >
                            <View
                                style={{
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    marginLeft: 30,
                                    marginBottom: 20
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
                                    marginRight: 30,
                                    marginBottom: 20,
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
        marginRight: 20,
        marginLeft: 20,
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
        fontSize: 20,
    },
    ButtonView: {
        borderRadius: 5,
        alignSelf: "center",
        justifyContent: "center",
        width: 115,
        height: 45,
        marginLeft: 10,
        alignItems: "center",
        backgroundColor: "#74bf64",
    },
    ButtonView2: {
        borderRadius: 5,
        alignSelf: "center",
        justifyContent: "center",
        width: 115,
        height: 45,
        marginLeft: 10,
        alignItems: "center",
        backgroundColor: "red",
    },
    ButtonViewText: {
        color: "#ffffff",
        fontWeight: "bold",
        marginTop: 5,
        fontSize: 12,
    },

});
