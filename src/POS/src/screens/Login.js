import React, { useEffect, useState } from "react";
import {
  FlatList, Image, StyleSheet, Text,
  TouchableOpacity, View
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import CustomActivityIndicator from "../components/generic/CustomActivityIndicator";
import { Loc_ID, Stf_ID, Stf_Name } from '../Redux/Reducers/mainReducer';
import APIHandler from "../utils/APIHandler";
import { Branches, Branch_User } from "../utils/urls";

const Login = ({ navigation }) => {


  const dispatch = useDispatch()
  const { stf_name, loc_id } = useSelector((state) => state.root.main);


  const [value, setValue] = useState(null);
  const [item, setItem] = useState([]);
  const [data, setData] = useState([]);

  const [branchid, setBranchid] = useState();
  const [isLoading, setLoading] = useState(false);


  const User_Branch = (branchId) => {
    let params = {
      Branch: branchId,
    };
    setLoading(true);


    APIHandler.hitApi(Branch_User, 'POST', params).then(response => {
      setData(response);
      setLoading(false);
    });
  };



  useEffect(() => {
    APIHandler.hitApi(Branches, 'GET').then(response => {
      setItem(response);
      console.log("chl ja============", response);
    });
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
            items={item}


            defaultValue={value}
            placeholder="Select a Branch"
            containerStyle={{ height: 50, width: '40%', marginTop: -4 }}
            style={{ backgroundColor: "white", }}

            labelStyle={{
              textAlign: 'center',
              backgroundColor: 'white',
              fontSize: wp('1.5%')
            }}
            dropDownStyle={{ backgroundColor: "white" }}
            onChangeItem={(item) => {
              setValue(item.value);
              setBranchid(item.id);
              User_Branch(item.id);
              dispatch(Loc_ID(item.id));
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
                    onPress={() => {
                      navigation.navigate("Pin", { paramKey: item.id, branchId: branchid });
                      dispatch(Stf_Name(item.first_name));
                      dispatch(Stf_ID(item.id));
                    }
                    }

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
      {isLoading && <CustomActivityIndicator />}
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
