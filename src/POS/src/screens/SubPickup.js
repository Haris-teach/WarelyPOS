import React, { useState } from 'react';
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import Pickup from './Pickup';
import {
    heightPercentageToDP as hp, widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { PICKUP_ORDERS, PICKUP_DETAILS } from "../utils/urls";
import APIHandler from '../utils/APIHandler';



const DATA = [
    {
        key: '1',
        order: "abc",
        Qty: "1",
        Discount: "01",
        Total: "22.00",

    },
    {
        key: '2',
        order: "#00101",
        Qty: "2",
        Discount: "01",
        Total: "22.00",

    },
    {
        key: '3',
        order: "#00101",
        Qty: "3",
        Discount: "01",
        Total: "22.00",


    },
    {
        key: '4',
        order: "#00101",
        Qty: "4",
        Discount: "01",
        Total: "22.00",


    },
    {
        key: '5',
        order: "#00101",
        Qty: "4",
        Discount: "01",
        Total: "22.00",
        bcolor: 'rgb(240,240,240)',

    },
    {
        key: '6',
        order: "#00101",
        Qty: "4",
        Discount: "01",
        Total: "22.00",

    },



];


const SubTakeway = (props) => {
    const [state, setState] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal, setModal] = useState(false);

    return (
        <>
            {state === true ?

                <View style={{ flex: 1, flexDirection: 'row' }}>


                    <View style={{ flex: 0.5, backgroundColor: 'white' }}>

                        <View style={{ flexDirection: 'row' }}>

                            <TouchableOpacity
                                style={{
                                    borderRadius: 5,
                                    borderWidth: 0.5,
                                    backgroundColor: '#F9F9F9',
                                    marginTop: hp('1%'),
                                    width: wp('15%'),
                                    alignItems: 'center',
                                    height: hp('7%'),
                                    flex: 1,
                                    alignSelf: 'flex-start',
                                    marginRight: wp('0.5%'),
                                    marginLeft: wp('0.5%'),
                                    justifyContent: 'center'

                                }}
                                onPress={() => {
                                    console.log('pickup ka response arha hai', props.pickupDetails)
                                    // setState(false)
                                }}

                            >
                                <Text style={{ color: '#6A6A6A', padding: 2, fontSize: wp('1.5%'), alignSelf: 'center' }}>Order No. </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    borderRadius: 5,
                                    marginTop: hp('1%'),
                                    width: wp('30%'),
                                    alignItems: 'center',
                                    height: hp('7%'),
                                    backgroundColor: '#FC3F3F',
                                    alignSelf: 'flex-end',
                                    justifyContent: 'center',
                                    marginRight: wp('0.5%'),

                                }}
                                onPress={() => setState(false)}

                            >
                                <Text style={{ padding: 2, fontSize: wp('1.5%'), color: 'white', alignSelf: 'center' }}>View All Pickup Orders</Text>
                            </TouchableOpacity>

                        </View>




                        <View style={{ elevation: 5, backgroundColor: '#FAFAFA', height: hp('6%'), borderTopWidth: 0.5, borderColor: '#A4A4A4', borderBottomWidth: 1, flexDirection: 'row', marginTop: hp('2%') }}>
                            <View style={{ justifyContent: 'center', width: "8.5%" }}>
                                <Text style={{ fontSize: wp('1.3%'), alignSelf: 'center', fontWeight: '600', color: 'black' }}>No.</Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'flex-start', width: wp('19.9%') }}>
                                <Text style={{ fontSize: wp('1.3%'), fontWeight: '600', color: 'black' }}>Items</Text>
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center', width: "11.5%" }}>
                                <Text style={{ fontSize: wp('1.3%'), fontWeight: '600', color: 'black' }}>Qty </Text>
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center', width: "12.3%" }}>
                                <Text style={{ fontSize: wp('1.3%'), fontWeight: '600', color: 'black' }}>Discount</Text>
                            </View>

                            <View style={{ justifyContent: 'center', alignItems: 'center', width: "13.5%" }}>
                                <Text style={{ fontSize: wp('1.3%'), fontWeight: '600', color: 'black' }}>Total  </Text>
                            </View>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: "9.3%" }}>
                                <Text style={{ fontSize: wp('1.3%'), fontWeight: '600', color: 'black' }}>Del   </Text>
                            </View>
                        </View>



                        <View style={{ height: hp('38%') }}>
                            <FlatList
                                data={props.pickupDetails}
                                keyExtractor={item => item.key}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ height: hp('10%'), flexDirection: 'row', backgroundColor: item.key % 2 == 0 ? 'white' : '#F7F7F7' }}>
                                            <View style={{ justifyContent: 'center', borderColor: '#A4A4A4', borderRightWidth: 1, height: hp('10%'), width: wp('3.65%'), }}>
                                                <Text style={{ fontSize: wp('1.5%'), alignSelf: 'center', color: 'black' }}>{item.id}</Text>

                                            </View>

                                            <TouchableOpacity style={{ justifyContent: 'center', height: hp('10%'), width: wp('21%') }} onPress={() => {

                                            }}>
                                                <Text style={{ fontSize: wp('1.3%'), marginLeft: wp('0.5%'), color: 'black' }}>{item.product}</Text>


                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={{ justifyContent: 'center', alignItems: 'center', width: wp('5.5%'), height: hp('10%'), }}
                                                onPress={() => {

                                                }}>
                                                <Text style={[{ width: wp('3%'), height: hp('5%'), textAlign: 'center', fontSize: wp('1.8%'), borderWidth: 1, borderRadius: 8, borderColor: 'gray' }]}>{item.qty}</Text>

                                            </TouchableOpacity>

                                            <TouchableOpacity
                                                style={{ justifyContent: 'center', alignItems: 'center', width: wp('6%'), height: hp('10%'), }}
                                                onPress={() => {



                                                }}>


                                                <Text style={{ fontSize: wp('1.3%'), alignSelf: 'center', color: '#FC3F3F' }}>null</Text>

                                            </TouchableOpacity>



                                            <View style={{ justifyContent: 'center', width: wp('6.5%'), height: hp('10%') }}>
                                                <Text style={{ fontSize: wp('1.3%'), alignSelf: 'center', color: '#FC3F3F' }}>${item.price}</Text>
                                            </View>

                                        </View>
                                    )
                                }}

                            />
                        </View>

                        <View style={{ borderTopWidth: 0.5, flexDirection: 'row', flex: 1, }}>
                            <View style={{ backgroundColor: '#F7F7F7', flex: 0.5, height: "90%" }}>

                                <View style={{ flexDirection: 'row', width: wp('22.2%'), height: hp('8%'), justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignSelf: 'center', width: wp('20%'), height: hp('6%'), justifyContent: 'center' }}>
                                        <Text style={{ color: 'black', alignSelf: 'center', fontWeight: 'bold', fontSize: wp('1.2%') }}>JIMMY TRAN</Text>
                                        <TouchableOpacity style={{ borderWidth: 1, borderColor: '#9B9B9B', marginLeft: wp('2%'), backgroundColor: 'white', width: wp('7.5%'), height: hp('5%'), justifyContent: 'center', borderRadius: 5, alignSelf: 'center' }}
                                            onPress={() => {

                                            }}
                                        >
                                            <Text style={{ alignSelf: 'center', fontWeight: '600', fontSize: wp('1.2%'), color: '#9B9B9B' }}>Profile</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={{ justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#E2E2E2', height: hp('8%') }}>
                                    <View style={{ alignSelf: 'center', width: wp('20%'), height: hp('6%'), justifyContent: 'center' }}>

                                        <Text style={{ color: '#FC3F3F', marginTop: '1%', fontSize: wp('1%') }}>No Address 1 Found</Text>


                                        <Text style={{ color: '#FC3F3F', marginTop: '1%', fontSize: wp('1%') }}>No Address 2 Found</Text>

                                    </View>
                                </View>

                                <View style={{ justifyContent: 'center', borderTopWidth: 1, borderColor: '#E2E2E2', height: hp('5%'), flexDirection: 'row' }}>
                                    <View style={{ alignSelf: 'center', flexDirection: 'row', width: wp('10%'), height: hp('4%'), justifyContent: 'center' }}>
                                        <Text style={{ alignSelf: 'center', color: '#9B9B9B', fontSize: wp('1%'), }}>Expire:   </Text>
                                        <Text style={{ alignSelf: 'center', color: 'black', fontWeight: '600', fontSize: wp('1.4%') }}>24/02/21</Text>

                                    </View>

                                    <View style={{ alignSelf: 'center', flexDirection: 'row', width: wp('10%'), height: hp('4%'), justifyContent: 'center' }}>
                                        <Text style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: wp('1%'), color: '#9B9B9B' }}>POINTS:   </Text>
                                        <Text style={{ alignSelf: 'center', color: '#C80101', fontWeight: 'bold', fontSize: wp('1.8%') }}>30</Text>

                                    </View>
                                </View>
                            </View>

                            <View style={{ backgroundColor: '#F7F7F7', flex: 0.5, borderLeftWidth: 0.4, alignContent: 'center', height: '90%' }}>
                                <View style={{ marginTop: hp('1%'), opacity: 0.5, marginLeft: wp('2%'), marginRight: wp('2%') }}>

                                    <View style={styles.vStyle}>
                                        <Text style={[styles.Tstyle, { flex: 1 }]}>Sub Total:</Text>
                                        <Text style={styles.Tstyle}>$00</Text>

                                    </View>

                                    <View style={styles.vStyle}>
                                        <Text style={[styles.Tstyle, { flex: 1 }]}>SVC Charge:</Text>
                                        <Text style={styles.Tstyle}>$00</Text>
                                    </View>

                                    <View style={styles.vStyle}>
                                        <Text style={[styles.Tstyle, { flex: 1 }]}>GST:</Text>
                                        <Text style={styles.Tstyle}>$00</Text>
                                    </View>

                                    <View style={styles.vStyle}>
                                        <Text style={[styles.Tstyle, { flex: 1 }]}>Discount:</Text>
                                        <Text style={styles.Tstyle}>-$0</Text>

                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginLeft: wp('2%'), marginRight: wp('2%') }}>
                                    <Text style={{ flex: 1, alignSelf: "center", fontWeight: 'bold', fontSize: wp('2.5%') }} >Total:</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: wp('2.5%'), alignSelf: 'center', color: '#FC3F3F' }}>$00</Text>
                                </View>

                            </View>
                        </View>



                        <View style={{ flexDirection: 'row', marginBottom: '3%', marginLeft: wp('1%') }}>

                            <TouchableOpacity style={{
                                width: wp('12%'),
                                borderRadius: 3,
                                justifyContent: 'center', marginRight: wp('1%'), backgroundColor: '#FC3F3F', height: hp('7%')
                            }} onPress={() => setModal(true)} >
                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: wp('1.5%'), }}>Void</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.fbtnStyle, { backgroundColor: '#FFA64D', width: wp('12%'), height: hp('7%'), marginRight: wp('1%') }]} >
                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: wp('1.5%'), }}>Print</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.fbtnStyle, { backgroundColor: 'gray', width: wp('22%'), height: hp('7%') }]} >
                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: wp('1.5%'), }}>Paid</Text>
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View style={{ flex: 0.5, backgroundColor: '#F7F7F7' }}>
                        <View style={{ marginTop: hp('10%') }}>
                            <Text style={{ alignSelf: 'center', color: 'black', fontWeight: 'bold', fontSize: wp('1.3%') }}>Estimated Arrival Time</Text>
                            <Text style={{ alignSelf: 'center', color: '#FC3F3F', fontWeight: 'bold', fontSize: wp('5%') }}>02:25 PM</Text>
                        </View>
                        <ScrollView>

                            <View style={styles.containerStyle}>
                                <Text style={{ marginLeft: wp('2%'), alignSelf: 'center', fontWeight: 'bold', fontSize: wp('1.5%'), color: 'black' }}>ORDER NO :</Text>
                                <Text style={{ marginRight: wp('2%'), alignSelf: 'center', color: '#FC3F3F', fontWeight: '600', fontSize: wp('1.5%'), }}>#00001</Text>
                            </View>


                            <View style={styles.containerStyle}>
                                <Text style={{ marginLeft: wp('2%'), alignSelf: 'center', fontWeight: 'bold', fontSize: wp('1.5%'), color: 'black' }}>TOTAL :</Text>
                                <Text style={{ marginRight: wp('2%'), alignSelf: 'center', color: '#FC3F3F', fontWeight: '600', fontSize: wp('1.5%'), }}>JIMMY TAN</Text>
                            </View>


                            <View style={styles.containerStyle}>
                                <Text style={{ marginLeft: wp('2%'), alignSelf: 'center', fontWeight: 'bold', fontSize: wp('1.5%'), color: 'black' }}>CONTACT :</Text>
                                <Text style={{ marginRight: wp('2%'), alignSelf: 'center', color: '#FC3F3F', fontWeight: '600', fontSize: wp('1.5%'), }}>03044041082</Text>
                            </View>

                            <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                                <Text style={{ alignSelf: 'center', fontSize: wp('1.8%'), fontWeight: '600', color: 'white' }}>COMPLETE</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>


                    <Modal
                        animationType="fade"

                        transparent={true}
                        visible={modal}
                        onRequestClose={() => {

                            setModal(!modal);
                        }}
                    >

                        <View style={{
                            marginTop: hp('15%'),
                            alignItems: 'center', alignSelf: 'center',
                            backgroundColor: "white",
                            borderRadius: 20,
                            height: hp('55%'),
                            width: hp('45%'), shadowColor: "#000",
                            shadowOffset: {
                                width: 10,
                                height: 10
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 8,
                        }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: wp('1%'), marginTop: hp('1%'), }} onPress={() => setModal(false)}>
                                <Image source={require('../assets/cross2.png')} resizeMode="contain" style={{ width: wp('3%'), height: hp('3%') }} />
                            </TouchableOpacity>


                            <View style={{
                                backgroundColor: 'white', shadowColor: "#000",
                                shadowOffset: {
                                    width: 10,
                                    height: 10
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 8, borderRadius: 150, justifyContent: 'center', marginRight: wp('1%'), marginTop: hp('1%'), alignSelf: 'center', width: wp('15%'), height: hp('23.5%')
                            }} >
                                <Image source={require('../assets/reject.png')} resizeMode="contain" style={{ width: wp('16%'), height: hp('17%') }} />
                            </View>
                            <Text style={{ marginTop: hp('5%'), alignSelf: 'center', color: 'gray', fontWeight: 'bold', fontSize: wp('1.8%') }}>Void this Order</Text>


                            <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: '#FC3F3F', width: wp('18%'), height: hp('8%'), marginTop: hp('4%'), marginBottom: 5, borderRadius: 4 }}>
                                <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.8%') }}>Confirm</Text>
                            </TouchableOpacity>


                        </View>

                    </Modal>
                    <Modal
                        animationType="fade"

                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {

                            setModalVisible(!modalVisible);
                        }}
                    >

                        <View style={{
                            marginTop: hp('15%'),
                            alignItems: 'center', alignSelf: 'center', justifyContent: 'center',
                            backgroundColor: "white",
                            borderRadius: 20,
                            height: hp('55%'),
                            width: hp('45%'), shadowColor: "#000",
                            shadowOffset: {
                                width: 10,
                                height: 10
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 8,
                        }}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: wp('1%'), marginTop: hp('1%'), }} onPress={() => setModalVisible(false)}>
                                <Image source={require('../assets/cross2.png')} resizeMode="contain" style={{ width: wp('3%'), height: hp('3%') }} />
                            </TouchableOpacity>


                            <View style={{
                                backgroundColor: 'white', shadowColor: "#000",
                                shadowOffset: {
                                    width: 10,
                                    height: 10
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 8, borderRadius: 150, justifyContent: 'center', marginRight: wp('1%'), marginTop: hp('1%'), alignSelf: 'center', width: wp('15%'), height: hp('23.5%')
                            }} >
                                <Image source={require('../assets/order.jpg')} resizeMode="contain" style={{ width: wp('15%'), height: hp('17%') }} />
                            </View>
                            <Text style={{ marginTop: hp('5%'), alignSelf: 'center', color: 'gray', fontWeight: 'bold', fontSize: wp('1.8%') }}>Order Complete</Text>

                            <View style={{ justifyContent: 'flex-end', flex: 1, width: '98%' }}>

                                <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center', backgroundColor: '#FC3F3F', width: wp('18%'), height: hp('8%'), marginTop: hp('4%'), marginBottom: hp('2%'), borderRadius: 4 }}>
                                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.8%') }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </Modal>


                </View> :
                <Pickup />
            }
        </>
    );
}

