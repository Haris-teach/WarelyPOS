import React from 'react';
import { Image, View } from 'react-native';

const Anc = () => {

    return (
        <View style={{ justifyContent: 'center' }}>
            <Image
                // source={require("../assets/anc.jpg")}
                source={require("../assets/qrcode.jpeg")}
                style={{ width: '100%', height: '100%', }}
                resizeMode="contain"
            />
            {/* <Image
                source={require("../assets/Scan_me.jpg")}
                style={{ alignSelf: 'flex-end', marginRight: '-20%', width: '20%', height: '20%' }}
                resizeMode="contain"
            /> */}
        </View>
    )
}
export default Anc;