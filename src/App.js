// import React, { useEffect, useState } from 'react';
// import {
//   FlatList,


//   Image, Text, TouchableOpacity,




//   View
// } from 'react-native';
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import { useSelector } from 'react-redux';
// import APIHandler from './src/utils/APIHandler';
// import { CALLBACK_2ND_SCREEN, IMAGES } from './src/utils/urls';

// var header1 = '';

// const App = () => {

//   const { stf_id, c_Screen, subtotal, total2, dis2, recievedAmount, changeAmount, loc_id } = useSelector((state) => state.root.main);
//   const [data, setData] = useState();
//   const [sub, setSub] = useState();
//   const [total, setTotal] = useState();
//   const [dis, setDis] = useState();
//   const [header, setHeader] = useState();
//   const [slider, setSlider] = useState();
//   const [footer, setFooter] = useState();
//   console.log("chl gia na", c_Screen)
//   useEffect(() => {

//     let param = {
//       Loc_id: loc_id,
//     };
//     APIHandler.hitApi(IMAGES, 'POST', param).then(response => {
//       console.log("Image Check ===", response);
//       setHeader(response.map(i => i.header));
//       setSlider(response.map(i => i.slider));
//       setFooter(response.map(i => i.Footer));
//       header1 = header.toString();
//     });

//     let params = {
//       count: 1,
//     };

//     APIHandler.hitApi(CALLBACK_2ND_SCREEN, 'POST', params).then(response => {
//       console.log("2nd Screen 2 ===", response);
//       setData(response.Data);
//       setTotal(response.Total);
//       setDis(response.Discount);
//       setSub(response.Sub);

//     });

//   }, [c_Screen]);

//   console.log('******recieved and change ki amount*****', header1)


//   return (
//     <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row' }}>
//       <View style={{ flex: 0.5, borderRightWidth: 1, borderRightColor: '#d3d3d3' }}>

//         <View style={{ borderWidth: 1, flexDirection: 'row', width: wp('46.8%'), height: hp('15%') }}>
//           <View style={{ marginRight: wp('0.5%'), justifyContent: 'center', width: wp('20%'), height: hp('12%') }}>
//             <Image
//               source={header}
//               style={{
//                 width: wp('20%'),
//                 height: hp('7%'),
//               }}
//             // resizeMode="contain"
//             />
//           </View>

//           <View style={{ width: wp('24%'), height: hp('10%') }}>
//             <Text style={{ fontSize: wp('1.4%') }}>Warely POS System</Text>
//             <Text style={{ marginTop: hp('0.1%'), fontSize: wp('1.3%') }}>08/24/2020  9:49:57 AM</Text>
//             <Text style={{ marginTop: hp('0.1%'), fontSize: wp('1.3%') }}>Transaction No: 3140</Text>
//             <Text style={{ marginTop: hp('0.1%'), fontSize: wp('1.3%') }}>Table No: T3</Text>
//           </View>

//         </View>

//         <View style={{ flexDirection: 'row', width: wp('46.8%'), height: hp('5%'), borderColor: 'black' }}>
//           <View style={{
//             width: wp('4.5%'),
//             height: hp('4.8%'),
//             justifyContent: 'center', alignItems: 'center',

//           }}>
//             <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'grey' }]}>NO.</Text>
//           </View>
//           <View style={{
//             width: wp('24%'),
//             height: hp('5%'),
//             justifyContent: 'center',
//           }}>
//             <Text style={[styles.textStyle, { marginLeft: wp('0.5%'), fontWeight: 'bold', color: 'grey' }]}>Product</Text>
//           </View>

//           <View style={{
//             width: wp('9%'),
//             height: hp('5%'),
//             justifyContent: 'center', alignItems: 'center',

//           }}>
//             <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'grey' }]}>Qty</Text>
//           </View>



//           <View style={{
//             width: wp('9%'),
//             height: hp('5%'), justifyContent: 'center', alignItems: 'center',

//           }}>
//             <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'grey' }]}>Total</Text>
//           </View>
//         </View>

//         <View
//           style={{ elevation: 2, height: hp("45%"), borderBottomWidth: 1, borderBottomColor: '#d3d3d3' }}>
//           <FlatList
//             data={data}
//             keyExtractor={item => item.key}
//             renderItem={({ item }) => {
//               return (
//                 <View style={{ height: hp('4.5%'), flexDirection: 'row', backgroundColor: item.key % 2 == 0 ? 'white' : '#F7F7F7' }}>

