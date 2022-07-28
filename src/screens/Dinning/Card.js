import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FlatGrid } from 'react-native-super-grid';
import Pay from './Pay';
import Visa from './Visa';


const DATA = [
    {
        key: 1,
        name: 'VISA',
        p: require('../../assets/visa.jpg')

    },
    {
        key: 2,
        name: 'VISA',
        p: require('../../assets/visa.jpg')

    },
    {
        key: 3,
        name: 'VISA',
        p: require('../../assets/visa.jpg')

    },
    {
        key: 4,
        name: 'VISA',
        p: require('../../assets/visa.jpg')


    },
    {
        key: 5,
        name: 'VISA',
        p: require('../../assets/visa.jpg')

    },
    {
        key: 6,
        name: 'VISA',
        p: require('../../assets/visa.jpg')

    },
    {
        key: 7,
        name: 'VISA',
        p: require('../../assets/visa.jpg')

    }
];

const Card = (props) => {
    const [state, setState] = useState('');
    const [temp, setTemp] = useState();
    const [btn, setBtn] = useState(0);
    const [itemBtn, setItemBtn] = useState();
    const [payName, setPayName] = useState('');
    const Total = props.total;
    const Data = props.D;
    const branch = props.branch;
    // console.log('Empty nahi chal rha ===', props.Empty)

    // console.log('Total ===', props.total)
    // console.log("ID=====", props.table_id)
    return (


        <>
            {state == 'Paymode' ? <Pay checkPaymode={props.checkPaymode} NameState={props.NameState} btnDisTot={props.btnDisTot} disTotal={props.disTotal} Total_Discount={props.total_dis} retu={props.totalState} pay={props.OrgTotal} refresh={props.refresh} T_order_sum={props.T_order_sum} pass='Payable' Cat_id={props.Cat_id} total={Total} D={Data} branch={branch} t_id={props.table_id} member={props.count} userid={props.userid} reload={props.reload} addNewItem={props.addNewItem} empty={props.Empty} Call={props.callback} function={props.func} statename={props.Statename} T_order_id={props.T_order_id} table_pass={props.table_pass} /> : state == 'Visa' ? <Visa img={temp} total={props.total}
                checkPaymode={props.checkPaymode} NameState={props.NameState} btnDisTot={props.btnDisTot} disTotal={props.disTotal} total_dis={props.total_dis} pay={props.OrgTotal} refresh={props.refresh} T_order_sum={props.T_order_sum} T_order_id={props.T_order_id} table_pass={props.table_pass} Cat_id={props.Cat_id} total={Total} D={Data} branch={branch} userid={props.userid} table_id={props.table_id} count={props.count} reload={props.reload} addNewItem={props.addNewItem} empty={props.Empty} callback={props.Call} func={props.function} Statename={props.statename} pass={props.pass} />
                : <>
                    <View style={{ borderLeftWidth: 1, borderColor: 'gray', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', height: hp('73.2%'), width: wp('40') }}>

                        <View style={{ marginTop: hp('1%'), height: hp('10%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ alignSelf: 'center', fontSize: wp('1.5%'), fontWeight: '700', color: 'black' }}>Payment mode</Text>
                        </View>


                        <View style={{ flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center', alignContent: 'center', height: hp('45%'), width: wp('30%') }}>
                            <FlatGrid
                                showsVerticalScrollIndicator={false}
                                // itemDimension={100}
                                data={DATA}
                                style={styles.gridView}
                                staticDimension={115}
                                // fixed
                                numColumns={3}
                                spacing={25}
                                // keyExtractor={item.key}
                                renderItem={({ item }) => (
                                    <>

                                        <TouchableOpacity style={{ borderWidth: itemBtn == item.key ? 3 : null, borderColor: itemBtn == item.key ? 'red' : null, marginTop: hp('2.5%'), alignItems: 'center', backgroundColor: '#ECECEC', borderRadius: 3, width: wp('8%'), height: hp('10%'), justifyContent: 'center' }} onPress={() => {
                                            setItemBtn(item.key);
                                            setBtn(1);
                                            setTemp(item.p);
                                            setPayName(item.name);
                                            console.log('selected item id', btn)
                                        }}>
                                            {itemBtn == item.key ? <Image source={require('../../assets/red-tick.png')} style={{ marginLeft: wp('6.5%'), marginTop: hp('-6%'), marginBottom: hp('1.8%'), height: hp('4.8%'), width: wp('3%') }} /> : null}
                                            <Text style={{ fontWeight: '700', fontSize: wp('0.8%'), color: 'black' }}>{item.name}</Text>
                                        </TouchableOpacity>

                                    </>
                                )}
                            />
                        </View>
                        <View style={{ backgroundColor: '#ECECEC', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: hp('10%'), width: wp('39.8%') }}>
                            <Text style={{ color: 'gray', fontSize: wp('1%'), fontWeight: '700' }}>Selected Option:       </Text>
                            <Text style={{ color: 'black', fontSize: wp('1%'), fontWeight: '700' }}>{payName}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: hp('12.5%'), width: wp('40%') }}>
                        <TouchableOpacity style={{ alignItems: 'center', borderWidth: 1, marginRight: wp('1%'), borderRadius: 5, justifyContent: 'center', height: hp('7.5%'), width: wp('13%') }}
                            onPress={() => setState('Paymode')}
                        >
                            <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: '#FC3F3F' }}>Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity disabled={btn == 0 ? true : false} onPress={() => {
                            setState('Visa');
                            // setModalVisible(true);
                            // Save();
                        }} style={{ backgroundColor: btn == 0 ? 'gray' : '#FC3F3F', alignItems: 'center', borderRadius: 5, justifyContent: 'center', height: hp('7.5%'), width: wp('23%') }} >

                            <Text style={{ fontWeight: '700', fontSize: wp('1.5%'), color: 'white' }}>Confirm Payment</Text>
                        </TouchableOpacity>
                    </View>


                </>
            }

        </>
    );
}


export default Card;

const styles = {

};