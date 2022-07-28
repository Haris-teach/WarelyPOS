import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from "react";
import {
  Image, StyleSheet, Text,


  TouchableOpacity, View
} from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoaded } from '../Redux/Reducers/mainReducer';

const EditTime = ({ navigation, route }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [time, setTime] = useState(new Date());
  const { stf_name, poss_end, loaded } = useSelector((state) => state.root.main);
  const dispatch = useDispatch();

  const onChange = (event, selectedValue) => {
    setShow(Platform.OS === 'ios');
    if (mode == 'date') {
      const currentDate = selectedValue || new Date();
      setDate(currentDate);
      setMode('time');
      setShow(Platform.OS !== 'ios'); // to show the picker again in time mode
    } else {
      const selectedTime = selectedValue || new Date();
      setTime(selectedTime);
      setShow(Platform.OS === 'ios');
      setMode('date');
    }
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };



  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const formatDate = (time) => {
    if (time.getMinutes() < 9) {
      var min = '0' + time.getMinutes();
    }
    else {
      var min = time.getMinutes();
    }
    if (time.getHours() <= 9) {
      var hour = '0' + time.getHours();
    }
    else {
      var hour = time.getHours();
    }

    return `${hour}:${min}`;
  };
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
      <Text style={{ alignSelf: 'center', marginBottom: hp('-4%'), fontFamily: 'Roboto', fontWeight: 'bold', fontSize: wp('2%') }}>Clock in / out</Text>
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
              borderWidth: 0.5,
              borderColor: 'gray',
              height: hp('5%'),
              justifyContent: 'center',
              backgroundColor: 'white'

            }}
          >
            <Text style={styles.TextStyle}>Hello {stf_name}</Text>
          </View>

          <View style={{ marginTop: 5, alignSelf: 'flex-end' }}>
            {/* <TouchableOpacity onPress={showTimepicker}>
              <Text style={{ textDecorationLine: 'underline', marginRight: 12, fontSize: wp('0.8%') }}>Edit Time</Text>
            </TouchableOpacity> */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={false}
                display="default"
                onChange={onChange}
              />
            )}
          </View>
          <View style={{ height: hp('20%'), marginTop: hp('5%') }}>
            <Text style={{ fontWeight: "bold", fontSize: wp('5%') }}>{formatDate(time)}</Text>
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
              onPress={() => {
                if (poss_end == true) {
                  navigation.navigate("AmountConfirm", { Loc_id: branch, userid: Key, E_time: formatDate(time) });
                }
                else {
                  dispatch(SetLoaded(!loaded));
                  navigation.navigate("Dinning", { Loc_id: branch, userid: Key })
                }
              }
              }
            >

              <Text style={styles.ButtonViewText}>Clock In</Text>

            </TouchableOpacity>



            <View style={styles.ButtonView2}>
              <Text style={styles.ButtonViewText}>Clock Out</Text>
            </View>

          </View>




        </View>
        <View style={{ alignSelf: 'flex-start', marginLeft: "5%", marginTop: hp('-8%') }}>
          <TouchableOpacity
            style={{
              borderRadius: 5,
              borderWidth: 2,
              borderColor: "#b5b5b5",
              marginTop: 10,
              width: wp('12%'),
              alignItems: 'center',
              height: hp('8%'),
              justifyContent: 'center'

            }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ padding: 8, fontSize: wp('2%'), color: 'gray' }}>Back</Text>
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
    fontSize: wp('1.5%')
  },

});
