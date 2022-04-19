import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Pickup from './Pickup';


const DATA = [
    {
        key: '1',
        order: "abc",
        Time: "12:20 PM",
        Pager: "01",
        Name: "haris",
        bcolor: 'rgb(240,240,240)',
    },
    {
        key: '2',
        order: "#00101",
        Time: "12:20 PM",
        Pager: "01",
        Name: "haris",

    },
    {
        key: '3',
        order: "#00101",
        Time: "12:20 PM",
        Pager: "01",
        Name: "haris",
        bcolor: 'rgb(240,240,240)',

    },
    {
        key: '4',
        order: "#00101",
        Time: "12:20 PM",
        Pager: "01",
        Name: "haris",


    },
    {
        key: '5',
        order: "#00101",
        Time: "12:20 PM",
        Pager: "01",
        Name: "haris",
        bcolor: 'rgb(240,240,240)',

    },
    {
        key: '6',
        order: "#00101",
        Time: "12:20 PM",
        Pager: "01",
        Name: "haris",

    },



];


const SubTakeway = () => {
    const [state, setState] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal, setModal] = useState(false);
    return (
        <>
            {state === true ?

                <View style={{ flex: 1, flexDirection: 'row' }}>


                    <View style={{ flex: 0.5, backgroundColor: 'white' }}>

                        <View style={{ flexDirection: 'row', height: 30 }}>
                            <TouchableOpacity
                                style={{
                                    borderRadius: 5,
                                    borderWidth: 2,
                                    borderColor: "#b5b5b5",
                                    marginTop: 5,
                                    width: "20%",
                                    alignItems: 'center',
                                    height: 30,

                                    justifyContent: 'center',
                                    marginRight: 20,
                                    marginLeft: 5
                                }}
                                onPress={() => setState(false)}

                            >
                                <Text style={{ padding: 2, fontSize: 10 }}>Back</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    borderRadius: 5,
                                    marginTop: 5,
                                    width: "75%",
                                    alignItems: 'center',
                                    height: 30,
                                    backgroundColor: 'red',
                                    justifyContent: 'center'

                                }}

                            >
                                <Text style={{ padding: 2, fontSize: 12, color: 'white', alignSelf: 'center' }}>PICKUP</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{
                            flexDirection: 'row', height: 20, borderColor: '#cbcdad', marginTop: 10, shadowColor: "#000",
                            shadowOffset: {
                                width: 10,
                                height: 10
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 1,
                            elevation: 1
                        }}>
                            <Text style={{ alignSelf: 'flex-start', flex: 1, fontWeight: 'bold', fontSize: 10, marginTop: 4 }}>
                                TAKEWAY
                    </Text>
                            <Text style={{ alignItems: 'center', flex: 1, color: 'red', fontSize: 9, marginTop: 4 }}>
                                RECEVIED 07:55 pm
                    </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 10, marginTop: 4 }}>
                                N0. 001
                     </Text>
                        </View>



                        <View style={{ flexDirection: 'row', marginLeft: 0 }}>
                            <View style={styles.viewStyle}>
                                <Text style={styles.textStyle}>NO.  </Text>
                            </View>
                            <View style={styles.viewStyle}>
                                <Text style={styles.textStyle}>item  </Text>
                            </View>
                            <View style={styles.viewStyle}>
                                <Text style={styles.textStyle}>Discount  </Text>
                            </View>
                            <View style={styles.viewStyle}>
                                <Text style={styles.textStyle}>Total  </Text>
                            </View>
                            <View style={styles.viewStyle}>
                                <Text style={styles.textStyle}>Del   </Text>
                            </View>
                        </View>



                        <View style={{ height: '30%' }}>
                            <FlatList
                                data={DATA}
                                keyExtractor={item => item.key}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ flexDirection: 'row', backgroundColor: item.bcolor }}>
                                            <View style={styles.viewStyle}>
                                                <Text style={styles.textStyle}>{item.key}</Text>
                                            </View>
                                            <View style={styles.viewStyle}>
                                                <Text style={styles.textStyle}>{item.order}</Text>
                                            </View>
                                            <View style={styles.viewStyle}>
                                                <Text style={styles.textStyle}>{item.Time}</Text>
                                            </View>
                                            <View style={styles.viewStyle}>
                                                <Text style={styles.textStyle}>{item.Name}</Text>
                                            </View>
                                            <View style={styles.viewbtnStyle}>
                                                <Image source={require('../assets/dele.jpg')} style={{ width: 20, height: 20 }} />
                                            </View>

                                        </View>
                                    )
                                }}

                            />
                        </View>

                        <View style={{ flexDirection: 'row', flex: 1, }}>
                            <View style={{ backgroundColor: 'rgb(240,240,240)', flex: 0.5, height: "90%" }}>

                                <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, height: "32%", justifyContent: 'space-around' }}>
                                    <Text style={{ flex: 1, alignSelf: 'center', fontSize: 13 }}>JIMMY TAN</Text>
                                    <TouchableOpacity style={{ borderRadius: 2, width: 40, backgroundColor: 'white', borderWidth: 0.3, marginRight: 10, marginTop: 0, height: 16, opacity: 0.5 }}>
                                        <Text style={{ fontSize: 10, alignSelf: 'center' }}>profile</Text>
                                    </TouchableOpacity>
                                </View>


                                <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, height: '32%', opacity: 0.5 }}>
                                    <Text style={{ flex: 1, alignSelf: 'center', fontSize: 10 }}>Jurong west 65 blk 123 # 12-12</Text>

                                </View>


                                <View style={{ flexDirection: 'row', borderBottomWidth: 0.3, height: "32%" }}>
                                    <Text style={{ flex: 1, alignSelf: "center", fontSize: 10, opacity: 0.5 }}>Expire 24/03/2022</Text>
                                    <View style={{ borderRadius: 2, width: 50, marginRight: 10, justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 10, alignSelf: 'center' }}>Point:   80</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{ backgroundColor: 'rgb(240,240,240)', flex: 0.5, borderLeftWidth: 0.4, alignContent: 'center', height: '90%' }}>
                                <View style={{ opacity: 0.5, marginLeft: 25, marginRight: 25 }}>

                                    <View style={styles.vStyle}>
                                        <Text style={[styles.Tstyle, { flex: 1 }]}>Sub Total</Text>
                                        <Text style={styles.Tstyle}>$50.00</Text>
                                    </View>

                                    <View style={styles.vStyle}>
                                        <Text style={[styles.Tstyle, { flex: 1 }]}>SVC Charge</Text>
                                        <Text style={styles.Tstyle}>$5.00</Text>
                                    </View>

                                    <View style={styles.vStyle}>
                                        <Text style={[styles.Tstyle, { flex: 1 }]}>GST</Text>
                                        <Text style={styles.Tstyle}>$3.50</Text>
                                    </View>

                                    <View style={styles.vStyle}>
                                        <Text style={[styles.Tstyle, { flex: 1 }]}>Discount</Text>
                                        <Text style={styles.Tstyle}>-$4.00</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: -10, borderBottomWidth: 0.3, borderTopWidth: 0.3, marginLeft: 25, marginRight: 25 }}>
                                    <Text style={{ flex: 1, alignSelf: "center", fontSize: 12 }} >Total</Text>
                                    <Text style={{ fontSize: 12, alignSelf: 'center' }}>$46.00</Text>
                                </View>

                            </View>
                        </View>



                        <View style={{ flexDirection: 'row', marginBottom: '3%', justifyContent: 'space-around', marginLeft: '15%' }}>
                            <View style={{ flex: 1 }}>
                                <TouchableOpacity style={[styles.fbtnStyle, { backgroundColor: 'red', height: 30 }]} onPress={() => setModal(true)} >
                                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 10, }}>REJECT ORDER</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ flex: 1 }}>
                                <View style={[styles.fbtnStyle, { backgroundColor: 'rgb(230,230,230)', width: "95%", height: 30 }]} >
                                    <Text style={{ alignSelf: 'center', color: 'black', fontSize: 10, }}>Paid</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    <View style={{ flex: 0.5, backgroundColor: 'rgb(230,230,230)' }}>
                        <View style={{ marginTop: '10%', borderBottomWidth: 1 }}>

                            <Text style={{ alignSelf: 'center', color: 'red', fontSize: 18 }}>02:25 PM</Text>
                        </View>
                        <ScrollView>

                            <View style={styles.containerStyle}>
                                <Text style={{ alignSelf: 'center', fontSize: 10, color: 'black' }}>Order No :</Text>
                                <Text style={{ alignSelf: 'center', color: 'red' }}>00001</Text>
                            </View>


                            <View style={styles.containerStyle}>
                                <Text style={{ alignSelf: 'center', fontSize: 10, color: 'black' }}>Name :</Text>
                                <Text style={{ alignSelf: 'center', color: 'red' }}>JIMMY TAN</Text>
                            </View>


                            <View style={styles.containerStyle}>
                                <Text style={{ alignSelf: 'center', fontSize: 10, color: 'black' }}>CONTACT :</Text>
                                <Text style={{ alignSelf: 'center', color: 'red' }}>03044041082</Text>
                            </View>

                            <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                                <Text style={{ alignSelf: 'center', fontSize: 10, color: 'white' }}>COMPLETE</Text>
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

                        <View style={styles.modalView}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 8 }} onPress={() => setModal(false)}>
                                <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>


                            <View style={{ marginRight: 10, marginTop: 8, alignSelf: 'center', width: '40%', height: '40%' }} >
                                <Image source={require('../assets/reject.jpg')} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
                            </View>
                            <Text>Reject Order</Text>

                            <View style={{ justifyContent: 'flex-end', flex: 1, width: '98%' }}>
                                <TouchableOpacity style={{ backgroundColor: 'red', width: '100%', height: 30, marginBottom: 5, borderRadius: 4 }}>
                                    <Text style={{ color: 'white', alignSelf: 'center' }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>

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

                        <View style={styles.modalView}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 8 }} onPress={() => setModalVisible(false)}>
                                <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>


                            <View style={{ marginRight: 10, marginTop: 8, alignSelf: 'center', width: '40%', height: '40%' }}>
                                <Image source={require('../assets/order.jpg')} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
                            </View>
                            <Text>Order Complete</Text>

                            <View style={{ justifyContent: 'flex-end', flex: 1, width: '98%' }}>
                                <TouchableOpacity style={{ backgroundColor: 'red', width: '100%', height: 30, marginBottom: 5, borderRadius: 4 }}>
                                    <Text style={{ color: 'white', alignSelf: 'center' }}>Confirm</Text>
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
        justifyContent: 'space-around',
        borderWidth: 0.6,
        borderColor: '#ddd',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
        width: "80%",
        height: 70,
        alignSelf: 'center',
        marginTop: '4%'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 4,
        marginTop: '5%',
        width: "70%",
        height: 40,
        alignSelf: 'center',
        backgroundColor: 'red'
    },
    modalView: {
        marginTop: '5%',
        backgroundColor: "white",
        borderRadius: 20,
        height: '85%',
        width: '23%',
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