export default SubTakeway;

const styles = {
    textStyle: {
        fontSize: 9,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    viewStyle: {

        marginTop: 5,
        borderRightWidth: 0.3,
        width: "19%"
    },
    viewbtnStyle: {
        marginLeft: 30,

        width: 20,
        height: 20,
    },

    vStyle: {
        flexDirection: 'row',
        height: '22%'
    },
    Tstyle: {
        alignSelf: "center",
        fontSize: 10
    },
    fbtnStyle: {
        width: '50%',
        height: 25,
        borderRadius: 3,
        justifyContent: 'center'

    },
    Card: {
        width: 65,
        height: 55,
        marginTop: 10,
        marginLeft: 5,
        borderRadius: 4,

    },
    CardText: {
        alignSelf: 'center',
        marginTop: "30%",
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10
    },
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 0.6,
        borderColor: '#ddd',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
        width: wp('40%'),
        height: hp('9%'),
        alignSelf: 'center',
        marginTop: hp('4%')
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: '#FC3F3F',
        borderRadius: 4,
        marginTop: '5%',
        width: wp('40%'),
        height: hp('8%'),
        alignSelf: 'center',
        backgroundColor: '#FC3F3F'
    },
    modalView: {
        marginTop: hp('15%'),
        backgroundColor: "white",
        borderRadius: 20,
        height: hp('55%'),
        width: hp('45%'),

        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 8,
        padding: 2
    },
    vStyle: {
        flexDirection: 'row',
        height: hp('3.5%')

    },
    Tstyle: {
        alignSelf: "center",
        fontSize: wp('1.1%')
    }
};