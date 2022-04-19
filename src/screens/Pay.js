import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Burger from './Burger';
import Paymode from './PayMode';
import { useSelector, useDispatch } from 'react-redux';
import { SetSelect } from '../Redux/Reducers/mainReducer';



const Pay = (props) => {
    const dispatch = useDispatch()
    const { select } = useSelector((state) => state.root.main);

    const [state, setState] = useState('');
    const [btn, setBtn] = useState('');
    const Total = props.pay;
    const br = props.branch;
    const Data = props.D;
    const { loc_id, stf_name } = useSelector((state) => state.root.main);

    console.log('oye', loc_id, stf_name)


    return (
        <>
            {state == 'Burger' ? <Burger branch={br} Cat_id={props.Cat_id} addNewItem={props.addNewItem} reload={props.reload} /> : state == 'Paymode' ? <Paymode refresh={props.refresh} T_order_sum={props.T_order_sum} T_order_id={props.T_order_id} table_pass={props.table_pass} total={Total} D={Data} branch={br} userid={props.userid} table_id={props.t_id} count={props.member} reload={props.reload} addNewItem={props.addNewItem} Empty={props.Empty} callback={props.Call} func={props.function} Statename={props.statename} Cat_id={props.Cat_id} /> :
                <>
                    <ScrollView style={{ flex: 2 }}>
                        <View style={{ borderBottomWidth: 0.4, height: 50, flexDirection: 'row' }}>
                            <Text style={{ alignSelf: 'center', flex: 1, fontSize: wp('1.4%'), marginLeft: 30 }}></Text>

                            <Text style={{ fontSize: wp('1.2 %'), alignSelf: 'center', marginRight: 20, fontWeight: 'bold' }} onPress={() => {
                                dispatch(SetSelect('Burger'));
                                setState('Burger');
                            }}>BACK</Text>
                        </View>

                        <Text style={{ margin: wp('1%'), fontWeight: 'bold', fontSize: wp('1.5%') }}>Discount options</Text>

                        <View style={{ flexDirection: 'row', marginLeft: wp('1.5%'), marginRight: wp('1.5%'), justifyContent: 'space-around', marginTop: '10%' }}>
                            {btn == '1' ?
                                <View style={{ width: wp('18%') }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'red' }]} onPress={() => setBtn('1')} >
                                        <Text style={[styles.Tstyle, { color: 'white' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>
                                : <View style={{ width: wp('18%') }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'white' }]} onPress={() => setBtn('1')} >
                                        <Text style={[styles.Tstyle, { color: 'red' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>}

                            {btn == '2' ?
                                <View style={{ width: wp('18%') }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'red' }]} onPress={() => setBtn('2')} >
                                        <Text style={[styles.Tstyle, { color: 'white' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>
                                : <View style={{ width: wp('18%') }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'white' }]} onPress={() => setBtn('2')} >
                                        <Text style={[styles.Tstyle, { color: 'red' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>}
                        </View>


                        <View style={{ flexDirection: 'row', marginLeft: wp('1.5%'), marginRight: wp('1.5%'), justifyContent: 'space-around', marginTop: '5%' }}>
                            {btn == '3' ?
                                <View style={{ width: wp('18%') }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'red' }]} onPress={() => setBtn('3')} >
                                        <Text style={[styles.Tstyle, { color: 'white' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>
                                : <View style={{ width: wp('18%') }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'white' }]} onPress={() => setBtn('3')} >
                                        <Text style={[styles.Tstyle, { color: 'red' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>}

                            {btn == '4' ?
                                <View style={{ width: wp('18%') }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'red' }]} onPress={() => setBtn('4')} >
                                        <Text style={[styles.Tstyle, { color: 'white' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>
                                : <View style={{ width: wp('18%') }}>
                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'white' }]} onPress={() => setBtn('4')} >
                                        <Text style={[styles.Tstyle, { color: 'red' }]}>Student discount</Text>
                                    </TouchableOpacity>
                                </View>}
                        </View>




                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wp('5%'), borderBottomWidth: 1, opacity: 0.5 }}>
                            <Text style={{ fontSize: wp('1.5%'), marginLeft: wp('-10%') }}>Total discount:</Text>
                            <Text style={{ marginRight: wp('2%'), fontSize: wp('1.5%'), marginRight: wp('-10%') }}>$ 18%</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wp('3%'), borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: wp('1.5%'), fontWeight: 'bold', marginLeft: wp('-12.5%') }}>Total:</Text>
                            <Text style={{ fontSize: wp('1.5%'), marginRight: wp('-12.5%') }}>$ 2.50</Text>
                        </View>


                        <View style={{ justifyContent: 'flex-end', flex: 1, marginTop: wp('3%') }}>
                            <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, width: wp('30%'), alignSelf: 'center', height: hp('5.5%'), justifyContent: 'center' }} onPress={() => {
                                setState('Paymode');
                            }}>
                                <Text style={{ alignSelf: 'center', color: 'white', fontSize: wp('1%'), fontWeight: 'bold' }}>Next</Text>
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
        borderColor: 'black',
        borderRadius: 5,
        height: hp('5%'),
        justifyContent: 'center'

    },
    Tstyle: {
        alignSelf: 'center',
        fontSize: wp('1%'),
    }
}