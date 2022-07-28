import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";


const DATA = [
    {
        key: '1',
        item: 'Burger',
        p: '200',
        dis: '10',
    },
    {
        key: '2',
        item: 'Burger',
        p: '200',
        dis: '10',
    },
    {
        key: '3',
        item: 'Burger',
        p: '200',
        dis: '10',
    },
    {
        key: '4',
        item: 'Burger',
        p: '200',
        dis: '10',
    },
    {
        key: '5',
        item: 'Burger',
        p: '200',
        dis: '10',
    },

    {
        key: '7',
        item: 'Burger',
        p: '200',
        dis: '10',
    },
];


const Takeway_dt = (props) => {
    const [response, setResponse] = useState();

    const token = '$2y$10$f43enwo0NWLsBmlGfx/ZMevMgmvEdbrZ3JTF.FNoVM4Nrj2aZYE82';



    useEffect(() => {

        fetch("http://warly2.sapphost.com/api/order_dt", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                'Token': token,
                'order_id': props.order_ID,
            })
        }).
            then(res => res.json()).
            then(response => {
                setResponse(response);
            }).
            catch((error) => {
                console.error(error);
            });



    }, []);


    console.log(props.order_ID)



    return (
        <View style={{ flex: 1 }}>




            <View style={{ backgroundColor: 'white', height: 40, width: '30%' }}>
                <TouchableOpacity style={{ flexDirection: 'row', borderRadius: 2, borderColor: 'red', width: "100%", marginLeft: 30, marginTop: "2%", alignItems: 'center', backgroundColor: 'white' }} onPress={() => setState(true)}>

                    <Text style={{ fontSize: 15, marginLeft: 15, fontWeight: 'bold' }}>ORDER Detail</Text>

                </TouchableOpacity>
            </View>



            <View style={{ flexDirection: 'row', marginLeft: 0 }}>
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>NO.  </Text>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>item  </Text>
                </View>

                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>Qty </Text>
                </View>

                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>Discount</Text>
                </View>

                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>Price  </Text>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={styles.textStyle}>Del   </Text>
                </View>
            </View>


            <View style={{ height: '50%' }}>
                <FlatList
                    data={DATA}
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
                                <TouchableOpacity style={styles.viewStyle}>
                                    <Text style={styles.textStyle}>{1}</Text>
                                </TouchableOpacity>
                                <View style={styles.viewStyle}>
                                    <Text style={styles.textStyle}>{item.dis}</Text>
                                </View>

                                <View style={styles.viewStyle}>
                                    <Text style={styles.textStyle}>${item.p}</Text>
                                </View>
                                <TouchableOpacity style={styles.viewbtnStyle}>
                                    <Image source={require('../assets/dele.jpg')} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>

                            </View>
                        )
                    }}

                />

            </View>
        </View>
    );
}

export default Takeway_dt;


const styles = {
    textStyle: {
        fontSize: 10,
    },
    viewStyle: {
        marginLeft: 10,
        marginTop: 5,
        borderRightWidth: 0.3,
        marginRight: 5,
        opacity: 0.5,
        width: 60
    },
    viewbtnStyle: {
        marginLeft: 30,
        marginTop: 2,
        opacity: 0.5,
        width: 60,
        height: 20,
        marginBottom: 3,

        borderRadius: 5
    },


};