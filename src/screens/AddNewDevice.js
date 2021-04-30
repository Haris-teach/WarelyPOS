import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Pl from "./PrinterList";
const And = () => {
    const [state, setState] = useState(true);
    const [box, setBox] = useState(0)
    const Data = [
        {
            key: '1',
        },
        {
            key: '2',
        },
        {
            key: '3',
        },
        {
            key: '4'
        }];
    return (
        <View style={styles.container}>
            {state == true ?

                <View style={{ height: '900%' }}>
                    <Text style={{ fontSize: wp('3%'), fontWeight: 'bold', marginTop: hp('1%'), color: 'grey', marginBottom: hp('2%') }}>Add New Device</Text>


                    <ScrollView style={styles.scrolView}>
                        <View style={styles.flexStyle}>
                            <TextInput style={styles.inputBox}
                                placeholder="Name"

                            />
                            {box == '1' ?
                                <TouchableOpacity style={styles.checkBox} onPress={() => setBox('1')}>
                                    <Image source={require('../assets/tick.jpg')} resizeMode='contain' style={styles.imageStyle} />

                                </TouchableOpacity>
                                : <TouchableOpacity style={styles.checkBox} onPress={() => setBox('1')}>
                                </TouchableOpacity>}
                            <Text style={styles.checkBoxText}>No Category</Text>
                        </View>

                        <View style={styles.flexStyle}>
                            <TextInput style={styles.inputBox}
                                placeholder="Printer Type"
                            />
                            {box == '2' ?
                                <TouchableOpacity style={styles.checkBox} onPress={() => setBox('2')}>
                                    <Image source={require('../assets/tick.jpg')} resizeMode='contain' style={styles.imageStyle} />
                                </TouchableOpacity>
                                : <TouchableOpacity style={styles.checkBox} onPress={() => setBox('2')}>
                                </TouchableOpacity>}
                            <Text style={styles.checkBoxText}>Drinks</Text>
                        </View>

                        <View style={styles.flexStyle}>
                            <TextInput style={styles.inputBox}
                                placeholder="Printer Model"
                            />
                            {box == '3' ?
                                <TouchableOpacity style={styles.checkBox} onPress={() => setBox('3')}>
                                    <Image source={require('../assets/tick.jpg')} resizeMode='contain' style={styles.imageStyle} />
                                </TouchableOpacity>
                                : <TouchableOpacity style={styles.checkBox} onPress={() => setBox('3')}>
                                </TouchableOpacity>}
                            <Text style={styles.checkBoxText}>Mains</Text>
                        </View>

                        <View style={styles.flexStyle}>
                            <TextInput style={styles.inputBox}
                                placeholder="Printer IP-Address "
                            />
                            {box == '4' ?
                                <TouchableOpacity style={styles.checkBox} onPress={() => setBox('4')}>
                                    <Image source={require('../assets/tick.jpg')} resizeMode='contain' style={styles.imageStyle} />
                                </TouchableOpacity>
                                : <TouchableOpacity style={styles.checkBox} onPress={() => setBox('4')}>
                                </TouchableOpacity>}
                            <Text style={styles.checkBoxText}>Sides</Text>
                        </View>

                        <TextInput style={styles.inputBox}
                            placeholder="Paper Type"
                        />

                    </ScrollView>

                    <View style={{ alignItems: 'flex-end', marginTop: hp('3%') }}>
                        <TouchableOpacity style={styles.TestBtn}>
                            <Image style={{ width: wp('1.7%'), height: hp('3.3%'), marginTop: hp('2.2%'), marginRight: wp('0.6%') }} source={require('../assets/printer.png')} />

                            <Text style={styles.testText}>TEST PRINT</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp('2%') }}>
                        <TouchableOpacity style={styles.backBtn}
                            onPress={() => setState(false)}>

                            <Text style={styles.backText}>BACK</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.savebtn}>

                            <Text style={styles.saveText}>SAVE</Text>
                        </TouchableOpacity>

                    </View>
                </View>




                : <Pl />}
        </View>
    );
}

export default And;


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrolView: {
        flex: 1,
        marginLeft: wp('5%'),
    },
    checkBox: {
        width: wp('2.8%'),
        height: hp('5.2%'),
        borderRadius: 8,
        borderWidth: 1,
        marginLeft: wp('2%')

    },
    checkBoxText:
    {
        fontSize: wp('1.5%'),
        color: 'gray',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: hp('1%'),
        marginLeft: wp('1%')
    },
    imageStyle: {
        width: '90%',
        height: '90%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        width: wp('25%'),
        height: hp('10%'),
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 20,
        fontSize: wp('1.8%'),
        color: '#ffffff',
        margin: 5
    },
    savebtn: {
        width: wp('19%'),
        height: hp('8%'),
        backgroundColor: 'red',
        marginVertical: hp('1%'),
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: hp('2%')
    },
    saveText: {
        fontSize: hp('3%'),
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    backBtn: {
        width: wp('19%'),
        height: hp('8%'),
        marginVertical: hp('1%'),
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: hp('2%'),
        borderColor: 'red',
        borderWidth: 1
    },
    backText: {
        fontSize: hp('3%'),
        color: 'red',
        textAlign: 'center',
    },
    TestBtn: {
        width: wp('19%'),
        height: hp('8%'),
        backgroundColor: 'white',
        marginVertical: hp('1%'),
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: hp('2%'),
        borderWidth: 1, flexDirection: 'row'
    },
    testText: {
        fontSize: hp('3%'),
        color: 'gray',
        textAlign: 'center',
        marginTop: hp('1.5%')
    },
    flexStyle: {
        flexDirection: 'row',
        height: hp('15%')
    }
})
