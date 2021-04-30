import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import APIHandler from '../utils/APIHandler';
import { Table_res, Takeaway_Order } from '../utils/urls';

const Payable = (props) => {
    let Recived = props.Value;

    const Total = props.total;
    let V = Recived - Total;
    const [modalVisible, setModalVisible] = useState(false);


    const Data = props.D;
    const token = '$2y$10$f43enwo0NWLsBmlGfx/ZMevMgmvEdbrZ3JTF.FNoVM4Nrj2aZYE82';
    const br = props.branch;



    const Save = () => {

        let params = {
            total: Total,
            loc_id: br,
            stf_id: props.userid,
            Data: Data,
        };

        APIHandler.hitApi(Takeaway_Order, 'POST', params).then(response => console.log(response));
        console.log("Takeaway order done")

    };

    const fun = () => {

        let param = {
            total: props.total,
            loc_id: props.branch,
            t_id: props.table_id,
            mem: props.count,
            stf_id: props.userid,
            Data: props.D,
        };

        APIHandler.hitApi(Table_res, 'POST', param).then(response => console.log(response));


        console.log("Table order done",)

    }


    return (

        <>

            <View style={{ marginTop: '10%', borderBottomWidth: 1 }}>
                <Text style={{ fontSize: wp('1.5%'), alignSelf: 'center' }}>PAYABLE:</Text>
                <Text style={{ alignSelf: 'center', color: 'red', fontSize: 18, fontSize: wp('1.5%') }}>$ {Total}</Text>
            </View>
            <ScrollView>

                <View style={styles.containerStyle}>
                    <Text style={{ alignSelf: 'center', fontSize: wp('1.5%') }}>RECEIVED AMOUNT:</Text>
                    <Text style={{ alignSelf: 'center', fontSize: wp('1.5%') }}>$ {Recived}</Text>
                </View>


                <View style={styles.container}>
                    <Text style={{ alignSelf: 'center', fontSize: wp('1.5%') }}>CHANGE:</Text>
                    <Text style={{ alignSelf: 'center', fontSize: wp('1.5%') }}>${V} </Text>
                </View>
                {props.Statename == 'Takeway' ?
                    <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 50, backgroundColor: 'red', width: wp('20%'), height: hp('5%') }}
                        onPress={() => {
                            setModalVisible(true);
                            Save();
                        }}>
                        <Text style={{ alignSelf: 'center', color: 'white', fontSize: wp('1.5%') }}>Save</Text>
                    </TouchableOpacity> : props.Statename == 'Main' ?
                        <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', marginTop: 50, backgroundColor: 'red', width: wp('20%'), height: hp('5%') }}
                            onPress={() => {
                                setModalVisible(true);
                                fun();
                            }}>
                            <Text style={{ alignSelf: 'center', color: 'white', fontSize: wp('1.5%') }}>Save</Text>
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
                        <Text style={{ fontSize: wp('1.4%') }}>Order Created Successfully</Text>
                        {props.Statename == 'Takeway' ?
                            <View style={{ justifyContent: 'flex-end', flex: 1, width: '98%' }}>
                                <TouchableOpacity style={{ backgroundColor: 'red', width: wp('19.5%'), height: hp('5%'), marginBottom: 5, borderRadius: 4, justifyContent: 'center' }}
                                    onPress={() => {
                                        setModalVisible(false);
                                        props.Empty();
                                    }}>
                                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.3%') }}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                            : props.Statename == 'Main' ? <View style={{ justifyContent: 'flex-end', flex: 1, width: '98%' }}>
                                <TouchableOpacity style={{ backgroundColor: 'red', width: wp('19.5%'), height: hp('5%'), marginBottom: 5, borderRadius: 4, justifyContent: 'center' }}
                                    onPress={() => {
                                        setModalVisible(false);
                                        props.Empty();
                                    }}>
                                    <Text style={{ color: 'white', alignSelf: 'center', fontSize: wp('1.3%') }}>Confirm</Text>
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
        height: hp('50%'),
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