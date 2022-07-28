import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
// import { Card } from 'react-native-elements/dist/card/Card';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { SetSelect } from '../../Redux/Reducers/mainReducer';
import APIHandler from "../../utils/APIHandler";
import { SDISCOUNT, CUSTOMTAKEWAY } from "../../utils/urls";
import Burger from './Burger';
import Card from './Card';
import Cash from './Cash';
const DATA = [
    {
        key: '1',
        name: '601 Seafood Spaghetti',


    },
    {
        key: '2',
        name: '601 Seafood Spaghetti',


    },
    {
        key: '3',
        name: '601 Seafood Spaghetti',


    },
];
const Reservation = (props) => {
    const dispatch = useDispatch()
    const { select } = useSelector((state) => state.root.main);
    const [state, setState] = useState();

    // console.log("MODI DATA is =", props.Modi)
    return (
        <>
            {state == 'Burger' ? <Burger refresh={props.refresh} pay={props.pay} branch={br} Cat_id={props.Cat_id} addNewItem={props.addNewItem} reload={props.reload} />
                :
                state == 'Card' ? <Card
                    empty={props.empty} pay={props.pay} total={props.pay - total1} checkPaymode={props.checkPaymode} call={props.call} itemName={props.itemName} itemPrice={props.itemPrice} ExtCallback={props.ExtCallback} ExtCallback1={props.ExtCallback1} product_id={props.product_id} btn={props.btn} variantCallback={props.variantCallback} refresh={props.refresh} addNewItem={props.addNewItem} branch={props.branch} Cat_id={props.Cat_id}

                    btnDisTot={props.btnDisTot} disTotal={props.disTotal} total_dis={props.Total_Discount} totalState={"oye"} refresh={props.refresh} T_order_sum={props.T_order_sum} T_order_id={props.T_order_id} table_pass={props.table_pass} OrgTotal={Total} D={Data} branch={br} userid={props.userid} table_id={props.t_id} count={props.member} reload={props.reload} addNewItem={props.addNewItem} callback={props.Call} func={props.function} Statename={props.statename} Cat_id={props.Cat_id}
                />
                    :
                    state == 'Cash' ? <Cash checkPaymode={props.checkPaymode} NameState={props.NameState} btnDisTot={props.btnDisTot} disTotal={props.disTotal} total_dis={props.Total_Discount} totalState={"oye"} refresh={props.refresh} T_order_sum={props.T_order_sum} T_order_id={props.T_order_id} table_pass={props.table_pass} total={props.pay - total1} OrgTotal={Total} D={Data} branch={br} userid={props.userid} table_id={props.t_id} count={props.member} reload={props.reload} addNewItem={props.addNewItem} Empty={props.empty} callback={props.Call} func={props.function} Statename={props.statename} Cat_id={props.Cat_id} />
                        :
                        <>
                            <View style={{ flex: 1, width: wp('40%'), }}>
                                <View style={{ backgroundColor: '#F9F9F9', height: hp('15%'), width: wp('36%'), justifyContent: 'center', }}>
                                    <Text style={{ marginLeft: wp('1%'), fontSize: wp('2%'), color: '#FFA64D', fontWeight: '700' }}>SERVE LATER</Text>
                                </View>
                                <View style={{ height: hp('55%'), width: wp('36%'), justifyContent: 'center', }}>
                                    <FlatList
                                        data={props.Modi}
                                        keyExtractor={item => item.id}
                                        renderItem={({ item, index }) => {

                                            return (


                                                <View style={{ borderBottomWidth: 1, borderColor: '#E1E1E1', height: hp('10%'), width: wp('36%'), flexDirection: 'row', backgroundColor: 'white', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', height: hp('10%'), width: wp('22%') }}>
                                                        <Text style={{ fontSize: wp('1.5%'), fontWeight: '700' }}>

                                                            {item.modi_name}
                                                        </Text>
                                                    </View>


                                                    <TouchableOpacity style={styles.viewbtnStyle} onPress={() => {

                                                    }}>
                                                        <Text style={{ color: 'white', fontSize: wp('1.2%') }}>Serve Now</Text>
                                                    </TouchableOpacity>
                                                </View>


                                            )
                                        }}

                                    />
                                </View>
                                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: hp('11.5%'), width: wp('36%') }}>
                                    <TouchableOpacity style={{ alignItems: 'center', borderWidth: 1, marginRight: wp('0.5%'), borderRadius: 5, justifyContent: 'center', height: hp('7.5%'), width: wp('12%') }}
                                        onPress={() => {
                                            dispatch(SetSelect('Burger'));

                                        }} >
                                        <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: '#FC3F3F' }}>Back</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ backgroundColor: '#FC3F3F', alignItems: 'center', borderRadius: 5, justifyContent: 'center', height: hp('7.5%'), width: wp('20%') }}
                                        onPress={() => {

                                        }}>
                                        <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: 'white' }}>SERVE ALL</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
            }
        </>
    );
}

export default Reservation;

const styles = {
    viewbtnStyle: {

        opacity: 1,
        width: wp('10%'),
        height: hp('8%'),
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: wp('2%'),
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#FF2E2E',
        justifyContent: 'center',
        backgroundColor: '#FF2E2E'
    },
    Tstyle: {
        alignSelf: 'center',
        fontWeight: '700',
        fontSize: wp('1%'),
    }
}