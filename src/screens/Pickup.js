import React from "react";
import { Text, View, FlatList, TouchableOpacity } from "react-native";
import * as Animatable from 'react-native-animatable';
import Subpickup from "./SubPickup";

const DATA = [
  {
    key: '1',
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
    bcolor: 'rgb(240,240,240)'
  },
  {
    key: '2',
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
  },
  {
    key: '3',
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
    bcolor: 'rgb(240,240,240)'
  },
  {
    key: '4',
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
  },
  {
    key: '5',
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
    bcolor: 'rgb(240,240,240)'
  },
  {
    key: '6',
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
  },
  {
    key: '7',
    order: "#00101",
    Time: "12:20 PM",
    Pager: "01",
    Name: "haris",
    bcolor: 'rgb(240,240,240)'
  },
];



const Pickup = () => {

  const [state, setState] = React.useState('');

  return (

    <>
      {state === 'Subpickup' ? <Subpickup /> :
        <View>
          <View style={{ elevation: 5, backgroundColor: 'rgb(240,240,240)', height: '15%', borderBottomWidth: 1, borderColor: '#d3d3d3' }}>
            <Text style={{ padding: '1%', marginLeft: '8%', marginTop: '2%', color: '#FF2E2E', fontWeight: 'bold', fontSize: 13 }}>PICKUP PENDING</Text>
          </View>
          {/* fadeInUpBig */}

          <View style={{ flexDirection: 'row', elevation: 2 }}>
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


          <Animatable.View
            animation='fadeInUpBig'
            duration={500}
            style={{ elevation: 5, height: "50%" }}>
            <FlatList
              data={DATA}
              keyExtractor={item => item.key}
              renderItem={({ item }) => {
                return (
                  <View style={{ flexDirection: 'row', backgroundColor: item.bcolor }}>
                    <View style={styles.viewStyle}>
                      <Text style={styles.textStyle}>{item.key}</Text>
                    </View>
                    <View style={styles.viewStyle}>
                      <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>{item.order}</Text>
                    </View>
                    <View style={styles.viewStyle}>
                      <Text style={[styles.textStyle, { color: '#FF2E2E' }]}>{item.Time}</Text>
                    </View>
                    <View style={styles.viewStyle}>
                      <Text style={[styles.textStyle, { fontWeight: 'bold' }]}>{item.Name}</Text>
                    </View>
                    <View style={styles.viewStyle}>
                      <Text style={[styles.textStyle, { color: '#FF2E2E' }]}>{item.Pager}</Text>
                    </View>
                    <TouchableOpacity style={styles.viewbtnStyle} onPress={() => setState('Subpickup')}>
                      <Text style={{ padding: '8%', color: '#FF2E2E', alignSelf: "center", fontSize: 12 }}>View</Text>
                    </TouchableOpacity>
                  </View>
                )
              }}

            />
          </Animatable.View>
          <View style={{ elevation: 5, padding: '1%', backgroundColor: 'rgb(240,240,240)', height: '15%', borderTopWidth: 1, borderColor: '#d3d3d3' }}>
            <Text style={{ marginLeft: '8%', marginTop: '1.5%', color: '#FF2E2E', fontWeight: 'bold', fontSize: 13 }}>PICKUP HISTORY</Text>
          </View>
        </View>
      }
    </>
  );
}

export default Pickup;

const styles = {
  textStyle: {
    fontSize: 10,
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
    borderColor: '#FF2E2E',
    borderWidth: 1,
    borderRadius: 5
  }

};
