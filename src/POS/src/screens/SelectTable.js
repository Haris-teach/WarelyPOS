import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { DATA } from '../Model/Data';
import Burger from './Burger';
import Cash from './Cash';
import Pay from './Pay';
import Promo from './Promo';
import Reward from './Reward';
import Side from './Slide';
import Takeway from './Takeway';


const Table = (props) => {
    const [state, setState] = useState(true);
    const [loading, setLoading] = useState(false)
    const [select, setSelect] = useState('burger');
    const [i, setI] = useState(1);
    const [p, setP] = useState(0);

    const navigation = useNavigation();
    const [array, setArray] = useState(DATA);



    const reload = () => {
        setLoading(!loading)
    }


    const addNewItem = (name, price) => {
        setI(i + 1);

        const obj = { 'key': i, 'item': name, 'p': price };
        setP(p + parseInt(price));
        DATA.push(obj)
        reload();


    };

    console.log(p);

    const newArray = (Id) => {

        let index = DATA.indexOf(item => item.key == Id)
        DATA.splice(index, 1);

        setArray(DATA.filter(item => item.key != Id));

    }

    useEffect(() => {
        setArray(DATA)
    }, [loading])


    return (
        <>
            {state === true ?

                <View style={{ flex: 1, flexDirection: 'row' }}>


                    <View style={{ flex: 0.5, backgroundColor: 'white' }}>


                        <View style={{ flexDirection: 'row', height: 30, width: '98%' }}>
                            <TouchableOpacity
                                style={{
                                    borderRadius: 5,
                                    borderWidth: 2,
                                    borderColor: "#b5b5b5",
                                    marginTop: 5,
                                    width: '20%',
                                    alignItems: 'center',
                                    height: 25,
                                    flex: 1,
                                    alignSelf: 'flex-start',
                                    marginRight: 10,
                                    marginLeft: 5
                                }}
                                onPress={() => navigation.goBack()}

                            >
                                <Text style={{ padding: 2, fontSize: 10 }}>Back</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{
                                    borderRadius: 5,
                                    marginTop: 5,
                                    width: '60%',
                                    alignItems: 'center',
                                    height: 25,
                                    backgroundColor: 'red',
                                    alignSelf: 'flex-end'

                                }}

                            >
                                <Text style={{ padding: 2, fontSize: 12, color: 'white' }}>TAKEAWAY</Text>
                            </TouchableOpacity>

                        </View>

                        <View style={{
                            flexDirection: 'row', height: 20, borderColor: '#cbcdad', marginTop: 10, shadowColor: "#000",
                            shadowOffset: {
                                width: 10,
                                height: 10
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 1,
                            elevation: 1
                        }}>
                            <Text style={{ alignSelf: 'flex-start', flex: 1, fontWeight: 'bold', fontSize: 10, marginTop: 4 }}>
                                TAKEWAY
                                </Text>
                            <Text style={{ alignItems: 'center', flex: 1, color: 'red', fontSize: 9, marginTop: 4 }}>
                                RECEIVED 07:55 pm
                                </Text>
                            <Text style={{ fontWeight: 'bold', fontSize: 10, marginTop: 4 }}>
                                N0. 001
                                </Text>
                        </View>



                        <View style={{ flexDirection: 'row', marginLeft: 0 }}>
                            <View style={styles.viewStyle}>
                                <Text style={styles.textStyle}>NO.  </Text>
                            </View>
                            <View style={styles.viewStyle}>
                                <Text style={styles.textStyle}>item  </Text>
                            </View>

                            <View style={styles.viewStyle}>
                                <Text style={styles.textStyle}>Qty  </Text>
                            </View>
                            <View style={styles.viewStyle}>
                                <Text style={styles.textStyle}>Discount  </Text>
                            </View>
                            <View style={styles.viewStyle}>
                                <Text style={styles.textStyle}>Total  </Text>
                            </View>
                            <View style={styles.viewStyle}>
                                <Text style={styles.textStyle}>Del   </Text>
                            </View>
                        </View>



                        <View style={{ height: '30%' }}>
                            <FlatList
                                data={array}
                                keyExtractor={item => item.key}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ flexDirection: 'row', backgroundColor: item.bcolor }}>
                                            <View style={styles.viewStyle}>
                                                <Text style={styles.textStyle}>{item.key}</Text>
                                            </View>
                                            <View style={styles.viewStyle}>
                                                <Text style={styles.textStyle}>{item.item}</Text>
                                            </View>

                                            <TouchableOpacity style={[styles.viewStyle, { borderWidth: 0.5 }]} onPress={() => setSelect('Cash')}>
                                                <Text style={styles.textStyle}>{1}</Text>
                                            </TouchableOpacity>
                                            <View style={styles.viewStyle}>
                                                <Text style={styles.textStyle}>${item.p}</Text>
                                            </View>
                                            <View style={styles.viewStyle}>
                                                <Text style={styles.textStyle}>${item.p}</Text>
                                            </View>
                                            <TouchableOpacity style={styles.viewbtnStyle}
                                                onPress={() => newArray(item.key)}>
                                                <Image source={require('../assets/dele.jpg')} style={{ width: 20, height: 20 }} />
                                            </TouchableOpacity>

                                        </View>
                                    )
                                }}

                            />
                        </View>

                        <View style={{ flexDirection: 'row', flex: 1, }}>
                            <View style={{ backgroundColor: 'rgb(240,240,240)', flex: 0.5, height: "90%", justifyContent: 'center' }}>
                                <TouchableOpacity style={{ backgroundColor: 'white', width: '50%', height: 20, alignSelf: 'center', }}>
                                    <Text>Enter mobile #</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: 'white', width: '50%', height: 20, alignSelf: 'center', marginTop: 4 }}>
                                    <Text>+ Customer</Text>
                                </TouchableOpacity>

                            </View>

                            <View style={{ backgroundColor: 'rgb(240,240,240)', flex: 0.5, borderLeftWidth: 0.4, alignContent: 'center', height: '90%' }}>
                                <View style={{ opacity: 0.5, marginLeft: 25, marginRight: 25 }}>

                                    <View style={styles.vStyle}>
                                        <Text style={[styles.Tstyle, { flex: 1 }]}>Sub Total</Text>
                                        <Text style={styles.Tstyle}>${p}</Text>
                                    </View>

                                    <View style={styles.vStyle}>
                                        <Text style={[styles.Tstyle, { flex: 1 }]}>SVC Charge</Text>
                                        <Text style={styles.Tstyle}>$5.00</Text>
                                    </View>

                                    <View style={styles.vStyle}>
                                        <Text style={[styles.Tstyle, { flex: 1 }]}>GST</Text>
                                        <Text style={styles.Tstyle}>$3.50</Text>
                                    </View>

                                    <View style={styles.vStyle}>
                                        <Text style={[styles.Tstyle, { flex: 1 }]}>Discount</Text>
                                        <Text style={styles.Tstyle}>-$4.00</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: -10, borderBottomWidth: 0.3, borderTopWidth: 0.3, marginLeft: 25, marginRight: 25 }}>
                                    <Text style={{ flex: 1, alignSelf: "center", fontSize: 12 }} >Total</Text>
                                    <Text style={{ fontSize: 12, alignSelf: 'center' }}>${p}</Text>
                                </View>

                            </View>
                        </View>


                        <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <TouchableOpacity style={[styles.fbtnStyle, { alignSelf: 'flex-start' }]} >
                                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 10, marginTop: '5%' }}>Void</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <TouchableOpacity style={{ alignSelf: 'center', width: '120%', height: 25, borderWidth: 1, borderRadius: 3 }}>
                                    <Text style={{ alignSelf: 'center', fontSize: 10, marginTop: '2%' }}>PRINT & SAVE TICKET </Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ flex: 1, marginRight: 10 }}>
                                <TouchableOpacity style={[styles.fbtnStyle, { alignSelf: 'flex-end' }]} onPress={() => setSelect("Pay")}>
                                    <Text style={{ alignSelf: 'center', color: 'white', fontSize: 10, marginTop: '5%' }}>Pay </Text>
                                </TouchableOpacity>
                            </View>

                        </View>



                    </View>













                    {select == 'burger' || select == 'promo' || select == 'side' || select == 'reward' ?
                        <>

                            <View style={{ flex: 0.1, backgroundColor: 'rgb(240,240,240)' }}>

                                <View style={{ flexDirection: 'column', alignSelf: 'center' }}>
                                    <TouchableOpacity style={[styles.Card, { backgroundColor: 'red' }]} onPress={() => setSelect('promo')}>

                                        <Text style={styles.CardText}>Promo</Text>


                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.Card, { backgroundColor: '#ffbf00' }]} onPress={() => setSelect('reward')}>

                                        <Text style={styles.CardText}>Rewards</Text>


                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.Card, { backgroundColor: 'gray' }]} onPress={() => setSelect('burger')}>

                                        <Text style={styles.CardText}>Burgers</Text>

                                    </TouchableOpacity>

                                    <TouchableOpacity style={[styles.Card, { backgroundColor: 'blue' }]} onPress={() => setSelect('side')}>

                                        <Text style={styles.CardText}>Sides</Text>


                                    </TouchableOpacity>

                                </View>

                            </View>

                        </> : null
                    }






                    <View style={{ flex: 0.5, backgroundColor: 'white' }}>

                        {select === 'promo' ? <Promo /> : select === 'reward' ? <Reward /> : select === 'burger' ? <Burger reload={reload} addNewItem={addNewItem} /> : select === 'side' ? <Side /> : select === 'Pay' ? <Pay /> : select == 'Cash' ? <Cash /> : null}

                    </View>









                </View> :
                <Takeway />
            }
        </>
    );
}

export default Table;

const styles = {
    textStyle: {
        fontSize: 9,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    viewStyle: {

        marginTop: 5,
        borderRightWidth: 0.3,
        width: "15%"
    },
    viewbtnStyle: {
        marginLeft: 30,

        width: 20,
        height: 20,
    },

    vStyle: {
        flexDirection: 'row',
        height: '22%'
    },
    Tstyle: {
        alignSelf: "center",
        fontSize: 10
    },
    fbtnStyle: {
        width: '50%',
        height: 25,
        borderRadius: 3,
        backgroundColor: 'red'
    },
    Card: {
        width: 65,
        height: 55,
        marginTop: 10,
        marginLeft: 5,
        borderRadius: 4,

    },
    CardText: {
        alignSelf: 'center',
        marginTop: "30%",
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10
    },

};