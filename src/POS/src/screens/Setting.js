import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Pl from './PrinterList';

const Setting = () => {


  return (

    <View style={styles.container}>

      <View style={{ flex: 0.2, borderRightColor: '#a9a9a9', borderRightWidth: 1, marginRight: wp('1.5%') }}>


        <View>
          <Text style={{ fontSize: wp('2.5%'), fontWeight: 'bold', marginLeft: wp('1%'), marginTop: hp('1%'), color: 'grey' }}>Setting</Text>
        </View>
        <TouchableOpacity
          style={styles.devicebtn}
        >
          <Text style={styles.deviceText}>Device</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 0.8, height: 100 }}>



        <Pl />


      </View>


    </View>
  );
}

export default Setting;


const styles = StyleSheet.create({
  container:
  {
    flex: 1, flexDirection: 'row', backgroundColor: '#FFFAFA'
  },
  devicebtn: {
    width: wp('18.5%'),
    height: hp('7.5%'),
    backgroundColor: '#dcdcdc',
    marginVertical: wp('1.5%'),
    justifyContent: 'center',
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: wp('0.5%'),
    borderColor: '#696969',
    borderWidth: 1,
  },
  deviceText: {
    fontSize: wp('1%'),
    color: 'black',
    textAlign: 'center'
  }

})
