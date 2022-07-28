import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import * as Animatable from 'react-native-animatable';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';


const DATA = [
  {
    key: '1',
    name: "SEARCHING FOR RIDE",
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
    bcolor: 'rgb(240,240,240)'
  },
  {
    key: '2',
    name: "DELIVERY PENDING",
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
  },
  {
    key: '4',
    name: "DELIVERY IN PROGRESS",
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
    bcolor: 'rgb(240,240,240)'
  },
  {
    key: '3',
    name: "DELIVERY HISTORY",
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
  },

];


const Delivery = () => {

  const [showDetails, setShowDetails] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [dropDown, setDropDown] = useState(0);

  return (

    <Animatable.View animation='fadeInUpBig'
      duration={500}>

      <FlatList
        data={DATA}
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => {
          return (
            <>
              <View style={{ backgroundColor: '#F5F5F5', borderColor: '#d3d3d3', borderBottomWidth: 1, height: hp('9%') }}>

                <View style={[styles.action, { height: hp('9%') }]}>

                  <Text

                    style={
                      {
                        marginLeft: wp('10%'),
                        marginTop: hp('3%'),
                        fontSize: wp('1.5%'),
                        fontWeight: 'bold',
                        color: dropDown == index ? '#FC3F3F' : 'gray'
                      }
                    }
                  >{item.name}</Text>

                  <View style={{ marginTop: hp('4%'), marginRight: wp('3%') }}>
                    <TouchableOpacity onPress={() => {
                      setSelectedIndex(index)
                      setShowDetails(!showDetails)
                      setDropDown(index);
                    }}>
                      <Image source={require('../assets/dropdown.jpg')} style={{ width: wp('2.5%'), height: hp('2.5%') }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>



              {
                showDetails && index == selectedIndex ?


                  <View>
                    <View style={{ flexDirection: 'row', elevation: 5 }}>
                      <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>NO.  </Text>
                      </View>
                      <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>Order number  </Text>
                      </View>
                      <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>Time Recived  </Text>
                      </View>
                      <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>Name  </Text>
                      </View>
                      <View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>Estimated arrival   </Text>
                      </View>
                    </View>

                    <View style={{ borderColor: '#d3d3d3', borderBottomWidth: 1, width: '138.9%' }}>
                      <FlatList
                        data={DATA}
                        keyExtractor={item => item.key}
                        renderItem={({ item }) => {
                          return (
                            <Animatable.View
                              animation='fadeInRightBig'
                              duration={1500}
                              style={styles.containerStyle}>

                              <View style={{ flexDirection: 'row', backgroundColor: item.bcolor }}>
                                <View style={styles.viewStyle}>
                                  <Text style={styles.textStyle}>{item.key}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                  <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>{item.order}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                  <Text style={[styles.textStyle, { color: 'red' }]}>{item.Time}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                  <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>{item.Name}</Text>
                                </View>
                                <View style={styles.viewStyle}>
                                  <Text style={[styles.textStyle, { color: 'red' }]}>{item.Pager}</Text>
                                </View>
                                <TouchableOpacity style={styles.viewbtnStyle} onPress={() => setState('Subpickup')}>
                                  <Text style={{ padding: '8%', color: 'red', alignSelf: "center", fontSize: 12 }}>View More</Text>
                                </TouchableOpacity>
                              </View>
                            </Animatable.View>)
                        }}
                      />
                    </View>
                  </View>
                  : null
              }
            </>
          )
        }}

      />


    </Animatable.View>

  );
}

export default Delivery;


const styles = {
  textInput: {
    flex: 1,
    fontSize: wp('1%'),
    fontWeight: 'bold',
    color: 'red'

  },

  action: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerStyle: {
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
  },
  textStyle: {
    marginTop: '10%',
    marginRight: '15%',
    fontSize: wp('1.2%'),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    marginLeft: '1%',
    padding: '1%',
    borderRightWidth: 0.3,
    marginRight: '1%',
    width: '10%',
  },
  viewbtnStyle: {
    marginLeft: '5%',
    marginTop: '1%',
    marginBottom: '1%',
    opacity: 0.7,
    width: '7%',
    height: '60%',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 5
  }
};