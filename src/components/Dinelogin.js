import React from 'react';
import {
    View, Text, TouchableOpacity
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Pin from './DinePin';



const Dinelogin = (props) => {
    const [state, setState] = React.useState(true);

    return (
        <View style={{ backgroundColor: state == true ? '#F7F7F7' : 'white', flex: 1, justifyContent: 'center' }}>
            {state == true ?
                <>
                    <Text style={{ alignSelf: 'center', fontFamily: 'Roboto', color: '#7B7B7B', marginBottom: 5, fontSize: wp('1.4%') }}>Print 4 digit pin to open ordering</Text>
                    <TouchableOpacity onPress={() => setState(false)}
                        style={{ justifyContent: 'center', alignSelf: 'center', backgroundColor: '#74BF63', width: wp('20%'), height: hp('10%'), borderRadius: 5 }}>
                        <Text style={{ color: 'white', fontFamily: 'Roboto', fontSize: wp('1.5%'), fontWeight: '700', alignSelf: 'center' }}>PRINT PIN</Text>
                    </TouchableOpacity>
                </>

                : <Pin DineLogin={props.DineLogin} />}
        </View>
    );
}

export default Dinelogin;