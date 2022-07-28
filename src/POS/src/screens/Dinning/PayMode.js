import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Card from './Card';
import Cash from './Cash';
import Pay from './Pay';

const Paymode = (props) => {
    const [state, setState] = useState('');
    const Total = props.total;
    const Data = props.D;
    const branch = props.branch;
    const OrginalTotal = props.totalState;
    // console.log('Total ===', props.OrgTotal,Total)



    return (
        <>
            {state == 'Pay' ? <Pay btnDisTot={props.btnDisTot} disTotal={props.disTotal} Total_Discount={props.total_dis} retu={props.totalState} pay={props.OrgTotal} refresh={props.refresh} T_order_sum={props.T_order_sum} pass='Payable' Cat_id={props.Cat_id} total={Total} D={Data} branch={branch} t_id={props.table_id} member={props.count} userid={props.userid} reload={props.reload} addNewItem={props.addNewItem} empty={props.Empty} Call={props.callback} function={props.func} statename={props.Statename} T_order_id={props.T_order_id} table_pass={props.table_pass} /> : state == 'Cash' ? <Cash btnDisTot={props.btnDisTot} disTotal={props.disTotal} Total_Discount={props.total_dis} pay={props.OrgTotal} refresh={props.refresh} T_order_sum={props.T_order_sum} pass='Payable' Cat_id={props.Cat_id} total={Total} D={Data} branch={branch} t_id={props.table_id} member={props.count} userid={props.userid} reload={props.reload} addNewItem={props.addNewItem} empty={props.Empty} Call={props.callback} function={props.func} statename={props.Statename} T_order_id={props.T_order_id} table_pass={props.table_pass} /> : state == 'Card' ? <Card btnDisTot={props.btnDisTot} disTotal={props.disTotal} Total_Discount={props.total_dis} pay={props.OrgTotal} refresh={props.refresh} T_order_sum={props.T_order_sum} pass='Payable' Cat_id={props.Cat_id} total={Total} D={Data} branch={branch} t_id={props.table_id} member={props.count} userid={props.userid} reload={props.reload} addNewItem={props.addNewItem} empty={props.Empty} Call={props.callback} function={props.func} statename={props.Statename} T_order_id={props.T_order_id} table_pass={props.table_pass} /> :

                <>
                    <View style={{ alignSelf: 'center', marginTop: '20%' }}>
                        <Text style={{ fontSize: wp('1.5%'), color: 'black', fontWeight: '700' }}>PAYMENT MODE</Text>
                    </View>

                    <View style={styles.container1}>

                        <TouchableOpacity
                            style={styles.ButtonView}
                            onPress={() => setState('Card')}
                        >
                            <Text style={[styles.ButtonViewText, { color: "#FC3F3F" }]}>Card</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.ButtonView2}
                            onPress={() => {
                                setState('Cash');

                            }}>
                            <Text style={[styles.ButtonViewText, { color: "#ffffff" }]}>Cash</Text>
                        </TouchableOpacity>


                    </View>
                    <View style={{ marginTop: hp('12%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: hp('18%'), width: wp('44%'), marginBottom: hp('12%') }}>
                        <TouchableOpacity style={{ alignItems: 'center', borderWidth: 1, marginRight: wp('1%'), borderRadius: 5, justifyContent: 'center', height: hp('10%'), width: wp('13%') }} onPress={() => {
                            setState('Pay');


                        }} >

                            <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: '#FC3F3F' }}>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ backgroundColor: '#FC3F3F', alignItems: 'center', borderRadius: 5, justifyContent: 'center', height: hp('10%'), width: wp('28%') }} >
                            <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: 'white' }}>Proceed</Text>
                        </TouchableOpacity>
                    </View>




                </>
            }
        </>
    );
}

export default Paymode;

const styles = StyleSheet.create({

    container1: {
        borderRadius: 5,
        marginRight: wp('1.5%'),
        marginLeft: wp('1.5%'),
        marginTop: hp('2%'),
        alignItems: "center",
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: "#b5b5b5",
        width: "80%",
        height: '35%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    TextStyle: {
        color: "black",
        fontWeight: "bold",
        fontSize: wp('1.5%'),
    },
    ButtonView: {
        borderRadius: 5,
        alignSelf: "center",
        justifyContent: "center",
        width: wp('13%'),
        height: hp('12%'),
        marginLeft: wp('0.1%'),
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: '#FC3F3F'
    },
    ButtonView2: {
        borderRadius: 5,
        alignSelf: "center",
        justifyContent: "center",
        width: wp('13%'),
        height: hp('12%'),
        marginLeft: wp('1.5%'),
        alignItems: "center",
        backgroundColor: "#FC3F3F",
    },
    ButtonViewText: {

        fontWeight: "bold",

        fontSize: wp('1.5%'),
    },

});