//                   <View style={{ justifyContent: 'center', alignItems: 'center', borderColor: '#A4A4A4', borderRightWidth: 1, height: hp('4.5%'), width: wp('4.6%') }}>
//                     <Text style={[styles.textStyle, { alignSelf: 'center', color: 'black' }]}>{item.key}</Text>
//                   </View>

//                   <View style={[styles.viewStyle, { justifyContent: 'center', height: hp('4.5%'), width: wp('24%') }]}>
//                     <Text style={[styles.textStyle, { marginLeft: wp('0.5%'), color: 'black' }]}>{item.item}</Text>
//                   </View>

//                   <TouchableOpacity
//                     style={[{ justifyContent: 'center', alignItems: 'center', width: wp('9%'), height: hp('4.5%') }]}
//                     onPress={() => {
//                       // dispatch(SetSelect('cash'));
//                       // setSelectedIndex(index);
//                       // Null_qty(index);
//                     }}>
//                     <Text style={[styles.textStyle, { color: 'black' }]}>{item.qty}</Text>
//                   </TouchableOpacity>





//                   <View style={[styles.viewStyle, { justifyContent: 'center', alignItems: 'center', width: wp('9%'), height: hp('4.5%') }]}>
//                     <Text style={[styles.textStyle, { alignSelf: 'center', color: '#FC3F3F' }]}>${item.p}</Text>
//                   </View>

//                 </View>
//               )
//             }}

//           />
//         </View>

//         <View style={{ borderTopWidth: 1, flexDirection: 'row', flex: 1 }}>

//           <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: wp('1%'), flexDirection: 'row', height: wp('18%'), width: wp('22%'), flex: 0.45 }}>
//             <View style={{ marginTop: hp('0.05%'), }}>
//               <Text style={{ fontSize: wp('1.3%'), color: '#696969', marginBottom: wp('0.2%') }}>Sub Total:</Text>
//               <Text style={{ fontSize: wp('1.3%'), color: '#696969', marginBottom: wp('0.2%') }}>Discount:</Text>
//               <Text style={{ fontSize: wp('1.3%'), color: '#696969', marginBottom: wp('0.2%') }}>Net Total:</Text>
//               <Text style={{ fontSize: wp('1.3%'), color: '#696969', marginBottom: wp('0.2%') }}>GST Inc. :</Text>
//               <Text style={{ fontSize: wp('1.7%'), fontWeight: 'bold', color: '#696969', marginBottom: wp('0.2%') }}>Total:</Text>
//               <Text style={{ fontSize: wp('1.3%'), color: '#696969', marginBottom: wp('0.2%') }}>Paid:</Text>
//               <Text style={{ fontSize: wp('1.7%'), fontWeight: 'bold', color: '#696969', marginBottom: wp('0.2%') }}>Change:</Text>
//             </View>

//             <View style={{ marginLeft: wp('4%'), marginTop: hp('0.1%'), }}>
//               <Text style={{ fontSize: wp('1.3%'), color: '#696969', marginBottom: wp('0.2%') }}>${total2}</Text>
//               <Text style={{ fontSize: wp('1.3%'), color: '#696969', marginBottom: wp('0.2%') }}>${dis2}</Text>
//               <Text style={{ fontSize: wp('1.3%'), color: '#696969', marginBottom: wp('0.2%') }}>$0.00</Text>
//               <Text style={{ fontSize: wp('1.3%'), color: 'red', marginBottom: wp('0.2%'), fontWeight: 'bold' }}>$0.00</Text>
//               <Text style={{ fontSize: wp('1.7%'), fontWeight: 'bold', color: '#696969', marginBottom: wp('0.2%') }}>${total2 - dis2}</Text>
//               <Text style={{ fontSize: wp('1.3%'), color: '#696969', marginBottom: wp('0.2%') }}>${recievedAmount}</Text>
//               <Text style={{ fontSize: wp('1.7%'), fontWeight: 'bold', color: 'red', marginBottom: wp('0.2%'), fontWeight: 'bold' }}>${changeAmount}</Text>
//             </View>

//           </View>

//           <View style={{
//             flex: 0.55, width: wp('20%'),
//             height: hp('35%'), justifyContent: 'center', alignItems: 'center'
//           }}>
//             <Image
//               // source={footer}
//               style={{
//                 width: wp('20%'),
//                 height: hp('10%'),
//               }}
//               resizeMode="contain"
//             />

//           </View>
//         </View>




//       </View>

//       <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center', }}>
//         <Image
//           // source={slider}
//           style={{
//             width: wp('90%'),
//             height: hp('70%'),
//           }}
//           resizeMode='contain'
//         />
//       </View>

