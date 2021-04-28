import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const EditTime = ({ navigation, route }) => {
  const [currentTime, setCurrentTime] = useState('');


  const branch = route.params?.Loc_id;
  const Key = route.params?.userid;


  useEffect(() => {
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes

    setCurrentTime(
      hours + ':' + min
    );
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ marginTop: "3%", marginLeft: 10 }}>
        <Image
          source={require("../assets/Logo.jpg")}
          style={{ width: wp('20%'), height: hp('8%') }}
          resizeMode="contain"
        ></Image>
      </View>
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <View style={styles.container1}>
          <View
            style={{
              backgroundColor: "#ffffff",
              width: wp('12%'),
              marginTop: hp('-2.5%'),
              marginBottom: 20,
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={styles.TextStyle}>Hello JIMMY</Text>
          </View>

          <View style={{ marginTop: -5, alignSelf: 'flex-end' }}>
            <Text style={{ textDecorationLine: 'underline', marginRight: 12, fontSize: wp('0.8%') }}>Edit Time</Text>
          </View>
          <View style={{ height: hp('20%'), marginTop: hp('5%') }}>
            <Text style={{ fontWeight: "bold", fontSize: wp('5%') }}>{currentTime}</Text>
          </View>


          <View
            style={{
              marginTop: 15,
              flexDirection: "row",
              alignSelf: 'center'
            }}
          >

            <TouchableOpacity
              style={styles.ButtonView}
              onPress={() =>
                navigation.navigate("AmountConfirm", { Loc_id: branch, userid: Key })
              }
            >

              <Text style={styles.ButtonViewText}>Clock In</Text>

            </TouchableOpacity>



            <View style={styles.ButtonView2}>
              <Text style={styles.ButtonViewText}>Clock Out</Text>
            </View>

          </View>




        </View>
        <View style={{ alignSelf: 'flex-start', marginLeft: "25%" }}>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "#b5b5b5",
              marginTop: 10,
              width: wp('16%'),
              alignItems: 'center',

            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ padding: 8, fontSize: wp('2%') }}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  );
}
export default EditTime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",

  },
  container1: {
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 20,
    alignItems: "center",
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: "#b5b5b5",
    height: hp('53%'), // 70% of height device screen
    width: wp('50%'),  // 80% of width device screen


  },
  TextStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: wp('1.5%')
  },
  ButtonView: {
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    height: hp('7%'), // 70% of height device screen
    width: wp('16%'),  // 80% of width device screen
    marginLeft: 10,
    alignItems: "center",
    backgroundColor: "#74bf64",

  },
  ButtonView2: {
    borderRadius: 5,
    alignSelf: "center",
    justifyContent: "center",
    height: hp('7%'), // 70% of height device screen
    width: wp('16%'),  // 80% of width device screen
    marginLeft: 10,
    alignItems: "center",
    backgroundColor: "#b5b5b5",
  },
  ButtonViewText: {
    color: "#ffffff",
    fontWeight: "bold",
    marginTop: 5,
    fontSize: wp('1.5%')
  },

});
