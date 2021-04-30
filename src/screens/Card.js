import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Paymode from './PayMode';
import { FlatGrid } from 'react-native-super-grid';
import Visa from './Visa';


const DATA = [
    {
        key: '1',
        p: require('../assets/visa.jpg')

    },
    {
        key: '2',
        p: require('../assets/visa.jpg')

    },
    {
        key: '3',
        p: require('../assets/visa.jpg')

    },
    {
        key: '4',
        p: require('../assets/visa.jpg')


    },
    {
        key: '5',
        p: require('../assets/visa.jpg')

    },
    {
        key: '6',
        p: require('../assets/visa.jpg')

    },
    {
        key: '8',
        p: require('../assets/visa.jpg')

    },
];

const Card = () => {
    const [state, setState] = useState('');
    const [temp, setTemp] = useState();
    return (


        <>
            { state == 'Paymode' ? <Paymode /> : state == 'Visa' ? <Visa img={temp} />
                : <>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', margin: 10, height: 25, width: 50 }} onPress={() => setState('Paymode')} >
                        <Text>Back</Text>
                    </TouchableOpacity>

                    <Text style={{ alignSelf: 'center', color: 'red' }}>PAY BY CARD</Text>




                    <View style={{ backgroundColor: 'white', height: "90%", margin: 30 }}>
                        <FlatGrid
                            showsVerticalScrollIndicator={false}
                            itemDimension={100}
                            data={DATA}
                            style={styles.gridView}
                            // staticDimension={300}
                            // fixed
                            spacing={4}
                            renderItem={({ item }) => (
                                <>
                                    <TouchableOpacity onPress={() => {
                                        setState('Visa');
                                        setTemp(item.p);
                                    }}>
                                        <View style={{ borderRadius: 3, borderWidth: 1, borderColor: 'red', padding: 10, width: 100, height: 100, justifyContent: 'center' }}>
                                            <Image source={item.p} style={{ width: 80, height: 80, alignSelf: 'center' }} resizeMode="contain" />
                                        </View>
                                    </TouchableOpacity>

                                </>
                            )}
                        />
                    </View>
                </>
            }

        </>
    );
}


export default Card;

const styles = {

};