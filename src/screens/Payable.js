import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import Burger from './Burger';

const Payable = (props) => {
    let Recived = props.Value;

    const Total = props.total;
    let V = Recived - Total;
    const [modalVisible, setModalVisible] = useState(false);


    const Data = props.D;
    const token = '$2y$10$f43enwo0NWLsBmlGfx/ZMevMgmvEdbrZ3JTF.FNoVM4Nrj2aZYE82';
    const br = props.branch;



    const Save = () => {
        fetch("https://warly2.sapphost.com/public/api/order_saved", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                'Token': token,
                'total': Total,
                'loc_id': br,
                'stf_id': props.userid,
                'Data': Data,
            })
        }).
            then(res => res.json()).
            then(json => {
                console.log(json);
            }).
            catch((error) => {
                console.error(error);

            });
        console.log("Takeaway order done")

    };

    const fun = () => {

        fetch("https://warly2.sapphost.com/public/api/table_res", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                'Token': token,
                'total': props.total,
                'loc_id': props.branch,
                't_id': props.table_id,
                'mem': props.count,
                'stf_id': props.userid,
                'Data': props.D,
            })
        }).
            then(res => res.json()).
            then(json => {
                console.log(json);
            }).
            catch((error) => {
                console.error(error);
            });
        console.log("Table order done",)

    }


    return (

        <>

            <View style={{ marginTop: '10%', borderBottomWidth: 1 }}>
                <Text style={{ fontSize: 15, alignSelf: 'center' }}>PAYABLE:</Text>
                <Text style={{ alignSelf: 'center', color: 'red', fontSize: 18 }}>$ {Total}</Text>
            </View>
            <ScrollView>

                <View style={styles.containerStyle}>
                    <Text style={{ alignSelf: 'center' }}>RECEIVED AMOUNT:</Text>
                    <Text style={{ alignSelf: 'center' }}>$ {Recived}</Text>
                </View>


                <View style={styles.container}>
                    <Text style={{ alignSelf: 'center' }}>CHANGE:</Text>
                    <Text style={{ alignSelf: 'center' }}>${V} </Text>
                </View>
                {props.Statename == 'Takeway' ?
                    <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 50, backgroundColor: 'red', width: 200, height: 40 }}
                        onPress={() => {
                            setModalVisible(true);
                            Save();
                        }}>
                        <Text style={{ alignSelf: 'center', color: 'white' }}>Save</Text>
                    </TouchableOpacity> : props.Statename == 'Main' ?
                        <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 50, backgroundColor: 'red', width: 200, height: 40 }}
                            onPress={() => {
                                setModalVisible(true);
                                fun();
                            }}>
                            <Text style={{ alignSelf: 'center', color: 'white' }}>Save</Text>
                        </TouchableOpacity> : null}

                <Modal
                    animationType="fade"

                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModal(!modalVisible);
                    }}
                >

                    <View style={styles.modalView}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 8 }} onPress={() => setModalVisible(false)}>
                            <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>


                        <View style={{ marginRight: 10, marginTop: 8, alignSelf: 'center', width: '40%', height: '40%' }} >
                            <Image source={require('../assets/order.jpg')} resizeMode="contain" style={{ width: '100%', height: '100%' }} />
                        </View>
                        <Text>Order Created Successfully</Text>
                        {props.Statename == 'Takeway' ?
                            <View style={{ justifyContent: 'flex-end', flex: 1, width: '98%' }}>
                                <TouchableOpacity style={{ backgroundColor: 'red', width: '100%', height: 30, marginBottom: 5, borderRadius: 4 }}
                                    onPress={() => {
                                        setModalVisible(false);
                                        props.Empty();
                                    }}>
                                    <Text style={{ color: 'white', alignSelf: 'center' }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                            : props.Statename == 'Main' ? <View style={{ justifyContent: 'flex-end', flex: 1, width: '98%' }}>
                                <TouchableOpacity style={{ backgroundColor: 'red', width: '100%', height: 30, marginBottom: 5, borderRadius: 4 }}
                                    onPress={() => {
                                        setModalVisible(false);
                                        props.Empty();
                                    }}>
                                    <Text style={{ color: 'white', alignSelf: 'center' }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                                : null
                        }

                    </View>

                </Modal>
            </ScrollView>

        </>

    );
}

export default Payable;

const styles = {
    containerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 0.6,
        borderColor: '#ddd',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
        width: "80%",
        height: 70,
        alignSelf: 'center',
        marginTop: '30%'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 4,
        marginTop: '5%',
        width: "80%",
        height: 70,
        alignSelf: 'center',
    },
    modalView: {
        marginTop: '12%',
        backgroundColor: "white",
        borderRadius: 20,
        height: '60%',
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