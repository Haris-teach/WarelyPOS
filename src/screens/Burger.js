import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import APIHandler from '../utils/APIHandler';
import CustomActivityIndicator from "../components/generic/CustomActivityIndicator";
import { useSelector, useDispatch } from 'react-redux';

import { PRODUCTS } from '../utils/urls';

const Burger = (props) => {

    const [items, setItems] = useState([]);
    const [item, setItem] = useState([]);
    var obj = '';
    const branch = props.branch;

    const [search, setSearch] = useState('');
    const [state, setState] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const { stf_id, loc_id } = useSelector((state) => state.root.main);

    const Search = () => {
        let term = search;
        let obj = items.filter(item => item.name.toLowerCase().indexOf(term) > -1);

        // obj = items.find(o => o.name === s);

        setItem(obj);


    }

    const callProductsAPI = () => {
        let params = {
            Loc_id: loc_id,
            Cat_id: props.Cat_id,
        };
        setLoading(true);
        APIHandler.hitApi(PRODUCTS, 'POST', params).then(response => {
            setItems(response);
            setLoading(false);
        });
    };
    useEffect(() => {
        callProductsAPI();
    }, [branch, props.Cat_id]);



    return (
        <View>


            <View style={{ borderBottomWidth: 1, height: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TextInput style={{ height: 40, alignSelf: 'flex-end', flex: 1, color: 'black' }}
                    onChangeText={(text) => setSearch(text)}
                    value={search} />
                <TouchableOpacity onPress={() => {
                    Search(search);
                    setState(false);
                }}>
                    <Image source={require('../assets/se.jpg')} style={{ width: 25, height: 25, marginTop: 10, marginRight: 20 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Search(search);
                    setState(true);
                    setSearch('');
                }}>
                    <Image source={require('../assets/cross.jpg')} style={{ width: 25, height: 25, marginTop: 10, marginRight: 20 }} />
                </TouchableOpacity>
            </View>

            <View style={{ borderBottomWidth: 0.4, height: 25, flexDirection: 'row' }}>
                <Text style={{ alignSelf: 'center', flex: 1, fontSize: wp('1%'), marginLeft: 30 }}></Text>
                <Text style={{ fontSize: wp('1%'), alignSelf: 'center', marginRight: 20 }}>{state == true ? items.length : item.length} items</Text>
            </View>

            <View style={{ backgroundColor: 'white', height: "90%" }}>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={state == true ? items : item}
                    style={{ alignSelf: 'center' }}
                    numColumns={3}
                    renderItem={({ item }) => (

                        <TouchableOpacity style={{ width: wp('12%'), height: hp('18%'), backgroundColor: 'rgb(240,240,240)', marginRight: '2%', marginBottom: '1%', marginTop: hp('2%'), borderRadius: 4, justifyContent: 'flex-end' }}
                            onPress={() => {
                                if (item.type === 'single') {
                                    props.addNewItem(item.name, item.price, item.discount, item.id, item.var_id)
                                } else {
                                    props.variantCallback(item);
                                }
                            }}>
                            {/* <Image source={{ uri: item.image }} style={{ width: wp('12%'), height: hp('17%') }} /> */}
                            <View style={{ alignSelf: 'center', position: 'absolute', justifyContent: 'center' }}>
                                <Text style={{ fontSize: wp('1.5%'), alignSelf: 'center', color: 'black' }}>{item.name}</Text>
                                <Text style={{ fontSize: wp('1.5%'), alignSelf: 'center', marginTop: hp('5%'), fontWeight: 'bold' }}></Text>
                            </View>
                            <View style={{ height: hp('3%'), backgroundColor: '#696969', }}>
                                <Text style={{ fontSize: wp('1.1%'), alignSelf: 'center', color: 'white', fontWeight: 'bold' }}>{item.price}</Text>
                            </View>

                        </TouchableOpacity>
                    )}
                />

                {isLoading && <CustomActivityIndicator />}
            </View>
        </View >



    );
}

export default Burger;

const styles = {

};