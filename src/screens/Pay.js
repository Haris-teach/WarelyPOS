import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Burger from './Burger';
import Paymode from './PayMode';



const Pay = (props) => {

    const [state, setState] = useState('');
    const [btn, setBtn] = useState('');
    const Total = props.pay;
    const br = props.branch;
    const Data = props.D;

    console.log(props.userid)



    return (
        <>
            {state == 'Burger' ? <Burger branch={br} Cat_id={props.Cat_id} addNewItem={props.addNewItem} reload={props.reload} /> : state == 'Paymode' ? <Paymode total={Total} D={Data} branch={br} userid={props.userid} table_id={props.t_id} count={props.member} reload={props.reload} addNewItem={props.addNewItem} Empty={props.Empty} callback={props.Call} func={props.function} Statename={props.statename} Cat_id={props.Cat_id} /> :
                <>
                    <ScrollView style={{ flex: 2 }}>


                        <Text style={{ margin: 10, fontWeight: 'bold' }}>Discount options</Text>

                        <View style={{ flexDirection: 'row', marginLeft: 30, marginRight: 30, justifyContent: 'space-around', marginTop: '10%' }}>
                            {btn == '1' ?
                                <View style={{ width: '48%' }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'red' }]} onPress={() => setBtn('1')} >
                                        <Text style={[styles.Tstyle, { color: 'white' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>
                                : <View style={{ width: '48%' }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'white' }]} onPress={() => setBtn('1')} >
                                        <Text style={[styles.Tstyle, { color: 'black' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>}

                            {btn == '2' ?
                                <View style={{ width: '48%' }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'red' }]} onPress={() => setBtn('2')} >
                                        <Text style={[styles.Tstyle, { color: 'white' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>
                                : <View style={{ width: '48%' }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'white' }]} onPress={() => setBtn('2')} >
                                        <Text style={[styles.Tstyle, { color: 'black' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>}
                        </View>


                        <View style={{ flexDirection: 'row', marginLeft: 30, marginRight: 30, justifyContent: 'space-around', marginTop: '5%' }}>
                            {btn == '3' ?
                                <View style={{ width: '48%' }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'red' }]} onPress={() => setBtn('3')} >
                                        <Text style={[styles.Tstyle, { color: 'white' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>
                                : <View style={{ width: '48%' }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'white' }]} onPress={() => setBtn('3')} >
                                        <Text style={[styles.Tstyle, { color: 'black' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>}

                            {btn == '4' ?
                                <View style={{ width: '48%' }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'red' }]} onPress={() => setBtn('4')} >
                                        <Text style={[styles.Tstyle, { color: 'white' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>
                                : <View style={{ width: '48%' }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'white' }]} onPress={() => setBtn('4')} >
                                        <Text style={[styles.Tstyle, { color: 'black' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>}
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, borderBottomWidth: 0.3 }}>
                            <Text>Total</Text>
                            <Text>$ 2.50</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, borderBottomWidth: 0.3, opacity: 0.5 }}>
                            <Text>Total discount:</Text>
                            <Text>$ 20%</Text>
                        </View>


                        <View style={{ justifyContent: 'flex-end', flex: 1, marginTop: 50 }}>
                            <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, width: "80%", alignSelf: 'center', height: 30, justifyContent: 'center' }} onPress={() => {
                                setState('Paymode');
                            }}>
                                <Text style={{ alignSelf: 'center', color: 'white' }}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </>
            }
        </>
    );
}

export default Pay;

const styles = {
    btnStyle: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        height: 30,
        justifyContent: 'center'

    },
    Tstyle: {
        alignSelf: 'center',
        fontSize: 10
    }
}