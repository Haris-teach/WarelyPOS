import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import CustomActivityIndicator from "../../components/generic/CustomActivityIndicator";
import APIHandler from '../../utils/APIHandler';
import { PRODUCTS, MODIFIRES } from '../../utils/urls';
import SwitchButton from 'switch-button-react-native';
import TakeawayExtras from './TakeawayExtras';

var CatId = 0;
var productId = 0;
var productName = '';
var productPrice = 0;
const Burger = (props) => {

    const [items, setItems] = useState([]);
    const [item, setItem] = useState([]);
    const [btnPress, setBtnPress] = useState(0);
    var obj = '';
    const [modifierId, setModifierId] = useState();
    // const [productId, setProductId] = useState();
    // const [productName, setProductName] = useState();
    // const [productPrice, setProductPrice] = useState();

    const branch = props.branch;

    const [search, setSearch] = useState('');
    const [state, setState] = useState('');
    const [catState, setCatState] = useState('All Categories');
    const [isLoading, setLoading] = useState(false);
    const { stf_id, loc_id } = useSelector((state) => state.root.main);
    const [swi, setSwi] = useState(false);
    const Search = () => {
        let term = search;
        let obj = items.filter(item => item.name.toLowerCase().indexOf(term) > -1);

        // obj = items.find(o => o.name === s);

        setItem(obj);


    }


    const Modifires = (v) => {

        let param = {
            p_id: v,
        };

        APIHandler.hitApi(MODIFIRES, 'POST', param).then(res => {
            // console.log("MOdifires Response is  ===", res);
            setResponse(res);
        });

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
            CatId = props.Cat_id;
            // console.log("CATID is equal=====", props.Cat_id, CatId)
        });
    };
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            callProductsAPI();
        }
        return function cleanup() {
            mounted = false;
        }


    }, [branch, props.Cat_id]);






    return (
        <View style={{ flex: 1 }}>


            {
                state == 'TakeawayExtras' ? <TakeawayExtras Modi_sum_add={props.Modi_sum_add} Cat_id={props.Cat_id} btn={props.btn} modifier={modifierId} productName={productName} productPrice={productPrice} productId={productId} itemName={props.itemName} itemPrice={props.itemPrice} btn={props.btn} Product_id={props.product_id} addNewItem={props.addNewItem} ExtCallback={props.ExtCallback} />
                    :
                    <>
                        <View style={{ backgroundColor: '#f7f7f7', justifyContent: 'space-between', borderBottomWidth: 0.4, height: hp('10%'), flexDirection: 'row', }}>

                            <TouchableOpacity style={{ width: wp('3%'), height: hp('3%'), alignSelf: 'center' }}
                                onPress={() => {
                                    //props.call();
                                }}
                            >
                                <Image source={require('../../assets/left-arrow.png')} style={{ borderWidth: 1, width: wp('2%'), height: hp('2%'), alignSelf: 'center' }} resizeMode="contain" />

                            </TouchableOpacity>

                            <View style={{ width: wp('10%'), height: hp('5%'), justifyContent: 'center', alignSelf: 'center', marginLeft: wp('-10%') }}>
                                <Text style={{ fontSize: wp('1.5%') }}>{props.btn}</Text>
                            </View>
                            {/* <View style={{ marginRight: wp('1%'), justifyContent: 'center' }}>
                                <SwitchButton
                                    onValueChange={(val) => setSwi({ val })}
                                    value={swi}
                                    text1='CHI'
                                    text2='ENG'
                                    switchWidth={110}
                                    switchHeight={44}
                                    switchdirection='rtl'
                                    switchBorderRadius={5}
                                    switchSpeedChange={500}
                                    switchBorderColor='#b1b1b1'
                                    switchBackgroundColor='#fff'
                                    btnBorderColor='#c4c4c4'
                                    btnBackgroundColor='#c4c4c4'
                                    fontColor='black'
                                    activeFontColor='gray'
                                />



                            </View> */}
                            {/* <Text style={{ fontSize: wp('1%'), alignSelf: 'center', marginRight: 20 }}>{state == true ? items.length : item.length} items</Text> */}
                        </View>

                        <View style={{ marginTop: hp('2%'), backgroundColor: 'white', height: hp('100%') }}>

                            <FlatList

                                data={items}

                                style={{ alignSelf: 'center', marginBottom: hp('10%') }}
                                numColumns={3}
                                renderItem={({ item }) => (

                                    <TouchableOpacity style={{ flexDirection: 'column', justifyContent: 'space-between', width: wp('10.5%'), height: hp('15%'), backgroundColor: 'rgb(240,240,240)', marginRight: '0.7%', marginBottom: hp('0%'), marginTop: hp('0.5%'), borderRadius: 6, alignItems: 'center' }}
                                        onPress={() => {

                                            setModifierId(item.id);
                                            console.log("Product Id")
                                            productName = item.name;
                                            productPrice = item.price;
                                            productId = item.id;
                                            setCatState('Press');
                                            if (item.modi == 'ture') {
                                                setState('TakeawayExtras');
                                            }
                                            else {
                                                props.addNewItem(item.name, item.price, 0, item.id, item.var_id, []);
                                            }
                                            console.log('item ki iddddd=====', modifierId);

                                            // if (item.type === 'single') {
                                            //     props.addNewItem(item.name, item.price, 0, item.id, item.var_id);
                                            // } else {
                                            //     props.variantCallback(item);
                                            // }
                                        }}>
                                        {/* <Image source={{ uri: item.image }} style={{ width: wp('12%'), height: hp('17%') }} /> */}

                                        <Text style={{ width: wp('9%'), marginTop: hp('3%'), fontSize: wp('1.1%'), textAlign: 'center', color: 'black' }}>{item.name}</Text>

                                        <View style={{ justifyContent: 'center', borderRadius: 1, alignSelf: 'flex-end', width: wp('10.4%'), alignItems: 'center', height: hp('3.5%'), backgroundColor: '#696969' }}>
                                            <Text style={{ fontSize: wp('1.1%'), color: 'white', fontWeight: 'bold' }}>{item.price}</Text>
                                        </View>

                                    </TouchableOpacity>
                                )}
                            />

                            {isLoading && <CustomActivityIndicator />}
                        </View>
                    </>}

        </View >



    );
}

export default Burger;

const styles = {

};