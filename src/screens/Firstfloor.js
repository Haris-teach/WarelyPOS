

import React, { useState } from "react";
import { Text, View, TouchableOpacity, FlatList, Modal, Pressable, Image } from "react-native";
import { FlatGrid } from 'react-native-super-grid';
import * as Animatable from 'react-native-animatable';
import SubTakeway from './SubTakeway';

const DATA = [
  {
    key: '1',
    a: 'B1',
    b: "A5",
    bcolor: 'red',
    radius: 25
  },
  {
    key: '2',
    a: 'B2',
    b: "A5",
    bcolor: 'gray',
  },
  {
    key: '3',
    a: 'B3',
    b: "A5",
    bcolor: 'orange',
    radius: 25
  },
  {
    key: '4',
    a: 'B4',
    b: "A5",
    bcolor: 'red',
  },
  {
    key: '5',
    a: 'B5',
    b: "A5",
    bcolor: 'gray',
    radius: 25
  },

];


const Firstfloor = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [state, setState] = useState(false);
  const increment = () => {
    return (
      setCount(count + 1)
    );
  }

  const decrement = () => {
    return (
      setCount(count - 1)
    );
  }

  return (
    <Animatable.View animation='fadeIn'
      duration={1500}>
      <View style={styles.containerStyle}>
        <TouchableOpacity style={[styles.Card, { backgroundColor: 'gray' }]}>
          <Text style={styles.CardText}>1</Text>
          <Text style={styles.CardText1}>SEAT AVAILABLE</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.Card, { backgroundColor: 'red' }]}>
          <Text style={styles.CardText}>2</Text>
          <Text style={styles.CardText1}>SEAT OCCUPIED</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.Card, { backgroundColor: '#ffbf00' }]}>

          <Text style={styles.CardText}>3</Text>
          <Text style={styles.CardText1}>SEAT OCCUPIED</Text>

        </TouchableOpacity>

      </View>
      <View style={{ alignItems: 'flex-end', marginRight: 10, marginTop: -55 }}>
        <TouchableOpacity style={{ width: 100, height: 25, backgroundColor: 'white', borderRadius: 5, borderWidth: 0.3 }}>
          <Text style={{ alignSelf: 'center', marginTop: 5, fontSize: 8 }}>MERGE TABLE</Text>
        </TouchableOpacity>
      </View>

      <View style={{ width: "100%", height: '100%', alignSelf: 'center', marginTop: 35, backgroundColor: 'rgb(240,240,240)' }}>

        <FlatGrid
          showsVerticalScrollIndicator={false}
          itemDimension={50}
          data={DATA}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          spacing={20}
          renderItem={({ item, index }) => (
            <>
              {item.bcolor === "gray" ?
                <TouchableOpacity onPress={() => setModalVisible(true)} >
                  <View style={{ width: "100%", height: "100%", borderColor: item.bcolor, borderWidth: 9, borderRadius: item.radius, marginLeft: 5 }}>

                    <Text style={{ alignSelf: 'center', fontSize: 15, fontWeight: 'bold', color: 'black' }}>{item.a}</Text>

                  </View>
                </TouchableOpacity>
                : <View style={{ width: 40, height: 40, borderColor: item.bcolor, borderWidth: 9, borderRadius: item.radius, marginLeft: 5 }}>

                  <Text style={{ alignSelf: 'center', fontSize: 15, fontWeight: 'bold', color: 'black' }}>{item.a}</Text>

                </View>}
              <View style={styles.centeredView}>
                <Modal
                  animationType="fade"

                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {

                    setModalVisible(!modalVisible);
                  }}
                >

                  <View style={styles.modalView}>
                    <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 8 }} onPress={() => setModalVisible(false)}>
                      <Image source={require('../assets/cross.jpg')} resizeMode="contain" style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    <View style={{ width: '98%', height: '40%', marginTop: 10 }}>

                      <View style={{ width: "50%", height: '60%', borderColor: item.bcolor, borderWidth: 9, borderRadius: item.radius, alignSelf: 'center', justifyContent: 'center' }}>

                        <Text style={{ fontSize: 15, fontWeight: 'bold', color: 'black', alignSelf: 'center', }}>table</Text>

                      </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginBottom: '3%' }}>
                      <View style={{ flex: 1, marginLeft: 25, width: '40%', height: '40%' }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-start', width: '100%', height: '100%' }} onPress={() => decrement()} >
                          <Image source={require('../assets/minus.jpg')} resizeMode="contain" style={{ width: '100%', height: '100%', alignSelf: 'center' }} />
                        </TouchableOpacity>
                      </View>
                      <View style={{ flex: 1, marginLeft: 10 }}>
                        <TouchableOpacity style={{ alignSelf: 'center' }}>
                          <Text style={{ alignSelf: 'center' }}>{count}</Text>
                        </TouchableOpacity>
                      </View>

                      <View style={{ flex: 1, marginRight: 25, width: '40%', height: '40%' }}>
                        <TouchableOpacity style={{ alignSelf: 'flex-end', width: '100%', height: '100%' }} onPress={() => increment()}>
                          <Image source={require('../assets/plus_c.jpg')} resizeMode="contain" style={{ width: '100%', height: '100%', alignSelf: 'center' }} />
                        </TouchableOpacity>
                      </View>

                    </View>
                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 5, width: '90%', height: 40 }}>
                      <TouchableOpacity style={{ backgroundColor: 'red', borderRadius: 10, width: '100%', marginBottom: 5, justifyContent: 'center', height: 40 }}
                        onPress={() => setState(true)}>
                        <Text style={{ color: 'white', fontWeight: 'bold', alignSelf: 'center' }}>CONFIRM</Text>
                      </TouchableOpacity>
                    </View>

                  </View>

                </Modal>

              </View>
            </>
          )}
        />
      </View>
    </Animatable.View>
  );
}

export default Firstfloor;


const styles = {
  containerStyle: {
    borderWidth: 0.6,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 2,
    marginLeft: 2,
    marginTop: -2,
    width: 220,
    height: 70,
    flexDirection: 'row'
  },
  Card: {
    width: '30%',
    height: '80%',
    marginTop: 10,
    marginLeft: 5,
  },
  CardText: {
    alignSelf: 'center',
    marginTop: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  CardText1: {
    fontSize: 6,
    color: 'white',
    alignSelf: 'center',
    marginTop: 5
  },

  modalView: {
    marginTop: '5%',
    backgroundColor: "white",
    borderRadius: 20,
    width: '23%',
    height: '85%',
    alignSelf: 'center',
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8
  },



};