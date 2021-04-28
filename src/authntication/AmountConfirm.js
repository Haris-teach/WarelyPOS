import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const AmountConfirm = ({ navigation, route }) => {
  const [number, onChangeNumber] = useState(null);
  const branch = route.params?.Loc_id;
  const Key = route.params?.userid;
  const [value, setValue] = useState('');



  const concatinate = (v) => {
    let word = value;

    if (v == 'del') {
      word = word.slice(0, -1);
      setValue(word);
      return;
    }
    else {
      word = word + v;
    }

    setValue(word);
  }

  return (
    <View style={styles.container}>
      <View style={{ marginTop: '3%', marginLeft: 10, justifyContent: 'flex-start' }}>
        <Image
          source={require("../assets/Logo.jpg")}
          style={{ width: wp('20%'), height: hp('8%') }}
          resizeMode="contain"
        />
      </View>



      <View
        style={{
          backgroundColor: "#F9F9F9",
          width: wp('100%'),
          alignItems: "center",
          alignSelf: "center",
          marginTop: hp('5%')
        }}
      >
        <Text style={{
          color: 'black',
          fontWeight: "bold",
          fontSize: wp('1.5%'),
          marginLeft: 3,
        }} >Your Cash has <Text style={{
          color: "#FF2E2E",
          fontWeight: "bold",
          fontSize: wp('1.5%'),
          marginLeft: 3,
        }}> S$</Text>  <Text style={{
          color: "#FF2E2E",
          fontWeight: "bold",
          fontSize: wp('1.6%'),
          marginLeft: 3,
        }}>{value}</Text></Text>




      </View>


      <View
        style={{
          flexDirection: "row",
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <TextInput
          style={styles.Input}
          onChangeText={onChangeNumber}
          value={value}
          placeholder="Please check and enter the amount to confirm"
          editable={false}
          keyboardType="numeric"
        ></TextInput>

        <TouchableOpacity
          style={{
            backgroundColor: "#FF2E2E",
            width: wp('8%'),
            borderRadius: 10,
            height: 40,
            justifyContent: "center",
            margin: 12,
          }}
          onPress={() => navigation.navigate("Dinning", { Loc_id: branch, userid: Key })}
        >
          <Text
            style={{
              color: "white",
              padding: 5,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Done
            </Text>
        </TouchableOpacity>


      </View>
      <ScrollView>
        <View

          style={{ height: hp('120%'), marginTop: hp('5%'), alignSelf: 'center', borderRadius: 5 }}
        >


          <View style={{ flexDirection: 'row', width: wp('76.1%'), backgroundColor: 'white', borderTopWidth: 1, alignSelf: 'center', borderColor: "#b5b5b5" }}>

            <TouchableOpacity style={{ width: wp('25.3%'), backgroundColor: 'white', height: 100, justifyContent: 'center', borderRightWidth: 1, borderLeftWidth: 1, borderColor: "#b5b5b5" }}
              onPress={() => {
                concatinate('1');
              }}>
              <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold' }}>1</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: wp('25.3%'), backgroundColor: 'white', height: 100, justifyContent: 'center', borderRightWidth: 1, borderColor: "#b5b5b5" }}
              onPress={() => {
                concatinate('2');
              }}>
              <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold' }}>2</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: wp('25.3%'), backgroundColor: 'white', height: 100, justifyContent: 'center', borderRightWidth: 1, borderColor: "#b5b5b5" }}
              onPress={() => {
                concatinate('3');
              }}>
              <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold', }}>3</Text>
            </TouchableOpacity>


          </View>



          <View style={{ flexDirection: 'row', width: wp('76.1%'), backgroundColor: 'white', borderTopWidth: 1, alignSelf: 'center', borderColor: "#b5b5b5" }}>

            <TouchableOpacity style={{ width: wp('25.3%'), backgroundColor: 'white', height: 100, justifyContent: 'center', borderRightWidth: 1, borderLeftWidth: 1, borderColor: "#b5b5b5" }}
              onPress={() => {
                concatinate('4');
              }}>
              <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold' }}>4</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: wp('25.3%'), backgroundColor: 'white', height: 100, justifyContent: 'center', borderRightWidth: 1, borderColor: "#b5b5b5" }}
              onPress={() => {
                concatinate('5');
              }}>
              <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold' }}>5</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: wp('25.3%'), backgroundColor: 'white', height: 100, justifyContent: 'center', borderColor: "#b5b5b5", borderRightWidth: 1 }}
              onPress={() => {
                concatinate('6');
              }}>
              <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold', }}>6</Text>
            </TouchableOpacity>


          </View>



          <View style={{ flexDirection: 'row', width: wp('76.1%'), backgroundColor: 'white', borderTopWidth: 1, alignSelf: 'center', borderColor: "#b5b5b5" }}>

            <TouchableOpacity style={{ width: wp('25.3%'), backgroundColor: 'white', height: 100, justifyContent: 'center', borderRightWidth: 1, borderLeftWidth: 1, borderColor: "#b5b5b5" }}
              onPress={() => {
                concatinate('7');
              }}>
              <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold' }}>7</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: wp('25.3%'), backgroundColor: 'white', height: 100, justifyContent: 'center', borderRightWidth: 1, borderColor: "#b5b5b5" }}
              onPress={() => {
                concatinate('8');
              }}>
              <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold' }}>8</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: wp('25.3%'), backgroundColor: 'white', height: 100, justifyContent: 'center', borderColor: "#b5b5b5", borderRightWidth: 1 }}
              onPress={() => {
                concatinate('9');
              }}>
              <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold', }}>9</Text>
            </TouchableOpacity>


          </View>



          <View style={{ flexDirection: 'row', width: wp('76.1%'), backgroundColor: 'white', borderTopWidth: 1, alignSelf: 'center', borderBottomWidth: 1, borderColor: "#b5b5b5" }}>

            <TouchableOpacity style={{ width: wp('25.3%'), backgroundColor: 'white', height: 99, justifyContent: 'center', borderRightWidth: 1, borderLeftWidth: 1, borderColor: "#b5b5b5" }}
              onPress={() => {
                concatinate('del');
              }}>
              <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold' }}>Clear</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: wp('25.3%'), backgroundColor: 'white', height: 99, justifyContent: 'center', borderRightWidth: 1, borderColor: "#b5b5b5" }}
              onPress={() => {
                concatinate('0');
              }}>
              <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold' }}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ width: wp('25.3%'), backgroundColor: 'white', height: 99, justifyContent: 'center', borderColor: "#b5b5b5", borderRightWidth: 1 }}
              onPress={() => {
                concatinate('.');
              }}>
              <Text style={{ alignSelf: 'center', fontSize: wp('2%'), fontWeight: 'bold', }}>.</Text>
            </TouchableOpacity>


          </View>



        </View>
      </ScrollView>

    </View >



  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(250,250,250)",
  },

  TextStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },

  NumberTextStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
  },

  Input: {
    height: 40,
    width: "65%",
    padding: 10,
    fontSize: wp('1.2%'),
    borderRadius: 2,
    margin: 12,
    backgroundColor: "white",
    color: 'black'
  },
});
export default AmountConfirm;