//     </View >
//   );
// };


// export default App;
// const styles = {
//   textStyle: {
//     fontSize: wp('1.3%'),
//   },

//   viewStyle1: {
//     width: wp('6%'),
//     marginLeft: wp('2%'),
//     marginTop: hp('1%'),
//     height: hp('10%'),

//   }


// };

import React, { useEffect, useState } from 'react';
import {
  FlatList,


  Image, Text, TouchableOpacity,




  View
} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import APIHandler from './src/utils/APIHandler';
import { CALLBACK_2ND_SCREEN, IMAGES } from './src/utils/urls';
import Anc from './src/screens/AddNewCustumor';
import { SetScreenSwitch } from './src/Redux/Reducers/mainReducer';

var header = '';
var footer = '';
var slider = '';

const App = () => {
  const dispatch = useDispatch();
  const { stf_id, c_Screen, subtotal, total2, dis2, screenSwitch, loc_id } = useSelector((state) => state.root.main);
  const [data, setData] = useState();
  const [sub, setSub] = useState();
  const [total, setTotal] = useState();
  const [dis, setDis] = useState();

  useEffect(() => {

    let param = {
      Loc_id: loc_id,
    };
    APIHandler.hitApi(IMAGES, 'POST', param).then(response => {
      console.log("Customer Screen response is ==", response)

      // setHeader(response.map(i => i.header));
      // setSlider(response.map(i => i.slider));
      // setFooter(response.map(i => i.Footer));
      // header = response.map(i => i.header);

      response.forEach(element => {
        header = element.header;
        footer = element.Footer;
        slider = element.slider;
      });
      console.log('Header image is = ', String(header))
    });

    let params = {
      count: 1,
    };

    APIHandler.hitApi(CALLBACK_2ND_SCREEN, 'POST', params).then(response => {
      console.log("2nd Screen 2 ===", response);
      setData(response.Data);
      setTotal(response.Total);
      setDis(response.Discount);
      setSub(response.Sub);

    });

    setTimeout(async () => {
      try {


        if (screenSwitch === 'second') {
          dispatch(SetScreenSwitch('first'));
        }
      } catch (error) {
        console.log('Something went wrong', error);
      }
    }, 3000);

  }, [c_Screen]);

  setTimeout(async () => {
    try {


      if (screenSwitch === 'second') {
        dispatch(SetScreenSwitch('first'));
      }
    } catch (error) {
      console.log('Something went wrong', error);
    }
  }, 15000);
  return (

    <>
      {screenSwitch === 'first' ?
        <View style={{ flex: 1, backgroundColor: 'white', flexDirection: 'row' }}>
          <View style={{ flex: 0.5, borderRightWidth: 1, borderRightColor: '#d3d3d3' }}>

            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: wp('2%'), justifyContent: 'center' }}>
                <Image
                  source={{ uri: header }}
                  style={{
                    width: wp('25%'),
                    height: hp('10%'),
                  }}
                  resizeMode="cover"
                />
              </View>

              <View style={{ marginTop: hp('1%') }}>
                <Text style={{ fontSize: wp('1.5%') }}>Warely POS System</Text>
                <Text style={{ marginTop: hp('0.5%'), fontSize: wp('1.5%') }}>08/24/2020  9:49:57 AM</Text>
                <Text style={{ marginTop: hp('0.5%'), fontSize: wp('1.5%') }}>Transaction No: 3140</Text>
                <Text style={{ marginTop: hp('0.5%'), fontSize: wp('1.5%') }}>Table No: T3</Text>
              </View>

            </View>

            <View style={{ elevation: 1, flexDirection: 'row', width: wp('50%'), height: hp('6%'), borderWidth: 1, borderColor: '#d3d3d3' }}>
              <View style={{
                width: wp('4%'),
                marginLeft: wp('1.2%'),
                marginTop: hp('1%'),
                height: hp('4%'),

              }}>
                <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'grey' }]}>NO.</Text>
              </View>
              <View style={{
                width: wp('9%'),
                marginLeft: wp('2%'),
                marginTop: hp('1%'),
                height: hp('10%'),

              }}>
                <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'grey' }]}>Product</Text>
              </View>

              <View style={{
                width: wp('6%'),
                marginLeft: wp('15%'),
                marginTop: hp('1%'),
                height: hp('10%'),

              }}>
                <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'grey' }]}>Qty</Text>
              </View>

              <View style={{
                width: wp('6%'),
                marginLeft: wp('2%'),
                marginTop: hp('1%'),
                height: hp('10%'),

              }}>
                <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'grey' }]}>Price</Text>
              </View>

              {/* <View style={{
                width: wp('8%'),
                marginLeft: wp('-1%'),
                marginTop: hp('1%'),
                height: hp('10%'),

              }}>
                <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'grey' }]}>Discount</Text>
              </View> */}
              {/* <View style={{
                width: wp('6%'),
                marginLeft: wp('-1%'),
                marginTop: hp('1%'),
                height: hp('10%'),

              }}>
                <Text style={[styles.textStyle, { fontWeight: 'bold', color: 'grey' }]}>Total   </Text>
              </View> */}
            </View>
            {/* // Main FlateList */}
            <View style={{ height: hp('40%') }}>
              <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={{ flexDirection: 'row', backgroundColor: item.key % 2 == 0 ? 'white' : '#F7F7F7' }}>
                    <View style={{ borderRightWidth: 1, justifyContent: 'center', borderColor: '#A4A4A4', width: wp('4.6%') }}>
                      <TouchableOpacity disabled={true}
                        style={{ backgroundColor: item.color, width: wp('4%'), height: hp('6%'), borderRadius: 1000000000, justifyContent: 'center' }}
                        onPress={() => {
                          dispatch(SetSelect('reservation'));
                          setModi(item.additem)
                        }}
                      >
                        <Text style={[styles.textStyle, { alignSelf: 'center', color: 'black', }]}>{item.key}</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity disabled={true}
                      style={{ justifyContent: 'center', width: wp('22%') }} onPress={() => {
                        dispatch(SetSelect('Additems'));
                        Modifires(item.var_id);
                        setSelectedIndex(index);
                      }}>
                      <Text style={[styles.textStyle, { marginLeft: wp('0.5%'), color: 'black' }]}>{item.item}</Text>

                      <View style={{ justifyContent: 'center', marginLeft: wp('0.5%'), width: wp('17%'), marginTop: hp('1%'), flexDirection: 'row' }}>
                        <FlatList
                          data={item.additem}
                          // numColumns={2}
                          horizontal={false}
                          spacing={100}
                          renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row' }}>
                              <TouchableOpacity disabled={true}
                                style={[{ backgroundColor: 'white', marginLeft: wp('0.5%'), marginBottom: hp('0.5%'), justifyContent: 'center', alignItems: 'center', borderColor: '#FC3F3F', borderRadius: 8, borderWidth: 1, width: wp('7% '), height: hp('5 % ') }]}>
                                <Text style={{ textAlign: 'center', fontSize: wp('0.9%'), color: '#FC3F3F' }}>{item.modi_name}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity disabled={true}
                                style={[{ backgroundColor: 'white', marginLeft: wp('0.5%'), justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderRadius: 8, borderWidth: 1, width: wp('4% '), height: hp('5 % ') }]}>
                                <Text style={{ textAlign: 'center', fontSize: wp('0.9%'), color: 'black' }}>{item.quantity}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity disabled={true}
                                style={[{ backgroundColor: 'white', marginLeft: wp('0.5%'), justifyContent: 'center', alignItems: 'center', borderColor: 'black', borderRadius: 8, borderWidth: 1, width: wp('5% '), height: hp('5 % ') }]}>
                                <Text style={{ textAlign: 'center', fontSize: wp('0.9%'), color: 'black' }}>${item.unit_price}</Text>
                              </TouchableOpacity>
                            </View>
                          )} />


                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity disabled={true}
                      style={[styles.viewStyle, { justifyContent: 'center', alignItems: 'center', width: wp('7.1%') }]}
                      onPress={() => {
                        dispatch(SetSelect('cash'));
                        setSelectedIndex(index);
                        Null_qty(index);
                      }}>
                      <Text style={[{ backgroundColor: 'white', color: 'black', width: wp('5%'), height: hp('4%'), textAlign: 'center', fontSize: wp('1.5%'), borderWidth: 1, borderRadius: 5, borderColor: 'gray' }]}>{item.qty}</Text>

                    </TouchableOpacity>

                    {/* <TouchableOpacity disabled={true}
                    style={[styles.viewStyle, { alignItems: 'center', width: wp('6.7%'), height: hp('10%'), }]}
                    onPress={() => {
                      dispatch(SetSelect('dis'));
                      setSelectedIndex(index);
                      Null_dis(index);
                      counter = 0;


                    }}>



                    {item.dis == '+' ?
                      <Text style={[{ backgroundColor: 'white', color: 'black', width: wp('3%'), height: hp('5%'), textAlign: 'center', fontSize: wp('1.9%'), borderWidth: 1, borderRadius: 8, borderColor: 'gray' }]}>{item.dis.slice(0, -3)}</Text>
                      :


                      <Text style={[styles.textStyle, { width: wp('5.5%'), color: 'red' }]}>
                        {item.dis_sign == '$' ?

                          <Text>{item.dis_sign + item.dis}</Text>
                          :

                          <Text> {item.dis + item.dis_sign}</Text>
                        }
                      </Text>
                    }

                  </TouchableOpacity> */}



                    <View style={[styles.viewStyle, { width: wp('5%') }]}>
                      <Text style={[styles.textStyle, { alignSelf: 'center', color: '#FC3F3F' }]}>${item.p}</Text>
                    </View>
                    {/* <TouchableOpacity disabled={true} style={[styles.viewStyle, { alignItems: 'center', width: wp('5%'), height: hp('10%') }]}
                    onPress={() => {
                      newArray(item.key, item.p, item.dis);
                      Delete_Items(index);
                    }}>
                    <Image source={require('./src/assets/Bin.png')} style={{ width: wp('4%'), height: hp('4%') }} resizeMode='contain' />
                  </TouchableOpacity> */}

                  </View>
                )} />

            </View>


            <View style={{ borderWidth: 1, flexDirection: 'row', flex: 1, marginBottom: hp('5%'), }}>

              <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: wp('1%'), flexDirection: 'row', flex: 0.5, marginBottom: hp('0%'), }}>
                <View>
                  <Text style={{ fontSize: wp('1.3%'), color: '#696969', }}>Sub Total:</Text>
                  <Text style={{ fontSize: wp('1.3%'), color: '#696969', }}>Discount:</Text>
                  <Text style={{ fontSize: wp('1.3%'), color: '#696969', }}>Net Total:</Text>
                  <Text style={{ fontSize: wp('1.3%'), color: '#696969', }}>GST Inc. :</Text>
                  <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: '#696969', }}>Total:</Text>
                  {/* <Text style={{ fontSize: wp('1.3%'), color: '#696969', }}>Paid:</Text>
                  <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: '#696969', }}>Balance:</Text> */}
                  <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: '#696969', }}>Change:</Text>
                </View>

                <View style={{ marginLeft: wp('4%'), }}>
                  <Text style={{ fontSize: wp('1.3%'), color: '#696969', }}>${total2}</Text>
                  <Text style={{ fontSize: wp('1.3%'), color: '#696969', }}>${dis2}</Text>
                  <Text style={{ fontSize: wp('1.3%'), color: '#696969', }}>$0.00</Text>
                  <Text style={{ fontSize: wp('1.3%'), color: 'red', fontWeight: 'bold' }}>$0.00</Text>
                  <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: '#696969', }}>${total2 - dis2}</Text>
                  {/* <Text style={{ fontSize: wp('1.3%'), color: '#696969', }}>$0.00</Text>
                  <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: '#696969', }}>$0.00</Text> */}
                  <Text style={{ fontSize: wp('2%'), fontWeight: 'bold', color: 'red', fontWeight: 'bold' }}>$0.00</Text>
                </View>

              </View>

              <View style={{
                flex: 0.5, justifyContent: 'center', alignItems: 'center'
              }}>
                <Image
                  source={{ uri: footer }}
                  style={{
                    width: wp('20%'),
                    height: hp('15%'),
                  }}
                  resizeMode="cover"
                />

              </View>
            </View>




          </View>

          <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={{ uri: slider }}
              style={{
                width: wp('40%'),
                height: hp('100%'),
              }}
              resizeMode='cover'
            />
          </View>

        </View >

        : screenSwitch === 'second' ?
          <Anc />
          : null}
    </>
  );
};


export default App;
const styles = {
  textStyle: {
    fontSize: wp('1.3%'),
  },
  viewStyle: {
    width: wp('5.5%'),
    height: hp('5%'),
    marginLeft: wp('2.5%'),
    marginTop: hp('1%')
  },
  viewStyle1: {
    width: wp('6%'),
    marginLeft: wp('2%'),
    marginTop: hp('1%'),
    height: hp('10%'),

  }


};

// import React, { useEffect, useState } from 'react';
// import { Text, View } from 'react-native';


// const App = () => {
//   return (
//     <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
//       <Text style={{ alignSelf: 'center', color: 'black' }}>Second Screen</Text>
//     </View>
//   );
// }

// export default App;