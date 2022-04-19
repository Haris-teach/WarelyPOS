import React, { useState } from 'react';
import { View, Text, ScrollView, Modal, TouchableOpacity, Image } from 'react-native';


const Pager = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>

            <ScrollView>
                <View >
                    <View style={{ marginTop: '10%', borderBottomWidth: 1 }}>

                        <Text style={{ alignSelf: 'center', color: 'red', fontSize: 18 }}>02:25 PM</Text>
                    </View>


                    <View style={[styles.containerStyle, { marginTop: '10%' }]}>
                        <Text style={{ alignSelf: 'center', fontSize: 10, color: 'black' }}>Order No :</Text>
                        <Text style={{ alignSelf: 'center', color: 'red' }}>00001</Text>
                    </View>


                    <View style={[styles.containerStyle, { marginTop: 8 }]}>
                        <Text style={{ alignSelf: 'center', fontSize: 10, color: 'black' }}>Name :</Text>
                        <Text style={{ alignSelf: 'center', color: 'red' }}>JIMMY TAN</Text>
                    </View>


                    <View style={[styles.containerStyle, { marginTop: 8 }]}>
                        <Text style={{ alignSelf: 'center', fontSize: 10, color: 'black' }}>CONTACT :</Text>
                        <Text style={{ alignSelf: 'center', color: 'red' }}>03044041082</Text>
                    </View>

                    <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
                        <Text style={{ alignSelf: 'center', fontSize: 10, color: 'white' }}>COMPLETE</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>

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


                    <View style={{ marginRight: 10, marginTop: 8, alignSelf: 'center', width: '40%', height: '40%' }} onPress={() => setModalVisible(false)}>
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
        </>
    );
}

export default Pager;


const styles = {
    // containerStyle: {
    //     borderWidth: 0.6,
    //     borderColor: '#ddd',
    //     borderBottomWidth: 1,
    //     shadowColor: 'white',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.5,
    //     shadowRadius: 3,
    //     elevation: 3,
    //     margin: 5,
    //     height: '98%',
    //     backgroundColor: 'rgb(230,230,230)'

    // },
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
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 4,
        marginTop: '5%',
        width: "80%",
        height: 50,
        alignSelf: 'center',
        backgroundColor: 'red'
    },
    modalView: {
        marginTop: '5%',
        backgroundColor: "white",
        borderRadius: 20,
        height: '85%',
        alignSelf: 'center',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 10
        },
        width: '23%',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 8,
        justifyContent: 'center',
        padding: 2
    },
};