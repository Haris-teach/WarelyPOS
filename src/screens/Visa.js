import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import Card from './Card';
import Cash from './Cash';

const Visa = (props) => {
    const [state, setState] = useState('');
    const [modal, setModal] = useState(false);
    return (
        <>
            {state == 'Card' ? <Card /> : state == 'Cash' ? <Cash pass='Pager' />
                :
                <>

                    <ScrollView>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', margin: 10, height: 25, width: 50 }} onPress={() => setState('Card')} >
                            <Text>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setState('Visa')} style={{ alignSelf: 'center', marginTop: '30%' }}>
                            <View style={{ borderRadius: 3, borderWidth: 1, borderColor: 'red', padding: 10, width: 100, height: 100, justifyContent: 'center' }}>
                                <Image source={props.img} style={{ width: 80, height: 80, alignSelf: 'center' }} resizeMode="contain" />
                            </View>
                        </TouchableOpacity>

                        <Text style={{ alignSelf: 'center', marginTop: 19, color: 'red' }}>Total: $ 46.00</Text>

                        <View style={{ flex: 1, marginTop: 50 }}>
                            <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, width: "80%", alignSelf: 'center', height: 40, justifyContent: 'center' }} onPress={() => setModal(true)}>
                                <Text style={{ alignSelf: 'center', color: 'white' }}>PAY</Text>
                            </TouchableOpacity>
                        </View>



                    </ScrollView>


                    <Modal
                        animationType="fade"

                        transparent={true}
                        visible={modal}
                        onRequestClose={() => {

                            setModalVisible(!modal);
                        }}
                    >

                        <View style={styles.modalView}>
                            <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 8 }} onPress={() => setModal(false)}>
                                <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: 20, height: 20 }} />
                            </TouchableOpacity>

                            <View style={{ marginRight: 10, marginTop: 8, alignSelf: 'center', width: '40%', height: '40%' }} onPress={() => setModalVisible(false)}>
                                <Image source={require('../assets/tick.jpg')} resizeMode="contain" style={{ width: '100%', height: '100%', }} />

                            </View>

                            <Text style={{ marginTop: '5%', color: 'red' }}>PAYMENT SUCCESSFUL</Text>

                            <View style={{ justifyContent: 'flex-end', flex: 1, width: '90%' }}>
                                <TouchableOpacity style={{ backgroundColor: 'red', width: '100%', height: 30, margin: 5, borderRadius: 4 }} onPress={() => setState('Cash')}>
                                    <Text style={{ color: 'white', alignSelf: 'center' }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </Modal>

                </>
            }
        </>
    );
}

export default Visa;

const styles = {

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