import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

const Reciept = () => {


    return (
        <ScrollView>
            <View style={{ marginBottom: 2, alignItems: 'center' }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Aronium</Text>
                <Text>Main Street 1</Text>
                <Text>90210 Weldone</Text>
                <Text>Tax No.: 123456789</Text>
                <Text>+1234567890</Text>
                <Text>office@aronium.com</Text>
            </View>

            <View style={{ borderBottomWidth: 1, marginTop: 5, marginLeft: 5 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Reciept No: 17-200-000056</Text>
                <Text>25.11.2017. 18:33:34</Text>
                <Text>User: John Doe</Text>
            </View>

            <View style={{ borderBottomWidth: 1, marginTop: 5, margin: 5 }}>
                <Text>Coca Cola</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>9x $180.00(-10%)</Text>
                    <Text>$1,458.00</Text>
                </View>

                <Text>Pepsi</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>128x $20.00 (-%50.00)</Text>
                    <Text>$2,510.00</Text>
                </View>

            </View>




            <View style={{ borderEndWidth: 0.5, marginTop: 5, margin: 5 }}>
                <Text>Items count :2</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>Cart discount (50%):</Text>
                    <Text>-$1,984.00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>Subtotal:</Text>
                    <Text>$1,923.81</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>Tax 9.00%</Text>
                    <Text>$60.19</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>TOTAL:</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>$1,984.00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>Cash:</Text>
                    <Text>$1,984.00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>Paid Amount:</Text>
                    <Text>$1,984.00</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                    <Text>Change:</Text>
                    <Text>$0.00</Text>
                </View>

            </View>
        </ScrollView>
    )
}
export default Reciept;