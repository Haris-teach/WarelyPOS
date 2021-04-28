import React, { useState } from "react";
import { Image, Text, View, FlatList, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';

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
    name: "SEARCHING FOR RIDE",
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
  },
  {
    key: '4',
    name: "SEARCHING FOR RIDE",
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
    bcolor: 'rgb(240,240,240)'
  },
  {
    key: '3',
    name: "SEARCHING FOR RIDE",
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
  },

];


const Delivery = () => {

  const [showDetails, setShowDetails] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('');

  return (

    <Animatable.View animation='fadeInUpBig'
      duration={500}>

      <FlatList
        data={DATA}
        keyExtractor={item => item.key}
        renderItem={({ item, index }) => {
          return (
            <>
              <View style={{ borderColor: '#d3d3d3', marginTop: '3%', borderBottomWidth: 1 }}>

                <View style={styles.action}>

                  <Text

                    style={[
                      styles.textInput,
                      {
                        color: 'red',
                      },
                    ]}
                  >{item.name}</Text>

                  <View style={{ position: 'relative', marginTop: '1%', marginRight: '1%' }}>
                    <TouchableOpacity onPress={() => {
                      setSelectedIndex(index)
                      setShowDetails(!showDetails)

                    }}>
                      <Image source={require('../assets/dropdown.jpg')} style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>



              {showDetails && index == selectedIndex ?


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
                                <Text style={{ padding: '8%', color: 'red', alignSelf: "center", fontSize: 12 }}>View</Text>
                              </TouchableOpacity>
                            </View>
                          </Animatable.View>)
                      }}
                    />
                  </View>
                </View>
                : null}
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
    fontSize: 12,
    padding: '1%',
    marginLeft: '10%',
    fontWeight: 'bold',
    color: 'red'

  },

  action: {
    flexDirection: 'row',
    height: 30
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
    fontSize: 10,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    marginLeft: '1%',
    padding: '1%',
    borderRightWidth: 0.3,
    marginRight: '1%',
    opacity: 0.5,
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