import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
// import { Card } from 'react-native-elements/dist/card/Card';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { SetSelect, SetDis_Zero } from '../../Redux/Reducers/mainReducer';
import APIHandler from "../../utils/APIHandler";
import { SDISCOUNT, CUSTOMTAKEWAY } from "../../utils/urls";
import Burger from './Burger';
import Card from './Card';
import Cash from './Cash';
var total1 = 0;
var dis = 0;
const Pay = (props) => {
    const dispatch = useDispatch()
    const { select } = useSelector((state) => state.root.main);
    // console.log('propsssss checkkkk', props.addTakeAway)

    const [state, setState] = useState('');
    const [btnState, setBtnState] = useState(props.retu);
    const [btn, setBtn] = useState(0);
    const Total = props.pay;
    const br = props.branch;
    const Data = props.D;
    const { loc_id, stf_name, dis_Zero } = useSelector((state) => state.root.main);
    const [btnDis, setBtnDis] = useState();
    // const [total1, setTotal1] = useState(0);
    var DisTotal = props.pay - total1;
    const [opdis, setOpdis] = useState(0);
    const [takeaway, setTakeaway] = useState([{ "Adress": null, "Footer": null, "Take_away": null, "phone": null, "tittle": "test Tittle" }]);
    const [discount, setDiscount] = useState([{ "amount": "10.00$", "discount_type": "fixed", "id": 2, "name": "Student Discount", "status": "Active" }, { "amount": "10.00%", "discount_type": "percentage", "id": 3, "name": "Family Discount", "status": "Expired" }, { "amount": "20.00%", "discount_type": "percentage", "id": 4, "name": "public Discount", "status": "Active" }]);
    useEffect(() => {
        total1 = 0;
        // props.disTotal(props.pay);
        let param = {
            Loc_id: loc_id,
        };


        APIHandler.hitApi(CUSTOMTAKEWAY, 'POST', param).then(response => {
            setTakeaway(response);
            // console.log('discount check++++++++++', response)


        });
        let params = {
            Token: '$2y$10$f43enwo0NWLsBmlGfx/ZMevMgmvEdbrZ3JTF.FNoVM4Nrj2aZYE82',
        };


        APIHandler.hitApi(SDISCOUNT, 'POST', params).then(response => {
            setDiscount(response);
            // console.log('Student Discount = ', response);

        });
    }, []);




    // useEffect(() => {

    // }, []);

    // console.log('Student Take away ka Discount = ', takeaway.map(i => i.Take_away));


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
                            <View style={{ flex: 1, width: wp('44.2%'), }}>


                                <View style={{ width: wp('44.2%'), borderLeftWidth: 1, borderColor: 'gray', backgroundColor: '#f9f9f9', flexDirection: 'row', justifyContent: 'space-between', }}>
                                    <Text style={{ marginLeft: wp('1.5%'), marginTop: hp('6%'), fontWeight: 'bold', fontSize: wp('1.8%'), color: 'black' }}>Discount options</Text>


                                    <TouchableOpacity style={{
                                        borderWidth: 1,
                                        borderColor: '#FC3F3F',
                                        borderRadius: 3,
                                        height: hp('8%'),
                                        marginRight: wp('1.1%'),
                                        marginTop: hp('6%'),
                                        justifyContent: 'center', width: wp('10%'), backgroundColor: btn == 1 ? '#FC3F3F' : '#f9f9f9'
                                    }}
                                        onPress={() => {
                                            setBtn(1);
                                            props.disTotal(props.pay);
                                            props.btnDisTot(1);
                                            total1 = 0;

                                        }}
                                    >
                                        <Text style={[styles.Tstyle, { color: btn == 1 ? 'white' : '#FC3F3F' }]}>None</Text>
                                    </TouchableOpacity>

                                </View>


                                <View style={{ borderLeftWidth: 1, borderColor: 'gray', backgroundColor: '#f9f9f9', marginRight: wp('1.5%'), height: hp('59%'), width: wp('44.2%') }}>
                                    <FlatList
                                        data={discount}
                                        keyExtractor={item => item.id}
                                        numColumns={3}
                                        s
                                        renderItem={({ item }) => {
                                            return (



                                                <View style={{ marginLeft: wp('0.8%'), width: wp('11%'), marginTop: hp('5%'), marginRight: hp('0%') }}>

                                                    <TouchableOpacity style={[styles.btnStyle, { backgroundColor: btn == item.id ? '#FC3F3F' : '#f9f9f9' }]}
                                                        onPress={() => {
                                                            {
                                                                setBtn(item.id);
                                                                setOpdis(item.amount);
                                                                props.btnDisTot(1);



                                                                setBtnState('o');

                                                                var dis = item.amount;
                                                                if (item.discount_type == 'percentage') {
                                                                    // var total = props.pay * dis.slice(0, -1) / 100;
                                                                    var total = props.pay * dis.slice(0, -1) / 100;
                                                                    total1 = total;
                                                                    console.log("total1 ====:", total1);


                                                                }
                                                                else {
                                                                    var total = dis.slice(0, -1);
                                                                    total1 = total;
                                                                    console.log(total1, props.pay);


                                                                }

                                                                props.disTotal(props.pay - total1);

                                                                // props.disTotal(dis);

                                                            }

                                                        }}
                                                    >
                                                        <Text style={[styles.Tstyle, { color: btn == item.id ? 'white' : '#FC3F3F' }]}>{item.name}</Text>
                                                    </TouchableOpacity>

                                                </View>



                                            )
                                        }}
                                    />
                                    <View style={{ marginBottom: hp('20%'), justifyContent: 'center', }}>
                                        <Text style={{ color: 'black', marginLeft: wp('1%'), fontSize: wp('2%'), fontWeight: 'bold' }}>Add On:</Text>
                                        <TouchableOpacity
                                            disabled={dis_Zero == 0 ? false : true}
                                            style={{
                                                borderWidth: 1,
                                                borderColor: '#FC3F3F',
                                                borderRadius: 3,
                                                height: hp('8%'),
                                                marginRight: wp('1.1%'),
                                                marginLeft: wp('0.8%'),
                                                marginTop: hp('1%'),
                                                justifyContent: 'center', width: wp('10%'), backgroundColor: '#f9f9f9', alignItems: 'center'
                                            }}

                                            onPress={() => {
                                                dispatch(SetDis_Zero(1));
                                                props.btnDisTot(2);
                                                props.addTakeAway(takeaway.map(i => i.Take_away))
                                                // props.addItems(takeaway.map(i => i.tittle), takeaway.map(i => i.Take_away))
                                                let name = takeaway.map(i => i.tittle);
                                                let price = takeaway.map(i => i.Take_away);
                                                props.addNewItem(name, price, 0, 0, 0, []);

                                            }}
                                        >
                                            <Text style={{ color: '#FC3F3F', fontSize: wp('1%'), fontWeight: 'bold' }}>
                                                {takeaway.map(i => i.tittle)}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>






                                {/* 
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wp('1.5%'), borderBottomWidth: 1, opacity: 1 }}>
                                    <Text style={{ fontSize: wp('1.5%'), marginLeft: wp('-10%') }}>Total discount:</Text>
                                    <Text style={{ marginRight: wp('2%'), fontSize: wp('1.5%'), marginRight: wp('-10%') }}>{btn == 1 ? '0.00%' : parseFloat(opdis).toFixed(2)}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: wp('3%'), borderBottomWidth: 1 }}>
                                    <Text style={{ fontSize: wp('1.5%'), fontWeight: 'bold', marginLeft: wp('-12.5%') }}>Total:</Text>
                                    <Text style={{ fontSize: wp('1.5%'), marginRight: wp('-12.5%') }}>$

                                        {btn == 1 ? parseFloat(props.pay).toFixed(2) : btnState == 'oye' ? parseFloat(props.pay).toFixed(2) : parseFloat(props.pay - total1).toFixed(2)}
                                    </Text>
                                </View> */}

                                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: hp('12%'), width: wp('44.2%') }}>
                                    <TouchableOpacity style={{ alignItems: 'center', borderWidth: 1, marginRight: wp('0.5%'), borderRadius: 5, justifyContent: 'center', height: hp('7.5%'), width: wp('12%') }}
                                        onPress={() => {
                                            dispatch(SetSelect('Burger'));
                                            setState('Burger');
                                        }} >
                                        <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: '#FC3F3F' }}>Back</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{ backgroundColor: '#FC3F3F', alignItems: 'center', borderRadius: 5, justifyContent: 'center', height: hp('7.5%'), width: wp('24%') }}
                                        onPress={() => {
                                            setState(props.checkPaymode);
                                        }}>
                                        <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: 'white' }}>Proceed</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
            }
        </>
    );
}

export default Pay;

const styles = {
    btnStyle: {
        borderWidth: 1,
        borderColor: '#FC3F3F',
        borderRadius: 3,
        height: hp('8%'),
        width: wp('10%'),
        justifyContent: 'center',


    },
    Tstyle: {
        alignSelf: 'center',
        fontWeight: '700',
        fontSize: wp('1%'),
    }
}