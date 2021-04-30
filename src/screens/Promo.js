import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Burger from './Burger';



const Promo = () => {

    const [state, setState] = useState(false);
    const [btn, setBtn] = useState('');

    return (
        <>
            {state == true ? <Burger /> : null}
            <TouchableOpacity style={{ alignSelf: 'flex-end', margin: 10, height: 25, width: 50 }} onPress={() => setState(true)}>
                <Text>Back</Text>
            </TouchableOpacity>

            <Text style={{ margin: 10, fontWeight: 'bold' }}>1 for 1 Burger</Text>


            <View style={{ flexDirection: 'row', marginLeft: 30, marginRight: 30, justifyContent: 'space-around', marginTop: '10%' }}>
                {btn == '1' ?
                    <View style={{ width: '48%' }}>
                        <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'red' }]} onPress={() => setBtn('1')} >
                            <Text style={[styles.Tstyle, { color: 'white' }]}>Cheese Burger</Text>
                        </TouchableOpacity>
                    </View>
                    : <View style={{ width: '48%' }}>
                        <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'white' }]} onPress={() => setBtn('1')} >
                            <Text style={[styles.Tstyle, { color: 'black' }]}>Cheese Burger</Text>
                        </TouchableOpacity>
                    </View>}

                {btn == '2' ?
                    <View style={{ width: '48%' }}>
                        <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'red' }]} onPress={() => setBtn('2')} >
                            <Text style={[styles.Tstyle, { color: 'white' }]}>Cheese Burger</Text>
                        </TouchableOpacity>
                    </View>
                    : <View style={{ width: '48%' }}>
                        <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'white' }]} onPress={() => setBtn('2')} >
                            <Text style={[styles.Tstyle, { color: 'black' }]}>Cheese Burger</Text>
                        </TouchableOpacity>
                    </View>}
            </View>


            <View style={{ flexDirection: 'row', marginLeft: 30, marginRight: 30, justifyContent: 'space-around', marginTop: '5%' }}>
                {btn == '3' ?
                    <View style={{ width: '48%' }}>
                        <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'red' }]} onPress={() => setBtn('3')} >
                            <Text style={[styles.Tstyle, { color: 'white' }]}>Cheese Burger</Text>
                        </TouchableOpacity>
                    </View>
                    : <View style={{ width: '48%' }}>
                        <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'white' }]} onPress={() => setBtn('3')} >
                            <Text style={[styles.Tstyle, { color: 'black' }]}>Cheese Burger</Text>
                        </TouchableOpacity>
                    </View>}

                {btn == '4' ?
                    <View style={{ width: '48%' }}>
                        <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'red' }]} onPress={() => setBtn('4')} >
                            <Text style={[styles.Tstyle, { color: 'white' }]}>Cheese Burger</Text>
                        </TouchableOpacity>
                    </View>
                    : <View style={{ width: '48%' }}>
                        <TouchableOpacity style={[styles.btnStyle, { backgroundColor: 'white' }]} onPress={() => setBtn('4')} >
                            <Text style={[styles.Tstyle, { color: 'black' }]}>Cheese Burger</Text>
                        </TouchableOpacity>
                    </View>}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20, borderBottomWidth: 0.3 }}>
                <Text>Total</Text>
                <Text>$ 2.50</Text>
            </View>

            <View style={{ justifyContent: 'flex-end', flex: 1, marginBottom: 5 }}>
                <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 5, width: "80%", alignSelf: 'center', height: 30, justifyContent: 'center' }}>
                    <Text style={{ alignSelf: 'center', color: 'white' }}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default Promo;

const styles = {
    btnStyle: {
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 5,
        height: 30,
        justifyContent: 'center'

    },
    Tstyle: {
        alignSelf: 'center',
        fontSize: 10
    }
}