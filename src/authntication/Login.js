import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ToastAndroid,
  FlatList
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import DropDownPicker from "react-native-dropdown-picker";
import { Branch_User, Branches } from "../utils/urls";
import APIHandler from "../utils/APIHandler";


const Data = [
  {
    key: '1',
    name: 'xyz',
  },
  {
    key: '2',
    name: 'xyz',
  },
  {
    key: '3',
    name: 'xyz',
  },
  {
    key: '4',
    name: 'xyz',
  },
  {
    key: '5',
    name: 'xyz',
  },
  {
    key: '6',
    name: 'xyz',
  },
  {
    key: '7',
    name: 'xyz',
  },
  {
    key: '8',
    name: 'xyz',
  },
];


const Login = ({ navigation }) => {

  const [value, setValue] = useState(null);
  const [items, setItems] = useState([

  ]);
  const [data, setData] = useState([]);

  const [branchid, setBranchid] = useState();


  const User_Branch = (branchId) => {
    let params = {
      Branch: branchId,
    };

    APIHandler.hitApi(Branch_User, 'POST', params).then(response => {
      setData(response);
    });
  };

  // const getData = (branchId) => {
  //   fetch("http://warly2.sapphost.com/public/api/branch_user", {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json'
  //     },

  //     body: JSON.stringify({
  //       "Token": token,
  //       "Branch": branchId,
  //     })
  //   }).
  //     then(res => res.json()).
  //     then(response => {


  //       response && setData(response);
  //     }).
  //     catch((error) => {
  //       console.error(error);
  //     });






  // }

  useEffect(() => {


    fetch('http://warly2.sapphost.com/public/api/get_branch?token=$2y$10$f43enwo0NWLsBmlGfx/ZMevMgmvEdbrZ3JTF.FNoVM4Nrj2aZYE82')
      .then((response) => response.json())
      .then((json) => setItems(json))
      .catch((error) => console.error(error));
    // let params = {

    // };

    // APIHandler.hitApi(Branches, 'get', params).then(response => {
    //   setItems(response);
    // });

  }, []);



  return (
    <View style={styles.container}>
      <View style={{ marginTop: "3%", marginLeft: 10, justifyContent: 'flex-start', }}>
        <Image
          source={require("../assets/Logo.jpg")}
          style={{ width: wp('20%'), height: hp('8%') }}
          resizeMode="contain"
        />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.container1}>
          <View
            style={{
              backgroundColor: "#ffffff",
              width: wp('19%'),
              marginTop: hp('-2.5%'),
              marginBottom: hp('2%'),
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Text style={styles.TextStyle}>Select user to Login</Text>
          </View>
          <DropDownPicker
            items={items}
            //controller={instance => controller.current = instance}

            defaultValue={value}
            placeholder="Select a Branch"
            containerStyle={{ height: hp('5%'), width: wp('15 %'), marginTop: -4 }}
            style={{ backgroundColor: "white", }}

            labelStyle={{
              textAlign: 'center',
              backgroundColor: 'white'
            }}
            dropDownStyle={{ backgroundColor: "white" }}
            onChangeItem={(item) => {
              setValue(item.value); setBranchid(item.id)
              User_Branch(item.id)
            }

            }
          />


          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            numColumns={3}
            style={{ marginTop: 20, alignSelf: 'center', marginLeft: '5%' }}
            renderItem={({ item }) => (
              <>

                {item.location_id == branchid ?
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Pin", { paramKey: item.id, branchId: branchid })}
                  >

                    <View style={styles.UserView}>
                      <Image source={require('../assets/profile.jpg')} resizeMode="contain" style={{ width: '80%', height: '80%', borderRadius: 240 }} />
                    </View>
                    <Text style={styles.UserViewText}>{item.first_name}</Text>

                  </TouchableOpacity>
                  : null}
              </>
            )}
          />



        </View>
      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",

  },
  container1: {
    borderRadius: 10,
    alignItems: "center",
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: "#b5b5b5",
    width: "55%",
    height: '80%',
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10
  },
  TextStyle: {
    color: "black",
    fontWeight: "bold",
    fontSize: wp('2%'),
  },
  UserView: {
    borderRadius: 50,
    alignSelf: "center",
    justifyContent: "center",
    width: wp('6%'),
    height: hp('11%'),
    marginRight: wp('3%'),
    marginLeft: 4,
    alignItems: "center",


    shadowOpacity: 0.25,
    marginTop: 2,
    elevation: 10,
    backgroundColor: 'white'



  },
  UserViewText: {
    color: "#ab8081",
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 5,
    fontSize: wp('1%'),
    width: wp('5%'),
    height: hp('5%')

  },
});
