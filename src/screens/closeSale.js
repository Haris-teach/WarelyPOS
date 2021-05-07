import React, { useState, useEffect } from "react";
import { Text, View, Modal, TouchableOpacity, Image, ScrollView } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import APIHandler from '../utils/APIHandler';
import { Pos_sell_end } from "../utils/urls";

const CloseSale = ({ navigation }) => {
    const { s_id } = useSelector((state) => state.root.main);
    console.log('----Staf_ID---', s_id);
    const [modalVisi, setModalVisi] = useState(true);
    const [res, setRes] = useState();




    useEffect(() => {
        let param = {
            stf_id: s_id,
        };

        APIHandler.hitApi(Pos_sell_end, 'POST', param).then(response => setRes(response));

    }, []);

    console.log(res)
    return (
        <View>
            <Modal
                animationType="fade"

                transparent={true}
                visible={modalVisi}
                onRequestClose={() => {

                    setModalVisi(!modalVisi);
                }}
            >

                <View style={styles.modalView}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 8 }} onPress={() => setModalVisi(false)}>
                        <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>



                    <ScrollView>
                        <View style={{ marginBottom: 2, alignItems: 'center' }}>
                            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Aronium</Text>
                            <Text>Main Street 1</Text>
                            <Text>90210 Weldone</Text>
                            <Text>Tax No.: 123456789</Text>
                            <Text>+1234567890</Text>
                            <Text>office@aronium.com</Text>
                        </View>

                        <View style={{ borderBottomWidth: 1, marginTop: 5, marginLeft: 5 }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Reciept No: 17-200-000056</Text>
                            <Text>25.11.2017. 18:33:34</Text>
                            <Text>User: John Doe</Text>
                        </View>

                        <View style={{ borderBottomWidth: 1, marginTop: 5, margin: 5 }}>
                            <Text>Coca Cola</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                                <Text>9x $180.00(-10%)</Text>
                                <Text>$1,458.00</Text>
                            </View>

                            <Text>Pepsi</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                                <Text>128x $20.00 (-%50.00)</Text>
                                <Text>$2,510.00</Text>
                            </View>

                        </View>




                        <View style={{ borderEndWidth: 0.5, marginTop: 5, margin: 5 }}>
                            <Text>Items count :2</Text>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                                <Text>Cart discount (50%):</Text>
                                <Text>-$1,984.00</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                                <Text>Subtotal:</Text>
                                <Text>$1,923.81</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                                <Text>Tax 9.00%</Text>
                                <Text>$60.19</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>TOTAL:</Text>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>$1,984.00</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                                <Text>Cash:</Text>
                                <Text>$1,984.00</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                                <Text>Paid Amount:</Text>
                                <Text>$1,984.00</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                                <Text>Change:</Text>
                                <Text>$0.00</Text>
                            </View>

                        </View>
                    </ScrollView>

                    <View style={{ justifyContent: 'flex-end', flex: 1, width: '98%' }}>
                        <TouchableOpacity style={{ backgroundColor: 'red', width: wp('19.5%'), height: hp('5%'), marginBottom: 5, borderRadius: 4, justifyContent: 'center' }}
                            onPress={() => {
                                setModalVisi(false);
                                navigation.navigate('Login');
                            }}>
                            <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.3%') }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>
        </View>
    );
}

export default CloseSale;


const styles = {
    modalView: {
        marginTop: '12%',
        backgroundColor: "white",
        borderRadius: 20,

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