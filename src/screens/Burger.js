import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Data = [
    {
        key: '1',
        item: "Classic Cheese",
        Discount: "12:20 PM",
        total: "01",
        bcolor: 'rgb(240,240,240)',

        b: 'Burger',
        p: 2.50
    },
    {
        key: '2',

        Discount: "12:20 PM",
        total: "01",
        item: 'Classic Cheese',
        b: 'Burger',
        p: 2.50

    },
    {
        key: '3',

        Discount: "12:20 PM",
        total: "01",
        bcolor: 'rgb(240,240,240)',
        item: 'Classic Cheese',
        b: 'Burger',
        p: 2.50

    },
    {
        key: '4',

        Discount: "12:20 PM",
        total: "01",
        item: 'Classic Cheese',
        b: 'Burger',
        p: 2.50


    },
    {
        key: '5',

        Discount: "12:20 PM",
        total: "01",
        bcolor: 'rgb(240,240,240)',
        item: 'Classic Cheese',
        b: 'Burger',
        p: 2.50

    },
    {
        key: '6',
        Discount: "12:20 PM",
        total: "01",
        item: 'Classic Cheese',
        b: 'Burger',
        p: 2.50

    },



];



const Burger = (props) => {

    const [items, setItems] = useState([]);

    const branch = props.branch;
    const token = '$2y$10$f43enwo0NWLsBmlGfx/ZMevMgmvEdbrZ3JTF.FNoVM4Nrj2aZYE82';

    const [item_count, setItem_count] = useState(0);


    useEffect(() => {


        // fetch('http://warelypos.sapphost.com/api/get_item?token=$2y$10$f43enwo0NWLsBmlGfx/ZMevMgmvEdbrZ3JTF.FNoVM4Nrj2aZYE82')
        //     .then((response) => response.json())
        //     .then((json) => setItems(json))
        //     .catch((error) => console.error(error));

        fetch("http://warly2.sapphost.com/public/api/cat_item", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                'Token': token,
                'Loc_id': branch,
                'Cat_id': props.Cat_id,

            })
        }).
            then(res => res.json())
            .then((json) => {
                setItems(json);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [branch, props.Cat_id]);



    console.log(props.Cat_id)
    return (
        <View>
            <View style={{ borderBottomWidth: 0.4, height: 50, flexDirection: 'row' }}>
                <TextInput style={{ height: 40, alignSelf: 'flex-end', flex: 1 }} />
                <View>
                    <Image source={require('../assets/se.jpg')} style={{ width: 25, height: 25, marginTop: 10 }} />
                </View>
            </View>

            <View style={{ borderBottomWidth: 0.4, height: 25, flexDirection: 'row' }}>
                <Text style={{ alignSelf: 'center', flex: 1, fontSize: wp('1%'), marginLeft: 30 }}></Text>
                <Text style={{ fontSize: wp('1%'), alignSelf: 'center', marginRight: 20 }}>4 items</Text>
            </View>

            <View style={{ backgroundColor: 'white', height: "90%" }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={items}
                    style={{ alignSelf: 'center' }}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <>

                            <TouchableOpacity style={{ width: wp('12%'), height: hp('18%'), backgroundColor: 'rgb(240,240,240)', marginRight: '2%', marginBottom: '1%', marginTop: hp('2%'), borderRadius: 4, justifyContent: 'flex-end' }}
                                onPress={() => props.addNewItem(item.name, item.price, item.discount, item.id, item.var_id)}>
                                <View style={{ alignSelf: 'center', marginTop: 5 }}>
                                    <Text style={{ fontSize: wp('1.5%'), alignSelf: 'center' }}>{item.name}</Text>
                                    <Text style={{ fontSize: wp('1.5%'), alignSelf: 'center', marginTop: 20, fontWeight: 'bold' }}></Text>
                                </View>
                                <View style={{ height: hp('3%'), backgroundColor: '#696969', }}>
                                    <Text style={{ fontSize: wp('1.1%'), alignSelf: 'center', color: 'white' }}>{item.price}</Text>
                                </View>

                            </TouchableOpacity>


                        </>
                    )}
                />
            </View>
        </View>



    );
}

export default Burger;

const styles = {

};