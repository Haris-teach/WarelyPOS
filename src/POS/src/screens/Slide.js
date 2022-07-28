import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';


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



const Pizza = (props) => {

    const [items, setItems] = useState([]);

    const branch = props.branch;
    const token = '$2y$10$f43enwo0NWLsBmlGfx/ZMevMgmvEdbrZ3JTF.FNoVM4Nrj2aZYE82';




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
    }, [branch]);


    console.log(props.Cat_id)


    return (
        <>
            <View style={{ borderBottomWidth: 0.4, height: 50, flexDirection: 'row' }}>
                <TextInput style={{ height: 40, alignSelf: 'flex-end', flex: 1 }} />
                <View>
                    <Image source={require('../assets/se.jpg')} style={{ width: 25, height: 25, marginTop: 10 }} />
                </View>
            </View>

            <View style={{ borderBottomWidth: 0.4, height: 20, flexDirection: 'row' }}>
                <Text style={{ alignSelf: 'center', flex: 1, fontSize: 10, marginLeft: 30 }}>Back</Text>
                <Text style={{ fontSize: 10, alignSelf: 'center', marginRight: 20 }}>17 items</Text>
            </View>

            <View style={{ backgroundColor: 'white', height: "90%" }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={items}
                    style={{ alignSelf: 'center' }}
                    numColumns={3}
                    renderItem={({ item }) => (
                        <>

                            <TouchableOpacity style={{ width: 80, height: 80, backgroundColor: 'rgb(240,240,240)', marginRight: '2%', marginBottom: '1%', marginTop: 3, borderRadius: 4 }}
                                onPress={() => props.addNewItem(item.name, item.price, item.discount, item.id, item.var_id)}>
                                <View style={{ alignSelf: 'center', marginTop: 5 }}>
                                    <Text style={{ fontSize: 9, alignSelf: 'center' }}></Text>
                                    <Text style={{ fontSize: 9, alignSelf: 'center', marginTop: 20, fontWeight: 'bold' }}>{item.name}</Text>
                                </View>
                                <View style={{ height: 11, backgroundColor: '#696969', marginTop: '25%' }}>
                                    <Text style={{ fontSize: 9, alignSelf: 'center', color: 'white' }}>{item.price.slice(0, -2)}</Text>
                                </View>

                            </TouchableOpacity>


                        </>
                    )}
                />
            </View>
        </>



    );
}

export default Pizza;

const styles = {

};